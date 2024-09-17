import PrivacyType from "./PrivacyType";
import { fetchChoosedValues } from "../fetchChoosedValues";

export default async function PrivacyTypePage({ params }) {
    const { id } = params;
    const choosed_values = await fetchChoosedValues(id, "privacy-type");

    return (
        <PrivacyType result={choosed_values?.result} />
    )
}
