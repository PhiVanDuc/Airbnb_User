"use client"

import { useContext, useEffect, useState, useRef } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { StepContext } from "@/context/StepProvider";
import { TokenContext } from "@/context/TokenProvider";

import { Button } from "@/components/ui/button";
import { list } from "../listSteps";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import _ from "lodash";
import { update_property_action } from "@/actions/property";
import clientRefresh from "@/utils/clientRefresh";

export default function NavigateBar() {
    const router = useRouter();
    const { id } = useParams();
    const param = usePathname().split("/").filter(Boolean).pop();

    const [isTransitionActive, setIsTransitionActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const { stepContext, setStepContext } = useContext(StepContext);
    const { setTokens } = useContext(TokenContext);

    const { step_1, step_3 } = list;
    const first = useRef();
    const second = useRef();
    const third = useRef();

    useEffect(() => {
        const { step_1, step_2, step_3 } = list;

        if (first.current) {
            const widthContainerBar = first.current.offsetWidth;

            if (first.current) {
                const position = step_1.findIndex(step => step === param);
                const bar = first.current.querySelector(".first_bar");

                if (step_1.includes(param)) bar.style.width = (widthContainerBar * (position / step_1.length)) + "px";
                if (step_2.includes(param) || step_3.includes(param)) bar.style.width = widthContainerBar + "px";
            }
    
            if (second.current) {
                const position = step_2.findIndex(step => step === param);
                const bar = second.current.querySelector(".second_bar");

                if (step_1.includes(param)) bar.style.width = "0px";
                if (step_2.includes(param)) bar.style.width = (widthContainerBar * (position / step_2.length)) + "px";
                if (step_3.includes(param)) bar.style.width = widthContainerBar + "px";
            }
    
            if (third.current) {
                const position = step_3.findIndex(step => step === param);
                const bar = third.current.querySelector(".third_bar");

                if (step_1.includes(param) || step_2.includes(param)) bar.style.width =  "0px";
                if (step_3.includes(param)) bar.style.width = (widthContainerBar * (position / step_3.length)) + "px";
            }
        }
    }, [])

    const handleNext = async () => {
        const arrList = Object.entries(list);
        if (!isTransitionActive) setIsTransitionActive(true);

        if (stepContext?.step && Object.keys(stepContext?.step)?.length > 1) {
            setStepContext(state => {
                let step = Object.entries({...state?.step});
                const length = step?.length - 1;

                for(let i = 0; i < length; i++) {
                    if (step[length][1]) break;

                    if (step[i][1]) {
                        step[i][1] = false;
                        step[i + 1][1] = true;
                        break;
                    }
                }
                step = Object.fromEntries(step);

                return {
                    ...state,
                    step
                }
            });

            const step = Object.entries(stepContext?.step);
            if (!step[step.length - 1][1]) return;
        }
        
        setLoading(true);
        const { param, value } = stepContext;

        const refresh = await clientRefresh({
            router,
            setTokens
        });

        let update;
        
        switch(param) {
            case "structure":
                update = await update_property_action(
                    {
                        id,
                        data: {
                            structure: value?.structure
                        }
                    },
                    refresh?.accessToken
                )
                break;
            case "privacy-type":
                update = await update_property_action(
                    {
                        id,
                        data: {
                            privacy_type: value?.privacy_type
                        }
                    },
                    refresh?.accessToken
                )
                break;
            case "location":
                console.log(value);
                
                update = await update_property_action(
                    {
                        id,
                        data: {
                            address: (value?.details_address)?.trim() + ", " + (value?.address)?.trim(),
                            longitude: value?.longitude,
                            latitude: value?.latitude,
                        }
                    },
                    refresh?.accessToken
                )
                break;
            case "floor-plan":
                update = await update_property_action(
                    {
                        id,
                        data: {
                            people_count: value?.guests,
                            bedroom_count: value?.bedrooms,
                            beds_count: value?.beds,
                            bathroom_count: value?.bathrooms,
                            property_count: value?.properties
                        }
                    },
                    refresh?.accessToken
                )
                break;
            case "utilities":
                update = await update_property_action(
                    {
                        id,
                        data: {
                            ids: [...value?.favorite, ...value?.standout, ...value?.safety]
                        },
                        relation: "utilities"
                    },
                    refresh?.accessToken
                )
                break;
            case "title":
                update = await update_property_action(
                    {
                        id,
                        data: {
                            title: value
                        },
                    },
                    refresh?.accessToken
                )
                break;
            case "description":
                update = await update_property_action(
                    {
                        id,
                        data: {
                            description: value
                        },
                    },
                    refresh?.accessToken
                )
                break;
            case "price":
                update = await update_property_action(
                    {
                        id,
                        data: {
                            base_price: value?.root_price,
                            profit_price: value?.profit_price
                        },
                    },
                    refresh?.accessToken
                )
                break;
        }

        if (update && !update?.success) toast.error(update?.message);
        setLoading(false);

        arrList.forEach((step, index) => {
            const arrStep = step[1];

            if (arrStep.includes(param)) {
                const position = arrStep.indexOf(param);

                if (index >= 0 && index <= arrList.length - 1) {
                    if (position >= 0 && position <= arrStep.length - 2) {
                        router.replace(arrStep[position + 1]);
                    }
                    else if (position === arrStep.length - 1 && index < arrList.length - 1) {
                        router.replace(((arrList[index + 1])[1])[0]);
                    }
                    else if (position === arrStep.length - 1 && index === arrList.length - 1) {
                        router.replace(((arrList[0])[1])[0]);
                    }
                }
            }
        })
    }

    const handleBack = () => {
        const arrList = Object.entries(list);
        if (!isTransitionActive) setIsTransitionActive(true);

        arrList.forEach((step, index) => {
            const arrStep = step[1];

            if (arrStep.includes(param)) {
                const position = arrStep.indexOf(param);

                // Thực hiện logic chuyển url
                if (index >= 0 && index <= arrList.length - 1) {
                    if (position > 0) {
                        router.replace(arrStep[position - 1]);
                    }
                    else if (position === 0 && index > 0) {
                        router.replace(((arrList[index -1])[1])[(arrList[index -1])[1]?.length - 1]);
                    }
                }
            }
        })
    }

    return (
        <div className={cn(
            "bg-white",
            param === step_3[step_3.length - 1] && "hidden"
        )}>
            <div className="flex items-center gap-x-[5px]">
                <div className="container_bar relative bg-slate-200 rounded-r-full h-[7px] grow overflow-hidden" ref={first}>
                    <span 
                        className={cn(
                            "first_bar absolute inline-block rounded-full top-0 bottom-0 left-0 bg-slate-600",
                            isTransitionActive && "transition-width"
                        )}
                        style={
                            {
                                width: (() => {
                                    if (first.current) {
                                        const { step_1, step_2, step_3 } = list;

                                        const position = step_1.findIndex(step => step === param);
                                        const widthContainerBar = first.current.offsetWidth;

                                        if (step_1.includes(param)) return (widthContainerBar * (position / step_1.length)) + "px";
                                        if (step_2.includes(param) || step_3.includes(param)) return widthContainerBar + "px";
                                    }

                                    return "0px";
                                })()
                            }
                        }
                    />
                </div>

                <div className="relative bg-slate-200 rounded-full h-[7px] grow overflow-hidden" ref={second}>
                    <span 
                        className={cn(
                            "second_bar absolute inline-block rounded-full top-0 bottom-0 left-0 bg-slate-600",
                            isTransitionActive && "transition-width"
                        )}
                        style={
                            {
                                width: (() => {
                                    if (second.current) {
                                        const { step_1, step_2 } = list;

                                        const position = step_2.findIndex(step => step === param);
                                        const widthContainerBar = second.current.offsetWidth;

                                        if (step_1.includes(param)) return "0px";
                                        if (step_2.includes(param)) return (widthContainerBar * (position / step_2.length)) + "px";
                                        if (step_3.includes(param)) return widthContainerBar + "px";
                                     }

                                    return "0px";
                                })()
                            }
                        }
                    />
                </div>

                <div className="relative bg-slate-200 rounded-s-full h-[7px] grow overflow-hidden" ref={third}>
                    <span 
                        className={cn(
                            "third_bar absolute inline-block rounded-full top-0 bottom-0 left-0 bg-slate-600",
                            isTransitionActive && "transition-width"
                        )}
                        style={
                            {
                                width: (() => {
                                    if (third.current) {
                                        const { step_1, step_2, step_3 } = list;

                                        const position = step_3.findIndex(step => step === param);
                                        const widthContainerBar = third.current.offsetWidth;

                                        if (step_1.includes(param) || step_2.includes(param)) return "0px";
                                        if (step_3.includes(param)) return (widthContainerBar * (position / step_3.length)) + "px";
                                     }

                                    return "0px";
                                })()
                            }
                        }
                    />
                </div>
            </div>

            <div
                className={cn(
                    "px-[24px] md:px-[60px] py-[20px] text-right",
                    (param && param !== step_1[0]) && "flex w-full items-center justify-between text-left",
                )}
            >
                <Button 
                    className={cn(
                        "hidden text-[16px] font-medium w-[100px]",
                        (param && param !== step_1[0]) && "inline-block"
                    )}
                    variant="ghost"
                    onClick={handleBack}
                    disabled={loading}
                >
                    Back
                </Button>

                <Button 
                    className="text-[16px] font-medium w-[100px]"
                    onClick={handleNext}
                    disabled={loading || !stepContext.isValid}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}