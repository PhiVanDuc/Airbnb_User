import EditorSidebar from "./components/EditorSidebar";

export default function EditPropertyLayout({ children }) {
    return (
        <div className="h-full w-full flex items-start overflow-y-auto">
            <EditorSidebar />

            <div className="flex flex-col flex-grow h-full py-[40px] px-[24px] md:px-[60px] overflow-y-auto">
                { children }
            </div>
        </div>
    )
}
