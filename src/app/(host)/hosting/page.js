"use client"

import { useEffect, useState } from "react";
import { useTokenContext } from "@/context/TokenProvider";

import Image from "next/image";
import ButtonAddProperty from "./components/ButtonAddProperty";
import ButtonProperty from "./components/ButtonProperty";
import { TbDeviceIpadX } from "react-icons/tb";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
// import WrapperModifyStuff from "@/components/WrapperModifyStuff";

import { get_properties_action } from "@/actions/property";
import clientRefresh from "@/utils/clientRefresh";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function HostingPage() {
    const router = useRouter();
    const [properties, setProperties] = useState({});
    const { setTokens } = useTokenContext();

    useEffect(() => {
        (async () => {
            const refresh = clientRefresh({
                router,
                setTokens
            });

            const properties = await get_properties_action(refresh?.accessToken);
            if (properties === 401) {
                router.push("/sign-out");
                return;
            }
            if (!properties?.success) {
                toast.error(properties?.message);
                return;
            }

            setProperties(properties);
        })();
    }, []);

    return (
        <div className="space-y-[50px] py-[60px] px-[24px] md:px-[80px]">
            <div className="flex items-center justify-between">
                <h2 className="text-[32px] font-semibold">Your listings</h2>

                <ButtonAddProperty />
            </div>

            {
                (properties?.success && properties?.resultGet.length > 0) &&
                (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-[15px]">
                        {
                            result.resultGet.map((property, index) => {
                                return (
                                    <Dialog key={property.id}>
                                        <DialogTrigger>
                                            <div className="relative">
                                                {
                                                    property?.images.find(image => image?.image_cover) ?
                                                    (
                                                        <Image
                                                            width="960"
                                                            height="600"
                                                            src={(property?.images?.find(image => image?.image_cover))?.image_url}
                                                            alt={`Image ${index + 1}`}
                                                            className="aspect-square bg-slate-300 rounded-[10px] object-cover"
                                                            priority={true}
                                                        />
                                                    ) :
                                                    (
                                                        <div className="aspect-square bg-slate-300 rounded-[10px]"></div>
                                                    )
                                                }
                                                

                                                <div className="absolute top-[15px] left-[15px]">
                                                    {
                                                        property.create_complete ?
                                                        (
                                                            <>
                                                                {
                                                                    property.status ? 
                                                                    (
                                                                        <div className="flex items-center justify-center gap-x-[10px] px-[15px] py-[10px] bg-white rounded-full text-[14px] font-medium">
                                                                            <span className="inline-block w-[10px] h-[10px] bg-green-600 rounded-full" />
                                                                            <p>In operation</p>
                                                                        </div>
                                                                    ) :
                                                                    (
                                                                        <div className="flex items-center justify-center gap-x-[10px] px-[15px] py-[10px] bg-white rounded-full text-[14px] font-medium">
                                                                            <span className="inline-block w-[10px] h-[10px] bg-slate-400 rounded-full" />
                                                                            <p>Unlisted</p>
                                                                        </div>
                                                                    )
                                                                }
                                                            </>
                                                        ) :
                                                        (
                                                            
                                                            <div className="flex items-center justify-center gap-x-[10px] px-[15px] py-[10px] bg-white rounded-full text-[14px] font-medium">
                                                                <span className="inline-block w-[10px] h-[10px] bg-yellow-600 rounded-full" />
                                                                <p>In progress</p>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </DialogTrigger>

                                        <DialogContent className="p-[20px] rounded-[10px]">
                                            <div className="relative pt-[60px] space-y-[40px]">
                                                <div className="flex flex-col items-center justify-center space-y-[15px]">
                                                    {
                                                        property.images.length > 0 ?
                                                        (
                                                            <Image
                                                                width="960"
                                                                height="600"
                                                                src={(property?.images?.find(image => image?.image_cover))?.image_url}
                                                                alt={`Image ${index + 1}`}
                                                                className="w-[150px] h-[150px] rounded-[5px] object-cover"
                                                                priority={true}
                                                            />
                                                        ) :
                                                        (
                                                            <div className="w-[150px] h-[150px] rounded-[5px] bg-slate-400"></div>
                                                        )
                                                    }
                                                    <DialogTitle><p className="text-[15px] font-medium">Your unique space listing</p></DialogTitle>
                                                </div>

                                                <ButtonProperty id={property.id} create_complete={property?.create_complete} />
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                )
                            })
                        }
                    </div>
                )
            }

            {
                (properties?.success && properties?.resultGet?.length === 0) && 
                (
                    <div className="flex items-center justify-center py-[40px] rounded-[10px] w-full bg-neutral-100">
                        <div className="flex flex-col items-center justify-center gap-y-[15px]">
                            <TbDeviceIpadX size={30} />
                            <p className="max-w-[320px] text-center">You don't have any properties. You can create a new property by clicking the + icon above</p>
                        </div>
                    </div>
                )
            }

            {
                !properties?.success && 
                (
                    <div className="flex items-center justify-center py-[40px] rounded-[10px] w-full bg-neutral-100">
                        <div className="flex flex-col items-center justify-center gap-y-[15px]">
                            <TbDeviceIpadX size={30} />
                            <p className="max-w-[320px] text-center">{ result?.result?.message }</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}