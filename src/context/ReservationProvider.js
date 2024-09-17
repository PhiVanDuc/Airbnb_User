"use client"

import { createContext, useState } from "react";

export const ReservationContext = createContext();

export default function ReservationProvider({ children }) {
    const [reservationInfo, setReservationInfo] = useState({});

    return (
        <ReservationContext.Provider value={{ reservationInfo, setReservationInfo }}>
            { children }
        </ReservationContext.Provider>
    )
}
