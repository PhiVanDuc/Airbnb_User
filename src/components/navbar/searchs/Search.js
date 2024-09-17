"use client"

import { useState } from "react";

import SearchDetail from "./SearchDetail";
import { IoSearch } from "react-icons/io5";

export default function Search() {
    const [isExpand, setIsExpand] = useState(false);

    return (
        <div
            className="w-full lg:w-fit"
            onClick={() => { setIsExpand(true) }}
        >
            <div 
                className="hidden lg:flex items-center py-[5px] px-[8px] border-[1px] border-slate-300 rounded-full text-sm font-medium shadow-md cursor-pointer"
            >
                <div className="px-[15px]">Anywhere</div>
                <div className="px-[15px] border-x-[1px] border-slate-300">Any Week</div>
                <div className="px-[15px]">Any Quantity</div>
                <div className="w-[35px] h-[35px] bg-rootColor rounded-full flex justify-center items-center">
                    <IoSearch size={20} className="text-white" />
                </div>
            </div>

            <div className="flex lg:hidden gap-x-[20px] items-center py-[5px] px-[20px] rounded-full border-[1px] border-slate-300 w-full cursor-pointer">
                <IoSearch size={24} className="shrink-0" />

                <div className="space-y-[2px] truncate">
                    <p className="text-[14px] font-medium">Where to?</p>
                    <p className="text-[12px] text-neutral-400 truncate">Anywhere - Any weak - Any quantity</p>
                </div>
            </div>

            <SearchDetail isExpand={isExpand} setIsExpand={setIsExpand} />
        </div>
    )
}