"use client"

import { useEffect, useState } from "react";

import Country from "./Country";

import { cn } from "@/lib/utils"
import Calendar from "./Calendar";
import Quantity from "./Quantity";
import { Button } from "@/components/ui/button";

export default function SearchDetail({ isExpand, setIsExpand }) {
    const [chooseType, setChooseType] = useState("calendar");
    const [clear, setClear] = useState({
        country: false,
        calendar: false,
        quantity: false,
    });

    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ]);

    const [quantities, setQuantities] = useState({
        guests: 1,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1
    });

    useEffect(() => {
        const SearchExpand = document.querySelector(".search_expand");
        const Overlay = document.querySelector(".search_expand_overlay");

        let timeout;
        if (!isExpand && SearchExpand) {
            timeout = setTimeout(() => {
                if (SearchExpand.style) {
                    SearchExpand.style.visibility = "hidden";
                    Overlay.style.cursor = "auto";
                }
            }, 300);
        }
        else if (isExpand && SearchExpand) {
            if (SearchExpand.style) {
                SearchExpand.style.visibility = "visible";
                Overlay.style.cursor = "pointer";
            }
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        }
    }, [isExpand]);

    const handleClose = (event) => {
        event.stopPropagation();
        setIsExpand(false);
    }

    const handleChooseType = (type) => {
        setChooseType(type);
    } 

    return (
        <div
            className={cn(
                "search_expand fixed inset-0 overflow-y-auto z-10 transition",
                isExpand ? "opacity-100" : "opacity-0"
            )}
        >
            <div
                className="search_expand_overlay absolute inset-0 bg-slate-800/30 z-20"
                onClick={handleClose}
            ></div>

            <div className={cn(
                    "absolute top-0 left-0 right-0 z-30 flex justify-center px-[24px] md:px-[80px] py-[30px] bg-white shadow-md transition",
                    isExpand ? "translate-y-0" : "translate-y-[-100%]"
                )}
            >
                <div className="w-[650px] max-w-[650px] space-y-[30px]">
                    <Country clear={clear} setClear={setClear} />

                    <div className="space-y-[15px]">
                        <div className="flex items-start gap-x-[10px]">
                            <div
                                className={cn(
                                    "group relative px-[15px] py-[5px] cursor-pointer hover:bg-slate-50 rounded-[5px] text-[14px] md:text-[16px]",
                                    chooseType === "calendar" ? "font-medium" : ""
                                )}
                                onClick={() => { handleChooseType("calendar") }}
                            >
                                Calendar
                                <span className={cn(
                                    "absolute bottom-[-2px] left-0 right-0 h-[2px]  rounded-full",
                                    chooseType === "calendar" ? "bg-slate-700" : "group-hover:bg-slate-300"
                                )}></span>
                            </div>
                            
                            <div
                                className={cn(
                                    "group relative px-[15px] py-[5px] cursor-pointer hover:bg-slate-50 rounded-[5px] text-[14px] md:text-[16px]",
                                    chooseType === "quantity" ? "font-medium" : ""
                                )}
                                onClick={() => { handleChooseType("quantity") }}
                            >
                                Quantity
                                <span className={cn(
                                    "absolute bottom-[-2px] left-0 right-0 h-[2px]  rounded-full",
                                    chooseType === "quantity" ? "bg-slate-700" : "group-hover:bg-slate-300"
                                )}></span>
                            </div>
                        </div>

                        {
                            chooseType === "calendar" ?
                            <Calendar dates={dates} setDates={setDates} clear={clear} setClear={setClear} /> :
                            <Quantity quantities={quantities} setQuantities={setQuantities} clear={clear} setClear={setClear} />
                        }
                    </div>

                    <div className="flex justify-between">
                        <Button
                            variant="ghost"
                            className="font-medium text-[14px]"
                            onClick={() => {
                                setClear({
                                    country: true,
                                    calendar: true,
                                    quantity: true
                                });
                            }}
                        >
                            Clear
                        </Button>

                        <div className="flex gap-x-[5px]">
                            <Button
                                variant="outline"
                                onClick={handleClose}
                                className="font-medium text-[14px]"
                            >
                                Close
                            </Button>
                            <Button className="bg-rootColor hover:bg-rootColor w-[100px] md:w-[150px] hover:bg-rootColor/90 font-medium text-[14px]">Search</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}