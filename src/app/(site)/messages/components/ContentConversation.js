import Header from "./Header";
import Content from "./Content";
import FormSendMessage from "./FormSendMessage";

import { get_conversation_action } from "@/actions/chat";
import { redirect } from "next/dist/server/api-utils";

export default async function ContentConversation({ conversation_id, partner_id }) {
    const conversation = await get_conversation_action({
        id: conversation_id,
        partner_id
    });
    if (conversation === 401) redirect(process.env.SIGN_OUT);

    return (
        <div className="items-stretch flex-col w-full overflow-y-auto">
            {
                (conversation_id && partner_id) && (
                    <div className="flex flex-col h-full">
                        <Header conversation={conversation?.result} partner_id={partner_id} />
                        <Content conversation={conversation?.result} partner_id={partner_id} />
                        <FormSendMessage conversation={conversation?.result} partner_id={partner_id} />
                    </div>
                )
            }
        </div>
    )
}