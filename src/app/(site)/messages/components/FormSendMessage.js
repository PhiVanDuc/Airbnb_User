"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useTokenContext } from "@/context/TokenProvider";
import { useRouter } from "next/navigation";
import { useMessagesContext } from "@/context/MessagesProvider";

import Image from "next/image";
import {
    Form,
    FormField,
    FormItem,
    FormControl
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { BsImages } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { v4 as uuidv4 } from "uuid";
import clientRefresh from "@/utils/clientRefresh";
import check_info_user from "@/actions/ReuseTasks/user/check_info_user";
import { create_message_action } from "@/actions/chat";

export default function FormSendMessage({ conversation }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const conversation_id = searchParams.get("id");
    const partner_id = searchParams.get("partner_id");

    const { allTokens, setTokens } = useTokenContext();
    const { listMessages, setListMessages } = useMessagesContext();
    const [infoUser, setInfoUser] = useState();
    const [loading, setLoading] = useState(false);
    
    const form = useForm({
        defaultValues: {
            message: "",
            image: ""
        }
    });

    useEffect(() => {
        (async () => {
            await check_info_user({
                allTokens,
                setTokens,
                router,
                setState: setInfoUser
            });
        })();
    }, []);

    const onSubmit = async (values) => {
        const { message, image } = values;

        setLoading(true);
        if ((message || image) && conversation_id && partner_id && infoUser?.id) {
            const refresh = await clientRefresh({
                router,
                setTokens
            });

            const sendMessage = await create_message_action({
                conversation_id,
                sender_id: infoUser?.id,
                reciver_id: partner_id,
                message,
                image
            }, refresh?.accessToken);

            if (sendMessage === 401) {
                router.replace(process.env.NEXT_PUBLIC_SIGN_OUT);
                return;
            } else if (!sendMessage?.success) {
                toast.error(sendMessage?.message);
                return;
            }

            setListMessages(
                [
                    ...listMessages,
                    {
                        id: uuidv4(),
                        sender_id: infoUser?.id,
                        message,
                        image,
                        created_at: new Date()
                    }
                ]
            )

            form.reset();
            setLoading(false);
        }
    }

    return (
        <>
            {
                (conversation_id && partner_id) && (
                    <div className="flex items-center gap-x-[20px] px-[30px] py-[25px] border-t border-slate-200">
                        <BsImages
                            size={25}
                            className="shrink-0 text-neutral-500 hover:text-neutral-700 transition-all cursor-pointer"
                        />

                        <div className="flex flex-col gap-y-[10px] flex-1">
                            {
                                form.getValues("image") &&
                                <Image
                                    width={100}
                                    height={100}
                                    alt="Image"
                                    src={form.getValues("image")}
                                    className="w-[50px] h-[50px] rounded-[5px] object-cover object-center"
                                    priority={true}
                                />
                            }

                            <Form { ...form } >
                                <form
                                    autoComplete="off"
                                    action={form.handleSubmit(onSubmit)}
                                    className="w-full"
                                >
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            className="w-full rounded-[10px] border-neutral-300"
                                                            placeholder="Enter your message"
                                                            { ...field }
                                                            disabled={loading}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </form>
                            </Form>
                        </div>

                        <button
                            type="submit"
                            disabled={(form.getValues("message") ? false : true) || loading}
                        >
                            <RiSendPlaneFill size={25} className={cn(
                                "shrink-0 cursor-pointer",
                                form.getValues("message") ? "text-rootColor" : "cursor-not-allowed",
                                loading ? "cursor-not-allowed" : ""
                            )} />
                        </button>
                    </div>
                )
            }
        </>
    )
}
