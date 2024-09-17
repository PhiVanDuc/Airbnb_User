"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useConversationsContext } from "@/context/ConversationsProvider";
import useListenListConversations from "./useListenListConversations";
import Image from "next/image";
import StatusOnline from "./StatusOnline";

import { BsChatSquareDots } from "react-icons/bs";
import { HiSearch } from "react-icons/hi";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatChatTimestamp } from "@/utils/calcDate";
import { useTokenContext } from "@/context/TokenProvider";
import check_info_user from "@/actions/ReuseTasks/user/check_info_user";
import { mark_read_messages_action } from "@/actions/chat";
import clientRefresh from "@/utils/clientRefresh";
import { toast } from "sonner";
import { useSeenInfoContext } from "@/context/SeenInfoProvider";

export default function ListConversationsClient({ conversations }) {
    const router = useRouter();
    const { listConversations, setListConversations } = useConversationsContext();
    const { allTokens, setTokens } = useTokenContext();
    const { setSeenInfo } = useSeenInfoContext();

    const [infoUser, setInfoUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await check_info_user({
                allTokens,
                setTokens,
                router,
                setState: setInfoUser
            });

            if (conversations) setIsLoading(false);

            const filterConversations = conversations?.conversations?.filter(item => item?.conversation?.messages?.length > 0);
            setListConversations(filterConversations || []);
        })();
    }, []);

    useListenListConversations(listConversations, setListConversations);
    
    const handleChooseConversation = async (id, partner_id, sender_id, is_read) => {
        if (!is_read && sender_id !== infoUser?.id) {
            const refresh = await clientRefresh({
                router,
                setTokens
            });

            const mark = await mark_read_messages_action({
                conversation_id: id,
                sender_id: sender_id,
                reciver_id: infoUser?.id
            }, refresh?.accessToken);

            if (mark === 401) {
                router.replace(process.env.NEXT_PUBLIC_SIGN_OUT);
                return;
            } else if (!mark?.success) {
                toast.error(mark?.message);
                return;
            }

            setSeenInfo(mark?.seen_info);
        }

        router.push(`/messages?id=${id}&partner_id=${partner_id}`);
    }
    
    return (
        <>
            <div className="flex items-center justify-between mb-[20px]">
                <h2 className="text-[22px] font-semibold">Messages</h2>

                <span className="w-[40px] h-[40px] rounded-full bg-slate-100 flex items-center justify-center cursor-pointer">
                    <HiSearch size={20} className="inline text-neutral-500" />
                </span>
            </div>

            {
                (!infoUser?.id || isLoading) &&
                (
                    <div className="space-y-[10px]">
                        <Skeleton className="py-[30px] bg-slate-200 w-full rounded-[10px]" />
                        <Skeleton className="py-[30px] bg-slate-200 w-full rounded-[10px]" />
                        <Skeleton className="py-[30px] bg-slate-200 w-full rounded-[10px]" />
                    </div>
                )
            }

            {
                (!isLoading && (!conversations?.success || listConversations?.length === 0)) &&
                (
                    <div className="space-y-[20px] text-center">
                        <BsChatSquareDots size={35} className="inline" />

                        <div className="space-y-[5px]">
                            <h3 className="font-semibold">You don't have any messages</h3>

                            <p
                                className="text-[14px] text-neutral-400"
                            >
                                When you receive a new message, it will appear here.
                            </p>
                        </div>
                    </div>
                )
            }
            
            {
                (infoUser?.id && !isLoading && conversations?.success && listConversations?.length > 0) &&
                (
                    <div className="space-y-[5px]">
                        {
                            listConversations?.map(conversation => {
                                const { conversation: con, partner_info } = conversation;
            
                                if (con?.messages?.length > 0) {
                                    return (
                                        <div
                                            key={con?.id}
                                            className="flex items-center gap-x-[10px] md:gap-x-[15px] hover:bg-slate-50 rounded-[10px] p-[15px] cursor-pointer transition"
                                            onClick={() => {handleChooseConversation(con?.id, partner_info?.id, con?.messages[0]?.sender_id, con?.messages[0]?.seen_id)}}
                                        >
                                            <div className="relative">
                                                <StatusOnline partner_id={partner_info?.id} />
                                                
                                                {
                                                    partner_info?.image ?
                                                    <Image
                                                        width={100}
                                                        height={100}
                                                        alt="Avatar"
                                                        src={partner_info?.image}
                                                        className="w-[50px] h-[50px] rounded-full object-cover object-center shrink-0"
                                                    /> :
                                                    <div className="w-[50px] h-[50px] bg-slate-300 rounded-full shrink-0"></div>
                                                }
                                            </div>
            
                                            <div className="flex-1 space-y-[2px] truncate">
                                                <div className="flex items-center">
                                                    <p className="font-semibold text-[14px] md:text-[16px] w-[50%] whitespace-nowrap truncate">{ partner_info?.fullname }</p>
                                                    <p className="text-[13px] text-neutral-400 font-medium w-[50%] text-right whitespace-nowrap truncate">{ formatChatTimestamp(con?.messages[0]?.created_at) }</p>
                                                </div>
                                                
                                                <p className={cn(
                                                    "text-[12px] md:text-[14px] font-medium text-neutral-400 max-w-full whitespace-nowrap truncate",
                                                    (!con?.messages[0]?.seen_id && con?.messages[0]?.sender_id !== infoUser?.id) ? "text-neutral-800" : ""
                                                )}>
                                                    <span>
                                                        {
                                                            con?.messages[0]?.sender_id === infoUser?.id ?
                                                            <span>You: </span> :
                                                            <span>{ con?.messages[0]?.sender?.fullname }: </span>
                                                        } 
                                                    </span>
                                                    <span>{ con?.messages[0]?.message }</span>
                                                </p>
                                            </div>
                                        </div>
                                    )
                                } 
                            })
                        }
                    </div>
                )
            }
        </>
    )
}