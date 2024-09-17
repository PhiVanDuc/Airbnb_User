"use server"

const forgotPassword = async (values) => {
    try {
        const response = await fetch(`${ process.env.API_SERVER }/auth/forgot_password/change_password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                formData: {
                    ...values,
                    provider: "credentials"
                }
            })
        })
        const { success, message } = await response.json();

        if(!success) {
            return {
                success: false,
                message,
            }
        }

        return {
            success: true,
            message: "Successfully change password!",
        }
    }
    catch(error) {
        console.log("Error: ", error);
        return {
            success: false,
            message: "Change password failed!",
        }
    }
}

export default forgotPassword;