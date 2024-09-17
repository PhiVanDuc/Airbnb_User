"use client"

import { profile } from "@/actions/user";
import { encrypt } from "@/lib/jwt";
import { toast } from "sonner";

const update_info_user = async (user_id, accessToken, router) => {
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
}

export default update_info_user;