"use client"

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { FaMap } from "react-icons/fa6";
import { FaListUl } from "react-icons/fa6";

export default function ButtonShowMap({ open, setOpen, searchParams }) {
    const pathname = usePathname(); 

    return (
        <div
            className={cn(
                "fixed left-[50%] translate-x-[-50%] bottom-[100px] lg:bottom-[50px] z-[2] flex items-center gap-x-[10px] px-[20px] py-[10px] rounded-full bg-black cursor-pointer",
                ((pathname === "/" || pathname === "/homes") && searchParams.get("category_id")) ? "" : "hidden"
            )}
            onClick={() => { setOpen(!open) }}
        >
            <p className="text-[14px] font-medium text-white">
                {
                    !open ? "Show map" : "Show list"
                }
            </p>
            
            {
                !open ?
                <FaMap size={15} className="text-white" /> :
                <FaListUl size={15} className="text-white" />
            }
        </div>
    )
}
