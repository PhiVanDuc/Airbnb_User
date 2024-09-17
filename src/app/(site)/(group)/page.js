import { find_properties_public_action } from "@/actions/public/property";

import Image from "next/image";
import Link from "next/link";
import ComponentSetContext from "./ComponentSetPropertiesInfoContext";

export default async function HomePage({ searchParams }) {
    const { category_id } = searchParams;
    const properties = await find_properties_public_action(category_id, 1, 20) || {};

    const renderProperties = properties?.properties?.filter(property => property?.create_complete);

    return (
        <div className="w-full space-y-[30px] pt-[30px] h-full">
            <ComponentSetContext listProperties={renderProperties} />

            {
                (properties?.success && renderProperties?.length > 0) &&
                (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 grid-flow-row gap-[20px]"
                    >
                        {
                            renderProperties?.map(property => {
                                return (
                                    <Link
                                        key={property?.id}
                                        href={`/property/${property?.id}`}
                                        className="inline-block w-full space-y-[10px]"
                                    >
                                        <Image
                                            alt={property?.title}
                                            width={300}
                                            height={300}
                                            src={(property?.images?.find(image => image?.image_cover))?.image_url}
                                            className="w-full aspect-square rounded-[10px] object-cover"
                                        />

                                        <div className="space-y-[5px]">
                                            <h3 className="text-[16px] font-semibold overflow-hidden text-ellipsis whitespace-normal line-clamp-2">{ property?.title }</h3>
                                            <p className="text-[14px] text-neutral-400 text-medium">Flexible Dates</p>
                                            <p className="text-[14px]">
                                                <span className="text-[15px] font-semibold">$ { property?.profit_price } </span>
                                                / night
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })
                        }
                    </div>
                )
            }

            {
                (properties?.success && renderProperties?.length === 0) && (
                    <div className="flex items-center justify-center h-full text-center text-[25px] text-neutral-300 font-semibold">Properties not found or empty!</div>
                )
            }

            {
                !properties?.success && (
                    <div className="flex items-center justify-center h-full text-center text-[25px] text-neutral-300 font-semibold">{ properties?.message }</div>
                )
            }
        </div>
    )
}