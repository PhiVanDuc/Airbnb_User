"use client"

import { useEffect } from "react";
import { useSocketContext } from "@/context/SocketProvider";
import { useConversationsContext } from "@/context/ConversationsProvider";
import clientRefresh from "@/utils/clientRefresh";
import { useTokenContext } from "@/context/TokenProvider";
import { useRouter } from "next/navigation";
import { mark_read_messages_action } from "@/actions/chat";
import { toast } from "sonner";

const useListenContent = (listMessages, setListMessages, conversation_id, infoUser) => {
    const router = useRouter();
    const { socket } = useSocketContext();
    const { listConversations, setListConversations } = useConversationsContext();
    const { setTokens } = useTokenContext();

    useEffect(() => {
        socket?.on("create_message", (message) => {
            const { message: mess } = message;

            if (mess?.conversation_id === conversation_id) {
                if (listMessages?.length === 0) setListMessages([mess]);
                else setListMessages([...listMessages, mess]);
            }
        });

        if (infoUser?.id) {
            socket?.on("update_conversations", async (conversation) => {
                const { conversation: con } = conversation;
    
                if (con?.id === conversation_id && con?.messages[0]?.sender_id !== infoUser?.id && !con?.messages[0]?.seen_id) {
                    const refresh = await clientRefresh({
                        router,
                        setTokens
                    });
    
                    const mark = await mark_read_messages_action({
                        conversation_id,
                        sender_id: con?.messages[0]?.sender_id,
                        reciver_id: infoUser?.id,
                    }, refresh?.accessToken);
                    if (mark === 401) {
                        router.replace(process.env.NEXT_PUBLIC_SIGN_OUT);
                        return;
                    }
                    else if (!mark?.success) {
                        toast?.error(mark?.message);
                        return;
                    }
                } else if (con?.id === conversation_id && con?.messages[0]?.sender_id === infoUser?.id && con?.messages[0]?.seen_id) {
                    setListMessages(old => {
                        const newArr = [...old];
                        newArr?.pop();
                        newArr.push(con?.messages?.[0]);
                        return newArr;
                    })
                }
            });
        }
    }, [socket, listMessages, setListMessages, listConversations, setListConversations]);
}

export default useListenContent;