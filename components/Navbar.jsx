import Logo from "./Logo";
import { ModeToggle } from "./ToggleBtn";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CiSearch } from "react-icons/ci";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/cart";
import Cart from "./Cart";
import UserMenuBtn from "./UserMenuBtn";

async function searchProducts(formData) {
    "use server";
    const searchQuery = formData.get("searchQuery");
    if (searchQuery) {
        redirect(`/search?query=${searchQuery}`);
    }
}

export default async function Navbar() {
    const cart = await getCart();
    return (
        <header className=" sticky top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-sm py-[1rem] border-b ">
            <nav className="container flex lg:flex-row flex-col items-center lg:justify-between gap-8">
                <Logo />
                <form
                    className="flex w-full max-w-sm items-center space-x-2"
                    action={searchProducts}
                >
                    <Input
                        type="search"
                        name="searchQuery"
                        placeholder="Search"
                    />
                    <Button size="sm" type="submit">
                        <CiSearch /> <span className=" sr-only "> search </span>{" "}
                    </Button>
                </form>

                <div className=" flex items-center gap-[2rem] lg:ml-auto">
                    <UserMenuBtn />
                    <div className=" flex items-center">
                        <Cart cart={cart} />
                    </div>
                    <ModeToggle />
                </div>
            </nav>
        </header>
    );
}
