import { Elements,useStripe,useElements, PaymentElement } from '@stripe/react-stripe-js'
import { redirect } from 'next/navigation';

const CheckoutForm = () => {

    const stripe = useStripe()
    const elements= useElements()

    const handleSubmit = async (event: any) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js hasn't yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }

        const { error: submitError} = await elements.submit()

        if (submitError) return;
        const response = await fetch("/api/create-intent", {
            method: "POST",
            body: JSON.stringify({
              amount: 557
            })
        })

        const secretKey = await response.json()
        
    
        const result = await stripe.confirmPayment({
          //`Elements` instance that was used to create the Payment Element
          clientSecret : secretKey,
          elements,
          confirmParams: {
            return_url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/",
          },
        });
    
      
      };

    return (
        <div className='flex justify-center items-center h-full '>
            <form onSubmit={handleSubmit} className=''>
                <PaymentElement/>
                <button type='submit' disabled={!stripe || !elements} className='w-full bg-green-600 rounded-lg mt-2'>
                    Pay
                </button>
            </form>
        </div>
    )
}

export default CheckoutForm