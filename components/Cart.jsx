"use client";
import { IoCartOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";

export default function Cart({ cart }) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div className=" text-lg relative ">
                <Button
                    variant="ghost"
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    <IoCartOutline className=" text-lg " />
                </Button>

                <small className=" absolute top-[-0.5rem] right-[0.5rem] text-sm">
                    {cart?.size || 0}
                </small>
                {open && (
                    <div className=" flex flex-col gap-2 absolute bottom-[-8rem] p-2 bg-background border rounded-md min-w-[150px]">
                        <div className="text-lg font-semibold">
                            {cart?.size || 0} items
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Subtotal: {cart?.subtotal || 0}
                        </p>
                        <Link href="/cart" className=" w-full ">
                            <Button
                                className=" w-full "
                                size="sm"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                View Cart
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
