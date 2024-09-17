"use client"

import { createContext, useContext, useState } from "react";

const ConversationsContext = createContext();

export const useConversationsContext = () => {
    return useContext(ConversationsContext);
};

export default function ConversationsProvider({ children }) {
    const [listConversations, setListConversations] = useState([]);

    return (
        <ConversationsContext.Provider value={{ listConversations, setListConversations }}>
            {children}
        </ConversationsContext.Provider>
    )
}
