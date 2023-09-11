import PaymentCardsList from '@/constants/payment-cards-list'
import Image from 'next/image'
import { useState } from 'react';

const PaymentMethod = () => {

    const [activeIndex,setActiveIndex]=useState<any>(); 

    return (
        <div>
            <h2 className='font-medium'>Payment Methods</h2>
            <div className="grid grid-cols-5 md:grid-cols-4  lg:grid-cols-5 mt-2 pl-2">
                {PaymentCardsList.map((item,index) => (
                    <div key={index} className={`w-[50px] mb-1 border-[1px]
                    flex items-center
                    justify-center 
                    rounded-md
                    cursor-pointer
                    hover:border-green-600
                    hover:scale-110 transition-all
                    ${activeIndex == index
                            ? 'border-green-600 border-[2px]' : null}`}
                        onClick={() => setActiveIndex(index)}>
                        <Image src={item.image}
                            alt={item.name}
                            width={30}
                            height={50}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PaymentMethod