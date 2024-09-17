"use client"

import { useState, useEffect } from "react";

import { FaRegSquare } from "react-icons/fa";
import { LuMinusCircle } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { FaMinus } from "react-icons/fa6";

import { cn } from "@/lib/utils";

export default function EditorUtilitiesPage() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // useEffect xử lý hiệu ứng transition của map
        const AddUtilities = document.querySelector(".add_utilities");
        const Overlay = document.querySelector(".overlay_add_utilities");

        let timeout;
        if (!open && AddUtilities) {
            timeout = setTimeout(() => {
                AddUtilities.style.visibility = "hidden";
                Overlay.style.cursor = "context-menu";
            }, 500);
        }
        else if (open && AddUtilities) {
            AddUtilities.style.visibility = "visible";
            Overlay.style.cursor = "pointer";
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        }
    }, [open]);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <div className="pb-[40px] space-y-[5px]">
                <div className="flex items-center justify-between">
                    <h3 className="text-[30px] font-semibold">Utilities</h3>
                    <div
                        className="group flex items-center justify-center w-[40px] h-[40px] rounded-full bg-slate-100 cursor-pointer shadow-sm"
                        onClick={handleOpen}
                    >
                        <FiPlus size={25} className="text-slate-400 group-hover:text-slate-500" />
                    </div>
                </div>
                <p className="text-[16px] text-neutral-500 font-medium">You’ve added these to your listing so far.</p>
            </div>

            <div className="space-y-[20px]">
                <div className="flex items-center justify-between text-neutral-700">
                    <div className="flex items-center gap-x-[15px]">
                        <FaRegSquare size={20} />
                        <p className="text-[16px] font-medium">Pool</p>
                    </div>

                    <LuMinusCircle size={25} className="text-neutral-400 hover:text-neutral-600 cursor-pointer transition" />
                </div>
            </div>

            {/* Add utilities */}
            <div className={cn(
                "add_utilities fixed inset-0 transition duration-500",
                open ? "opacity-100" : "opacity-0"
            )}>
                <div
                    className="overlay_add_utilities absolute inset-0 bg-slate-700/20 cursor-pointer"
                    onClick={handleClose}
                ></div>

                <div className={cn(
                    "absolute top-[200px] left-0 right-0 bottom-0 rounded-tr-[50px] rounded-tl-[50px] bg-white p-[40px] overflow-y-auto transition duration-500 space-y-[50px]",
                    open ? "translate-y-0" : "translate-y-[100%]"
                )}>
                    <div className="flex items-center justify-between">
                        <h4 className="text-[22px] font-semibold">Add utilities</h4>
                        <div
                            className="group w-[35px] h-[35px] rounded-full bg-slate-100 flex items-center justify-center cursor-pointer"
                            onClick={handleClose}
                        >
                            <FaMinus size={20} className="text-slate-400 group-hover:text-slate-600" />
                        </div>
                    </div>

                    <div className="space-y-[50px]">
                        <div className="flex items-center gap-x-[10px]">
                            <span className="text-[14px] font-medium text-white px-[30px] py-[8px] rounded-full bg-rootColor cursor-pointer">Standard</span>
                            <span className="text-[14px] font-medium text-neutral-500 px-[30px] py-[8px] rounded-full bg-neutral-100 hover:bg-neutral-200 cursor-pointer transition">Outstanding</span>
                            <span className="text-[14px] font-medium text-neutral-500 px-[30px] py-[8px] rounded-full bg-neutral-100 hover:bg-neutral-200 cursor-pointer transition">Safety</span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-[20px]">
                            <div className="flex items-center gap-x-[15px] p-[20px] rounded-[5px] bg-slate-100 cursor-pointer truncate">
                                <FaRegSquare size={20} className="shrink-0" />
                                <p className="flex-grow text-[16px] font-medium whitespace-nowrap truncate">Pool</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
