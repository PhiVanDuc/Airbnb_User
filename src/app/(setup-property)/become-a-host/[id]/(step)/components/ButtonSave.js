"use client"

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ButtonSave() {
    const router = useRouter();

    return (
        <Button
            className="rounded-full hover:bg-transparent hover:border-black transition"
            variant="outline"
            onClick={() => { router.replace("/hosting") }}
        >
            Save and exit
        </Button>
    )
}