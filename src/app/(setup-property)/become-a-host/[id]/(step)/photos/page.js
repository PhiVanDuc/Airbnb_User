import { fetchChoosedValues } from "../fetchChoosedValues";
import Photos from "./Photos";

export default async function PhotosPage({ params }) {
    const { id } = params;

    const choosed_values = await fetchChoosedValues(id, "photos");

    return (
        <Photos result={choosed_values?.result} />
    )
}