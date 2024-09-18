import { get_conversations_action } from "@/actions/chat";
import ListConversationsClient from "./ListConversationsClient";
import { redirect } from "next/navigation";
import WrapperModifyStuff from "@/components/WrapperModifyStuff";

export default async function ListConversations() {
    const conversations = await get_conversations_action();
    if (conversations === 401) redirect(process.env.SIGN_OUT);
    
    return (
        <WrapperModifyStuff exp={conversations?.exp} decode={conversations?.decode} token={conversations?.accessToken}>
            <div className="items-stretch flex-col shrink-0 w-[400px] max-w-[400px] py-[20px] px-[24px] md:px-[44px] border-r border-slate-200 overflow-y-auto">
                <ListConversationsClient conversations={conversations?.result} />            
            </div>
        </WrapperModifyStuff>
    )
}
