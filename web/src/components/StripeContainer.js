import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from './PaymentForm';

const PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    )
}
