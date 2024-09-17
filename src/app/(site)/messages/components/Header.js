import Image from "next/image";
import StatusOnline from "./StatusOnline";

export default function Header({ conversation, partner_id }) {
    return (
        <div className="shrink-0 flex items-center gap-x-[20px] px-[30px] py-[20px] border-b border-slate-200 bg-white">
            <div className="relative">
                <StatusOnline partner_id={partner_id} />

                {
                    conversation?.partner_info?.image ?
                    <Image
                        width={100}
                        height={100}
                        alt="Avatar"
                        src={conversation?.partner_info?.image}
                        className="w-[50px] h-[50px] rounded-full object-cover object-center"
                        priority={true}
                    /> :
                    <div className="w-[50px] h-[50px] rounded-full bg-slate-300"></div>
                }
            </div>
            
            <div className="space-y-[5px]">
                <p 
                    className="font-semibold text-[20px]"
                    style={{ margin: "0px" }}
                >
                    { conversation?.partner_info?.fullname }
                </p>
            </div>
        </div>
    )
}