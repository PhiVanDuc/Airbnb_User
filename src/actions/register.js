"use server"

const register = async (values) => {
    try {
        const response = await fetch(`${ process.env.API_SERVER }/auth/register/add_account`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                formData: {
                    ...values,
                    provider: "credentials"
                }
            })
        });
        const { success, message } = await response.json();

        if(!success) {
            return {
                success: false,
                message,
            }
        }

        return {
            success: true,
            message: "Successfully registered account!",
        }
    }
    catch(error) {
        console.log("Error: ", error);
        return {
            success: false,
            message: "Account registration failed!",
        }
    }
}

export default register;