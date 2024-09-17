"use server"

export const profile = async (user_id, access_token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/users/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            },
            body: JSON.stringify({ user_id })
        });
        
        if (response.status === 401) {
            console.log(await response.json());
            return 401;
        } 
        
        return await response.json();
    }
    catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Call api failed in client component!",
            user: null
        }
    }
}