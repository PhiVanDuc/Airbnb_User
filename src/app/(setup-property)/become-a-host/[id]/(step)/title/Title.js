"use client"

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StepContext } from "@/context/StepProvider";

import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormField,
    FormItem,
    FormControl
} from "@/components/ui/form";

export default function Title({ result }) {
    const [count, setCount] = useState(0);
    const { setStepContext } = useContext(StepContext);

    const form = useForm({
        defaultValues: {
            title: result?.resultGet?.title || "",
        }
    });

    useEffect(() => {
        const timeoutInstance = setTimeout(() => {
            setStepContext({
                param: "title",
                value: form.getValues("title"),
                isValid: form.getValues("title") ? true : false
            })
        }, 500);

        return () => {
            clearTimeout(timeoutInstance);
        }
    }, [form.watch("title")]);

    const handleChangeTitle = (event, onChange) => {
        if (count >= 32) {
            const values = event.target.value;
            if (values?.length < form.getValues("title")?.length) {
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
                        Now, let's give your cabin a title
                    </h2>

                    <p className="text-[14px] md:text-[16px] lg:text-[18px] text-slate-400">
                        Short titles work best. Have fun with it—you can always change it later.
                    </p>
                </div>

                <Form {...form}>
                    <form>
                        <FormField
                            control={form.control}
                            name="title"
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
                                        >{count} / 32</p>
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