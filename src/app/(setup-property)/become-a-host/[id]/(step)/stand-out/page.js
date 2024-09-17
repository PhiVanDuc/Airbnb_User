"use client"

import { StepContext } from "@/context/StepProvider";
import { useContext, useEffect } from "react";

export default function StandOutPage() {
    const { setStepContext } = useContext(StepContext);

    useEffect(() => {
        setStepContext({
            param: "stand-out",
            isValid: true,
        })
    }, []);

    return (
        <div className="flex justify-center h-full w-full">
            <div className="my-auto">
                <div className="flex flex-col md:flex-row md:items-center">
                    <div className="max-w-[540px] order-2 lg:order-1">
                        <h3 className="text-[16px] lg:text-[18px] font-semibold mb-[10px]">Step 2</h3>
                        <h2 className="text-[32px] lg:text-[46px] font-semibold mb-[10px]">Make your place stand out</h2>
                        <p className="text-[16px] lg:text-[18px] pb-[20px] lg:pb-0 text-pretty">In this step, you’ll add some of the amenities your place offers, plus 5 or more photos. Then, you’ll create a title and description.</p>
                    </div>

                    <div className="w-full md:w-[600px] md:max-x-[600px] order-1 md:order-2">
                        <video
                            autoPlay
                            muted
                            preload="auto"
                            className="outline outline-[10px] outline-white outline-offset-[-5px] w-full h-full object-cover"
                        >
                            <source src="https://stream.media.muscache.com/H0101WTUG2qWbyFhy02jlOggSkpsM9H02VOWN52g02oxhDVM.mp4?v_q=high" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
        </div>
    )
}