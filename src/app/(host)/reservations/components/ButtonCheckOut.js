"use client"

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { TokenContext } from "@/context/TokenProvider";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import clientRefresh from "@/utils/clientRefresh";
import { check_out_reservation_action } from "@/actions/reservation";

export default function ButtonCheckOut({ className, reservation_id, check_out, list, setList }) {
    const router = useRouter();
    const { setTokens } = useContext(TokenContext);

    const handleCheckOut = async () => {
        const refresh = await clientRefresh({
            router,
            setTokens
        });

        const checkoutResult = await check_out_reservation_action({
            reservation_id,
            check_out
        }, refresh?.accessToken);
        if (checkoutResult === 401) {
            router.replace('/sign-out');
            return;
        }
        else if (!checkoutResult?.success) {
            toast.error(checkoutResult?.message);
            return;
        }
        else {
            setList(oldList => oldList.filter(item => item.id !== reservation_id));
            toast.success(checkoutResult?.message);
        }
    }

    return (
        <Button
            className={cn(
                "bg-rootColor font-semibold",
                className
            )}
            onClick={handleCheckOut}
        >
            Check out
        </Button>
    )
}
