"use client"

import { decrypt, encrypt } from "@/lib/jwt";
import refresh_access_token from "@/actions/ReuseTasks/token/refresh_access_token";
import { profile } from "@/actions/user";
import { toast } from "sonner";

const check_info_user = async (obj) => {
    const { allTokens, setTokens, router, setState } = obj;

    if (allTokens?.access_token) {
        const info_user = localStorage.getItem("info_user");

        // Check refresh token
        const refresh = await refresh_access_token(true);

        if (refresh) {
            if (refresh === 401) {
                router.replace("/sign-out");
                return;
            }
    
            const { decode: { decode: { user_id } }, accessToken } = refresh;
            setTokens(old => {
                return {
                    ...old,
                    access_token: accessToken
                }
            })
    
            if (!info_user) {
                const profile_user = await profile(user_id, accessToken);
                if (profile_user === 401) router.replace("/sign-out");

                if (!profile_user?.success) {
                    toast.error(profile_user.message);
                    return
                }

                delete profile_user?.user?.roles[0]?.permissions;
                delete profile_user?.user?.roles[0]?.users_roles;

                const jwt = await encrypt({
                    id: profile_user?.user?.id,
                    image: profile_user?.user?.image,
                    fullname: profile_user?.user?.fullname,
                    email: profile_user?.user?.email,
                    roles: profile_user?.user?.roles[0] ? [profile_user?.user?.roles[0]] : [],
                });
                localStorage.setItem("info_user", jwt);
    
                if (setState) setState(profile_user?.user);
            }
            else {
                const decode = await decrypt(info_user);
    
                if (!decode.success) {
                    const profile_user = await profile(user_id, accessToken);
                    if (profile_user === 401) router.replace("/sign-out");

                    if (!profile_user?.success) {
                        toast.error(profile_user.message);
                        return
                    }

                    delete profile_user?.user?.roles[0]?.permissions;
                    delete profile_user?.user?.roles[0]?.users_roles;
    
                    const jwt = await encrypt({
                        id: profile_user?.user?.id,
                        image: profile_user?.user?.image,
                        fullname: profile_user?.user?.fullname,
                        email: profile_user?.user?.email,
                        roles: profile_user?.user?.roles
                    });
                    localStorage.setItem("info_user", jwt);
    
                    if (setState) setState(profile_user?.user);
                }
                else {
                    if (setState) setState(decode.payload);
                }
            }
        }
    }
}

export default check_info_user;