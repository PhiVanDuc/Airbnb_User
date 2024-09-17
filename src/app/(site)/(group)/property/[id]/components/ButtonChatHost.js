"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTokenContext } from "@/context/TokenProvider";

import check_info_user from "@/actions/ReuseTasks/user/check_info_user";
import { create_coversation_action } from "@/actions/chat";
import clientRefresh from "@/utils/clientRefresh";
import { toast } from "sonner";

export default function ButtonChatHost({ host_id }) {
    const router = useRouter();
    const { allTokens, setTokens } = useTokenContext();
    const [infoUser, setInfoUser] = useState({});

    useEffect(() => {
        (async () => {
            await check_info_user({
                allTokens,
                setTokens,
                router,
                setState: setInfoUser
            });
        })();
    }, []);

    const handleChatHost = async () => {
        const refresh = await clientRefresh({
            router,
            setTokens
        });
        
        const createConversation = await create_coversation_action({
            user_id: infoUser?.id,
            partner_id: host_id
        }, refresh?.accessToken);
        if (createConversation === 401) {
            router.replace(process.env.NEXT_PUBLIC_SIGN_OUT);
            return;
        }
        else if (!createConversation?.success) {
            toast.error(createConversation?.message);
            return;
        }
        
        router.push(`/messages?id=${createConversation?.conversation?.id}&partner_id=${host_id}`);        
    }

    return (
        <Button
            className="text-[14px] md:text-[16px]"
            onClick={handleChatHost}
            disabled={infoUser?.id === host_id}
        >
            Chat with host
        </Button>
    )
}
