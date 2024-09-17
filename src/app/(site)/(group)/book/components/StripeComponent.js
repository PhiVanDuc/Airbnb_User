"use client"

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import convertToSubcurrency from "@/utils/convertToSubCurrency";
import Checkout from "./Checkout";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function StripeComponent({ payload, amount }) {
    return (
        <div className="w-full space-y-[30px] pb-[30px] border-b border-neutral-300">
            <h3 className="text-[22px] font-semibold">Pay with</h3>

            <Elements
                stripe={stripePromise}
                options={{
                    mode: "payment",
                    amount: convertToSubcurrency(amount),
                    currency: "usd",
                    appearance: {
                        theme: "flat",
                        labels: "floating"
                    }
                }}
            >
                <Checkout payload={payload} amount={amount} />
            </Elements>
        </div>
    )
}
