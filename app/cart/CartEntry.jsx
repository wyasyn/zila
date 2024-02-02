"use client";

import Image from "next/image";
import Link from "next/link";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function CartEntry({
    cartItem: { product, quantity },
    setProductQuantity,
}) {
    const [isPending, setIsPending] = useState(false);
    const quantityOptions = [];
    for (let i = 1; i <= 99; i++) {
        quantityOptions.push(
            <SelectItem value={i} key={i}>
                {i}
            </SelectItem>
        );
    }

    async function onSubmit(value) {
        const newQuantity = parseInt(value);

        try {
            setIsPending(true);

            await setProductQuantity(product.id, newQuantity);
        } catch (e) {
            console.log(e);
        } finally {
            setIsPending(false);
        }
    }
    return (
        <div>
            <div className=" flex flex-wrap items-center gap-[5rem] ">
                <div className=" w-[200px] aspect-[4/5] overflow-clip rounded-lg ">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div>
                    <Link
                        href={`/product/${product.id}`}
                        className=" font-semibold capitalize "
                    >
                        {product.name}
                    </Link>
                    <div>Price: {product.price}</div>
                    <div className=" my-4 flex items-center gap-3 ">
                        <Select onValueChange={onSubmit}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={quantity} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value={0}>Remove</SelectItem>
                                    {quantityOptions}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className=" flex items-center gap-3 ">
                        Total: {product.price * quantity}
                        {isPending && (
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        )}
                    </div>
                </div>
            </div>
            <div className="my-8 w-full h-[1px] bg-border rounded-lg " />
        </div>
    );
}
