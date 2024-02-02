"use client";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState, useTransition } from "react";
import { IoCartOutline } from "react-icons/io5";

export default function AddToCartBtn({ productId, incrementProductQuantity }) {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState(false);
    return (
        <div className=" mt-[3rem] flex items-center gap-2">
            <Button
                disabled={isPending}
                onClick={() => {
                    setMessage(false);
                    startTransition(async () => {
                        await incrementProductQuantity(productId);
                        setMessage(true);
                    });
                }}
                className=" flex gap-2 items-center "
            >
                Add to Cart
                {isPending ? (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <IoCartOutline className=" text-lg " />
                )}
            </Button>
            {!isPending && message && (
                <span className=" text-sm text-green-400 ">Added to cart</span>
            )}
        </div>
    );
}
