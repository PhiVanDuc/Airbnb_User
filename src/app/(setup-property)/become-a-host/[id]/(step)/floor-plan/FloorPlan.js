"use client"

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StepContext } from "@/context/StepProvider";

import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { cn } from "@/lib/utils";

import {
    Form,
    FormField,
    FormItem,
} from "@/components/ui/form";

export default function FloorPlan({ result }) {
    const form = useForm({
        defaultValues: {
            guests: result?.resultGet?.people_count || 1,
            bedrooms: result?.resultGet?.bedroom_count || 1,
            beds: result?.resultGet?.beds_count || 1,
            bathrooms: result?.resultGet?.bathroom_count || 1,
            properties: result?.resultGet?.property_count || 1,
        }
    });

    const [counts, setCounts] = useState({
        guests: result?.resultGet?.people_count || 1,
        bedrooms: result?.resultGet?.bedroom_count || 1,
        beds: result?.resultGet?.beds_count || 1,
        bathrooms: result?.resultGet?.bathroom_count || 1,
        properties: result?.resultGet?.property_count || 1,
    });

    const { setStepContext } = useContext(StepContext);

    useEffect(() => {
        setStepContext({
            param: "floor-plan",
            value: counts,
            isValid: true,
        });
    }, [counts]);

    const handleIncrease = (name, count) => {
        setCounts(old => {
            const newOne = {...old}; 
            newOne[name] = count + 1;

            return newOne;
        });

        form.setValue(name, count + 1);
    }

    const handleDecrease = (name, count) => {
        if (count <= 1) return;

        setCounts(old => {
            const newOne = {...old}; 
            newOne[name] = count - 1;

            return newOne;
        });

        form.setValue(name, count - 1);
    }

    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-[640px] max-w-[640px] space-y-[40px] my-auto">
                <div className="space-y-[5px]">
                    <h2 className="text-[26px] lg:text-[30px] font-semibold">Share some basics about your place</h2>
                    <p className="text-[14px] md:text-[16px] lg:text-[18px] text-slate-400">You'll add more details later, like bed types.</p>
                </div>

                <Form {...form}>
                    <form>
                        {
                            Object.entries(counts).map((count, index) => (
                                <FormField
                                    key={count[0]}
                                    control={form.control}
                                    name={count[0]}
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                className={cn(
                                                    "py-[25px] flex items-center justify-between border-b border-b-slate-200",
                                                    index === Object.entries(counts)?.length - 1 && "border-none"
                                                )}
                                            >
                                                <h3 className="text-[18px]">
                                                    {count[0].charAt(0).toUpperCase() + count[0].slice(1)}
                                                </h3>

                                                <div className="flex items-center gap-x-[10px]">
                                                    <span 
                                                        className={cn(
                                                            "group flex items-center justify-center w-[35px] h-[35px] rounded-full border border-slate-500 cursor-pointer hover:border-black",
                                                            count[1] <= 1 && "border-slate-200 hover:border-slate-200 cursor-not-allowed"
                                                        )}
                                                        onClick={() => {handleDecrease(count[0], count[1])}}
                                                    >
                                                        <FaMinus size={15} className="text-slate-500 group-hover:text-black" />
                                                    </span>

                                                    <p className="w-[20px] text-center">{count[1]}</p>

                                                    <span 
                                                        className="group flex items-center justify-center w-[35px] h-[35px] rounded-full border border-slate-500 cursor-pointer hover:border-black"
                                                        onClick={() => {handleIncrease(count[0], count[1])}}
                                                    >
                                                        <FaPlus size={15} className="text-slate-500 group-hover:text-black" />
                                                    </span>
                                                </div>
                                            </FormItem>
                                        )
                                    }}
                                />
                            ))
                        }
                    </form>
                </Form>
            </div>
        </div>
    )
}