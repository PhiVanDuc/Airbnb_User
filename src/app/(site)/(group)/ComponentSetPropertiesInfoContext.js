"use client"

import { usePropertiesInfoContext } from "@/context/PropertiesInfoProvider"
import { useEffect } from "react";

export default function ComponentSetContext({ listProperties }) {
    const { propertiesInfo, setPropertiesInfo } = usePropertiesInfoContext();

    useEffect(() => {
        if (listProperties && Array.isArray(listProperties) && listProperties?.length > 0) {
            setPropertiesInfo(listProperties);
        }
    }, [listProperties]);

    return (
        <></>
    )
}
