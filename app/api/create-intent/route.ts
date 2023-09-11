import { NextResponse } from "next/server";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: "2023-08-16"
})

export const POST = async (req: Request) => {
  
    const data = await req.json()
    const amount = data.amount

    
    try {
        console.log(amount)
        console.log(stripe)
        const paymentIntent:any = await stripe.paymentIntents.create({
            amount: amount, 
            currency: 'usd'
        });

        console.log(paymentIntent)
        return new NextResponse(JSON.stringify(paymentIntent.client_secret), {status:200});
    } catch (error) {
        console.log(error)
        return new NextResponse("Failed to get key", { status: 500 });
    }
};