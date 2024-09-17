import ContentConversation from "./components/ContentConversation";
import ListConversations from "./components/ListConversations";

import { validate } from "uuid";
import { redirect } from "next/navigation";

export default async function UserMessagesPage({ searchParams }) {
    const { id, partner_id } = searchParams;

    if (id && partner_id) {
        if (!validate(id) || !validate(partner_id)) redirect("/");
    }
    
    return (
        <div className="flex h-full">
            <ListConversations />
            <ContentConversation conversation_id={id} partner_id={partner_id} />
        </div>
    )
}
