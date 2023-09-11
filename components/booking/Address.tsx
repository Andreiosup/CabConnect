"use client"
import { DestinationCoordsContext } from '@/context/destinationCoordsContext'
import { PickupCoordsContext } from '@/context/pickupCoordsContext'
import React, { useContext, useEffect, useState } from 'react'

const session_token = '5ccce4a4-ab0a-4a7c-943d-580e55542363'
const MAPBOX_RETRIEVE_URL = 'https://api.mapbox.com/search/searchbox/v1/retrieve/'

export const Address = () => {

  const [pickup, setPickup] = useState<string>("")
  const [pickupChange, setPickupChange] = useState<boolean>(false)

  const [destination, setDestination] = useState<string>("")
  const [destinationChange, setDestinationChange] = useState<boolean>(false)

  const {pickupCoordinates, setPickupCoordinates}=useContext(PickupCoordsContext);
  const {destinationCoordinates,setDestinationCoordinates}=useContext(DestinationCoordsContext);
  
  const [addressList, setAddressList] = useState<any>([])


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAddressList()
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [pickup, destination]);


  const getAddressList = async () => {
    setAddressList([]);
    const query = pickupChange ? pickup : destination;
    const res = await fetch(`/api/search-address?q=${query}`, {
      headers: {
        "Content-Type": "application/json",
      }
    });


    const resJson = await res.json()

    setAddressList(resJson)
  }

  const onPickupAddressClick = async (item: any) => {
    setPickup(item.full_address);
    setAddressList([])
    setPickupChange(false)

    const res = await fetch(`${MAPBOX_RETRIEVE_URL}${item.mapbox_id}?session_token=${session_token}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`);
    const resJson = await res.json()

    setPickupCoordinates({
      lng: resJson.features[0].geometry.coordinates[0],
      lat: resJson.features[0].geometry.coordinates[1],
    })

  }

  const onDestinationAddressClick = async (item: any) => {
    setDestination(item.full_address);
    setAddressList([])
    setDestinationChange(false)

    const res = await fetch(`${MAPBOX_RETRIEVE_URL}${item.mapbox_id}?session_token=${session_token}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`);
    const resJson = await res.json()

    setDestinationCoordinates({
      lng: resJson.features[0].geometry.coordinates[0],
      lat: resJson.features[0].geometry.coordinates[1],
    })
  }



  return (
    <div className='mt-5'>
      <div className="relative">
        <label className='text-gray-500 text-[16px]'>Pickup location</label>
        <input
          type="text"
          value={pickup}
          className='bg-white mt-1 p-1 border-[1px] w-full rounded-md outline-none focus:border-green-600 text-[16px]'
          placeholder='Where from?'
          onChange={(e) => {
            setPickup(e.target.value);
            setPickupChange(true)
          }}
        />
        {(addressList?.suggestions && pickupChange) &&
          <div className='shadow-md p-1 rounded-md
            absolute w-full bg-white z-20'>
            {addressList?.suggestions.map((item: any, index: number) => (
              item?.full_address &&
              <h2 key={index} className='p-3 hover:bg-gray-100 cursor-pointer'
                onClick={() => onPickupAddressClick(item)}
              >{`${item?.full_address}`}</h2>
            ))}
          </div>
        }
      </div>
      <div className="relative mt-2">
        <label className='text-gray-500 text-[16px]'>Destination</label>
        <input
          type="text"
          className='bg-white mt-1 p-1 border-[1px] w-full rounded-md outline-none focus:border-green-600 text-[16px]'
          value={destination}
          placeholder='Where to?'
          onChange={(e) => {
            setDestination(e.target.value)
            setDestinationChange(true)
          }}
        />
        {(addressList?.suggestions && destinationChange) &&
          <div className='shadow-md p-1 rounded-md
            absolute w-full bg-white z-20'>
            {addressList?.suggestions.map((item: any, index: number) => (
              item.full_address &&
              <h2 key={index} className='p-3 hover:bg-gray-100 cursor-pointer'
                onClick={() => onDestinationAddressClick(item)}
              >{item?.full_address}</h2>
            ))}
          </div>
        }
        <div className=""></div>
      </div>

    </div>
  )
}
