"use server"

import { cookies } from "next/headers"

const modify_cookies_action = async (data, action) => {
    if (action === "set") {
        cookies().set(data);
    }
}

export default modify_cookies_action;