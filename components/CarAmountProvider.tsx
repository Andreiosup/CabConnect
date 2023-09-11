"use client"
import { SelectedCarAmountContext } from '@/context/selectedCarAmount'
import { useState } from 'react'

const CarAmountProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {

    const [selectedCarAmount, setSelectedCarAmount] = useState<number>()

    return (
        <SelectedCarAmountContext.Provider value={{ selectedCarAmount, setSelectedCarAmount }}>
            {children}
        </SelectedCarAmountContext.Provider>
    )
}

export default CarAmountProvider