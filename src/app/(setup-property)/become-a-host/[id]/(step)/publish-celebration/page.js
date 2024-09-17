"use client"

import { FaAirbnb } from "react-icons/fa";
import { Button } from "@/components/ui/button";

import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { decrypt } from "@/lib/jwt";
import clientRefresh from "@/utils/clientRefresh";
import { TokenContext } from "@/context/TokenProvider";
import { update_property_action } from "@/actions/property";
import { toast } from "sonner";

export default function PublicCelebrationPage() {
    const router = useRouter();
    const { id } = useParams();
    const { setTokens } = useContext(TokenContext);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        (async () => {
            const jwt = localStorage.getItem("info_user");
            const decode = await decrypt(jwt);
            if (decode?.success) setUserInfo(decode?.payload);
        })();
    }, []);

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center h-screen px-[24px] lg:px-[60px] bg-black">
            <div className="fixed top-0 left-0 right-0 py-[20px] px-[24px] lg:px-[60px]">
                <FaAirbnb size={40} className="text-white" />
            </div>

            <div className="fixed bottom-0 left-0 right-0 py-[20px] px-[24px] lg:px-[60px] text-right bg-white">
                <Button
                    className="bg-rootColor text-[16px] font-semibold"
                    onClick={async () => { 
                        const refresh = await clientRefresh({
                            router,
                            setTokens
                        });

                        const update = await update_property_action(
                            {
                                id,
                                data: {
                                    create_complete: true,
                                    status: true
                                }
                            },
                            refresh?.accessToken
                        );

                        if (update === 401) router.replace("/sign-out");
                        else if (!update?.success) toast.error(update?.message);
                        
                        router.replace("/hosting");
                    }}
                >
                    Let get's started
                </Button>
            </div>

            <h2 className="text-white text-[36px] lg:text-[48px] font-semibold text-center mb-[20px]">Congratulations, {userInfo?.fullname || "Host"}</h2>
            <p className="text-white text-[14px] lg:text-[18px] md:font-light max-w-[700px] text-center leading-7 lg:leading-8">From one Host to another - welcome aboard. Thank you for sharing your home and helping to create incredible experiences for our guests.</p>
        </div>
    )
}