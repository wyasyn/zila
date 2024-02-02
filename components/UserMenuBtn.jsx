import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import userAvator from "@/components/images/user.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SignOut from "./SignOut";
import SignIn from "./SignIn";
import { HiMenuAlt4 } from "react-icons/hi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "./ui/button";

export default async function UserMenuBtn() {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {user ? (
                    <Avatar>
                        <AvatarImage
                            src={user?.image || userAvator}
                            alt="profile pic"
                        />
                        <AvatarFallback>YW</AvatarFallback>
                    </Avatar>
                ) : (
                    <Button variant="ghost">
                        <HiMenuAlt4 />
                    </Button>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                    {user ? <SignOut /> : <SignIn />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
