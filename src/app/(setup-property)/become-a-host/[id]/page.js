import { redirect } from "next/navigation";
import WrapperModifyStuff from "@/components/WrapperModifyStuff";

import { get_property_action } from "@/actions/property";

export default async function PropertyIdPage({ params }) {
    const { id } = params
    
    const property = await get_property_action({ id });
    if (property === 401) redirect("/sign-out");

    const { result, exp, decode, accessToken } = property;

    if (result?.success) {
        const obj = result?.resultGet;
        const keys = Object.keys(obj);

        const path = `/become-a-host/${id}`;
        for (let i = 0; i < keys?.length - 1; i++) {
            switch(keys[i]) {
                case "structure":
                    if (!obj[keys[i]]) redirect(path + '/structure');
                    break;
                case "privacy_type":
                    if (!obj[keys[i]]) redirect(path + '/privacy-type');
                    break;
                case "address":
                case "longtitude":
                case "latitude":
                    if (!obj[keys[i]]) redirect(path + '/location');
                    break;
                case "people_count":
                case "bedroom_count":
                case "single_bed_count":
                case "double_bed_count":
                case "bathroom_count":
                case "property_count":
                    if (!obj[keys[i]]) redirect(path + '/floor-plan');
                    break;
                case "utilities":
                    if (!obj[keys[i]]) redirect(path + '/utilities');
                    break;
                case "images":
                    if (!obj[keys[i]] || obj[keys[i]]?.length < 5) redirect(path + '/photos');
                    break;
                case "title":
                    if (!obj[keys[i]]) redirect(path + '/title');
                    break;
                case "description":
                    if (!obj[keys[i]]) redirect(path + '/description');
                    break;
                case "base_price":
                    if (!obj[keys[i]]) redirect(path + '/price');
                    break;
                case "create_complete":
                    redirect(path + '/receipt');
            }
        }
    }
    else if (result?.success || !result?.resultGet) redirect("/become-a-host");

    return (
        <WrapperModifyStuff exp={exp} decode={decode} token={accessToken} />
    )
}
