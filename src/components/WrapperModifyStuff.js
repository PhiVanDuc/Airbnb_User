"use client"

import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { TokenContext } from "@/context/TokenProvider";

import modify_cookies_action from "@/actions/ReuseTasks/cookies/modify_cookies";
import update_info_user from "@/actions/ReuseTasks/user/update_info_user";

export default function WrapperModifyStuff({ children, exp, decode, token }) {
    const router = useRouter();
    const { setTokens } = useContext(TokenContext);

    useEffect(() => {
        (async () => {
            if (exp && decode && token) {
                const oneYearFromNow = new Date();
                oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
                
                setTokens(old => ({...old, access_token: token}));
                await modify_cookies_action(
                    {
                        name: "access-user",
                        value: token,
                        path: "/",
                        httpOnly: true,
                        expires: oneYearFromNow
                    },
                    "set"
                );

                await update_info_user(decode?.user_id, token, router);
            }
        })();
    }, []);

    return (
        <>
            {children}
        </>
    )
}