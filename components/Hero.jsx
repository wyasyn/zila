"use client";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export default function Hero({ products }) {
    return (
        <Carousel
            className="w-full mb-[5rem]"
            plugins={[
                Autoplay({
                    delay: 2000,
                }),
            ]}
        >
            <CarouselContent className="-ml-1">
                {products.map((item) => (
                    <CarouselItem
                        className="pl-1 md:basis-1/2 lg:basis-1/3"
                        key={item.id}
                    >
                        <div className="w-full h-full aspect-[5/6] rounded-lg overflow-clip ">
                            <Link
                                href={`/product/${item.id}`}
                                className="w-full h-full"
                            >
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    width={600}
                                    height={800}
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className=" w-full h-full object-cover"
                                />
                            </Link>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
