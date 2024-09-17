import { fetchChoosedValues } from "../fetchChoosedValues";
import Location from "./Location";

export default async function LocationPage({ params }) {
    const { id } = params;
    const choosed_values = await fetchChoosedValues(id, "location");

    return (
        <Location mapbox_access_token={process?.env?.MAPBOX_ACCESS_TOKEN} result={ choosed_values?.result } />
    )
}
