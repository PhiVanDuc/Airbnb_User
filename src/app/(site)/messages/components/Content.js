"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useMessagesContext } from "@/context/MessagesProvider";
import useListenContent from "./useListenContent";
import check_info_user from "@/actions/ReuseTasks/user/check_info_user";
import { useTokenContext } from "@/context/TokenProvider";
import StatusOnline from "./StatusOnline";
import { formatChatTimestamp } from "@/utils/calcDate";
import { useSeenInfoContext } from "@/context/SeenInfoProvider";

export default function Content({ conversation, partner_id }) {
    const router = useRouter();
    const lastMessageRef = useRef();

    const { allTokens, setTokens } = useTokenContext();
    const { listMessages, setListMessages } = useMessagesContext();
    const [infoUser, setInfoUser] = useState({});

    useEffect(() => {
        setListMessages(conversation?.messages || []);
        
        (async () => {
            await check_info_user({
                allTokens,
                setTokens,
                router,
                setState: setInfoUser
            });
        })();
    }, [partner_id]);

    useListenContent(listMessages, setListMessages, conversation?.conversation?.id, infoUser);

    useLayoutEffect(() => {
        const timer = setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    
        return () => clearTimeout(timer);
    }, [listMessages, infoUser]);

    return (
        <div className="flex-1 overflow-y-auto p-[30px]" >
            {
                (!conversation || !infoUser?.fullname) && 
                (
                    <div className="h-full flex items-center justify-center">
                        <p className="text-[18px] font-medium text-neutral-400">Loading messages</p>
                    </div>
                )
            }

            {
                (conversation && infoUser?.fullname && listMessages?.length === 0) &&
                (
                    <div className="h-full flex items-center justify-center">
                        <p className="text-[18px] font-medium text-neutral-400">Send a message to start a conversation</p>
                    </div>
                )
            }

            {
                (conversation && infoUser?.fullname && listMessages?.length > 0) &&
                (
                    <div className="space-y-[30px]" >
                        {
                            listMessages?.map((message, index) => {
                                const isLastMessage = index === listMessages?.length - 1;  
                                
                                if (message?.sender_id === infoUser?.id) {
                                    return (
                                        <div
                                            key={message?.id}
                                            className="flex items-start justify-end gap-x-[15px]"
                                            ref={isLastMessage ? lastMessageRef : null}
                                        >
                                            <div className="space-y-[5px] w-full">
                                                <div className="flex items-center justify-end gap-x-[10px]">
                                                    <p className="text-[14px] font-medium text-neutral-700 text-right">{ infoUser?.fullname }</p>
                                                    <p className="text-[12px] font-medium text-neutral-400">
                                                        { formatChatTimestamp(message?.created_at) }
                                                    </p>
                                                </div>

                                                <div
                                                    className="flex flex-col items-end space-y-[5px] w-full"
                                                >
                                                    <p className="inline-block rounded-[10px] bg-slate-200 text-[14px] px-[20px] py-[10px] max-w-[80%]">
                                                        { message?.message }
                                                    </p>

                                                    {
                                                        isLastMessage && message?.seen_id && 
                                                        <p className="text-[13px] text-neutral-400">Seen by { conversation?.partner_info?.fullname }</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div
                                            key={message?.id}
                                            className="flex items-start gap-x-[15px]"
                                            ref={isLastMessage ? lastMessageRef : null}
                                        >
                                            <div className="shrink-0 relative">
                                                <StatusOnline partner_id={partner_id} />

                                                {
                                                    message?.sender?.image ?
                                                    <Image
                                                        width={100}
                                                        height={100}
                                                        alt="Avatar"
                                                        src={message?.sender?.image}
                                                        className="shrink-0 w-[40px] h-[40px] rounded-full object-cover object-center"
                                                        priority={true}
                                                    /> :
                                                    <div className="shrink-0 w-[40px] h-[40px] rounded-full bg-slate-300"></div>
                                                }
                                            </div>

                                            <div className="space-y-[5px] w-full">
                                                <div className="flex items-center gap-x-[10px]">
                                                    <p className="text-[12px] font-medium text-neutral-400">
                                                        { formatChatTimestamp(message?.created_at) }
                                                    </p>
                                                    <p className="text-[14px] font-medium text-neutral-700">{ message?.sender?.fullname }</p>
                                                </div>

                                                <div
                                                    className="flex flex-col space-y-[5px] w-full"
                                                >
                                                    <p className="inline-block rounded-[10px] bg-slate-200 text-[14px] px-[20px] py-[10px] w-fit max-w-[80%]">
                                                        { message?.message }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}