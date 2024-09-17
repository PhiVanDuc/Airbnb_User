"use client"

import { useContext, useEffect, useState } from "react";
import { StepContext } from "@/context/StepProvider";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { FiEdit2 } from "react-icons/fi";
import Image from "next/image";
import RenderIcon from "../components/RenderIcon";

import { decrypt } from "@/lib/jwt";

export default function Receipt({ result }) {
    const { setStepContext } = useContext(StepContext);
    const [userInfo, setUserInfo] = useState({});
    const [propertyInfo, setPropertyInfo] = useState(result?.resultGet || {}) 

    useEffect(() => {
        (async () => {
            setStepContext({
                param: "receipt",
                isValid: true,
            });
    
            const jwt = localStorage.getItem("info_user");
            const decode = await decrypt(jwt);
            if (decode?.success) setUserInfo(decode?.payload);
        })();
    }, []);

    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-[850px] max-w-[850px] space-y-[40px] my-auto">
                <div className="space-y-[5px]">
                    <h2 className="text-[26px] lg:text-[30px] font-semibold">
                        Review your listing
                    </h2>

                    <p className="text-[14px] md:text-[16px] lg:text-[18px] text-slate-400">
                        Here's what we'll show to guests. Make sure everything looks good.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-y-[60px] md:gap-y-0 md:gap-x-[60px]">
                    <Dialog asChild>
                        <DialogTrigger className="w-full md:w-[45%] p-[20px] rounded-[15px] shadow-lg border border-slate-100 space-y-[15px]">
                            <Image
                                width={500}
                                height={300}
                                src={(propertyInfo?.images?.find(image => image?.image_cover))?.image_url}
                                alt="Cover image"
                                priority={true}
                                className="w-full h-[300px] rounded-[15px] object-cover"
                            />

                            <div className="space-y-[5px] text-left">
                                <h5 className="text-[14px] font-medium">{ propertyInfo?.title || "Title loading..." }</h5>
                                <p className="text-[14px]">
                                    <span className="font-semibold">$ { propertyInfo?.profit_price } / </span>
                                    night
                                </p>
                            </div>
                        </DialogTrigger>

                        <DialogContent className="p-0 max-w-[300px] xl:max-w-[1000px]">
                            <DialogHeader className="border-b border-slate-300 p-[20px]">
                                <DialogTitle className="text-[14px] xl:text-[16px] font-semibold xl:font-bold text-center">Full preview</DialogTitle>
                            </DialogHeader>

                            <div className="xl:flex gap-x-[20px] p-[20px] h-[70vh] overflow-y-auto space-y-[40px] xl:space-y-0">
                                <div className="xl:p-[20px] w-full xl:w-[50%] h-[200px] xl:h-[450px]">
                                    <Image
                                        width={500}
                                        height={300}
                                        src={(propertyInfo?.images?.find(image => image?.image_cover))?.image_url}
                                        alt="Cover image"
                                        priority={true}
                                        className="w-full h-full rounded-[15px] select-none object-cover"
                                    />
                                </div>

                                <div className="xl:p-[20px] w-full xl:w-[50%] xl:h-full xl:overflow-y-auto xl:no-scrollbar">
                                    <h3 className="text-[28px] xl:text-[32px] font-bold">{ propertyInfo?.title || "Title loading..." }</h3>

                                    <div className="flex flex-col xl:flex-row items-center justify-between py-[32px] border-b border-slate-200 gap-y-[30px] xl:gap-x-[20px] xl:gap-y-0">
                                        <div className="space-y-[5px]">
                                            <h3 className="text-[18px] xl:text-[20px] font-medium">Category hosted by {userInfo?.fullname}</h3>
                                            <p className="text-[13px] xl:text-[16px] max-w-[300px] flex items-center">
                                                {propertyInfo?.people_count + " "} guests - {propertyInfo?.bedroom_count + " "} bedroom - {propertyInfo?.beds_count + " "} bed - {propertyInfo?.bathroom_count + " "} bath - {propertyInfo?.property_count + " "} properties
                                            </p>
                                        </div>
                                        <div className="shrink-0 w-[55px] h-[55px] rounded-full bg-slate-400"></div>
                                    </div>

                                    <p className="py-[32px] text-[16px] border-b border-slate-200">{ propertyInfo?.description }</p>

                                    <div className="space-y-[20px] py-[32px] border-b border-slate-200">
                                        <h4 className="text-[16px] font-medium">Utilities</h4>

                                        {
                                            propertyInfo?.utilities?.map(utility => {
                                                return (
                                                    <div className="flex items-center justify-between" key={utility?.id}>
                                                        <p className="text-[14px]">{ utility?.utility }</p>
                                                        <RenderIcon prefix={utility?.prefix_icon} name_icon={utility?.icon} s={20} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className="space-y-[20px] pt-[30px]">
                                        <h4 className="text-[16px] font-medium">Location</h4>

                                        <div>
                                            <p className="text-[16px]">{ propertyInfo?.address }</p>
                                            <p className="text-[13px] text-slate-400">We’ll only share your address with guests who are booked as outlined in our</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <div className="w-full md:w-[55%]">
                        <h3 className="text-[22px] font-semibold mb-[30px]">What's new?</h3>
                        
                        <div className="flex gap-x-[15px] items-start">
                            <FiEdit2 size={45} />
                            <div className="space-y-[5px]">
                                <h4 className="text-[18px] font-semibold">Adjust your settings</h4>
                                <p className="text-[14px] text-slate-500">Set house rules, select a cancellation policy, choose how guests book, and more.  </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
