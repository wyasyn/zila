import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db";

export function generateMetadata({ searchParams: { query } }) {
    return {
        title: `Search: ${query} - zila`,
    };
}

export default async function page({ searchParams: { query } }) {
    const products = await prisma.product.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: query,
                        mode: "insensitive",
                    },
                },
                {
                    description: {
                        contains: query,
                        mode: "insensitive",
                    },
                },
            ],
        },
        orderBy: {
            id: "desc",
        },
    });
    if (products.length === 0) {
        return (
            <div className=" container h-screen grid place-items-center ">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    No products found
                </h1>
            </div>
        );
    }
    return (
        <div className=" container ">
            <div className=" grid grid-cols-grids gap-8  mt-[7rem] mb-[5rem]">
                {products.map((item) => (
                    <ProductCard
                        key={item.id}
                        image={item.imageUrl}
                        title={item.name}
                        price={item.price}
                        id={item.id}
                    />
                ))}
            </div>
        </div>
    );
}
