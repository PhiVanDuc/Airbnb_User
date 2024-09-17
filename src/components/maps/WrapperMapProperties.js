"use client"

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import ButtonShowMap from "./ButtonShowMap";
import MapProperties from "./MapProperties";

export default function WrapperMapProperties({ mapbox_access_token }) {
    const [open, setOpen] = useState(false);
    const searchParams = useSearchParams();

    return (
        <>
            <ButtonShowMap open={open} setOpen={setOpen} searchParams={searchParams} />
            <MapProperties mapbox_access_token={mapbox_access_token} open={open} setOpen={setOpen} category_id={searchParams.get("category_id")} />
        </>
    )
}