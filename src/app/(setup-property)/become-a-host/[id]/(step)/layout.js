import { FaAirbnb } from "react-icons/fa";
import ButtonSave from "./components/ButtonSave";

import { list } from "./listSteps";
import NavigateBar from "./components/NavigateBar";

export default function StepLayout({ children, params }) {
    const { step } = params;
    const { step_3 } = list;

    return (
        <div className="flex flex-col h-[100vh]">
            <div className={`flex items-center justify-between px-[24px] md:px-[60px] py-[30px] bg-white ${ step_3[step_3.length - 1] === step && "hidden" }`}>
                <FaAirbnb size={35} />

                <ButtonSave />
            </div>

            <div className="px-[24px] md:px-[60px] flex-grow w-full overflow-y-auto">
                { children }
            </div>

            <NavigateBar />
        </div>
    )
}