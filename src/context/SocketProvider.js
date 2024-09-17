"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { TokenContext } from "./TokenProvider";
import io from "socket.io-client";
import { decode_token } from "@/actions/token";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export default function SocketProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { allTokens } = useContext(TokenContext);

    useEffect(() => {
        const initializeSocket = async () => {
            if (allTokens?.access_token && allTokens?.refresh_token) {
                const decode = await decode_token(allTokens.access_token);
                if (!decode?.success) return;
                
                const newSocket = io(process.env.NEXT_PUBLIC_API_SERVER, {
                    query: {
                        user_id: decode.decode.user_id
                    }
                });
                
                setSocket(newSocket);
    
                newSocket.on("getOnlineUsers", (users) => {
                    setOnlineUsers(users);
                });

                newSocket.emit("message_notifications", decode.decode.user_id);

                newSocket.on("disconnect", () => {
                    setSocket(null);
                    setOnlineUsers([]);
                });

                return () => {
                    newSocket.close();
                };
            } else if (socket) {
                socket.close();
                setSocket(null);
            }
        };

        initializeSocket();

    }, [allTokens?.access_token, allTokens?.refresh_token]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
}