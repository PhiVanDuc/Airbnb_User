"use server"

export const get_categories_public_action = async () => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/category_public/get_categories_public`, {
            cache: "no-cache"
        });

        return await response.json();
    }
    catch (error) {
        console.log(error);
        
        return {
            success: false,
            message: "Categories public get action failed!"
        }
    } 
}