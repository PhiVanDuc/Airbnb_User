"use client"

import { createContext, useContext, useState } from "react";

export const TokenContext = createContext();

export const useTokenContext = () => {
    return useContext(TokenContext);
}

export default function TokenProvider({ children, tokens }) {
    const [allTokens, setTokens] = useState(tokens);

    return (
        <TokenContext.Provider value={{ allTokens, setTokens }}>
            { children }
        </TokenContext.Provider>
    )
}