"use server"

import refresh_access_token from "./ReuseTasks/token/refresh_access_token";

export const create_payment_intent_action = async (body, token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/stripe/create_payment_intent`, {
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
        console.log(error);
        
        return {
            success: false,
            message: "Payment intent create action failed!"
        }
    }
}

export const get_payment_detail_action = async (clientSecret) => {
    try {
        const refresh = await refresh_access_token();
        const { exp, decode: { decode }, accessToken } = refresh;

        const response = await fetch(`${process.env.API_SERVER}/stripe/get_payment_detail/${clientSecret}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            }
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
        console.log(error);
        
        return {
            result: {
                success: false,
                message: "Payment intent create action failed!"
            }
        }
    }
}