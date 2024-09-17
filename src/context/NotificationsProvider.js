"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { useSocketContext } from "./SocketProvider";

const NotificationsContext = createContext();

export const useNotificationsContext = () => {
    return useContext(NotificationsContext);
}

export default function NotificationsProvider({ children }) {
    const { socket } = useSocketContext();
    const [notifications, setNotifications] = useState({});

    useEffect(() => {
        socket?.on("send_message_notifications", (numberNotifications) => {
            setNotifications({
                messages: numberNotifications,
            });
        });
    }, [socket]);

    return (
        <NotificationsContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </NotificationsContext.Provider>
    );
}