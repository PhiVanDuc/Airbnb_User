"use client"

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { TokenContext } from "@/context/TokenProvider";

import { 
    useStripe,
    useElements,
    PaymentElement
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "./PhoneInput";
import { toast } from "sonner";

import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage
} from "@/components/ui/form";

import convertToSubcurrency from "@/utils/convertToSubCurrency";
import clientRefresh from "@/utils/clientRefresh";
import { create_payment_intent_action } from "@/actions/stripe";
import { decrypt, encrypt } from "@/lib/jwt";
import check_info_user from "@/actions/ReuseTasks/user/check_info_user";
import { create_reservation_action } from "@/actions/reservation";
import { zodResolver } from "@hookform/resolvers/zod";

import { PaymentSchema } from "@/schemas/stepSchema";

export default function Checkout({ payload, amount }) {
    const router = useRouter();

    const stripe = useStripe();
    const elements = useElements(); 

    const { allTokens, setTokens } = useContext(TokenContext);
    const [clientSecret, setClientSecret] = useState();
    const [loading, setLoading] = useState(false);
    const [infoUser, setInfoUser] = useState({});

    const form = useForm({
        resolver: zodResolver(PaymentSchema),
        defaultValues: {
            phone_number: ""
        }
    });

    useEffect(() => {
        (async () =>{
            let decode = await decrypt(localStorage.getItem("info_user"));
            if (!decode?.success) {
                await check_info_user({
                    allTokens,
                    setTokens,
                    router,
                    setState: setInfoUser
                });

                decode = await decrypt(localStorage.getItem("info_user"));
            }
            else setInfoUser(decode?.payload);
        })();

        const filldata = {...payload};
        delete filldata?.exp;
        delete filldata?.iat;
    }, []);

    useEffect(() => {
        (async () => {
            const refresh = await clientRefresh({
                router,
                setTokens
            });

            const paymentIntent = await create_payment_intent_action({ amount: convertToSubcurrency(amount) }, refresh?.accessToken);
            if (paymentIntent === 401) {
                router.replace("/sign-out");
                return;
            }
            else if (!paymentIntent?.success) {
                toast.error(paymentIntent?.message);
                return;
            }

            setClientSecret(paymentIntent?.paymentIntent?.client_secret);
        })();
    }, [amount]);

    const handleSubmit = async () => {
        setLoading(true);

        if (!stripe || !elements) return;

        const filldata = {...payload};
        delete filldata?.exp;
        delete filldata?.iat;

        const jwt = await encrypt({
            user_id: infoUser?.id,
            ...filldata,
        });

        const { error: submitError } = elements.submit();
        if (submitError) {
            toast.error(submitError.message);
            setLoading(false);
            return;
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://localhost:3000/payment-success?amount=${amount}&info=${jwt}`
            },
            redirect: "if_required"
        });
        if (error) toast.error(error.message);
        else if (paymentIntent && paymentIntent?.status === "succeeded") {
            const refresh = await clientRefresh({
                router,
                setTokens
            });

            const now = new Date();
            const checkInDate = new Date(payload?.startDate);
            const hoursUntilCheckIn = (checkInDate - now) / (1000 * 60 * 60);

            const status = hoursUntilCheckIn > 24 ? "Upcoming" : "Arriving soon";

            const body = {
                customer_id: infoUser?.id,
                info: {
                    host_id: payload?.host?.id,
                    host_fullname: payload?.host?.fullname,
                    host_image: payload?.host?.image,
                    host_email: payload?.host?.email,
                    customer_number: form.getValues("phone_number"),
                    property_id: payload?.property_id,
                    cover_image: payload?.cover_image,
                    title: payload?.title,
                    categories: payload?.structure,
                    check_in: payload?.startDate,
                    check_out: payload?.endDate,
                    payment_intent_id: paymentIntent?.id,
                    nights: payload?.nights,
                    base_price: payload?.base_price,
                    airbnb_fee_service: payload?.airbnb_fee,
                    total_amount: payload?.total,
                    status: status
                }
            }

            const create = await create_reservation_action(body, refresh?.accessToken);
            if (create === 401) router.replace("/sign-out");
            else if (!create?.success) {
                toast.error(create?.message);
                return;
            }

            router.push(`/payment-success?amount=${amount}&info=${jwt}&payment_intent=${paymentIntent?.id}`);
        }

        setLoading(false);
    }
 
    if (!clientSecret || !stripe || !elements) {
        return (
            <div className="mt-[40px] w-full flex justify-center">
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-rootColor" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
            </div>
        )
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                autoComplete="off"
                className="space-y-[15px]"
            >
                <FormField
                    control={form.control}
                    name="phone_number"
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormControl>
                                    <PhoneInput
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />

                <PaymentElement />

                <Button
                    disabled={ loading || !stripe }
                    className="bg-rootColor w-full font-semibold h-[50px]"
                >
                    { !loading ? "Confirm and pay" : "Wait a minute..." }
                </Button>
            </form>
        </Form>
    )
}
