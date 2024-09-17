import { get_categories_action } from "@/actions/category";
import Structure from "./Structure";
import { fetchChoosedValues } from "../fetchChoosedValues";
import { redirect } from "next/navigation";

export default async function StructurePage({ params }) {
    const { id } = params;

    const categories = await get_categories_action(true, "structure");
    if (categories === 401) redirect(process?.env?.SIGN_OUT);

    const choosed_values = await fetchChoosedValues(id, "structure");

    return (
        <Structure pickData={categories?.result} result={choosed_values?.result} />
    )
}
