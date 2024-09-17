import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ReservationContext } from '@/context/ReservationProvider';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

import calcDate from '@/utils/calcDate';
import { encrypt } from '@/lib/jwt';

export default function ReservationBottom() {
    const router = useRouter();
    const { reservationInfo } = useContext(ReservationContext);

    const handleReservation = async () => {
        const jwt = await encrypt(reservationInfo);

        if (!jwt) {
            toast.error("Data packaging error!");
            return;
        }

        router.push(`/book?info=${jwt}`);
    }

    return (
        <div className='lg:hidden border-t border-slate-200'>
            <div className='flex items-center justify-between px-[24px] md:px-[80px] py-[20px] shadow-sm'>
                <Link
                    href="#chooseDate"
                    className='hover:underline text-[14px] font-medium'
                >
                    Choose date
                </Link>

                <Button
                    className="bg-rootColor"
                    onClick={handleReservation}
                    disabled={+calcDate(reservationInfo?.startDate, reservationInfo?.endDate) < 2 || !reservationInfo?.startDate}
                >
                    Reservation
                </Button>
            </div>
        </div>
    )
}
