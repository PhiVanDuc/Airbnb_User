"use client"

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { HiOutlineSearch } from "react-icons/hi";
import { PiHeart } from "react-icons/pi";
import { FaAirbnb } from "react-icons/fa";
import { IoChatboxOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import ReservationBottom from "@/app/(site)/(group)/property/[id]/components/ReservationBottom";

export default function NavbarBottom() {
    const pathname = usePathname();
    const [editPathname, setEditPathname] = useState("");

    useEffect(() => {
        if (pathname === "/") setEditPathname("/home");
        else setEditPathname(pathname);
    }, [pathname]);

    return (
        <div className="bg-white">
            { pathname.startsWith("/property") && <ReservationBottom /> }

            <div className={cn(
                "flex justify-center border-t border-slate-200",
                pathname.startsWith("/property") ? "hidden" : ""
            )}>
                <div className="flex lg:hidden items-center justify-between px-[24px] md:px-[80px] w-[700px] py-[15px] overflow-x-auto custom-scrollbar">
                    <Link
                        href="/"
                        className={cn(
                            "flex flex-col items-center gap-y-[5px] text-neutral-500 hover:text-rootColor transition",
                            editPathname.startsWith("/home") ? "text-rootColor" : ""
                        )}
                    >
                        <HiOutlineSearch
                            size={22}
                            className="max-[400px]:w-[20px]"
                        />

                        <p className="max-[400px]:text-[10px] text-[12px]">Explore</p>
                    </Link>

                    <Link
                        href="/whistlists"
                        className={cn(
                            "flex flex-col items-center gap-y-[5px] text-neutral-500 hover:text-rootColor transition",
                            editPathname.startsWith("/whistlists") ? "text-rootColor" : ""
                        )}
                    >
                        <PiHeart
                            size={22}
                            className="max-[400px]:w-[20px]"
                        />

                        <p className="max-[400px]:text-[10px] text-[12px]">Whistlists</p>
                    </Link>

                    <Link
                        href="/trips"
                        className={cn(
                            "flex flex-col items-center gap-y-[5px] text-neutral-500 hover:text-rootColor transition",
                            editPathname.startsWith("/trips") ? "text-rootColor" : ""
                        )}
                    >
                        <FaAirbnb
                            size={22}
                            className="max-[400px]:w-[20px]"
                        />

                        <p className="max-[400px]:text-[10px] text-[12px]">Trips</p>
                    </Link>

                    <Link
                        href="/messages"
                        className={cn(
                            "flex flex-col items-center gap-y-[5px] text-neutral-500 hover:text-rootColor transition",
                            editPathname.startsWith("/messages") ? "text-rootColor" : ""
                        )}
                    >
                        <IoChatboxOutline
                            size={22}
                            className="max-[400px]:w-[20px]"
                        />

                        <p className="max-[400px]:text-[10px] text-[12px]">Messages</p>
                    </Link>

                    <Link
                        href="/profile"
                        className={cn(
                            "flex flex-col items-center gap-y-[5px] text-neutral-500 hover:text-rootColor transition",
                            editPathname.startsWith("/profile") ? "text-rootColor" : ""
                        )}
                    >
                        <FiUser
                            size={22}
                            className="max-[400px]:w-[20px]"
                        />

                        <p className="max-[400px]:text-[10px] text-[12px]">Profile</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
