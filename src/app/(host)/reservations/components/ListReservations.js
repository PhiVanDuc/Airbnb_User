"use client"

import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ReservationContext } from "./ReservationProvider";
import { TokenContext } from "@/context/TokenProvider";

import { TbDeviceIpadX } from "react-icons/tb";
import { get_reservations_action } from "@/actions/reservation";
import clientRefresh from "@/utils/clientRefresh";
import { toast } from "sonner";
import Image from "next/image";
import ButtonCancel from "./ButtonCancel";
import ButtonCheckIn from "./ButtonCheckIn";
import ButtonCheckOut from "./ButtonCheckOut";

export default function ListReservations({ dataServer }) {
    const router = useRouter();

    const { reservationCategory, setReservationCategory } = useContext(ReservationContext);
    const { setTokens } = useContext(TokenContext);

    const [list, setList] = useState(reservationCategory === "Upcoming" ? dataServer || [] : []);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            if (reservationCategory !== "Upcoming") {
                setLoading(true);

                const refresh = await clientRefresh({
                    router,
                    setTokens
                });

                const reservations = await get_reservations_action({ status: reservationCategory, host_id: refresh?.decode?.decode?.user_id }, true, refresh?.accessToken);
                if (reservations === 401) {
                    router.replace("/sign-out");
                    return;
                }
                else if (!reservations?.success) {
                    toast.error(reservations?.message);
                    return;
                }

                setList(reservations?.reservations);
                setLoading(false);
            } else {
                setList(dataServer || []);
            }  
        })();
    }, [reservationCategory])

    return (
        <>
            {
                loading ? 
                (
                    <div className="flex items-center justify-center py-[40px] rounded-[10px] w-full bg-neutral-100">
                        <div className="flex flex-col items-center justify-center gap-y-[15px]">
                            Loading...
                        </div>
                    </div>
                ) :
                list?.length === 0 ?
                (
                    <div className="flex items-center justify-center py-[40px] rounded-[10px] w-full bg-neutral-100">
                        <div className="flex flex-col items-center justify-center gap-y-[15px]">
                            <TbDeviceIpadX size={30} />
                            <p className="max-w-[320px] text-center">
                                { reservationCategory === "Upcoming" && "You currently don’t have any upcoming guests." }
                                { reservationCategory === "Arriving soon" && "You don’t have any guests arriving today or tomorrow." }
                                { reservationCategory === "Currently hosting" && "You don’t have any guests staying with you right now." }
                                { reservationCategory === "Checking out" && "You don’t have any guests checking out today or tomorrow." }
                            </p>
                        </div>
                    </div>
                ) :
                (
                    <div className="pb-[40px]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-[15px]">
                            {
                                list?.map(item => {
                                    return (
                                        <div
                                            key={item?.id}
                                            className="space-y-[15px]"
                                        >
                                            <div className="space-y-[10px]">
                                                <Image
                                                    width={500}
                                                    height={500}
                                                    alt="Cover image"
                                                    src={item?.cover_image}
                                                    className="w-full aspect-6/4 rounded-[5px] object-cover object-center"
                                                    priority={true}
                                                />

                                                <h3 className="text-[16px] font-semibold">{ item?.title }</h3>
                                            </div>

                                            <div className="space-y-[10px]">
                                                <div>
                                                    <h4 className="text-[14px] font-semibold mb-[8px] text-rootColor">Customer infomations</h4>

                                                    <div className="flex items-center gap-x-[15px]">
                                                        {
                                                            item?.customer_image ? 
                                                            (
                                                                <Image
                                                                    width={100}
                                                                    height={100}
                                                                    alt="Avatar"
                                                                    src={item?.customer_image}
                                                                    className="w-[40px] h-[40px] rounded-full object-cover object-center"
                                                                    priority={true}
                                                                />
                                                            ) :
                                                            <div className="w-[40px] h-[40px] rounded-full bg-slate-400"></div>
                                                        }

                                                        <div className="text-[14px]">
                                                            <p className="font-medium">{ item?.customer_fullname }</p>
                                                            <p className="text-[13px] text-neutral-600"><span className="font-medium">Phone number:</span> {item?.customer_number}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center border border-neutral-300 rounded-[5px]">
                                                    <div className="space-y-[5px] w-[50%] border-r border-neutral-300 p-[10px] px-[15px]">
                                                        <p className="text-[10px] font-bold">CHECK-IN</p>
                                                        <p className="text-[14px]">{ item?.check_in }</p>
                                                    </div>

                                                    <div className="space-y-[5px] w-[50%] text-right p-[10px] px-[15px]">
                                                        <p className="text-[10px] font-bold">CHECKOUT</p>
                                                        <p className="text-[14px]">{ item?.check_out }</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                reservationCategory === "Upcoming" && (
                                                    <ButtonCancel
                                                        className="w-full"
                                                        reservation_id={item?.id}
                                                        payment_intent_id={item?.bills?.payment_intent_id}
                                                        status="Upcoming"
                                                        total={item?.bills?.total_amount}
                                                        list={list}
                                                        setList={setList}
                                                    />
                                                )
                                            }

                                            {
                                                reservationCategory === "Arriving soon" && (
                                                    <div className="flex gap-x-[5px]">
                                                        <ButtonCheckIn
                                                            className="w-[70%]"
                                                            reservation_id={item?.id}
                                                            check_in={item?.check_in}
                                                            list={list}
                                                            setList={setList}
                                                        />

                                                        <ButtonCancel
                                                            className="w-[30%]"
                                                            reservation_id={item?.id}
                                                            payment_intent_id={item?.bills?.payment_intent_id}
                                                            status="Arriving soon"
                                                            total={item?.bills?.total_amount}
                                                            list={list}
                                                            setList={setList}
                                                        />
                                                    </div>
                                                )
                                            }

                                            {
                                                (reservationCategory === "Currently hosting" || reservationCategory === "Checking out") && (
                                                    <ButtonCheckOut
                                                        className="w-full"
                                                        reservation_id={item?.id}
                                                        check_out={item?.check_out}
                                                        list={list}
                                                        setList={setList}
                                                    />
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}