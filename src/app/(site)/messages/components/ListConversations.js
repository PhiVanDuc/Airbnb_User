import { get_conversations_action } from "@/actions/chat";
import ListConversationsClient from "./ListConversationsClient";
import { redirect } from "next/navigation";

export default async function ListConversations() {
    const conversations = await get_conversations_action();
    if (conversations === 401) redirect(process.env.SIGN_OUT);
    
    return (
        <div className="items-stretch flex-col shrink-0 w-[400px] max-w-[400px] py-[20px] px-[24px] md:px-[44px] border-r border-slate-200 overflow-y-auto">
            <ListConversationsClient conversations={conversations?.result} />            
        </div>
    )
}
