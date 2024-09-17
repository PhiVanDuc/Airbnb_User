"use client"

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import RenderIcon from "@/app/(setup-property)/become-a-host/[id]/(step)/components/RenderIcon";
import { LuChevronRight } from "react-icons/lu";
import { LuChevronLeft } from "react-icons/lu";
import { BsHouses } from "react-icons/bs";

import { cn } from "@/lib/utils";

export default function CategoriesBar({ categories, category_id }) {
    const router = useRouter();
    const pathname = usePathname();

    const categoriesBarRef = useRef();
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);    

    useEffect(() => {
        const categoriesBar = categoriesBarRef.current;
        if (!categoriesBar) return;

        const { scrollWidth, clientWidth } = categoriesBar;
        setShowRightArrow(scrollWidth > clientWidth);

        const handleScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = categoriesBar;
            
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
        }

        categoriesBar.addEventListener("scroll", handleScroll);

        return () => {
            categoriesBar.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollLeft = () => {
        if (categoriesBarRef.current) {
            categoriesBarRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (categoriesBarRef.current) {
            categoriesBarRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    const handleSearch = (id) => {
        router.push(`?category_id=${id}`);
    }
    

    return (
        <div className="">
            <div className={cn(
                "float-left pr-[35px] pt-[20px]",
                pathname === "/homes" ? "md:block" : "hidden md:hidden"
            )}>
                <div className="relative pr-[35px] border-slate-400 bg-white text-neutral-700">
                    <span className="absolute top-0 bottom-0 right-0 translate-x-[-50%] w-[1px] rounded-full bg-slate-400"></span>
                    
                    <div className="flex flex-col gap-y-[10px] items-center justify-center relative">
                        <BsHouses size={20} />
                        <p className="text-[12px] font-semibold">Your search</p>

                        <span className="absolute bottom-[-12.5px] left-0 right-0 h-[2.5px] rounded-full bg-neutral-700"></span>
                    </div>
                </div>
            </div>

            <div className={cn(
                "bg-white pt-[20px]",
                pathname === "/homes" ? "md:ml-[140px]" : ""
            )}>
                <div className="relative">
                    <div 
                        className={cn( 
                            "hidden md:flex h-full w-[55px] justify-end items-center absolute top-[50%] right-0 translate-y-[-50%] transition-all duration-500 z-10",
                            showRightArrow ? "visible opacity-100" : "invisible opacity-0"
                        )} 
                        style={{
                            backgroundImage: "linear-gradient(to left, white 65%, transparent)"
                        }}
                    >
                        <div
                            className="w-[32px] h-[32px] rounded-full flex items-center justify-center bg-white border border-slate-400 cursor-pointer hover:shadow-md transition-all"
                            onClick={scrollRight}
                        >
                            <LuChevronRight className="text-slate-600" size={22}/>
                        </div>
                    </div>

                    <div 
                        className={cn(
                            "hidden md:flex h-full w-[55px] justify-start items-center absolute top-[50%] left-0 translate-y-[-50%] transition-all duration-500 z-10",
                            showLeftArrow ? "visible opacity-100" : "invisible opacity-0"
                        )}
                        style={{
                            backgroundImage: "linear-gradient(to right, white 65%, transparent)"
                        }}
                    >
                        <div
                            className="w-[32px] h-[32px] rounded-full flex items-center justify-center bg-white border border-slate-400 cursor-pointer hover:shadow-md transition-all"
                            onClick={scrollLeft}
                        >
                            <LuChevronLeft className="text-slate-600" size={22}/>
                        </div>
                    </div>
                        
                    <div 
                        className="flex items-center gap-x-[35px] whitespace-nowrap overflow-x-auto custom-scrollbar md:no-scrollbar"
                        ref={categoriesBarRef}
                    >
                        {
                            categories?.categories?.map(category => {
                                return (
                                    <div
                                        key={category?.id}
                                        className={cn(
                                            "group relative flex flex-col items-center justify-center gap-y-[10px] cursor-pointer shrink-0 pb-[15px]",
                                            category?.id === category_id ? "text-neutral-800" : "text-neutral-500"
                                        )}
                                        onClick={() => { handleSearch(category?.id) }}
                                    >
                                        <span className={cn(
                                            "absolute left-0 right-0 bottom-0 h-[2.5px] rounded-full transition",
                                            category?.id === category_id ? "visible oparity-100 bg-neutral-700" : "invisible opacity-0 group-hover:visible group-hover:opacity-100 group-hover:bg-slate-200"
                                        )}></span>
                                        
                                        <RenderIcon prefix={category?.prefix_icon} name_icon={category?.icon} s={20} />
                                        <p className="text-[12px] font-medium">{ category?.category }</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}