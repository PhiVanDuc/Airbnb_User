"use client"

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { cn } from "@/lib/utils";

export default function Quantity({ quantities, setQuantities, clear, setClear }) {
    useEffect(() => {
        if (clear?.quantity) {
            setQuantities({
                guests: 1,
                bedrooms: 1,
                beds: 1,
                bathrooms: 1
            });

            setClear({
                ...clear,
                quantity: false
            });
        }
    }, [clear]);

    const handleIncrease = (name, quantity) => {
        setQuantities(old => {
            const newOne = {...old}; 
            newOne[name] = quantity + 1;

            return newOne;
        });
    }

    const handleDecrease = (name, quantity) => {
        if (quantity <= 1) return;

        setQuantities(old => {
            const newOne = {...old}; 
            newOne[name] = quantity - 1;

            return newOne;
        });
    }

    return (
        <div>
            {
                Object.entries(quantities).map(quantity => {
                    return (
                        <div
                            key={quantity}
                            className="flex justify-between py-[20px]"
                        >
                            <h3 className="text-[14px] md:text-[16px]">
                                {quantity[0].charAt(0).toUpperCase() + quantity[0].slice(1)}
                            </h3>

                            <div className="flex items-center gap-x-[10px]">
                                <span 
                                    className={cn(
                                        "group flex items-center justify-center w-[30px] h-[30px] rounded-full border border-slate-500 cursor-pointer hover:border-black",
                                        quantity[1] <= 1 && "border-slate-200 hover:border-slate-200 cursor-not-allowed"
                                    )}
                                    onClick={() => {handleDecrease(quantity[0], quantity[1])}}
                                >
                                    <FaMinus size={10} className="text-slate-500 group-hover:text-black" />
                                </span>

                                <p className="w-[20px] text-center">{quantity[1]}</p>

                                <span 
                                    className="group flex items-center justify-center w-[30px] h-[30px] rounded-full border border-slate-500 cursor-pointer hover:border-black"
                                    onClick={() => {handleIncrease(quantity[0], quantity[1])}}
                                >
                                    <FaPlus size={10} className="text-slate-500 group-hover:text-black" />
                                </span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}