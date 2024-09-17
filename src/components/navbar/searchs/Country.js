"use client"

import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { IoSearch } from "react-icons/io5";

export default function Country({ clear, setClear }) {
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        if (clear?.country) {
            setSearchValue("");
            
            setClear({
                ...clear,
                country: false
            });
        }
    }, [clear]);

    return (
        <div className='relative'>
            <Input
                className="ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full px-[20px] pe-[50px] md:pe-[55px] py-[20px] md:py-[25px] text-[12px] md:text-[14px] font-medium placeholder:text-slate-400 placeholder:text-[12px] md:placeholder:text-[14px]"
                placeholder="Enter country"
                value={searchValue}
                onChange={(event) => setSearchValue(event?.target?.value)}
            />

            <div className="absolute top-[50%] right-[10px] translate-y-[-50%] w-[30px] h-[30px] md:w-[35px] md:h-[35px] bg-rootColor rounded-full flex justify-center items-center cursor-pointer">
                <IoSearch className="text-white text-[15px] md:text-[20px]" />
            </div>
        </div>
    )
}
