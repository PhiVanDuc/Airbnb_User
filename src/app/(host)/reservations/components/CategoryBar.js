"use client"

import { useContext } from "react";
import { ReservationContext } from "./ReservationProvider";
import { cn } from "@/lib/utils";

export default function CategoryBar() {
    const { reservationCategory, setReservationCategory } = useContext(ReservationContext);

    const handleChoose = (category) => {
        setReservationCategory(category);
    }

    return (
        <div className="flex items-start gap-x-[10px] pb-[10px] overflow-x-auto custom-scrollbar">
            <div 
                className={cn(
                    "flex items-center justify-center rounded-full px-[20px] py-[8px] border border-neutral-300 text-[14px] hover:border-neutral-500 transition-all cursor-pointer shrink-0",
                    reservationCategory === "Upcoming" ? "border-neutral-500 bg-neutral-50" : ""
                )}
                onClick={() => { handleChoose("Upcoming") }}
            >
                <p>Upcoming</p>
            </div>

            <div 
                className={cn(
                    "flex items-center justify-center rounded-full px-[20px] py-[8px] border border-neutral-300 text-[14px] hover:border-neutral-500 transition-all cursor-pointer shrink-0",
                    reservationCategory === "Arriving soon" ? "border-neutral-500 bg-neutral-50" : ""
                )}
                onClick={() => { handleChoose("Arriving soon") }}
            >
                <p>Arriving soon</p>
            </div>

            <div 
                className={cn(
                    "flex items-center justify-center rounded-full px-[20px] py-[8px] border border-neutral-300 text-[14px] hover:border-neutral-500 transition-all cursor-pointer shrink-0",
                    reservationCategory === "Currently hosting" ? "border-neutral-500 bg-neutral-50" : ""
                )}
                onClick={() => { handleChoose("Currently hosting") }}
            >
                <p>Currently hosting</p>
            </div>

            <div 
                className={cn(
                    "flex items-center justify-center rounded-full px-[20px] py-[8px] border border-neutral-300 text-[14px] hover:border-neutral-500 transition-all cursor-pointer shrink-0",
                    reservationCategory === "Checking out" ? "border-neutral-500 bg-neutral-50" : ""
                )}
                onClick={() => { handleChoose("Checking out") }}
            >
                <p>Checking out</p>
            </div>
        </div>
    )
}