"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePropertiesInfoContext } from "@/context/PropertiesInfoProvider";

import Image from "next/image";
import Map, { Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

import { cn } from "@/lib/utils";
import { find_properties_public_action } from "@/actions/public/property";
import { toast } from "sonner";

import { IoClose } from "react-icons/io5";

const MapProperties = ({ mapbox_access_token, open, category_id }) => {
    const router = useRouter();

    const [viewPort, setViewPort] = useState({
        longitude: -122.4,
        latitude: 37.8,
        zoom: 15
    });
    const [selectedProperty, setSelectedProperty] = useState(null);

    const { propertiesInfo } = usePropertiesInfoContext();

    useEffect(() => {
        // useEffect xử lý lấy gps người dùng
        if (open) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setViewPort({
                        ...viewPort,
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    })
                },
                (error) => {
                    console.error("Lỗi khi lấy vị trí:", error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        }
    }, [open]);

    useEffect(() => {
        // useEffect xử lý hiệu ứng transition của map
        const MapProperties = document.querySelector(".map_properties");

        let timeout;
        if (!open && MapProperties) {
            timeout = setTimeout(() => {
                MapProperties.style.visibility = "hidden";
            }, 300);
        }
        else if (open && MapProperties) {
            MapProperties.style.visibility = "visible";
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        }
    }, [open]);

    const handleMoveMap = (event) => {
        const { viewState: { longitude, latitude, zoom } } = event;

        setViewPort({
            ...viewPort,
            longitude,
            latitude,
            zoom
        })
    }

    return (
        <div className={cn(
            "map_properties fixed bottom-0 left-0 right-0 top-[177px] lg:top-[171px] z-[1] transition-all",
            !open ? "translate-y-[100%] opacity-0" : "translate-y-0 opacity-100"
        )}>
            <Map
                mapboxAccessToken={mapbox_access_token}
                mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE}
                {...viewPort}
                onMove={handleMoveMap}
                style={{
                    width: "100%",
                    height: "100%"
                }}
                attributionControl={false}
                projection="globe"
            >
                {
                    propertiesInfo?.map(property => {
                        return (
                            <Marker
                                key={property?.id}
                                longitude={property?.longitude}
                                latitude={property?.latitude}
                                anchor="center"
                            >
                                <div
                                    className="px-[20px] py-[7px] bg-neutral-50 shadow-xl rounded-full text-[13px] text-neutral-600 font-semibold cursor-pointer hover:bg-slate-100 transition hover:scale-110"
                                    onClick={() => { setSelectedProperty(property) }}
                                >
                                    ${property?.profit_price}
                                </div>
                            </Marker>
                        )
                    })
                }

                {
                    selectedProperty && (
                        <Popup
                            longitude={selectedProperty?.longitude}
                            latitude={selectedProperty?.latitude}
                            closeOnClick={false}
                            offset={25}
                            anchor="top"
                            className="border-none rounded-[10px] overflow-hidden p-0 cursor-pointer"
                        >
                            <div
                                onClick={() => { router.push(`/property/${selectedProperty?.id}`) }}
                            >
                                <div className="relative">
                                    <Image
                                        width={500}
                                        height={500}
                                        alt="Property image"
                                        src={selectedProperty?.images.find(image => image?.image_cover)?.image_url}
                                        className="w-full object-cover object-center aspect-video"
                                        priority={true}
                                    />

                                    <div
                                        className="absolute right-[10px] top-[10px] flex items-center justify-center w-[25px] h-[25px] rounded-full shadow-md bg-white hover:bg-neutral-100 transition"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setSelectedProperty(null)
                                        }}
                                    >
                                        <IoClose size={17} />
                                    </div>
                                </div>
                                
                                <div className="p-[15px]">
                                    <h3 className="text-[13px] font-semibold whitespace-nowrap truncate">{selectedProperty?.title}</h3>
                                    <p><span className="font-semibold text-neutral-700">${selectedProperty?.profit_price}</span> / night - <span className="text-neutral-400">Flexible dates</span></p>
                                </div>
                            </div>
                        </Popup>
                    )
                }
            </Map> 
        </div>
    )
}

export default MapProperties;