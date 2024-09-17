"use client"

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Buttons() {
    const router = useRouter();

    return (
        <div className="text-right space-x-[10px]">
            <Button
                className="font-semibold"
                onClick={() => { router.push("/") }}
            >
                Home page
            </Button>
            
            <Button className="font-semibold">Visit your rental</Button>
        </div>
    )
}
