import Image from "next/image";
import MapComponent from "./components/MapComponent";
import NameUserComponent from "./components/NameUserComponent";

import { get_payment_detail_action } from "@/actions/stripe";
import { decrypt } from "@/lib/jwt";
import { redirect } from "next/navigation";
import { convertUnixTime, displayDateFunc } from "@/utils/calcDate";
import { Button } from "@/components/ui/button";
import Buttons from "./components/Buttons";

export default async function PaymentSuccessPage({ searchParams }) {
    const { amount, info, payment_intent, payment_intent_client_secret } = searchParams;
    if (!amount || !info || !payment_intent) redirect("/");

    const detail = await get_payment_detail_action(payment_intent);
    if (detail === 401 || !detail?.result?.success) redirect("/sign-out");
    const { paymentIntent, paymentMethod: { type } } = detail?.result;
    
    const { success, payload } = await decrypt(info);
    if (!success) redirect("/");

    const { user_id, structure, title, privacy_type, cover_image, people_count, bedroom_count, beds_count, bathroom_count, address, longitude, latitude, host, startDate, endDate, nights, base_price, airbnb_fee } = payload;

    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <Image
                width={10000}
                height={10000}
                alt="gradiant background"
                src="/success.jpg"
                priority={true}
                className="fixed left-0 right-0 h-screen object-cover object-center z-0 shadow-sm"
            />

            <div className="relative w-[768px] max-w-[768px] h-[95%] rounded-[10px] border border-black/30 border-black overflow-hidden">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-lg overflow-y-auto custom-scrollbar-success">
                    <div className="p-[30px]">
                        <div className="sticky top-[30px] flex justify-center">
                            <div className="block w-fit bg-white px-[30px] py-[10px] rounded-[10px] z-[99]">
                                <Image
                                    width={80}
                                    height={80}
                                    alt="Logo"
                                    src="/logo.png"    
                                    priority={true}                   
                                />
                            </div>
                        </div>

                        <div className="mt-[31.5px] text-white space-y-[30px]">
                            <NameUserComponent />

                            <div>
                                <Image
                                    width={4000}
                                    height={4000}
                                    alt="Property image"
                                    src={cover_image}
                                    className="w-full aspect-video rounded-[10px] object-cover object-center mb-[20px]"
                                    priority={true}
                                />

                                <div className="flex items-center justify-between gap-x-[30px] pb-[30px] border-b border-white/50">
                                    <div className="space-y-[5px]">
                                        <h3 className="text-[18px] font-semibold">{title}</h3>
                                        <p>
                                            {privacy_type} -
                                            hosted by { host?.fullname }
                                        </p>
                                    </div>

                                    {
                                        host?.image ?
                                        (
                                            <Image
                                                width={100}
                                                height={100}
                                                alt="Avatar host"
                                                src={host?.image}

                                            />
                                        ) :
                                        <div className="shrink-0 w-[50px] aspect-square rounded-full bg-slate-300"></div>
                                    }
                                </div>
                            </div>

                            <div className="flex items-start justify-between pb-[30px] border-b border-white/50">
                                <div className="space-y-[5px]">
                                    <h3 className="text-[14px] font-semibold">CHECK-IN</h3>
                                    <p className="text-[14px] font-medium">{displayDateFunc(startDate)?.startDate}</p>
                                </div>

                                <div className="space-y-[5px] text-right">
                                    <h3 className="text-[14px] font-semibold">CHECKOUT</h3>
                                    <p className="text-[14px] font-medium">{displayDateFunc(undefined, endDate)?.endDate}</p>
                                </div>
                            </div>

                            <div className="space-y-[20px] pb-[30px] border-b border-white/50">
                                <h3 className="text-[18px] font-semibold">Address</h3>

                                <div className="space-y-[10px]">
                                    <p className="text-[14px]">{address}</p>
                                    <MapComponent mapbox_access_token={process.env.MAPBOX_ACCESS_TOKEN} longitude={longitude} latitude={latitude} />
                                </div>
                            </div>

                            <div className="space-y-[20px]">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-[5px]">
                                        <h3 className="text-[16px] font-semibold">RESERVATION ID</h3>
                                        <p className="text-[14px]">{ paymentIntent?.id }</p>
                                    </div>

                                    <div className="text-right space-y-[5px]">
                                        <h3 className="text-[16px] font-semibold text-rootColor">PAID</h3>
                                        <p className="text-[14px]">{ convertUnixTime(paymentIntent?.created)?.time } { convertUnixTime(paymentIntent?.created)?.amPm }</p>
                                    </div>
                                </div>

                                <div className="bg-neutral-50 p-[30px] space-y-[20px] text-black rounded-[5px]">
                                    <div className="border-b border-neutral-300 pb-[20px] space-y-[5px] text-[14px]">
                                        <div className="flex items-center justify-between">
                                            <p className="underline">${base_price} x {nights} night{+nights > 1 ? "s" : ""}</p>
                                            <p className="font-medium">${+base_price * +nights}</p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <p className="underline">Airbnb fee</p>
                                            <p className="font-medium">${airbnb_fee}</p>
                                        </div>
                                    </div>

                                    <div className="text-[14px] space-y-[10px]">
                                        <div className="flex items-center justify-between">
                                            <p className="text-neutral-500">Payment method</p>
                                            <p className="text-neutral-500">{ type }</p>
                                        </div>

                                        <div className="flex items-center justify-between text-[16px]">
                                            <p className="font-semibold">Total</p>
                                            <p className="font-semibold">${ (+base_price * +nights) + (+airbnb_fee) }</p>
                                        </div>
                                    </div>
                                </div>

                                <Buttons />
                            </div>
                        </div>
                    </div>

                    <div className="text-center py-[30px] px-[20px] bg-neutral-700 text-white text-[15px] space-y-[5px]">
                        <p>Thank you for making reservation with <span className="font-semibold text-rootColor text-[16px]">Airbnb</span>.</p>
                        <p>Pack your bags and have a lovely trip!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
