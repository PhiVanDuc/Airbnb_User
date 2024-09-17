"use client"

import { useContext } from "react";
import { TokenContext } from "@/context/TokenProvider";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { LuTrash } from "react-icons/lu";
import { toast } from "sonner";

import { delete_property_action } from "@/actions/property";
import clientRefresh from "@/utils/clientRefresh";

export default function ButtonProperty({ id, create_complete }) {
    const router = useRouter();
    const { setTokens } = useContext(TokenContext);

    const handleEdit = () => {
        // if (!create_complete) router.push(`/become-a-host/${id}`);
        // else router.push(`hosting/editor/${id}/photo-tour`);

        router.push(`/become-a-host/${id}`);
    }

    const handleDelete = async () => {
        const refresh = await clientRefresh({
            router,
            setTokens
        });

        const resultDelete = await delete_property_action({id}, refresh?.accessToken);
        if (resultDelete === 401) {
            router.replace("/sign-out");
            return;
        }
        
        if (resultDelete.success) toast.success(`${resultDelete.message}`);
        else toast.error(`${resultDelete.message}`);
    }

    return (
        <div className="flex flex-col gap-y-[10px]">
            <Button
                className="h-[50px] text-[16px] font-medium"
                onClick={handleEdit}
            >
                Edit listing
            </Button>

            <Button
                variant="ghost"
                className="h-[50px] space-x-[10px]"
                onClick={handleDelete}
            >
                <LuTrash size={20} />

                <p className="text-[16px] font-medium ">Remove listing</p>
            </Button>
        </div>
    )
}