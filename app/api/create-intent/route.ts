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
      
        const paymentIntent:any = await stripe.paymentIntents.create({
            amount: Number(amount*100), 
            currency: 'usd'
        });

        return new NextResponse(JSON.stringify(paymentIntent.client_secret), {status:200});
    } catch (error) {
        console.log(error)
        return new NextResponse("Failed to get key", { status: 500 });
    }
};