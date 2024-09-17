"use client"

import { Button } from "@/components/ui/button";
import { RxDashboard } from "react-icons/rx";

export default function ButtonShowImages() {
    const handleShowImages = () => {
        
    }

    return (
        <Button
            variant="outline"
            className="absolute bottom-[15px] right-[15px] border-black text-[12px] font-medium gap-x-[10px]"
            onClick={handleShowImages}
        >
            <RxDashboard size={16} />
            Show all photos
        </Button>
    )
}
