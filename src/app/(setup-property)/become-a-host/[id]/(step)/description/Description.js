"use client"

import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { StepContext } from "@/context/StepProvider";

import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormField,
    FormItem,
    FormControl
} from "@/components/ui/form";

export default function Description({ result }) {
    const form = useForm({
        defaultValues: {
            description: result?.resultGet?.description || "You'll have a great time at this comfortable place to stay."
        }
    });

    const [count, setCount] = useState(form.getValues("description")?.length);
    const { setStepContext } = useContext(StepContext);

    useEffect(() => {
        const timeoutInstance = setTimeout(() => {
            setStepContext({
                param: "description",
                value: form.getValues("description"),
                isValid: form.getValues("description") ? true : false
            })
        }, 500);

        return () => {
            clearTimeout(timeoutInstance);
        }
    }, [form.watch("description")]);

    const handleChangeTitle = (event, onChange) => {
        if (count >= 500) {
            const values = event.target.value;
            if (values?.length < form.getValues("description")?.length) {
                setCount(values?.length);
                return onChange(event);
            }

            return;
        };
        setCount(event.target.value.length);

        return onChange(event);
    }

    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-[640px] max-w-[640px] space-y-[40px] my-auto">
                <div className="space-y-[5px]">
                    <h2 className="text-[26px] lg:text-[30px] font-semibold">
                        Create your description
                    </h2>

                    <p className="text-[14px] md:text-[16px] lg:text-[18px] text-slate-400">
                        Share what makes your place special.
                    </p>
                </div>

                <Form {...form}>
                    <form>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => {
                                return (
                                    <FormItem>
                                        <FormControl style={{ marginTop: "0px" }}>
                                            <Textarea
                                                className="resize-none h-[200px] text-[16px]"
                                                {...field}
                                                onChange={(event) => {handleChangeTitle(event, field.onChange)}}
                                            />
                                        </FormControl>

                                        <p
                                            style={{
                                                marginTop: "10px"
                                            }}
                                            className="text-[14px] font-bold text-slate-500"
                                        >{count} / 500</p>
                                    </FormItem>
                                )
                            }}
                        />
                    </form>
                </Form>
            </div>
        </div>
    )
}