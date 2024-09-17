"use client"

import { createContext, useContext, useState } from "react";

const PropertiesInfoContext = createContext();

export const usePropertiesInfoContext = () => {
    return useContext(PropertiesInfoContext);
}

export default function PropertiesInfoProvider({ children }) {
    const [propertiesInfo, setPropertiesInfo] = useState([]);

    return (
        <PropertiesInfoContext.Provider value={{ propertiesInfo, setPropertiesInfo }}>
            { children }
        </PropertiesInfoContext.Provider>
    )
}
