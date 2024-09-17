import { Toaster } from "sonner";

import StepProvider from "@/context/StepProvider";

export default function BecomeAHostLayout({ children }) {
    return (
        <>
            <StepProvider>
                <Toaster position="top-center" />

                {children}
            </StepProvider>
        </>
    )
}
