import { fetchChoosedValues } from "../fetchChoosedValues";
import FloorPlan from "./FloorPlan";

export default async function FloorPlanPage({ params }) {
    const { id } = params;
    const choosed_values = await fetchChoosedValues(id, "floor-plan");

    return (
        <FloorPlan result={choosed_values?.result} />
    )
}
