"use client"

import { cn } from "@/lib/utils";
import { useParams, usePathname, useRouter } from "next/navigation";

import { IoIosSquareOutline } from "react-icons/io";

export default function EditorSidebar() {
    const router = useRouter();
    const { id } = useParams();
    const pathname = usePathname();

    const handleChangeSection = (section) => {
        router.push(`/hosting/editor/${id}/${section}`);
    }

    return (
        <div className="shrink-0 pt-[40px] flex flex-col w-[500px] h-full overflow-y-auto border-r border-slate-200 space-y-[40px]">
            {/* Header List Editer */}
            <h3 className="text-[30px] font-semibold px-[24px] md:px-[60px]">Listing editor</h3>

            <div className="flex-grow overflow-y-auto px-[24px] md:px-[60px] space-y-[15px] pb-[60px]">
                {/* Photos */}
                <div className={cn(
                        "space-y-[10px] p-[30px] bg-white border border-slate-200 shadow-md rounded-[10px] cursor-pointer hover:bg-neutral-50 transition",
                        pathname.includes("photo-tour") ? "border-[2px] border-slate-700" : ""
                    )}
                    onClick={() => { handleChangeSection("photo-tour"); }}
                >
                    <h4 className="text-[16px] font-semibold">Photos</h4>

                    <div className="flex items-center gap-x-[20px] px-[20px] py-[30px] rounded-[10px] bg-neutral-300/30">
                        <div className="w-[60px] aspect-square rounded-[5px] bg-slate-300 rotate-[-5deg]"></div>
                        <p className="text-[14px] font-medium">Showcase your photos by room, instantly</p>
                    </div>
                </div>

                {/* Title - Description */}
                <div className={cn(
                        "space-y-[10px] p-[30px] bg-white border border-slate-200 shadow-md rounded-[10px] cursor-pointer hover:bg-neutral-50 transition",
                        pathname.includes("title-description") ? "border-[2px] border-slate-700" : ""
                    )}
                    onClick={() => { handleChangeSection("title-description"); }}
                >
                    <h4 className="text-[16px] font-semibold">Title - Description</h4>
                    
                    <div className="space-y-[5px]">
                        <p className="text-[18px] font-bold text-neutral-400">This is title</p>
                        <p className="overflow-hidden text-ellipsis line-clamp-2 text-[16px] font-medium text-neutral-400">This is description</p>
                    </div>
                </div>

                {/* Property Type */}
                <div className={cn(
                        "space-y-[10px] p-[30px] bg-white border border-slate-200 shadow-md rounded-[10px] cursor-pointer hover:bg-neutral-50 transition",
                        pathname.includes("property-type") ? "border-[2px] border-slate-700" : ""
                    )}
                    onClick={() => { handleChangeSection("property-type"); }}
                >
                    <h4 className="text-[16px] font-semibold">Property type</h4>
                    <p className="w-full whitespace-nowrap truncate text-[16px] text-neutral-400">Entire place - Unique place</p>
                </div>

                {/* Pricing */}
                <div className={cn(
                        "space-y-[10px] p-[30px] bg-white border border-slate-200 shadow-md rounded-[10px] cursor-pointer hover:bg-neutral-50 transition",
                        pathname.includes("pricing") ? "border-[2px] border-slate-700" : ""
                    )}
                    onClick={() => { handleChangeSection("pricing"); }}
                >
                    <h4 className="text-[16px] font-semibold">Pricing</h4>

                    <div className="space-y-[2px]">
                        <p className="w-full whitespace-nowrap truncate text-[16px] text-neutral-400">$19 per night</p>
                        <p className="w-full whitespace-nowrap truncate text-[16px] text-neutral-400">None discount</p>
                    </div>
                </div>

                {/* Utilities */}
                <div className={cn(
                        "space-y-[10px] p-[30px] bg-white border border-slate-200 shadow-md rounded-[10px] cursor-pointer hover:bg-neutral-50 transition",
                        pathname.includes("utilities") ? "border-[2px] border-slate-700" : ""
                    )}
                    onClick={() => { handleChangeSection("utilities"); }}
                >
                    <h4 className="text-[16px] font-semibold">Utilities</h4>

                    <div className="space-y-[2px]">
                        <div className="flex items-center gap-x-[10px]">
                            <IoIosSquareOutline size={25} />
                            <p className="text-[16px] text-neutral-600">Pool</p>
                        </div>
                    </div>
                </div>

                {/* Availability days */}
                <div className={cn(
                        "space-y-[10px] p-[30px] bg-white border border-slate-200 shadow-md rounded-[10px] cursor-pointer hover:bg-neutral-50 transition",
                        pathname.includes("availability") ? "border-[2px] border-slate-700" : ""
                    )}
                    onClick={() => { handleChangeSection("availability"); }}
                >
                    <h4 className="text-[16px] font-semibold">Availability</h4>

                    <p className="w-full whitespace-nowrap truncate text-[16px] text-neutral-400">1 - 365 night stays</p>
                </div>

                {/* Quantity in property */}
                <div className={cn(
                        "space-y-[10px] p-[30px] bg-white border border-slate-200 shadow-md rounded-[10px] cursor-pointer hover:bg-neutral-50 transition",
                        pathname.includes("quantity-in-property") ? "border-[2px] border-slate-700" : ""
                    )}
                    onClick={() => { handleChangeSection("quantity-in-property"); }}
                >
                    <h4 className="text-[16px] font-semibold">Availability</h4>

                    <div className="space-y-[2px]">
                        <p className="w-full whitespace-nowrap truncate text-[16px] text-neutral-400">2 guests</p>
                        <p className="w-full whitespace-nowrap truncate text-[16px] text-neutral-400">2 bedrooms</p>
                        <p className="w-full whitespace-nowrap truncate text-[16px] text-neutral-400">2 beds</p>
                        <p className="w-full whitespace-nowrap truncate text-[16px] text-neutral-400">2 bathrooms</p>
                    </div>
                </div>

                {/* Location */}
                <div className={cn(
                        "space-y-[10px] p-[30px] bg-white border border-slate-200 shadow-md rounded-[10px] cursor-pointer hover:bg-neutral-50 transition",
                        pathname.includes("location") ? "border-[2px] border-slate-700" : ""
                    )}
                    onClick={() => { handleChangeSection("location"); }}
                >
                    <h4 className="text-[16px] font-semibold">Location</h4>

                    <div className="space-y-[8px]">
                        <div className="w-full aspect-video rounded-[10px] bg-slate-200"></div>
                        <p className="w-full whitespace-nowrap truncate text-[16px] text-neutral-400">2 bathrooms</p>
                    </div>
                </div>

                {/* House rules */}
                <div className={cn(
                        "space-y-[10px] p-[30px] bg-white border border-slate-200 shadow-md rounded-[10px] cursor-pointer hover:bg-neutral-50 transition",
                        pathname.includes("house-rules") ? "border-[2px] border-slate-700" : ""
                    )}
                    onClick={() => { handleChangeSection("house-rules"); }}
                >
                    <h4 className="text-[16px] font-semibold">House rules</h4>
                </div>
            </div>
        </div>
    )
}