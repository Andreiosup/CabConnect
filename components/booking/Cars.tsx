import CarsList from '@/constants/cars-list'
import { DirectionDataContext } from '@/context/directionData'
import { SelectedCarAmountContext } from '@/context/selectedCarAmount'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'

const Cars = () => {

    const [selectedCar,setSelectedCar]=useState<number>()
    const { directionData, setDirectionData } = useContext(DirectionDataContext);
    const {selectedCarAmount,setSelectedCarAmount} = useContext(SelectedCarAmountContext)

    const getCost = (charges: number) => {
        return (charges*directionData?.routes[0].distance*0.000621371192).toFixed(2)
    }

    return (
        <div className="mt-5">
            <h2 className='font-semibold'>Select Car</h2>
            <div className='grid 
                grid-cols-3 
                md:grid-cols-2
                lg:grid-cols-3
                m-1 p-2
            '>
                {CarsList.map((item, index) => (
                    <div 
                        key={index}
                        className={`m-2
                        p-2 border-[1px] rounded-md 
                        hover:border-green-600 
                        cursor-pointer 
                        ${index==selectedCar && 'border-green-600 border-[2px]'}`}
                        onClick={()=>{
                            setSelectedCar(index)
                            setSelectedCarAmount(getCost(item.charges))
                        }}
                    >
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={95}
                            height={90}
                            className='w-full'
                        />
                        <h1 className='text-[14px] text-gray-500 '>
                            {item.name}
                            {directionData &&(
                                <span className='float-right font-medium text-black'>
                                    {getCost(item.charges)}$
                                </span>
                            )}
                        </h1>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Cars