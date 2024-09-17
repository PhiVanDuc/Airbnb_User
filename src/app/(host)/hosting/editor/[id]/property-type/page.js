"use client"

import { useForm } from "react-hook-form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form";

import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function EditorPropertyTypePage() {
    const form = useForm({
        defaultValues: {
            property_type: "",
            listing_type: "",
            quantity_property: 1,
        }
    });

    const handleDecrease = (value) => {
        if (+value > 1) {
            const decrease = +value - 1;
            form.setValue("quantity_property", decrease);
        }
    }

    const handleIncrease = (value) => {
        const increase = +value + 1;
        form.setValue("quantity_property", increase);
    }

    const onSubmit = (values) => {
        console.log(values);
    }

    return (
        <>
            <div className="pb-[40px] space-y-[5px]">
                <h3 className="text-[30px] font-semibold">Property type</h3>
            </div>

            <Form { ...form }>
                <form
                    action={form.handleSubmit(onSubmit)}
                    className="space-y-[30px] flex flex-col h-full justify-between"
                >
                    <div className="flex-grow space-y-[30px]">
                        <FormField
                            control={form.control}
                            name="property_type"
                            render={({ field }) => {
                                return (
                                    <FormItem className="space-y-[8px]">
                                        <FormLabel className="text-[14px] font-semibold text-neutral-600">Property type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="py-[25px] border-neutral-300">
                                                    <SelectValue placeholder="Select a verified email to display" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription className="text-[12px]">A majestic, possibly historical building that may have towers and moats.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="listing_type"
                            render={({ field }) => {
                                return (
                                    <FormItem className="space-y-[8px]">
                                        <FormLabel className="text-[14px] font-semibold text-neutral-600">Listing type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="py-[25px] border-neutral-300">
                                                    <SelectValue placeholder="Select a verified email to display" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription className="text-[12px]">Guests have the whole place to themselves. This usually includes a bedroom, a bathroom, and a kitchen.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="quantity_property"
                            render={({ field }) => {
                                return (
                                    <FormItem className="flex items-center justify-between">
                                        <FormLabel className="text-[17px] font-medium text-neutral-600 leading-none">How many properties are there?
                                        </FormLabel>
                                        
                                        <div className="flex items-center gap-x-[10px]">
                                            <span 
                                                className={cn(
                                                    "group flex items-center justify-center w-[30px] h-[30px] rounded-full border border-slate-500 cursor-pointer hover:border-black",
                                                    field?.value <= 1 && "border-slate-200 hover:border-slate-200 cursor-not-allowed"
                                                )}
                                                onClick={() => {handleDecrease(field.value)}}
                                            >
                                                <FaMinus size={10} className="text-slate-500 group-hover:text-black" />
                                            </span>

                                            <p className="w-[20px] text-center">{field.value}</p>

                                            <span 
                                                className="group flex items-center justify-center w-[30px] h-[30px] rounded-full border border-slate-500 cursor-pointer hover:border-black"
                                                onClick={() => {handleIncrease(field.value)}}
                                            >
                                                <FaPlus size={10} className="text-slate-500 group-hover:text-black" />
                                            </span>
                                        </div>
                                    </FormItem>
                                )
                            }}
                        />
                    </div>

                    <div className="text-right"><Button className="w-[100px]">Save</Button></div>
                </form>
            </Form>
        </>
    )
}
