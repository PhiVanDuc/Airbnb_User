"use client"

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const iconLibraries = {
    Ant_Design_Icons: async () => await import("react-icons/ai"),
    Bootstrap_Icons: async () => await import("react-icons/bs"),
    Feather_Icons: async () => await import("react-icons/fi"),
    Font_Awesome_5_Icons: async () => await import("react-icons/fa"),
    Font_Awesome_6_Icons: async () => await import("react-icons/fa6"),
    Hero_Icons: async () => await import("react-icons/hi"),
    Hero_Icons_2: async () => await import("react-icons/hi2"),
    Icons_8_Line_Awesome: async () => await import("react-icons/lia"),
    Lucide_Icons: async () => await import("react-icons/lu"),
    Material_Design_Icons: async () => await import("react-icons/md"),
    VS_Code_Icons: async () => await import("react-icons/vsc"),
    Weather_Icons: async () => await import("react-icons/wi"),
};

export default function RenderIcon({ prefix, name_icon, s, className }) {
    const [IconComponent, setIconComponent] = useState(null);
    const pathname = usePathname();

    useEffect(() => {
        (async () => {
            const Icon = (await iconLibraries[prefix]())[name_icon];
            setIconComponent(
                <Icon
                    size={s}
                    className={className}
                />
            );
        })();
    }, [prefix, name_icon]);

    return (
        <span key={name_icon}>
            { IconComponent ? IconComponent : <Skeleton className={cn(
                "rounded-[5px] bg-slate-300",
                pathname === "/" ? "w-[20px] h-[20px]" : "w-[28px] h-[28px]"
            )} /> }
        </span>
    );
}
