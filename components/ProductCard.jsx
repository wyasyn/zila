import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ image, title, price, id }) {
    return (
        <Link
            href={`/product/${id}`}
            className=" hover:border p-2 rounded-lg transition-all hover:shadow-md"
        >
            <div className=" aspect-[5/6] rounded-lg overflow-clip ">
                <Image
                    src={image}
                    alt={title}
                    width={600}
                    height={800}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className=" w-full h-full object-cover"
                />
            </div>
            <div className=" mt-2 ">
                <small className="text-sm font-medium leading-none capitalize">
                    {title}
                </small>
                <p className="text-sm text-muted-foreground">UGX {price}</p>
            </div>
        </Link>
    );
}
