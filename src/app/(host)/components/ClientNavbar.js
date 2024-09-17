"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaRegBell } from "react-icons/fa";

export default function ClientNavbar() {
    let pathname = usePathname();

    return (
        <>
            <div className="flex items-center justify-center gap-x-[5px]">
                <Link
                    href="/hosting"
                    className={cn(
                        "relative inline-block px-[20px] py-[15px] text-[14px] text-slate-600 font-medium leading-none rounded-full hover:bg-slate-100",
                        pathname.startsWith("/hosting") && "text-black"
                    )}
                >
                    Listings

                    <span
                        className={cn(
                            "hidden absolute w-[20px] h-[2.5px] bg-black rounded-[99px] bottom-0 left-[50%] translate-x-[-50%]",
                            pathname.startsWith("/hosting") && "inline-block"
                        )}
                    />
                </Link>
                
                <Link
                    href="/reservations"
                    className={cn(
                        "relative inline-block px-[20px] py-[15px] text-[14px] text-slate-600 font-medium leading-none rounded-full hover:bg-slate-100",
                        pathname.startsWith("/reservations") && "text-black"
                    )}
                >
                    Reservations

                    <span
                        className={cn(
                            "hidden absolute w-[20px] h-[2.5px] bg-black rounded-[99px] bottom-0 left-[50%] translate-x-[-50%]",
                            pathname.startsWith("/reservations") && "inline-block"
                        )}
                    />
                </Link>
            </div>

            <div className="flex items-center justify-center rounded-full w-[40px] h-[40px] border border-slate-300 bg-white hover:bg-slate-50 transition cursor-pointer">
                <FaRegBell size={18} />
            </div>
        </>
    )
}
