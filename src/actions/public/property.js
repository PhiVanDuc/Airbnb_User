"use server"

export const find_properties_public_action = async (category_id, page, limit) => {
    try {
        const url = `${process.env.API_SERVER}/property_public/find_properties_public/${category_id}/${page}/${limit}`;
        const resposne = await fetch(url, {
            cache: "no-cache"
        });

        return await resposne.json();
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message: "Properties public find action failed"
        }
    }
}

export const get_property_public = async (id) => {
    try {
        const resposne = await fetch(`${process.env.API_SERVER}/property_public/get_property_public/${id}`, {
            cache: "no-cache"
        });

        return await resposne.json();
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message: "Property public get action failed"
        }
    }
}