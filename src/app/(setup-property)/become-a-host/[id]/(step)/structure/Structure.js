"use client"

import { useContext, useEffect } from "react";
import { StepContext } from "@/context/StepProvider";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
} from "@/components/ui/form";

import RenderIcon from "../components/RenderIcon";

import { useForm } from "react-hook-form";
import { StructureSchema } from "@/schemas/stepSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Structure({ pickData, result }) {
    const form = useForm({
        resolver: zodResolver(StructureSchema),
        mode: "onChange",
        defaultValues: {
            structure: result?.resultGet?.structure || ""
        }
    });

    const { setStepContext } = useContext(StepContext);

    useEffect(() => {
        setStepContext({
            param: "structure",
            value: form.getValues(),
            isValid: form.watch("structure") ? true : false
        });
    }, [form.watch("structure")]);

    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-[640px] max-w-[640px] my-auto">
                <h2 className="text-[26px] lg:text-[30px] font-semibold mb-[30px] lg:text-center">Which of these best describes your place?</h2>

                <Form { ...form }>
                    <form className="w-full pb-[20px]">
                        {
                            <FormField
                                control={form.control}
                                name="structure"
                                render={({ field }) => {
                                    return (
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="grid grid-cols-2 lg:grid-cols-3 grid-flow-row gap-[15px]"
                                        >
                                            {
                                                pickData?.categories?.map(category => {
                                                    return (
                                                        <FormItem
                                                            key={category?.id}
                                                            className={cn(
                                                                "border-[1px] border-slate-300 rounded-[6px] outline-offset-[-2px] hover:outline hover:outline-[2px] hover:outline-black",
                                                                category?.id === field?.value && "outline outline-[2px] outline-offset-[-2px] outline-black bg-slate-50"
                                                            )}
                                                        >
                                                            <FormLabel className="flex flex-col p-[20px] gap-y-[15px] cursor-pointer">
                                                                <RenderIcon prefix={category?.prefix_icon} name_icon={category?.icon} s={30} />
                                                                <p className="font-normal">{category?.category}</p>
                                                            </FormLabel>

                                                            <FormControl
                                                                style={{ margin: "0px" }}
                                                            >
                                                                <RadioGroupItem
                                                                    value={`${category?.id}`}
                                                                    className="hidden"
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )
                                                })
                                            }
                                        </RadioGroup>
                                    )
                                }}
                            />
                        }
                    </form>
                </Form>
            </div>
        </div>
    );
}