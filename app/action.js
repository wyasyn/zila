"use server";

import { createCart, getCart } from "@/lib/cart";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addProduct = async (values) => {
    try {
        const { name, description, url, price, category } = values;
        if (price <= 0) {
            return { message: "Price must be positive" };
        }
        await prisma.product.create({
            data: {
                name,
                description,
                imageUrl: url,
                price,
                category,
            },
        });
        revalidatePath("/");
        return {
            message: "Product added successfully",
        };
    } catch (e) {
        // Extract the error message
        const errorMessage =
            e instanceof Error ? e.message : "An error occurred";

        return {
            message: errorMessage,
        };
    }
};

export const getProducts = async ({ currentPage, pageSize }) => {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                id: "desc",
            },
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
        });
        return {
            products,
            message: "successful",
        };
    } catch (e) {
        return {
            products: null,
            message: " Failed to connect to database ",
        };
    }
};

export const getProductDetails = async (id) => {
    try {
        const product = await prisma.product.findUnique({ where: { id } });
        return {
            product,
            message: " successful ",
        };
    } catch (e) {
        return {
            message: e,
        };
    }
};

export async function incrementProductQuantity(productId) {
    const cart = (await getCart()) ?? (await createCart());

    const articleInCart = cart.items.find(
        (item) => item.productId === productId
    );

    if (articleInCart) {
        await prisma.cartItem.update({
            where: { id: articleInCart.id },
            data: { quantity: { increment: 1 } },
        });
    } else {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                quantity: 1,
            },
        });
    }
    revalidatePath("/product/[id");
}
