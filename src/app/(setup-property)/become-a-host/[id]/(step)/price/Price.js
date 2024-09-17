"use client"

import { useContext, useEffect, useState } from "react";
import { StepContext } from "@/context/StepProvider";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { HiPencil } from "react-icons/hi2";
import { IoMdPin } from "react-icons/io";
import { interest_rate } from "@/utils/money";

export default function Price({ result }) {
    const [hiddenPen, setHiddenPen] = useState(false);
    const [price, setPrice] = useState(0);
    const { stepContext, setStepContext } = useContext(StepContext);

    const form = useForm({
        defaultValues: {
            price: result?.resultGet?.base_price || 10
        }
    })

    useEffect(() => {
        const input = document.querySelector(".input-price");
        const length = input.value.length;
        
        if (length === 1) setIsOne(true);
        input.style.width = length + "ch";

        setPrice(interest_rate(+form.getValues("price")));
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStepContext({
                param: "price",
                value: {
                    root_price: form.getValues("price"),
                    profit_price: interest_rate(+form.getValues("price"))
                },
                isValid: true
            })

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
        <div className="flex items-center justify-center h-full">
            <div className="w-[640px] max-w-[640px] space-y-[100px] my-auto">
                <div className="space-y-[5px]">
                    <h2 className="text-[26px] lg:text-[30px] font-semibold">
                        Now, set your price
                    </h2>

                    <p className="text-[14px] md:text-[16px] lg:text-[18px] text-slate-400">
                        You can change it anytime.
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-y-[150px] pb-[20px]">
                    <div className="flex flex-col items-center justify-center gap-y-[15px]">
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
                                                            className="input-price box-content text-[50px] lg:text-[100px] font-bold h-[50px] lg:h-[100px] p-0 border-none ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 max-w-[320px] lg:max-w-[1000px]"
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

                    <Button
                        className="rounded-full shadow-lg italic text-[14px] text-black font-normal bg-white hover:bg-white border border-slate-[300] hover:border-black"
                    >
                        <IoMdPin size={20} className="text-rootColor mr-[5px]" />
                        Surrounding area
                    </Button>
                </div>
            </div>
        </div>
    )
}