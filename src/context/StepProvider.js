"use client"

import { createContext, useState } from "react";

export const StepContext = createContext();

export default function StepProvider({ children }) {
    const [stepContext, setStepContext] = useState({});

    return (
        <StepContext.Provider value={{ stepContext, setStepContext }}>
            {children}
        </StepContext.Provider>
    )
}