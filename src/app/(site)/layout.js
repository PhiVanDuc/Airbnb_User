import NavbarBottom from "@/components/navbar/NavbarBottom";
import NavbarServer from "@/components/navbar/NavbarServer";
import { Toaster } from "sonner";

export default async function SiteLayout({ children }) {
    return (
        <div className="flex flex-col h-[100vh]">
            <Toaster />
            <NavbarServer />

            <div className="flex flex-col flex-grow overflow-y-auto">
                { children }
            </div>

            <NavbarBottom />
        </div>
    )
}