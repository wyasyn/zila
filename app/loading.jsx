import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function loading() {
    return (
        <div className=" h-screen grid place-items-center ">
            <div className=" text-3xl animate-spin ">
                <AiOutlineLoading3Quarters />
            </div>
        </div>
    );
}
