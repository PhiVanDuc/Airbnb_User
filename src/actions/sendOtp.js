"use server"

import mail from "@/lib/mail";
import jwt from "jsonwebtoken";

const sendOtp = async (to) => {
    try {
        const response = await fetch(`${ process.env.API_SERVER }/auth/register/add_verification_token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: to,
            }),
            cache: 'no-cache'
        });
    
        const tokenStatus = await response.json();
        if (!tokenStatus?.success) return tokenStatus;

        const decode = jwt.verify(tokenStatus?.token, process.env.SECRET_KEY_TOKEN);

        await mail(
            to,
            "Airbnb_Clone",
            `<h4>OTP code.</h4>
            <p>OTP code only be used within 5 minutes: ${ decode.otp }</p>`
        );

        return {
            success: true,
            message: "Mail sent successfully!",
        }
    }
    catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Sending mail failed!",
        }
    }
}

export default sendOtp;