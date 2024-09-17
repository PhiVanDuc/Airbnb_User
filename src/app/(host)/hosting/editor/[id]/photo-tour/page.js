"use client"

export default function EditorPhotoTourPage() {
    return (
        <>
            <div className="pb-[40px] space-y-[5px]">
                <h3 className="text-[30px] font-semibold">Listing editor</h3>
                <p className="text-[16px] text-neutral-500 font-medium">Manage photos, guests will see your photos tour if every room has a photo.</p>
            </div>

            <div className="flex-grow overflow-y-auto space-y-[40px]">
                <div className="flex items-start relative">
                    <h3 className="sticky top-0 left-0 shrink-0 text-[18px] font-semibold w-[200px]">Bathroom photos</h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 w-full gap-[10px] px-[30px]">
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                    </div>
                </div>

                <div className="flex items-start relative">
                    <h3 className="sticky top-0 left-0 shrink-0 text-[18px] font-semibold w-[200px]">Additional photos</h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-[10px] px-[30px]">
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                        <div className="w-full aspect-square rounded-[10px] bg-neutral-300"></div>
                    </div>
                </div>
            </div>
        </>
    )
}
