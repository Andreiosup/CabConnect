"use client"
import CheckoutForm from '@/components/payment/CheckoutForm'
import { SelectedCarAmountContext } from '@/context/selectedCarAmount'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

const StripePayment = () => {
  const router = useRouter()
  const { selectedCarAmount, setSelectedCarAmount } = useContext(SelectedCarAmountContext)

  if (!selectedCarAmount) router.push("/")


  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

  const options: any = {
    mode: 'payment',
    amount: Number(selectedCarAmount * 100),
    currency: "usd"
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={selectedCarAmount} />
    </Elements>
  )
}

export default StripePayment