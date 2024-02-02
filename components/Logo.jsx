import White from "@/components/images/white.png";
import Black from "@/components/images/black.png";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className=" flex items-center gap-3 ">
            <Image
                src={Black}
                height={40}
                width="auto"
                alt="logo"
                priority
                className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
            <Image
                src={White}
                height={40}
                width="auto"
                alt="logo"
                priority
                className=" rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
            <blockquote className="text-primary italic">
                Shop Smart, Live Stylish!
            </blockquote>
        </Link>
    );
}
