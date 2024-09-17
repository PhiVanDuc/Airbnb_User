"use server"

import { get_proprety_step_action } from "@/actions/property"
import { redirect } from "next/navigation";

 
export const fetchChoosedValues = async (id, step) => {
    const done = await get_proprety_step_action({ id, step });
    if (done === 401) redirect(process.env.SIGN_OUT);

    return done
}