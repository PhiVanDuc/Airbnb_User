import WrapperMapProperties from "@/components/maps/WrapperMapProperties";

export default function SiteGroupLayout({ children }) {
    return (
        <div className="h-full overflow-y-auto px-[24px] md:px-[80px]">
            { children }

            <WrapperMapProperties mapbox_access_token={process.env.MAPBOX_ACCESS_TOKEN} />
        </div>
    )
}
