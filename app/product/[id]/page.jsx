import { getProductDetails, incrementProductQuantity } from "@/app/action";
import notFound from "@/app/not-found";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { cache } from "react";
import AddToCartBtn from "./AddToCartBtn";

const getProduct = cache(async (id) => {
    const { product } = await getProductDetails(id);
    if (!product) notFound();
    return product;
});

export async function generateMetadata({ params: { id } }) {
    const product = await getProduct(id);
    return {
        title: product.name + " - Zila",
        description: product.description,
        // openGraph: {
        //     images: [{ url: product.imageUrl }],
        // },
    };
}

export default async function page({ params: { id } }) {
    const product = await getProduct(id);

    return (
        <main>
            <div className="container">
                {product && (
                    <div className="py-[5rem] lg:py-[7rem] flex flex-col gap-[3rem] lg:gap-[5rem] lg:flex-row ">
                        <div className=" w-full ">
                            <div className=" aspect-[5/6] rounded-lg overflow-clip max-w-[600px] w-full ">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    width={800}
                                    height={400}
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className=" w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className=" w-full ">
                            <Badge variant="outline">{product.category}</Badge>
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl capitalize">
                                {product.name}
                            </h1>
                            <p className="leading-7 [&:not(:first-child)]:mt-6">
                                {product.description}
                            </p>
                            <p className=" mt-[3rem] text-xl text-muted-foreground">
                                Price: UGX {product.price}
                            </p>
                            <AddToCartBtn
                                productId={product.id}
                                incrementProductQuantity={
                                    incrementProductQuantity
                                }
                            />
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
