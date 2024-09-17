"use server"

import { revalidateTag } from "next/cache";

export const delete_cloudinary_action = async (body, token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/cloudinary/delete_image`, {
            method: "DELETE",
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
            message: "Cloudinary delete action failed!"
        }
    }
}