"use client"

import { useEffect } from "react";
import { useSocketContext } from "@/context/SocketProvider";

const useListenListConversations = (list, setList) => {
    const { socket } = useSocketContext();

    useEffect(() => {
        socket?.on("update_conversations", (conversation) => {
            if (list?.length === 0) {
                setList([conversation]);
                return;
            }

            const filterList = list.filter(item => item?.conversation?.id !== conversation?.conversation?.id) || [];
            setList([conversation, ...filterList]);
        });
    }, [socket, list, setList]);
}

export default useListenListConversations;