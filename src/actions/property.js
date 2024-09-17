"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import refresh_access_token from "./ReuseTasks/token/refresh_access_token";

export const get_properties_action = async () => {
    try {
        const refresh = await refresh_access_token();
        if (refresh === 401) return 401;
        const { exp, decode: { decode }, accessToken } = refresh;
        
        const response = await fetch(`${process.env.API_SERVER}/property/get_properties`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: decode.user_id
            }),
            next: {
                tags: ["get_properties"]
            }
        });

        if (response.status === 401) return 401;

        const result = await response.json();
        return {
            result,
            exp,
            decode,
            accessToken
        }
    }
    catch(error) {
        console.log(error);
        
        return {
            success: false,
            message: "Properties get action failed!"
        }
    }
}

export const get_property_action = async (body) => {
    try {
        const refresh = await refresh_access_token();
        if (refresh === 401) return 401;
        const { exp, decode: { decode }, accessToken } = refresh;

        const response = await fetch(`${process.env.API_SERVER}/property/get_property`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...body}),
            next: {
                tags: ["get_property"]
            }
        });

        if (response.status === 401) return 401;

        const result = await response.json();
        return {
            result,
            exp,
            decode,
            accessToken
        }
    }
    catch(error) {
        console.log(error);
        
        return {
            success: false,
            message: "Property get action failed!"
        }
    }
}

export const get_proprety_step_action = async (body) => {
    try {
        const refresh = await refresh_access_token();
        if (refresh === 401) return 401;
        const { exp, decode: { decode }, accessToken } = refresh;

        const response = await fetch(`${process.env.API_SERVER}/property/get_property_step`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...body }),
            cache: "no-cache"
        });

        if (response === 401) return 401;

        const result = await response.json();
        return {
            result,
            exp,
            decode,
            accessToken
        }
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message: "Property step get action failed!"
        }
    }
}

export const create_property_action = async (body) => {
    try {
        const access_token = cookies().get("access-user").value;

        const response = await fetch(`${process.env.API_SERVER}/property/create_property`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...body}),
            cache: "no-cache"
        })

        if (response.status === 401) return 401;
        
        revalidateTag("get_properties");

        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(error);
        
        return {
            success: false,
            message: "Property update action failed!"
        }
    }
}

export const update_property_action = async (body, token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/property/update_property`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...body }),
            cache: "no-cache"
        });

        if (response.status === 401) return 401;
        
        revalidateTag("get_properties");
        revalidateTag("get_property");
        revalidateTag("get_proprety_step");
        
        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(error);
        
        return {
            success: false,
            message: "Property delete action failed!"
        }
    }
}

export const add_image_action = async (body, token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/property/add_image`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...body }),
            cache: "no-cache"
        });

        if (response.status === 401) return 401;
        
        revalidateTag("get_properties");
        revalidateTag("get_property");
        revalidateTag("get_proprety_step");
        
        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(error);
        
        return {
            success: false,
            message: "Images add action failed!"
        }
    }
}

export const edit_image_action = async (body, token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/property/edit_image`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...body }),
            cache: "no-cache"
        });

        if (response.status === 401) return 401;
        
        revalidateTag("get_properties");
        revalidateTag("get_proprety_step");
        
        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(error);
        
        return {
            success: false,
            message: "Property delete action failed!"
        }
    }
}

export const delete_property_action = async (body, token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/property/delete_property/${body.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            cache: "no-cache"
        });
        if (response.status === 401) return 401;
        
        revalidateTag("get_properties");
        
        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(error);
        
        return {
            success: false,
            message: "Property delete action failed!"
        }
    }
}