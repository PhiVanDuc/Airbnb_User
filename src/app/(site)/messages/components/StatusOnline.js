"use client"

import { useEffect, useState } from "react";
import { useSocketContext } from "@/context/SocketProvider";
import { binarySearch } from "@/utils/binarySearch";

export default function StatusOnline({ partner_id }) {
    const socket = useSocketContext();
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        const { onlineUsers } = socket;
        const found = binarySearch(onlineUsers, partner_id);
        
        if (found !== -1) setIsOnline(true);
        else setIsOnline(false)
    }, [socket]);

    return (
        <>
            {
                isOnline && <span className="absolute top-[5px] right-0 block w-[10px] h-[10px] bg-green-500 rounded-full outline outline-[3px] outline-white"></span>
            }
        </>
    )
}
