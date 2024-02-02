import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import prisma from "./db";

export async function createCart() {
    const session = await getServerSession(authOptions);

    let newCart;

    if (session) {
        newCart = await prisma.cart.create({
            data: { userId: session.user.id },
        });
    } else {
        newCart = await prisma.cart.create({
            data: {},
        });
        cookies().set("localCartId", newCart.id);
    }

    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0,
    };
}

export async function getCart() {
    const session = await getServerSession(authOptions);

    let cart;

    if (session) {
        cart = await prisma.cart.findFirst({
            where: { userId: session.user.id },
            include: { items: { include: { product: true } } },
        });
    } else {
        const localCartId = cookies().get("localCartId")?.value;
        cart = localCartId
            ? await prisma.cart.findUnique({
                  where: { id: localCartId },
                  include: { items: { include: { product: true } } },
              })
            : null;
    }

    if (!cart) return null;

    return {
        ...cart,
        size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
        subtotal: cart.items.reduce(
            (acc, item) => acc + item.quantity * item.product.price,
            0
        ),
    };
}

export async function mergeCarts(userId) {
    const localCartId = cookies().get("localCartId")?.value;

    const localCart = localCartId
        ? await prisma.cart.findUnique({
              where: { id: localCartId },
              include: { items: true },
          })
        : null;

    if (!localCart) return;
    const userCart = await prisma.cart.findFirst({
        where: { userId },
        include: { items: true },
    });

    await prisma.$transaction(async (tx) => {
        if (userCart) {
            const mergedCartItems = mergeCartItems(
                localCart.items,
                userCart.items
            );
            await tx.cartItem.deleteMany({
                where: { cartId: userCart.id },
            });
            await tx.cartItem.createMany({
                data: mergedCartItems.map((item) => ({
                    cartId: userCart.id,
                    productId: item.productId,
                    quantity: item.quantity,
                })),
            });
        } else {
            await tx.cart.create({
                data: {
                    userId,
                    items: {
                        createMany: {
                            data: localCart.items.map((item) => ({
                                productId: item.productId,
                                quantity: item.quantity,
                            })),
                        },
                    },
                },
            });
        }
        await tx.cart.delete({
            where: { id: localCart.id },
        });
        cookies().set("localCartId", "");
    });
}

function mergeCartItems(...cartItems) {
    return cartItems.reduce((acc, items) => {
        items.forEach((item) => {
            const existingItem = acc.find(
                (i) => i.productId === items.productId
            );
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                acc.push(item);
            }
        });
        return acc;
    }, []);
}
