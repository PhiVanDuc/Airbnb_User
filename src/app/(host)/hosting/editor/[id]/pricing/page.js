"use client"

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { HiPencil } from "react-icons/hi2";

import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { interest_rate } from "@/utils/money";
import { cn } from "@/lib/utils";

export default function EditorPricingPage() {
    const [hiddenPen, setHiddenPen] = useState(false);
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(true);

    const form = useForm({
        defaultValues: {
            price: 10
        }
    });

    useEffect(() => {
        const input = document.querySelector(".input-price");
        const length = `${form.getValues("price")}`.length;
        
        if (length === 1) setIsOne(true);
        input.style.width = length + "ch";

        setPrice(interest_rate(+form.getValues("price")));
        
        setLoading(false);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPrice(interest_rate(+form.getValues("price")));
        }, 500);

        return () => {
            clearTimeout(timeout);
        }
    }, [form.watch("price")])

    const handleInput = (event) => {
        const target = event.target;
        target.value = target.value.replace(/\s+/g, '');

        let value = target.value.replace(/\s+/g, '');
        let length = value.length;

        if (isNaN(value) || value.includes("e") ) {
            target.value = "10";
            value = "10";
            length = 2;
        }

        if (value > 10000) {
            target.value = "10000";
            value = 10000;
            length = `${value}`.length;
        }
        
        target.style.width = length + "ch";
    }

    const handleFocusInput = () => {
        setHiddenPen(true);
    }

    const handleBlurInput = (event) => {
        const value = +event.target.value;
    
        if (value < 10 || value === "") {
            event.target.value = "10";
            form.setValue("price", 10);
            event.target.style.width = "2ch";
        }
    
        setHiddenPen(false);
    }

    return (
        <div className="flex flex-col h-full">
            <div className="pb-[40px] space-y-[5px]">
                <h3 className="text-[30px] font-semibold">Pricing</h3>
                <p className="text-[16px] text-neutral-500 font-medium">These settings apply to all nights, unless you customize them by date.</p>
            </div>

            <div className="flex flex-col flex-grow justify-center items-center gap-y-[15px]">
                <Form {...form}>
                    <form
                        className="flex items-center justify-center"
                        autoComplete="off"
                        onSubmit={(e) => {e.preventDefault()}}
                    >
                        <FormField
                            control={form.control}
                            name="price"
                            render={({field}) => {
                                return (
                                    <FormItem className="relative">
                                        <FormLabel
                                            className={cn(
                                                "absolute right-[-45px] bottom-[15px] w-[32px] h-[32px] hidden lg:flex items-center justify-center rounded-full border border-slate-300 cursor-pointer",
                                                hiddenPen ? "hidden" : "",
                                            )}
                                            onClick={() => {
                                                const input = document.querySelector(".input-price");
                                                input.focus();
                                            }}
                                        >
                                            <HiPencil size={14} />
                                        </FormLabel>

                                        <FormControl style={{ marginTop: "0px" }}>
                                            <div className="flex items-center gap-x-[5px] w-fit h-fit">
                                                <span
                                                    className="text-[50px] lg:text-[100px] font-bold leading-none"
                                                >
                                                    $
                                                </span>

                                                <Input
                                                    {...field}
                                                    className={cn(
                                                        "input-price box-content text-[50px] lg:text-[100px] font-bold h-[50px] lg:h-[100px] p-0 border-none ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0",
                                                        loading ? "hidden" : "max-w-[320px] lg:max-w-[1000px]"
                                                    )}
                                                    onInput={handleInput}
                                                    onFocus={handleFocusInput}
                                                    onBlur={handleBlurInput}
                                                />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />
                    </form>
                </Form>

                <p className="flex items-center gap-x-[3px] text-[18px] text-slate-400 font-medium text-center">
                    Guest price before taxes <span className="inline-block max-w-[200px] truncate">${ price }</span>
                </p>
            </div>

            <div className="text-right"><Button className="w-[100px]">Save</Button></div>
        </div>
    )
}
