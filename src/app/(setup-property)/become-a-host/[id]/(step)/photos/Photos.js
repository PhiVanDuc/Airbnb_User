"use client"

import { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { StepContext } from "@/context/StepProvider";
import { TokenContext } from "@/context/TokenProvider";

import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { CldUploadWidget } from "next-cloudinary";
const PRESET_NAME = "py4bcdaq";

import clientRefresh from "@/utils/clientRefresh";
import { add_image_action, edit_image_action } from "@/actions/property";
import { delete_cloudinary_action } from "@/actions/cloudinary";

export default function Photos({ result }) {
    const router = useRouter();
    const { id } = useParams();
    const [isOpenWidget, setIsOpenWidget] = useState(true);
    const [urlImages, setUrlImages] = useState({
        main: (() => {
            const images = result?.resultGet?.images;
            if (!images || images?.length === 0) return [];

            const coverIndex = images?.findIndex(image => image?.image_cover);

            if (coverIndex !== 0) {
                [images[0], images[coverIndex]] = [images[coverIndex], images[0]]
            }

            return images?.map(image => {
                return {
                    image_url: image?.image_url,
                    image_cover: image?.image_cover
                }
            })
        })() || [],
        temp: [],
    });
    const [pending, setPending] = useState(false);

    const { setStepContext } = useContext(StepContext);
    const { setTokens } = useContext(TokenContext);

    useEffect(() => {
        setStepContext({
            param: "photos",
            value: urlImages,
            isValid: urlImages?.main?.length >= 5,
        });
    }, [urlImages]);

    useEffect(() => {
        (async () => {
            setPending(true);

            if (!isOpenWidget && urlImages?.temp?.length > 0) {
                const refresh = await clientRefresh({
                    router,
                    setTokens
                });

                const add = await add_image_action(
                    {
                        image_urls: urlImages?.temp,
                        property_id: id,
                    },
                    refresh?.accessToken
                );
                if (add === 401) router.replace("/sign-out");
                else if (!add?.success) toast.error(add?.message);
                else if (add?.success) {
                    setUrlImages(old => {
                        return {
                            ...old,
                            temp: [],
                        }
                    });
                    toast.success(add?.message);
                }
            }

            setPending(false);
        })();
    }, [isOpenWidget]);

    const handleSuccessUpload = (event) => {
        const url = event.info.secure_url;
        
        setUrlImages(old => {
            const newObj = {
                ...old,
            }

            if (newObj?.main?.length === 0) {
                return {
                    main: [
                        {
                            image_url: url,
                            image_cover: true
                        }
                    ],
                    temp: [
                        {
                            image_url: url,
                            image_cover: true
                        }
                    ]
                }
            }

            return {
                main: [
                    ...newObj?.main,
                    {
                        image_url: url,
                        image_cover: false
                    }
                ],
                temp: [
                    ...newObj?.temp,
                    {
                        image_url: url,
                        image_cover: false
                    }
                ],
            }
        });
    };

    const handleSelectItem = async (data) => {
        const { imageInfo, index, action } = data;
        const { image_url, image_cover } = imageInfo;

        setPending(true);

        const refresh = await clientRefresh({
            router,
            setTokens
        });

        if (action === "cover") {
            const updateZero = await edit_image_action(
                {
                    image_url: urlImages.main[0]?.image_url,
                    image_cover: false
                },
                refresh?.accessToken
            );
    
            const updateIndex = await edit_image_action(
                {
                    image_url: urlImages.main[index]?.image_url,
                    image_cover: true
                },
                refresh?.accessToken
            );
    
            if (updateZero === 401 || updateIndex === 401) router.replace("/sign-out");
            else if (!updateIndex?.success || !updateZero?.success) {
                toast.error("Failed to edit iamges!");
                return;
            }

            setUrlImages(old => {
                const newObj = { ...old };
                const main = [...newObj.main];

                main[index] = {
                    ...main[index],
                    image_cover: true,
                };

                main[0] = {
                    ...main[0],
                    image_cover: false,
                };

                if (index !== 0) {
                    [main[0], main[index]] = [main[index], main[0]];
                }

                newObj.main = main;
                return newObj;
            });
        } 
        else if (action === "delete") {
            const deleteResult = await delete_cloudinary_action(
                { image_url },
                refresh?.accessToken
            );

            if (deleteResult === 401) router.replace("/sign-out");
            else if (!deleteResult?.success) toast.error(deleteResult?.message);
            else {
                setUrlImages(old => {
                    const main = [...old.main];
                    main?.splice(index, 1);
                    
                    old.main = main;
                    return old;
                })

                toast.success(deleteResult?.message);
            }
        }

        setPending(false);
    }

    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-[640px] max-w-[640px] gap-y-[40px] my-auto">
                <div className="space-y-[5px] shrink-0 mb-[5px]">
                    <h2 className="text-[26px] lg:text-[30px] font-semibold">Add some photos of your cabin</h2>
                    <p className="text-[14px] md:text-[16px] lg:text-[18px] text-slate-400">You'll need 5 photos to get started. You can add more or make changes later.</p>
                </div>

                <div
                    className={cn(
                        "border border-slate-400 border-dotted rounded-[5px] h-[600px] bg-slate-50 overflow-y-auto p-[20px]",
                        urlImages?.main?.length > 0 ? "grid grid-cols-1 md:grid-cols-2 auto-rows-max gap-[15px] border-none p-0 bg-white" : "flex flex-col items-center justify-center"
                    )}
                >
                    {
                        urlImages?.main?.map((url, index) => (
                            <div
                                className={cn(
                                    "relative w-full h-[200px] md:h-[150px] rounded-[5px]",
                                    index === 0 && "md:col-span-2 md:h-[300px]"
                                )}
                                key={url.image_url}
                            >
                                <div className="relative w-full h-full inline-block">
                                    <Image
                                        width="960"
                                        height="600"
                                        src={url.image_url}
                                        alt={`Image ${index + 1}`}
                                        className="w-full h-full object-cover rounded-[5px]"
                                        priority={true}
                                    />

                                    {
                                        !url.image_cover && (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="group absolute right-[15px] top-[15px] flex items-center justify-center w-[27px] h-[27px] rounded-full bg-white hover:bg-slate-100 transition-all shadow-lg">
                                                    <BsThreeDotsVertical size={17} className="text-slate-700 group-hover:text-black" />
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end" sideOffset={10}>
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem
                                                            className="px-[20px] py-[10px] text-[15px] cursor-pointer"
                                                            onSelect={() => {
                                                                if (pending) {
                                                                    toast.warning("Images is loading, please wait.");
                                                                    return;
                                                                }

                                                                handleSelectItem({
                                                                    imageInfo: url,
                                                                    index,
                                                                    action: "cover"
                                                                })
                                                            }}
                                                        >
                                                            Make cover photo
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem
                                                            className="px-[20px] py-[10px] text-[15px] cursor-pointer"
                                                            onSelect={() => {
                                                                if (pending) {
                                                                    toast.warning("Images is loading, please wait.");
                                                                    return;
                                                                }

                                                                handleSelectItem({
                                                                    imageInfo: url,
                                                                    index,
                                                                    action: "delete"
                                                                })
                                                            }}
                                                        >
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )
                                    }
                                </div>

                                {
                                    url.image_cover && (
                                        <div className="absolute top-[15px] left-[15px] px-[15px] py-[6px] bg-white shadow-md rounded-full text-[14px] font-semibold">
                                            Image cover
                                        </div>
                                    )
                                }
                            </div>
                        ))
                    }

                    <CldUploadWidget
                        uploadPreset={PRESET_NAME}
                        onSuccess={handleSuccessUpload}
                        onClose={() => {setIsOpenWidget(false);}}
                    >
                        {({ open }) => {
                            return (
                                <Button 
                                    className={cn(
                                        "text-[14px] font-semibold py-[10px] text-slate-400 hover:text-slate-600 px-[25px] rounded-[5px] border border-slate-300 hover:border-slate-800 bg-white hover:bg-slate-50 transition-all",
                                        urlImages?.main?.length > 0 && "p-0 flex items-center justify-center w-full h-[200px] lg:h-[150px] border-dotted"
                                    )}
                                    onClick={() => {
                                        setIsOpenWidget(true);
                                        open();
                                    }}
                                >
                                    {
                                        urlImages?.main?.length === 0 ? "Upload images" : "Add more"
                                    }
                                </Button>
                            )
                        }}
                    </CldUploadWidget>
                </div>
            </div>
        </div>
    );
}