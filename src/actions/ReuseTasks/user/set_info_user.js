"use client"

import { encrypt } from "@/lib/jwt";

const set_info_user = async (obj) => {
    delete obj?.user?.roles[0]?.permissions;
    delete obj?.user?.roles[0]?.users_roles;

    const jwt = await encrypt({
        id: obj?.user?.id,
        image: obj?.user?.image,
        fullname: obj?.user?.fullname,
        email: obj?.user?.email,
        roles: obj?.user?.roles[0] ? [obj?.user?.roles[0]] : [],
    });

    localStorage.setItem("info_user", jwt);
}

export default set_info_user;