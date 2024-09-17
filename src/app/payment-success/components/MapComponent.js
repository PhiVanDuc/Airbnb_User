"use client"

import Map, { Marker } from 'react-map-gl';
import { IoMdPin } from "react-icons/io";

import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapComponent({ mapbox_access_token, longitude, latitude }) {
    return (
        <div className='w-full aspect-video rounded-[10px] overflow-hidden'>
            <Map
                mapboxAccessToken={mapbox_access_token}
                mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE}
                initialViewState={{
                    longitude: longitude,
                    latitude: latitude,
                    zoom: 17
                }}
                style={{
                    width: "100%",
                    height: "100%"
                }}
                attributionControl={false}
                projection="globe"
            >
                <Marker
                    longitude={longitude}
                    latitude={latitude}
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
            </Map>
        </div>
    )
}
