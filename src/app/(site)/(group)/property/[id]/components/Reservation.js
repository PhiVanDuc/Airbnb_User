"use client"

import { useState, useContext, useEffect} from "react";
import { useRouter } from "next/navigation";
import { DateRangeContext } from "@/context/DateRangeProvider";
import { ReservationContext } from "@/context/ReservationProvider";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import calcDate, { displayDateFunc } from "@/utils/calcDate";
import { encrypt } from "@/lib/jwt";

export default function Reservation(
    {
        property_id,
        structure,
        privacy_type,
        address,
        longitude,
        latitude,
        people_count,
        bedroom_count,
        beds_count,
        bathroom_count,
        title,
        base_price,
        profit_price,
        users,
        cover_image
    }
) {
    const router = useRouter();

    const { selectionRange, setSelectionRange } = useContext(DateRangeContext);
    const { setReservationInfo } = useContext(ReservationContext);
    const [displayDate, setDisplayDate] = useState(() => displayDateFunc(selectionRange?.dates?.startDate, selectionRange?.dates?.endDate));
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleSelect = (ranges) => {
        const range = ranges?.selection;        

        setSelectionRange({
            dates: { ...range },
            detail: {
                nights: calcDate(range?.startDate, range?.endDate),
                total: calcDate(range?.startDate, range?.endDate) * (+profit_price)
            }
        });
        setDisplayDate(() => displayDateFunc(range?.startDate, range?.endDate));
    };

    const handleReservation = async () => {
        const jwt = await encrypt({
            property_id,
            structure,
            title,
            privacy_type,
            cover_image,
            people_count,
            bedroom_count,
            beds_count,
            bathroom_count,
            address,
            longitude,
            latitude,
            host: {
                id: users?.id,
                image: users?.image,
                fullname: users?.fullname,
                email: users?.email,
                phone_number: users?.phone_number
            },
            startDate: selectionRange?.dates?.startDate,
            endDate: selectionRange?.dates?.endDate,
            nights: selectionRange?.detail?.nights,
            base_price,
            airbnb_fee: (+selectionRange?.detail?.nights) * Math.ceil((+base_price) * (15 / 100)),
            total: selectionRange?.detail?.total
        });

        if (!jwt) {
            toast.error("Data packaging error!");
            return;
        }

        router.push(`/book?info=${jwt}`);
    }

    useEffect(() => {
        setReservationInfo({
            property_id,
            structure,
            title,
            privacy_type,
            cover_image,
            people_count,
            bedroom_count,
            beds_count,
            bathroom_count,
            address,
            longitude,
            latitude,
            host: {
                id: users?.id,
                image: users?.image,
                fullname: users?.fullname,
                email: users?.email,
                phone_number: users?.phone_number
            },
            startDate: selectionRange?.dates?.startDate,
            endDate: selectionRange?.dates?.endDate,
            nights: selectionRange?.detail?.nights,
            base_price,
            airbnb_fee: (+selectionRange?.detail?.nights) * Math.ceil((+base_price) * (15 / 100)),
            total: selectionRange?.detail?.total
        });
    }, [selectionRange]);

    return (
        <div
            className="hidden lg:block sticky top-[40px] w-full lg:w-[35%] p-[30px] rounded-[10px] border border-neutral-300 shadow-lg h-fit space-y-[20px]"
        >   
            <p className="text-[16px]"><span className="text-[22px] font-semibold">${base_price}</span> / night</p>

            <div
                className="relative flex items-center border border-neutral-300 rounded-[5px] cursor-pointer"
                onClick={() => { setShowDatePicker(true) }}
            >
                <div className="w-[50%] border-r border-neutral-300 p-[10px] space-y-[5px]">
                    <p className="text-[10px] font-bold">CHECK-IN</p>
                    <p className="text-[13px] font-medium whitespace-nowrap truncate">{ displayDate?.startDate }</p>
                </div>
                <div className="w-[50%] p-[10px] space-y-[5px]">
                    <p className="text-[10px] font-bold">CHECKOUT</p>
                    <p className="text-[13px] font-medium whitespace-nowrap truncate">{ displayDate?.endDate }</p>
                </div>

                <div className={cn(
                    "absolute p-[20px] border border-neutral-300 bg-white rounded-[10px] w-[400px] top-0 left-[-420px] space-y-[20px] shadow-md",
                    showDatePicker ? "block" : "hidden"
                )}>
                    <DateRange
                        rangeColors={["#262626"]}
                        date={new Date()}
                        ranges={[selectionRange?.dates]}
                        onChange={handleSelect}
                        showDateDisplay={false}
                        direction="vertical"
                        minDate={new Date()}
                        disabledDates={[]}
                    />
                    
                    <div className="w-full text-right space-x-[20px]">
                        <Button
                            className="w-[100px]"
                            variant="ghost"
                            onClick={() => {
                                setSelectionRange({
                                    dates: {
                                        startDate: new Date(),
                                        endDate: new Date(),
                                        key: 'selection'
                                    },
                                    detail: {
                                        nights: 0,
                                        total: 0,
                                    }
                                });

                                setDisplayDate(() => displayDateFunc(new Date(), new Date()));
                            }}
                        >
                            Clear
                        </Button>

                        <Button 
                            className="w-[100px]"
                            onClick={(event) => {
                                event?.stopPropagation();
                                setShowDatePicker(false);
                            }}
                        >
                            Close
                        </Button>
                    </div>
                </div>

                
            </div>

            <Button
                className="bg-rootColor w-full hover:bg-rootColor"
                disabled={+calcDate(selectionRange?.dates?.startDate, selectionRange?.dates?.endDate) < 2}
                onClick={handleReservation}
            >
                Reservation
            </Button>

            {
                selectionRange?.detail?.nights > 0 ?
                (
                    <div className="space-y-[5px]">
                        <div className="flex items-center justify-between text-[16px]">
                            <p className="underline text-neutral-600">
                                ${base_price} x {selectionRange?.detail?.nights} night{selectionRange?.detail?.nights > 1 ? "s" : ""}
                            </p>
                            <p className="font-medium">${(+base_price) * (+selectionRange?.detail?.nights)}</p>
                        </div>

                        <div className="flex items-center justify-between text-[16px]">
                            <p className="underline text-neutral-600">Airbnb service fee</p>
                            <p className="font-medium">${(+selectionRange?.detail?.nights) * Math.ceil((+base_price) * (15 / 100))}</p>
                        </div>
                    </div>
                ) :
                ""
            }

            <div className="flex justify-between items-center text-[14px] xl:text-[16px] font-semibold w-full">
                <p>Total before taxes:</p>
                <p>${ selectionRange?.detail?.total }</p>
            </div>
        </div>
    )
}
