"use client"

import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default function EditorTitleDescriptionPage() {
    const form = useForm({
        defaultValues: {
            title: "",
            description: ""
        }
    });

    const onSubmit = (values) => {
        console.log(values);
    }

    return (
        <>
            <div className="pb-[40px] space-y-[5px]">
                <h3 className="text-[30px] font-semibold">Title and description</h3>
            </div>

            <Form {...form}>
                <form
                    action={form.handleSubmit(onSubmit)}
                    className="flex flex-col justify-between flex-grow overflow-y-auto "
                >
                    <div className="space-y-[20px] pb-[20px]">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel
                                            className="text-[16px] font-semibold text-neutral-500"
                                        >Title</FormLabel>

                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Edit your title property"
                                                className="resize-none  placeholder:font-medium placeholder:text-neutral-400 h-[100px] border-neutral-300 p-[15px] focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel
                                            className="text-[16px] font-semibold text-neutral-500"
                                        >
                                            Description
                                        </FormLabel>

                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Edit your description property"
                                                className="resize-none  placeholder:font-medium placeholder:text-neutral-400 h-[200px] border-neutral-300 p-[15px] focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                        </FormControl>
                                        <FormMessage />
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
