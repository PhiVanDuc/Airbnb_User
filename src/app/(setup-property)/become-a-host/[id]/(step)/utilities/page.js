import { get_utilities_action } from "@/actions/utility";
import { redirect } from "next/navigation";
import { fetchChoosedValues } from "../fetchChoosedValues";
import Utilities from "./Utilities";

export default async function UtilitiesPage({ params }) {
    const { id } = params;

    const utilities = await get_utilities_action({ all: true });
    if (utilities === 401) redirect(process?.env?.SIGN_OUT);
    const choosed_values = await fetchChoosedValues(id, "utilities");
    
    return (
        <Utilities pickData={utilities?.result} result={choosed_values?.result} />
    )
}
