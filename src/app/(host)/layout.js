import Navbar from './components/Navbar';
import { Toaster } from 'sonner';

export default function HostingLayout({ children }) {
    return (
        <div className='flex flex-col h-[100vh]'>
            <Navbar />
            <Toaster />

            <div className="flex-grow overflow-y-auto">
                {children}
            </div>
        </div>
    )
}
