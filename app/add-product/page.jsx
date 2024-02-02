import AddProductPage from "@/components/addProduct";
import { addProduct } from "../action";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function page() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/add-product");
    }
    return (
        <>
            <AddProductPage addProduct={addProduct} />
        </>
    );
}
