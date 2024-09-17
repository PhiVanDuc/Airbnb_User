import { fetchChoosedValues } from "../fetchChoosedValues";
import Price from "./Price";

export default async function PricePage({ params }) {
    const { id } = params;

    const choosed_values = await fetchChoosedValues(id, "price");
    
    return (
        <Price result={choosed_values?.result} />
    )
}
