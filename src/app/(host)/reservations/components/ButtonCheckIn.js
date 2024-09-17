"use client"

import { useContext } from "react";
import { TokenContext } from "@/context/TokenProvider";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import clientRefresh from "@/utils/clientRefresh";
import { check_in_reservation_action } from "@/actions/reservation";
import { cn } from "@/lib/utils";

export default function ButtonCheckIn({ className, reservation_id, check_in, list, setList }) {
    const { setTokens } = useContext(TokenContext);
    const router = useRouter();

        const handleCheckIn = async () => {
            const refresh = await clientRefresh({
                router,
                setTokens
            });

            const result = await check_in_reservation_action({
                reservation_id,
                check_in,
                service_fee_percent: 15
            }, refresh?.accessToken);
            if (result === 401) {
                router.replace("/sign-out");
                return;
            }
            else if (!result?.success) {
                toast.error(result?.message);
                return;
            } else {
                setList(oldList => oldList.filter(item => item.id !== reservation_id));
                toast.success(result?.message);
            }
        }

    return (
        <Button
            className={cn(
                "bg-rootColor font-semibold",
                className
            )}
            onClick={handleCheckIn}
        >
            Check in
        </Button>
    )
}
