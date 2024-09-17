"use server"

import { cookies } from "next/headers";

export const login = async (values, pathApi) => {
    try {
        const response = await fetch(`${ process.env.API_SERVER }${ pathApi }`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
            cache: "no-cache"
        });
        const loginStatus = await response.json();

        if (loginStatus?.success) {
            const oneYearFromNow = new Date();
            oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

            cookies().set({
                name: "access-user",
                value: loginStatus?.user?.access_token,
                path: "/",
                httpOnly: true,
                expires: oneYearFromNow
            });

            cookies().set({
                name: "refresh-user",
                value: loginStatus?.user?.refresh_token,
                path: "/",
                httpOnly: true,
                expires: oneYearFromNow
            });
        }

        return loginStatus;
    }
    catch(error) {
        console.log(error);
        return {
            success: true,
            message: "Login failed in client side!"
        }
    }
}

export const logout = async () => {
    try {
        const values = {
            access_token: cookies().get("access-user")?.value,
            refresh_token: cookies().get("refresh-user")?.value
        };        

        const response = await fetch(`${ process.env.API_SERVER }/auth/logout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
            cache: "no-cache"
        });
        const logoutStatus = await response.json();

        if (logoutStatus?.success) {
            cookies().delete("access-user");
            cookies().delete("refresh-user");
        }

        return logoutStatus;
    }
    catch(error) {
        console.log(error);
        return {
            success: true,
            message: "Login failed in client side!"
        }
    }
}