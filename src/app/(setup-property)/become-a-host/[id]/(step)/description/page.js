import { fetchChoosedValues } from "../fetchChoosedValues";
import Description from "./Description";

export default async function DescriptionPage({ params }) {
    const { id } = params;

    const choosed_values = await fetchChoosedValues(id, "description");

    return (
        <Description result={choosed_values?.result} />
    )
}
