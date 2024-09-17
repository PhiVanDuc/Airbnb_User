import Link from "next/link";

import { FaAirbnb } from "react-icons/fa";
import ClientNavbar from "./ClientNavbar";

export default function Navbar() {
    return (
        <div className="px-[24px] md:px-[80px] border-b border-slate-200 bg-white">
            <div className="flex items-center justify-between w-full py-[20px]">
                <Link href="/">
                    <FaAirbnb size={35} className="text-rootColor cursor-pointer" />
                </Link>

                <ClientNavbar />
            </div>
        </div>
    )
}
