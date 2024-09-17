"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from "@/context/TokenProvider";

import check_info_user from "@/actions/ReuseTasks/user/check_info_user";
import { decrypt } from "@/lib/jwt";

export default function NameUserComponent() {
    const router = useRouter();
    const [infoUser, setInfoUser] = useState({});
    const { allTokens, setTokens } = useContext(TokenContext);

    useEffect(() => {
        (async () => {
            const jwt = localStorage.getItem("info_user");
            const decode = await decrypt(jwt);

            if (!jwt || !decode?.success) {
                await check_info_user(
                    allTokens,
                    setTokens,
                    router,
                    setInfoUser
                );
            }
            else {
                setInfoUser({ ...decode?.payload })
            }
        })();
    }, []);

    return (
        <div className="pb-[30px] border-b border-white/50">
            <h2 className="text-[30px] font-semibold mb-[20px]">Your reservation is confirmed</h2>
            <p className="text-[18px] font-medium mb-[5px]">Hi {infoUser?.fullname ? infoUser?.fullname : "customer's name" },</p>
            <p className="text-[14px]">Thank you for trusting in using airbnb service! Please review your reservation details below.</p>
        </div>
    )
}
