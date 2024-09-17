"use client"

import { createContext, useState } from "react";

export const DateRangeContext = createContext();

export default function DateRangeProvider({ children }) {
    const [selectionRange, setSelectionRange] = useState({
        dates: {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        },
        detail: {
            nights: 0,
            total: 0,
        }
    });

    return (
        <DateRangeContext.Provider value={{ selectionRange, setSelectionRange }}>
            {children}
        </DateRangeContext.Provider>
    )
}