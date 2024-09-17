import { get_property_public } from "@/actions/public/property";
import { redirect } from "next/navigation";

import Image from "next/image";

import ButtonShowImages from "./components/ButtonShowImages";
import ButtonChatHost from "./components/ButtonChatHost";
import Reservation from "./components/Reservation";
import RenderIcon from "@/app/(setup-property)/become-a-host/[id]/(step)/components/RenderIcon";
import DatePicker from "./components/DatePicker";

export default async function PropertyDetailPage({ params }) {
    const { id } = params;
    const property = await get_property_public(id);

    if (!property?.success) redirect("/");

    const {id: property_id, structure, privacy_type, address, longitude, latitude, people_count, bedroom_count, beds_count, bathroom_count, title, description, base_price, profit_price, users, images, utilities, categories } = property?.property;
    
    const splitAddress = address.split(',').map(part => part.trim());
    const coverImage = images?.find(image => image?.image_cover);

    let randomImages = [];
    let count = 0;
    while (true) {
        if (randomImages?.length === 4) break;

        const image = images[count];
        if (image?.image_cover) {
            count++;
            continue;
        }

        randomImages?.push(image);
        count++;
    }

    return (
        <div className="flex justify-center pt-[60px]">
            <div className="w-[1120px] max-w-[1120px] space-y-[30px]">
                <h2 className="text-[25px] font-semibold">{ title }</h2>
                
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-x-[10px] h-fit">
                    <Image
                        width={400}
                        height={400}
                        alt={`Image ${coverImage?.id}`}
                        src={coverImage?.image_url}
                        className="w-full aspect-[6/4] object-cover rounded-[10px] lg:rounded-tr-[0px] lg:rounded-br-[0px]"
                        priority={true}
                    />

                    <div className="hidden lg:grid w-full aspect-[6/4] grid-cols-2 grid-rows-2 gap-[10px] rounded-tr-[10px] rounded-br-[10px] overflow-hidden">
                        {
                            randomImages?.map(image => {
                                return (
                                    <Image
                                        key={image?.id}
                                        width={400}
                                        height={400}
                                        alt={`Image ${image?.id}`}
                                        src={image?.image_url}
                                        className="w-full h-full object-cover"
                                        priority={true}
                                    />
                                )
                            })
                        }
                    </div>
                    
                    <ButtonShowImages />
                </div>

                <div
                    className="lg:flex items-start gap-x-[80px]"
                >
                    <div className="space-y-[50px] w-full lg:w-[65%]">
                        {/* Basic info */}
                        <div className="space-y-[30px] pb-[40px] border-b border-neutral-300">
                            <div className="space-y-[5px]">
                                <h3 className="text-[18px] md:text-[22px] font-semibold">
                                    { privacy_type === "an_entire_place" && `Entire ${(categories?.category)?.toLowerCase()} in ${splitAddress[splitAddress?.length - 2]}, ${splitAddress[splitAddress?.length - 1]}` }
                                    { privacy_type === "a_room" && `A room of a ${(categories?.category)?.toLowerCase()} in ${splitAddress[splitAddress?.length - 2]}, ${splitAddress[splitAddress?.length - 1]}` }
                                    { privacy_type === "a_share_room" && `A shared room of a ${(categories?.category)?.toLowerCase()} in ${splitAddress[splitAddress?.length - 2]}, ${splitAddress[splitAddress?.length - 1]}` }
                                </h3>

                                <div className="flex items-center gap-x-[5px] text-[14px] lg:text-[16px] text-neutral-500 flex-wrap">
                                    <p className="shrink-0">{people_count} guest{+people_count > 1 && "s"}</p>
                                    <span>-</span>
                                    <p className="shrink-0">{bedroom_count} bedroom{+bedroom_count > 1 && "s"}</p>
                                    <span>-</span>
                                    <p className="shrink-0">{beds_count} bed{+beds_count > 1 && "s"}</p>
                                    <span>-</span>
                                    <p className="shrink-0">{bathroom_count} bathroom{+bathroom_count > 1 && "s"}</p>
                                </div>
                            </div>

                            <div className="p-[20px] rounded-[15px] border border-neutral-400 shadow-sm cursor-pointer">
                                <p className="font-medium">Comments - Reviews</p>
                            </div>

                            <div className="flex items-start gap-x-[20px]">
                                {
                                    users?.image ?
                                    (
                                        <Image
                                            width={200}
                                            height={200}
                                            alt="Host avatar"
                                            src={users?.image}
                                            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full object-cover"
                                        />
                                    ) : 
                                    (
                                        <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full bg-slate-500"></div>
                                    )
                                }

                                <div className="space-y-[10px]">
                                    <h4 className="text-[14px] md:text-[16px] font-semibold">Hosted by {users?.fullname}</h4>
                                    <ButtonChatHost host_id={users?.id} />
                                </div>
                            </div>
                        </div>
                        {/* End basic info */}

                        <div className="max-h-[240px] pb-[40px] border-b border-neutral-300">
                            <p className="">{ description }</p>
                        </div>
                            
                        {/* Utilities */}
                        <div className="space-y-[30px] max-h-[340px] border-b border-neutral-300 pb-[40px] truncate">
                            <h3 className="text-[18px] md:text-[22px] font-semibold">What this place offers</h3>

                            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-y-[15px]">
                                {
                                    utilities?.map(utility => {
                                        return (
                                            <div
                                                key={utility.id}
                                                className="flex items-center gap-x-[10px] text-neutral-700"
                                            >
                                                <RenderIcon
                                                    prefix={utility?.prefix_icon}
                                                    name_icon={utility?.icon}
                                                    s={30}
                                                    className="w-[20px] md:w-[30px]"
                                                />

                                                <p className="text-[14px] md:text-[17px]">{utility?.utility}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {/* End utilities */}

                        <DatePicker
                            base_price={base_price}
                            profit_price={profit_price}
                        />
                    </div>
                    
                    <Reservation
                        property_id={property_id}
                        structure={structure}
                        privacy_type={privacy_type}
                        address={address}
                        longitude={longitude}
                        latitude={latitude}
                        people_count={people_count}
                        bedroom_count={bedroom_count}
                        beds_count={beds_count}
                        bathroom_count={bathroom_count}
                        title={title}
                        base_price={base_price}
                        profit_price={profit_price}
                        users={users}
                        cover_image={coverImage?.image_url}
                    />
                </div>
            </div>
        </div>
    )
}