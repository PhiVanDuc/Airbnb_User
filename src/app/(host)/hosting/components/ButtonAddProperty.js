"use client"

import { useContext } from "react";
import { TokenContext } from "@/context/TokenProvider";
import { useRouter } from "next/navigation";

import { GoPlus } from "react-icons/go";
import { toast } from "sonner";

import { create_property_action } from "@/actions/property";
import clientRefresh from "@/utils/clientRefresh";

export default function ButtonAddProperty() {
    const router = useRouter();
    const { setTokens } = useContext(TokenContext);

    const handleClick = async () => {
        const refresh = await clientRefresh({
            router,
            setTokens
        });
        
        const result = await create_property_action({
            user_id: refresh?.decode?.decode?.user_id
        });

        if (result === 401) {
            router.replace("/sign-out");
            return;
        }
        else if (!result.success) {
            toast.error(result.message);
            return;
        }
        
        router.push(`/become-a-host/${result.resultCreate.id}/about-your-place`);
    }

    return (
        <div
            className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-slate-100 shadow-md cursor-pointer"
            onClick={handleClick}
        >
            <GoPlus size={25} />
        </div>
    )
}