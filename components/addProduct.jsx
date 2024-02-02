"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
    name: z.string().min(3, {
        message: "Product name must be at least 3 characters.",
    }),
    category: z.string().min(3, {
        message: "Category must be at least 3 characters.",
    }),
    description: z.string().min(7, {
        message: "Description must be at least 7 characters.",
    }),
    url: z.string().url(),
    price: z.coerce.number(),
});

export default function AddProductPage({ addProduct }) {
    const [pending, setPending] = useState(false);
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            url: "",
            price: 0,
            category: "",
        },
    });

    async function onSubmit(values) {
        try {
            setPending(true);

            const { message, error } = await addProduct(values);

            if (error) {
                // Handle specific error cases if needed

                throw new Error(error);
            }

            toast({
                description: message,
            });
            console.log(message);
            router.refresh();
        } catch (error) {
            // Extract the error message

            const errorMessage =
                error instanceof Error ? error.message : "An error occurred";

            toast({
                description: errorMessage,
            });
        } finally {
            setPending(false);
        }
    }

    return (
        <main>
            <div className="container py-[5rem] md:py-[7rem]">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Add Product
                </h2>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 max-w-md w-full mt-[5rem]"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Product name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Product image url"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Product category"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Product description"
                                            rows="10"
                                            {...field}
                                            className=" resize-none "
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={pending}
                            size="sm"
                            type="submit"
                            className=" w-full "
                        >
                            {pending && (
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Add Product
                        </Button>
                    </form>
                </Form>
            </div>
        </main>
    );
}
