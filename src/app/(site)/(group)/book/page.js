import Link from "next/link";
import { redirect } from "next/navigation";

import { LuChevronLeft } from "react-icons/lu";
import StripeComponent from "./components/StripeComponent";

import { decrypt } from "@/lib/jwt";
import { displayDateFunc } from "@/utils/calcDate";
import Image from "next/image";

export default async function BookPage({ searchParams }) {
    const { info } = searchParams;
    if (!info) redirect("/");

    const decode = await decrypt(info);
    const { success, payload } = decode;
    if (!success) redirect("/");

    const { property_id, title, privacy_type, cover_image, people_count, bedroom_count, beds_count, bathroom_count, startDate, endDate, nights, base_price, airbnb_fee, total } = payload;

    return (
        <div className="mt-[40px] space-y-[40px]">
            <div className="flex items-center justify-between gap-x-[20px]">
                <h2 className="text-[30px] font-semibold text-neutral-700">Confirm and pay</h2>

                <Link
                    href={`/property/${property_id}`}
                    className="group flex items-center justify-center w-[35px] h-[35px] rounded-full bg-neutral-50 hover:bg-neutral-100 hover:shadow-sm transition-all"
                >
                    <LuChevronLeft 
                        size={25}
                        className="text-neutral-400 group-hover:text-neutral-800"
                    />
                </Link>
            </div>

            <div className="relative flex items-start gap-x-[80px]">
                <div className="w-[65%] gap-y-[40px] space-y-[40px]">
                    <div className="space-y-[20px] pb-[30px] border-b border-neutral-300">
                        <h3 className="text-[22px] font-semibold">Your trip</h3>

                        <div className="flex items-start justify-between">
                            <div className="space-y-[5px]">
                                <h4 className="text-[16px] font-semibold">Dates</h4>
                                <p className="text-[14px] lg:text-[16px] text-neutral-500">{ displayDateFunc(startDate)?.startDate } - { displayDateFunc(undefined, endDate)?.endDate }</p>
                            </div>

                            <p className="text-[16px] font-semibold underline cursor-pointer">Edit</p>
                        </div>

                        <div>
                            <h4 className="text-[16px] font-semibold">Layout</h4>

                            <div className="flex items-center gap-x-[5px] text-[14px] lg:text-[16px] text-neutral-500 flex-wrap">
                                <p className="shrink-0">{people_count} guest{+people_count > 1 && "s"}</p>
                                <span>-</span>
                                <p className="shrink-0">{bedroom_count} bedroom{+bedroom_count > 1 && "s"}</p>
                                <span>-</span>
                                <p className="shrink-0">{beds_count} bed{+beds_count > 1 && "s"}</p>
                                <span>-</span>
                                <p className="shrink-0">{bathroom_count} bathroom{+bathroom_count > 1 && "s"}</p>
                            </div>
                        </div>
                    </div>

                    <StripeComponent payload={payload} amount={total} />

                    <div className="pb-[30px]">
                        <h3 className="text-[22px] font-semibold mb-[20px]">Ground rules</h3>

                        <div>
                            <p className="text-[16px] pb-[10px]">We ask every guest to remember a few simple things about what makes a great guest.</p>
                            <ul className="list-disc pl-[20px] space-y-[3px]">
                                <li>Follow the house rules</li>
                                <li>Treat your Host’s home like your own</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="sticky top-[30px] w-[35%] rounded-[15px] p-[30px] border border-neutral-300 shadow-md space-y-[30px]">
                    <div className="flex items-center gap-x-[15px] pb-[30px] border-b border-neutral-300">
                        <Image 
                            width={300}
                            height={300}
                            alt="Cover Image"
                            src={cover_image}
                            priority={true}
                            className="w-[100px] aspect-square rounded-[10px] object-cover shadow-sm"
                        />

                        <div className="space-y-[5px]">
                            <p className="text-[16px] font-semibold">{title}</p>
                            <p className="text-[14px] text-neutral-500">
                                { privacy_type === "an_entire_place" && `Entire room` }
                                { privacy_type === "a_room" && `A room` }
                                { privacy_type === "a_share_room" && `A shared room` }
                            </p>
                            <p className="text-[14px] text-neutral-500">Number of comments</p>
                        </div>
                    </div>

                    <div className="space-y-[20px] pb-[30px] border-b border-neutral-300">
                        <h3 className="text-[20px] font-semibold">Price details</h3>
                        
                        <div className="space-y-[10px]">
                            <div className="flex items-center justify-between text-[16px]">
                                <p className="underline text-neutral-600">${base_price} x {nights} night{nights > 1 ? "s" : ""}</p>
                                <p className="font-medium">${ (+base_price) * (+nights) }</p>
                            </div>

                            <div className="flex items-center justify-between text-[16px]">
                                <p className="underline text-neutral-600">Airbnb service fee</p>
                                <p className="font-medium">${airbnb_fee}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <h3 className="text-[16px] font-semibold">Total (USD)</h3>
                        <p className="text-[16px] font-semibold">${total}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
