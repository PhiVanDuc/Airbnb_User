"use client"

import { useContext } from "react";
import { TokenContext } from "@/context/TokenProvider";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import clientRefresh from "@/utils/clientRefresh";
import { cancel_reservation_action } from "@/actions/reservation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ButtonCancel({ className, reservation_id, payment_intent_id, status, total, list, setList }) {
    const { setTokens } = useContext(TokenContext);
    const router = useRouter();

    const handleCancel = async () => {
        const refresh = await clientRefresh({
            router,
            setTokens
        });

        const cancel = await cancel_reservation_action({
            reservation_id,
            payment_intent_id,
            status,
            total
        }, refresh?.accessToken);
        if (cancel === 401) {
            router.replace("/sign-out");
            return;
        }
        else if (!cancel?.success) {
            toast.error(cancel?.message);
            return;
        }

        toast.success(cancel?.message);
        
        const updatedList = list.filter(item => item?.id !== reservation_id);
        setList(updatedList);
    }

    return (
        <Button
            className={cn(
                "font-semibold w-full",
                className
            )}
            variant="ghost"
            onClick={handleCancel}
        >
            Cancel
        </Button>
    )
}
