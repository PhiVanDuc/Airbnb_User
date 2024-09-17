"use server"

import { cookies } from "next/headers";

export const create_token = async (payload, exp) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/token/create_token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ payload, exp }),
            cache: "no-cache"
        });
        return await response.json();
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message: "Create token failed!"
        }
    }
}

export const decode_token = async (token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/token/decode`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
            cache: "no-cache"
        });
        return await response.json();
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message: "Decode token failed!"
        }
    }
}

export const refresh_token = async (token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/token/refresh_token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: token }),
            cache: "no-cache"
        });
        const refreshStatus = await response.json();

        return refreshStatus;
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message: "Refresh token failed!"
        }
    }
}

export const token_blocked = async (token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/auth/verify_black_list`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
            cache: "no-cache"
        });
        return await response.json();
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message: "Check token blocked failed!"
        }
    }
}