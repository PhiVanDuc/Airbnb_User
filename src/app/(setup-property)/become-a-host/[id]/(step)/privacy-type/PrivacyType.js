"use client"

import { useContext, useEffect } from "react";
import { StepContext } from "@/context/StepProvider";

import { HiOutlineHome } from "react-icons/hi2";
import { PiDoorOpenLight } from "react-icons/pi";
import { BsPeople } from "react-icons/bs";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl
} from "@/components/ui/form";

import {
    RadioGroup,
    RadioGroupItem
} from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";
import { PrivacyTypeSchema } from "@/schemas/stepSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function PrivacyType({ result }) {
    const form = useForm({
        resolver: zodResolver(PrivacyTypeSchema),
        mode: "onChange",
        defaultValues: {
            privacy_type: result?.resultGet?.privacy_type || ""
        }
    });

    const { setStepContext } = useContext(StepContext);

    useEffect(() => {
        setStepContext({
            param: "privacy-type",
            value: form.getValues(),
            isValid: form.getValues("privacy_type") ? true : false
        })
    }, [form.getValues("privacy_type")])

    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-[640px] max-w-[640px] my-auto">
                <h2 className="text-[26px] lg:text-[30px] font-semibold mb-[30px] lg:text-center">What type of place will guests have?</h2>

                <Form {...form}>
                    <form className="w-full">
                        <FormField 
                            control={form.control}
                            name="privacy_type"
                            render={({ field }) => {
                                return (
                                    <RadioGroup
                                        onValueChange={field?.onChange}
                                        defaultValue={field?.value}
                                        className="w-full gap-y-[10px]"
                                    >
                                        <FormItem className="w-full">
                                            <FormLabel className={cn(
                                                "flex items-center justify-between border border-slate-300 rounded-[10px] cursor-pointer hover:outline hover:outline-[2px] hover:outline-black hover:outline-offset-[-2px]",
                                                "an_entire_place" === field?.value && "outline outline-black outline-[2px] outline-offset-[-2px] bg-slate-50"
                                            )}>
                                                <div className="space-y-[5px] p-[25px]">
                                                    <h3 className="text-[18px] font-medium">An entire place</h3>
                                                    <p className="text-[15px] text-slate-500 font-normal leading-5">Guest have the whole place to themselves.</p>
                                                </div>

                                                <HiOutlineHome size={40} className="shrink-0 pr-[25px] w-[55px] lg:w-[70px]" />
                                            </FormLabel>

                                            <FormControl style={{ margin: "0px" }}>
                                                <RadioGroupItem
                                                    value="an_entire_place"
                                                    className="hidden"
                                                />
                                            </FormControl>
                                        </FormItem>

                                        <FormItem className="w-full">
                                            <FormLabel className={cn(
                                                "flex items-center justify-between border border-slate-300 rounded-[10px] cursor-pointer hover:outline hover:outline-[2px] hover:outline-black hover:outline-offset-[-2px]",
                                                "a_room" === field?.value && "outline outline-black outline-[2px] outline-offset-[-2px] bg-slate-50"
                                            )}>
                                                <div className="space-y-[5px] p-[25px]">
                                                    <h3 className="text-[18px] font-medium">A room</h3>
                                                    <p className="text-[15px] text-slate-500 font-normal leading-5">Guests have their own room in a home, plus access to shared spaces.</p>
                                                </div>

                                                <PiDoorOpenLight size={40} className="shrink-0 pr-[25px] w-[55px] lg:w-[70px]" />
                                            </FormLabel>

                                            <FormControl style={{ margin: "0px" }}>
                                                <RadioGroupItem
                                                    value="a_room"
                                                    className="hidden"
                                                />
                                            </FormControl>
                                        </FormItem>

                                        <FormItem className="w-full">
                                            <FormLabel className={cn(
                                                "flex items-center justify-between border border-slate-300 rounded-[10px] cursor-pointer hover:outline hover:outline-[2px] hover:outline-black hover:outline-offset-[-2px]",
                                                "a_share_room" === field?.value && "outline outline-black outline-[2px] outline-offset-[-2px] bg-slate-50"
                                            )}>
                                                <div className="space-y-[5px] p-[25px]">
                                                    <h3 className="text-[18px] font-medium">A shared room</h3>
                                                    <p className="text-[15px] text-slate-500 font-normal leading-5">Guests sleep in a room or common area that may be shared with you or others.</p>
                                                </div>

                                                <BsPeople size={40} className="shrink-0 pr-[25px] w-[55px] lg:w-[70px]" />
                                            </FormLabel>

                                            <FormControl style={{ margin: "0px" }}>
                                                <RadioGroupItem
                                                    value="a_share_room"
                                                    className="hidden"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    </RadioGroup>
                                )
                            }}
                        />
                    </form>
                </Form>
            </div>
        </div>
    )
}