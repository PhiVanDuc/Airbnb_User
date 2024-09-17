"use server"

import refresh_access_token from "./ReuseTasks/token/refresh_access_token";

export const get_conversation_action = async (body) => {
    try {
        const refresh = await refresh_access_token();
        const { exp, decode: { decode }, accessToken } = refresh;

        const response = await fetch(`${process.env.API_SERVER}/chat/get_conversation?conversation_id=${body?.id}&partner_id=${body?.partner_id}`, {
            headers: {
                "Authorization": `Bearer ${ accessToken }`,
            },
            cache: "no-cache"
        });
        if (response.status === 401) return 401;

        const result = await response.json();
        return {
            result,
            exp,
            decode,
            accessToken
        };
    }
    catch(error) {
        console.log(
            error,
            "Conservation get action failed!"
        );
        
        return {
            success: false,
            message: "Conservation get action failed!"
        }
    }
}

export const create_coversation_action = async (body, token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/chat/create_conversation`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ token }`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...body }),
            cache: "no-cache"
        });
        if (response.status === 401) return 401;

        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(
            error,
            "Conservation create action failed!"
        );
        
        return {
            success: false,
            message: "Conservation create action failed!"
        }
    }
}

export const create_message_action = async (body, token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/chat/create_message`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ token }`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...body })
        });
        if (response.status === 401) return 401;

        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(
            error,
            "Message create action failed!"
        );
        
        return {
            success: false,
            message: "Message create action failed!"
        }
    }
}

export const get_conversations_action = async () => {
    try {
        const refresh = await refresh_access_token();
        const { exp, decode: { decode }, accessToken } = refresh;
        
        const response = await fetch(`${process.env.API_SERVER}/chat/get_conversations?user_id=${decode?.user_id}`, {
            headers: {
                "Authorization": `Bearer ${ accessToken }`,
            },
            cache: "no-cache"
        });
        if (response.status === 401) return 401;

        const result = await response.json();
        return {
            result,
            exp,
            decode,
            accessToken
        };
    }
    catch(error) {
        console.log(
            error,
            "Conversations get action failed!"
        );
        
        return {
            success: false,
            message: "Conversations get action failed!"
        }
    }
}

export const mark_read_messages_action = async (body, token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/chat/mark_read_messages`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ token }`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ ...body }),
            cache: "no-cache"
        });
        if (response.status === 401) return 401;

        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(
            error,
            "Mark read messages action failed!"
        );
        
        return {
            success: false,
            message: "Mark read messages action failed!"
        }
    }
}