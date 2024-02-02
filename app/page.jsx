import ProductCard from "@/components/ProductCard";
import { getProducts } from "./action";
import Hero from "@/components/Hero";
import prisma from "@/lib/db";
import { PaginationMenu } from "@/components/PaginationMenu";

export default async function Home({ searchParams: { page = "1" } }) {
    const currentPage = parseInt(page);
    const pageSize = 10;
    const totalItemsCount = await prisma.product.count();
    const totalPages = Math.ceil(totalItemsCount / pageSize);
    const { products, message } = await getProducts({ currentPage, pageSize });
    return (
        <main className="py-[3rem] lg:py-[5rem]">
            <div className=" container ">
                <Hero products={products} />
                {products == 0 && <p> No products in the database </p>}
                <h2 className="mb-[3rem] scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Featured Products
                </h2>
                <div className=" grid grid-cols-grids gap-8  ">
                    {products ? (
                        products.map((item) => (
                            <ProductCard
                                key={item.id}
                                image={item.imageUrl}
                                title={item.name}
                                price={item.price}
                                id={item.id}
                            />
                        ))
                    ) : (
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            {message}
                        </h3>
                    )}
                </div>
                <div className=" my-[7rem] ">
                    {totalPages > 1 && (
                        <PaginationMenu
                            level="product"
                            currentPage={currentPage}
                            totalPages={totalPages}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}
