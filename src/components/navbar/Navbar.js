"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";
import { TokenContext } from "@/context/TokenProvider";
import Link from "next/link";

import Image from "next/image";
import Search from "./searchs/Search";
import UserCard from "./UserCard";
import CategoriesBar from "./CategoriesBar";

import { LuChevronLeft } from "react-icons/lu";
import { cn } from "@/lib/utils";

export default function Navbar({ categories }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { allTokens } = useContext(TokenContext);

    return (
        <div className="w-full bg-white">
            <div className="border-b border-slate-200 shadow-sm">
                <div className={cn(
                    "px-[24px] md:px-[80px] py-[20px] flex items-center justify-between md:gap-x-[20px] lg:gap-0",
                    pathname.startsWith("/property") ? "hidden" : ""
                )}>
                    <Image
                        alt="Logo"
                        width={100}
                        height={100}
                        src="/logo.png"
                        onClick={() => { window.location.href = process.env.NEXT_PUBLIC_DOMAIN_WEB; }}
                        className="cursor-pointer hidden md:inline w-[80px] lg:w-[100px] object-contain"
                        priority={ true }
                    />

                    <Search />

                    <div className="hidden lg:flex items-center space-x-[15px]">
                        {
                            allTokens?.access_token && (
                                <Link
                                    className="relative text-[14px] font-medium"
                                    href="/hosting"
                                >
                                    Airbnb your home
                                    <span className="absolute left-[-20px] top-[50%] translate-y-[-50%] block w-[12px] h-[12px] rounded-full bg-red-400"></span>
                                </Link>
                            )
                        }

                        <UserCard />
                    </div>
                </div>

                <div className={cn(
                    "px-[24px] md:px-[80px] py-[20px]",
                    !pathname.startsWith("/property") ? "hidden" : ""
                )}>
                    <Link
                        href="/"
                        className="flex items-center gap-x-[5px]"
                    >
                        <LuChevronLeft size={24} />
                        <span className="text-[15px] font-medium hover:underline">Homes</span>
                    </Link>
                </div>
            </div>

            <div
                className={cn(
                    "px-[24px] md:px-[80px]",
                    pathname === "/" || pathname === "/homes" ? "" : "hidden"
                )}
            >
                <CategoriesBar categories={categories} category_id={searchParams?.get("category_id")} />
            </div>
        </div>
    )
}
