"use client"
import CheckoutForm from '@/components/payment/CheckoutForm'
import { SelectedCarAmountContext } from '@/context/selectedCarAmount'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useContext } from 'react'

const StripePayment = () => {
  //const {selectedCarAmount,setSelectedCarAmount} = useContext(SelectedCarAmountContext)

  const stripePromise= loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

  const options : any = {
    mode:'payment',
    amount: 577,
    currency:"usd"
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm/>
    </Elements>
  )
}

export default StripePayment