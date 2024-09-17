"use client"

import { createContext, useState } from "react";

export const ReservationContext = createContext();

export default function ReservationProvider({ children }) {
    const [reservationCategory, setReservationCategory] = useState("Upcoming");

    return (
        <ReservationContext.Provider value={{ reservationCategory, setReservationCategory }}>
            { children }
        </ReservationContext.Provider>
    )
}
