import React, { useContext, useEffect, useState } from 'react'
import { Address } from './Address'
import Cars from './Cars'
import PaymentMethod from './PaymentMethod'
import { useRouter } from 'next/navigation'
import { SelectedCarAmountContext } from '@/context/selectedCarAmount'


const Booking = () => {

  const router = useRouter()
  const {selectedCarAmount,setSelectedCarAmount} = useContext(SelectedCarAmountContext)
  
  return (
    <div className='p-5'>
      <h1 className="text-[20px] font-semibold mb-2">
        Booking
      </h1>
      <div className='border-[1px] p-5 rounded-md' style={{height: window.innerHeight*0.72}}>
        <Address />
        <Cars/>
        <PaymentMethod/>
        <button 
          className='w-full bg-green-500 hover:bg-green-600 text-white p-1 rounded-md mt-4'
          onClick={()=> {
            if (selectedCarAmount){
              router.push('/payment')
            }
          }}
        >Book</button>
      </div>
    </div>
  )
}

export default Booking
