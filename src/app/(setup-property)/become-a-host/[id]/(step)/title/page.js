import { fetchChoosedValues } from "../fetchChoosedValues";
import Title from "./Title";

export default async function TitlePage({ params }) {
    const { id } = params;
    
    const choosed_values = await fetchChoosedValues(id, "title");

    return (
        <Title result={choosed_values?.result} />
    )
}
