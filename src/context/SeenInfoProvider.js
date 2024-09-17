"use client"

import { useState, useContext, createContext } from "react";

const SeenInfoContext = createContext();

export const useSeenInfoContext = () => {
    return useContext(SeenInfoContext);
}

export default function SeenInfoProvider({ children }) {
    const [seenInfo, setSeenInfo] = useState({});
        
    return (
        <SeenInfoContext.Provider value={{ seenInfo, setSeenInfo }}>
            {children}
        </SeenInfoContext.Provider>
    );
}