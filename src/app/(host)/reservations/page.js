import CategoryBar from "./components/CategoryBar";
import ReservationProvider from "./components/ReservationProvider";
import ListReservations from "./components/ListReservations";
import { get_reservations_action } from "@/actions/reservation";
import { redirect } from "next/navigation";

export default async function ReservationsPage() {
    const reservations = await get_reservations_action({ status: "Upcoming" });
    if (reservations === 401) redirect('/sign-out');

    return (
        <ReservationProvider>
            <div className="space-y-[50px] py-[60px] px-[24px] md:px-[80px]">
                <h2 className="text-[32px] font-semibold">Your reservations</h2>

                <div className="space-y-[30px]">
                    <CategoryBar />
                    <ListReservations dataServer={reservations?.result?.reservations} />
                </div>
            </div>
        </ReservationProvider>
    )
}
