import { getCart } from "@/lib/cart";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Your Cart - Zila",
};
export default async function page() {
    const cart = await getCart();
    return (
        <main>
            <div className="container">
                <h1 className=" my-[3rem] scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Shopping Cart
                </h1>
                {cart?.items.map((cartItem) => (
                    <CartEntry
                        cartItem={cartItem}
                        key={cartItem.id}
                        setProductQuantity={setProductQuantity}
                    />
                ))}
                {!cart?.items.length && (
                    <p className="text-xl text-muted-foreground">
                        Your cart is empty!
                    </p>
                )}
                <div className="mb-[7rem] flex items-center justify-between ">
                    <h3 className="my-[3rem] scroll-m-20 text-2xl font-semibold tracking-tight">
                        Total: UGX {cart?.subtotal || 0}
                    </h3>
                    <Button size="sm">Checkout</Button>
                </div>
            </div>
        </main>
    );
}
