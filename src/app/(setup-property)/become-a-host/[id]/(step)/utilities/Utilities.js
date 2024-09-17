"use client"

import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { StepContext } from "@/context/StepProvider";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

import RenderIcon from "../components/RenderIcon";
import { cn } from "@/lib/utils";

import _ from "lodash";

export default function Utilities({ pickData, result }) {
    const form = useForm({
        defaultValues: {
            favorite: result?.resultGet?.utilities?.filter(utility => utility?.utility_type === "favorite")?.map(utility => utility?.id) || [],
            standout: result?.resultGet?.utilities?.filter(utility => utility?.utility_type === "standout")?.map(utility => utility?.id) || [],
            safety: result?.resultGet?.utilities?.filter(utility => utility?.utility_type === "safety")?.map(utility => utility?.id) || [],
        }
    });

    const { setStepContext } = useContext(StepContext);

    useEffect(() => {
        const hasEmptyArray = _.some(form.getValues(), value => _.isArray(value) && _.isEmpty(value));

        setStepContext({
            param: "utilities",
            value: form.getValues(),
            isValid: hasEmptyArray ? false : true,
        })
    }, [form.watch("favorite"), form.watch("standout"), form.watch("safety")]);

    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-[640px] max-w-[640px] space-y-[40px] my-auto">
                <div className="space-y-[5px]">
                    <h2 className="text-[26px] lg:text-[30px] font-semibold">Tell guests what your place has to offer.</h2>
                    <p className="text-[14px] md:text-[16px] lg:text-[18px] text-slate-400">You can add more utilities after you publish your listing.</p>
                </div>

                <Form {...form}>
                    <form className="space-y-[40px]">
                        <div className="space-y-[15px]">
                            <h3 className="text-[16px] lg:text-[18px] font-medium">What about these guest favorites?</h3>

                            <div className="grid lg:grid-cols-3">
                                {pickData?.utilities?.filter(utility => utility?.utility_type === "favorite")?.map(utility => (
                                    <FormField
                                        key={utility?.id}
                                        control={form.control}
                                        name="favorite"
                                        render={({ field }) => (
                                            <FormItem
                                                className={cn(
                                                    "border border-slate-300 rounded-[6px] outline-offset-[-2px] hover:outline hover:outline-[2px] hover:outline-black",
                                                    field.value.includes(utility?.id) && "outline outline-[2px] outline-offset-[-2px] outline-black bg-slate-50"
                                                )}
                                            >
                                                <FormLabel className="flex flex-col p-[16px] gap-y-[15px] cursor-pointer">
                                                    <RenderIcon prefix={utility?.prefix_icon} name_icon={utility?.icon} s={30} />
                                                    <p className="font-normal">{utility?.utility}</p>
                                                </FormLabel>
                                                
                                                <FormControl style={{ margin: "0px" }}>
                                                    <Checkbox
                                                        checked={field.value.includes(utility?.id)}
                                                        onCheckedChange={(checked) => {
                                                            field.onChange(
                                                                checked
                                                                    ? [...field.value, utility?.id]
                                                                    : field.value.filter(value => value !== utility?.id)
                                                            );
                                                        }}
                                                        className="hidden"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-[15px]">
                            <h3 className="text-[16px] lg:text-[18px] font-medium">Do you have any standout utilities?</h3>

                            <div className="grid lg:grid-cols-3">
                                {pickData?.utilities?.filter(utility => utility?.utility_type === "standout")?.map(utility => (
                                    <FormField
                                        key={utility?.id}
                                        control={form.control}
                                        name="standout"
                                        render={({ field }) => (
                                            <FormItem
                                                className={cn(
                                                    "border border-slate-300 rounded-[6px] outline-offset-[-2px] hover:outline hover:outline-[2px] hover:outline-black",
                                                    field.value.includes(utility?.id) && "outline outline-[2px] outline-offset-[-2px] outline-black bg-slate-50"
                                                )}
                                            >
                                                <FormLabel className="flex flex-col p-[16px] gap-y-[15px] cursor-pointer">
                                                    <RenderIcon prefix={utility?.prefix_icon} name_icon={utility?.icon} s={30} />
                                                    <p className="font-normal">{utility?.utility}</p>
                                                </FormLabel>
                                                
                                                <FormControl style={{ margin: "0px" }}>
                                                    <Checkbox
                                                        checked={field.value.includes(utility?.id)}
                                                        onCheckedChange={(checked) => {
                                                            field.onChange(
                                                                checked
                                                                    ? [...field.value, utility?.id]
                                                                    : field.value.filter(value => value !== utility?.id)
                                                            );
                                                        }}
                                                        className="hidden"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-[15px]">
                            <h3 className="text-[16px] lg:text-[18px] font-medium">Do you have any of these safety items?</h3>

                            <div className="grid lg:grid-cols-3">
                                {pickData?.utilities?.filter(utility => utility?.utility_type === "safety")?.map(utility => (
                                    <FormField
                                        key={utility?.id}
                                        control={form.control}
                                        name="safety"
                                        render={({ field }) => (
                                            <FormItem
                                                className={cn(
                                                    "border border-slate-300 rounded-[6px] outline-offset-[-2px] hover:outline hover:outline-[2px] hover:outline-black",
                                                    field.value.includes(utility?.id) && "outline outline-[2px] outline-offset-[-2px] outline-black bg-slate-50"
                                                )}
                                            >
                                                <FormLabel className="flex flex-col p-[16px] gap-y-[15px] cursor-pointer">
                                                    <RenderIcon prefix={utility?.prefix_icon} name_icon={utility?.icon} s={30} />
                                                    <p className="font-normal">{utility?.utility}</p>
                                                </FormLabel>
                                                
                                                <FormControl style={{ margin: "0px" }}>
                                                    <Checkbox
                                                        checked={field.value.includes(utility?.id)}
                                                        onCheckedChange={(checked) => {
                                                            field.onChange(
                                                                checked
                                                                    ? [...field.value, utility?.id]
                                                                    : field.value.filter(value => value !== utility?.id)
                                                            );
                                                        }}
                                                        className="hidden"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}