"use client"

import { createContext, useContext, useState } from "react";

const MessagesContext = createContext();

export const useMessagesContext = () => {
    return useContext(MessagesContext);
};

export default function MessagesProvider({ children }) {
    const [listMessages, setListMessages] = useState([]);

    return (
        <MessagesContext.Provider value={{ listMessages, setListMessages }}>
            {children}
        </MessagesContext.Provider>
    )
}
