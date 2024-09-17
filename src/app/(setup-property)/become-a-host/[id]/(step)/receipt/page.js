import { fetchChoosedValues } from "../fetchChoosedValues";
import Receipt from "./Receipt";

export default async function ReceiptPage({ params }) {
    const { id } = params;

    const choosed_values = await fetchChoosedValues(id, "receipt");

    return (
        <Receipt result={choosed_values?.result} />
    )
}
