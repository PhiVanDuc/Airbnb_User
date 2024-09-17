"use client"

import { useEffect, useState, useContext, useRef } from 'react';
import { StepContext } from "@/context/StepProvider";

import Map, { Marker, NavigationControl } from 'react-map-gl';
import { Geocoder } from '@mapbox/search-js-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Input } from '@/components/ui/input';
import { IoMdPin } from "react-icons/io";

export default function Location({ mapbox_access_token, result }) {
    const [infoAddress, setInfoAddress] = useState({
        longitude: result?.resultGet?.longitude || -122.4,
        latitude: result?.resultGet?.latitude || 37.8,
        zoom: 10,
        address: result?.resultGet?.address || "",
        details_address: ""
    });
    const [searchValue, setSearchValue] = useState("");
    const { stepContext, setStepContext } = useContext(StepContext);

    const mapInstanceRef = useRef(null);

    const currentStep = stepContext?.step || {
        step_1: true,
        step_2: false,
    };

    useEffect(() => {
        const MapboxGeoCoder = document.querySelector("mapbox-geocoder");
        const InputGeocoder = MapboxGeoCoder.querySelector("input");

        InputGeocoder.style.height = "50px";
        InputGeocoder.onfocus = () => {
            InputGeocoder.style.border = "none"
        }
    }, []);

    useEffect(() => {
        if (stepContext) {
            const isValid = currentStep.step_1
                ? true
                : infoAddress.details_address ? true : false;

            setStepContext({
                ...stepContext,
                isValid
            });
        }
    }, [currentStep?.step_2]);

    useEffect(() => {
        const isValid = currentStep.step_1
            ? true
            : infoAddress.details_address ? true : false;

        setStepContext({
            param: "location",
            value: infoAddress,
            isValid,
            step: currentStep,
        });
    }, [infoAddress]);

    const handleMoveMap = (event) => {
        const { viewState: { longitude, latitude, zoom } } = event;

        setInfoAddress({
            ...infoAddress,
            longitude,
            latitude,
            zoom
        })
    }

    const handleRetrieve = (event) => {
        const { geometry: { coordinates } } = event;
            console.log();

        setInfoAddress({
            ...infoAddress,
            longitude: coordinates[0],
            latitude: coordinates[1],
            address: event?.properties.full_address,
        });
    }

    return (
        <div className='flex items-center justify-center h-full'>
            <div className="w-[640px] max-w-[640px] my-auto space-y-[40px]">
                <div className="space-y-[5px]">
                    <h2 className="text-[26px] lg:text-[30px] font-semibold">
                        { currentStep.step_1 && "Where's your place located?" }
                        { currentStep.step_2 && "Complete your address" }
                    </h2>
                    <p className="text-[14px] md:text-[16px] lg:text-[18px] text-slate-400">
                        Your address is only shared with guests after they’ve made a reservation.
                    </p>
                </div>

                {
                    currentStep.step_1 && (
                        <div className='relative h-[520px] max-h-[520px]'>
                            <div className='h-[500px] overflow-hidden rounded-[8px]'>
                                <Map
                                    mapboxAccessToken={mapbox_access_token}
                                    mapStyle="mapbox://styles/phivanduc/clzjm0gzm00ks01qye16u0xic"
                                    ref={mapInstanceRef}
                                    initialViewState={{
                                        longitude: infoAddress?.longitude,
                                        latitude: infoAddress?.latitude,
                                        zoom: infoAddress?.zoom
                                    }}
                                    style={{
                                        width: "100%",
                                        height: "100%"
                                    }}
                                    attributionControl={false}
                                    projection="globe"
                                    onMoveEnd={handleMoveMap}
                                >
                                    <NavigationControl
                                        position='bottom-right'
                                        showCompass={false}
                                    />
                                </Map>
                            </div>

                            <div className='absolute top-[15px] left-[15px] right-[15px] z-[50]'>
                                <Geocoder
                                    accessToken={mapbox_access_token}
                                    map={mapInstanceRef.current}
                                    mapboxgl={mapboxgl}
                                    value={searchValue}
                                    placeholder='Enter your address'
                                    marker={false}
                                    onChange={(value) => { setSearchValue(value) }}
                                    onRetrieve={handleRetrieve}
                                    theme={{
                                        variables: {
                                            boxShadow: "none",
                                            unit: "16px",
                                            duration: "0.3s",
                                            curve: "linear",
                                            border: "none",
                                            padding: "15px 20px",
                                            borderRadius: "5px"
                                        },
                                        icons: {
                                            search: `
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height="20" width="20"><path fill="#b8b8c7" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                                            `
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    )
                }

                {
                    currentStep.step_2 && (
                        <div className='space-y-[20px]'>
                            <Input
                                type="text"
                                placeholder="Enter any remaining address details"
                                value={infoAddress?.details_address}
                                onChange={(e) => {
                                    setInfoAddress({ ...infoAddress, details_address: e.target.value })
                                }}
                            />

                            <div className='space-y-[5px]'>
                                <h3 className='text-[14px] font-semibold'>Choose your exact location on the map</h3>

                                <div className='rounded-[5px] overflow-hidden'>
                                    <Map
                                        mapboxAccessToken={mapbox_access_token}
                                        mapStyle="mapbox://styles/phivanduc/clzjm0gzm00ks01qye16u0xic"
                                        initialViewState={{
                                            longitude: infoAddress?.longitude,
                                            latitude: infoAddress?.latitude,
                                            zoom: infoAddress?.zoom
                                        }}
                                        style={{
                                            width: "100%",
                                            height: "500px"
                                        }}
                                        attributionControl={false}
                                        projection="globe"
                                        onMove={handleMoveMap}
                                    >
                                        <Marker
                                            longitude={infoAddress.longitude}
                                            latitude={infoAddress.latitude}
                                            anchor='top'
                                        >
                                            <div
                                                className="flex items-center justify-center w-[45px] h-[45px] rounded-full bg-rose-300/50 cursor-pointer"
                                            >
                                                <IoMdPin
                                                    size={25}
                                                    className="text-rose-500"
                                                />
                                            </div>
                                        </Marker>

                                        <NavigationControl
                                            position='bottom-right'
                                            showCompass={false}
                                        />
                                    </Map>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
