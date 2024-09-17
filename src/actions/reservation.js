"use server"

import { revalidateTag } from "next/cache";
import refresh_access_token from "./ReuseTasks/token/refresh_access_token";

export const get_reservations_action = async (data, client = false, token) => {
    let refresh;

    if (!client) {
        refresh = await refresh_access_token();
        if (refresh === 401) return 401;
    }

    try {
        const response = await fetch(`${process.env.API_SERVER}/reservation?host_id=${client ? data?.host_id : refresh?.decode?.decode?.user_id}&status=${data?.status}`, {
            headers: {
                "Authorization": `Bearer ${client ? token : refresh?.accessToken}`,
            },
            next: {
                tags: "get_reservations"
            }
        });

        if (response.status === 401) return 401;
        
        const result = await response.json();
        
        if (client) return result;
        else {
            return {
                result,
                exp: refresh?.exp,
                decode: result?.decode?.decode,
                accessToken: refresh?.accessToken
            }
        }
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message: "Reservations get action failed!"
        }
    }
}

export const create_reservation_action = async (body, token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/reservation/create_reservation`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...body }),
            cache: "no-cache"
        });

        if (response.status === 401) return 401;

        revalidateTag("get_reservations");
        
        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message: "Reservation create action failed!"
        }
    }
}

export const cancel_reservation_action = async (data, token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/reservation/cancel_reservation?reservation_id=${data?.reservation_id}&payment_intent_id=${data?.payment_intent_id}&status=${data?.status}&total=${data?.total}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            cache: "no-cache"
        });
        if (response.status === 401) return 401;

        revalidateTag("get_reservations");
        
        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message: "Reservation cancel action failed!"
        }
    }
}

export const check_in_reservation_action = async (body, token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/reservation/check_in_reservation`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...body }),
            cache: "no-cache"
        });
        if (response.status === 401) return 401;

        revalidateTag("get_reservations");
        
        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message: "Reservation check in action failed!"
        }
    }
}

export const check_out_reservation_action = async (body, token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/reservation/check_out_reservation`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...body }),
            cache: "no-cache"
        });
        if (response.status === 401) return 401;

        revalidateTag("get_reservations");
        
        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message: "Reservation check out action failed!"
        }
    }
}