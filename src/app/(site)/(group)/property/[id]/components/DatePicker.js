"use client"

import { useContext } from "react";
import { DateRangeContext } from "@/context/DateRangeProvider";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"

import calcDate, { isSameDay, displayDateFunc } from "@/utils/calcDate";

export default function DatePicker({ base_price, profit_price }) {
    const { selectionRange, setSelectionRange } = useContext(DateRangeContext);

    const handleSelect = (ranges) => {
        const range = ranges?.selection;        

        setSelectionRange({
            dates: { ...range },
            detail: {
                nights: calcDate(range?.startDate, range?.endDate),
                total: calcDate(range?.startDate, range?.endDate) * (+profit_price)
            }
        });
    };

    return (
        <div className="pb-[40px] border-b border-neutral-300">
            <div className="mb-[30px] space-y-[5px]">
                <h3 id="chooseDate" className="text-[18px] md:text-[22px] font-semibold">
                    {
                        selectionRange?.detail?.nights > 0 ?
                        `Stay within ${selectionRange?.detail?.nights} night${selectionRange?.detail?.nights > 1 ? "s" : ""}` :
                        "Select check-in date"
                    }
                </h3>
                <p className="text-[14px] text-neutral-400 font-medium">
                    {
                        (isSameDay(new Date(), selectionRange?.dates?.startDate) && isSameDay(new Date(), selectionRange?.dates?.endDate)) ?
                        "Add your travel dates for exact pricing" :
                        `${ displayDateFunc(selectionRange?.dates?.startDate)?.startDate } - ${ displayDateFunc(undefined, selectionRange?.dates?.endDate)?.endDate }`
                    }
                </p>
            </div>

            <DateRange
                rangeColors={["#262626"]}
                date={new Date()}
                ranges={[selectionRange?.dates]}
                onChange={handleSelect}
                showDateDisplay={false}
                direction="vertical"
                minDate={new Date()}
                disabledDates={[]}
                className="mb-[20px] w-full"
            />

            <div className="text-right">
                <p 
                    className="inline-block w-fit px-[20px] py-[5px] text-[14px] font-medium rounded-[5px] underline hover:bg-slate-100 cursor-pointer"
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
                        })
                    }}
                >
                    Clear dates
                </p>
            </div>
        </div>
    )
}
