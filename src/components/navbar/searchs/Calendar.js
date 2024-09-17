"use client"

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { useEffect } from 'react';
import { DateRange } from 'react-date-range';

export default function Calendar({ dates, setDates, clear, setClear }) {
    useEffect(() => {
        if (clear?.country) {
            setDates([
                {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: "selection"
                }
            ]);
            
            setClear({
                ...clear,
                calendar: false
            });
        }
    }, [clear]);

    return (
        <div className='border border-slate-200 overflow-hidden rounded-[5px] min-w-[280px] w-full'>
            <DateRange
                rangeColors={["#000"]}
                onChange={item => setDates([item.selection])}
                showDateDisplay={false}
                months={1}
                ranges={dates}
                minDate={new Date()}
                direction="vertical"
                className='w-full'
            />
        </div>
    )
}
