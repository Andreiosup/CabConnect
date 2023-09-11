"use client"

import Booking from "@/components/booking/Booking";
import MapBoxMap from "@/components/map/MapBoxMap";
import { DestinationCoordsContext } from "@/context/destinationCoordsContext";
import { DirectionDataContext } from "@/context/directionData";
import { PickupCoordsContext } from "@/context/pickupCoordsContext";
import { SelectedCarAmountContext } from "@/context/selectedCarAmount";
import { UserLocationContext } from "@/context/userLocationContext";
import { useEffect, useState } from 'react'

type Coordinates = {
  lat: number
  lng: number
}

export default function Home() {

  const [userLocation, setUserLocation] = useState<Coordinates>();
  const [pickupCoordinates, setPickupCoordinates] = useState<Coordinates>();
  const [destinationCoordinates, setDestinationCoordinates] = useState<Coordinates>();
  const [directionData, setDirectionData] = useState<any>();
  const [selectedCarAmount,setSelectedCarAmount] = useState<number>()

  useEffect(() => {
    getUserLocation();

  }, [])

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      })
    })
  }




  return (
    <div>
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <PickupCoordsContext.Provider value={{ pickupCoordinates, setPickupCoordinates }}>
          <DestinationCoordsContext.Provider value={{ destinationCoordinates, setDestinationCoordinates }}>
            <DirectionDataContext.Provider value={{ directionData, setDirectionData }}>
              <SelectedCarAmountContext.Provider value={{ selectedCarAmount,setSelectedCarAmount}}>
                <div className='grid grid-col-1 md:grid-cols-3'>
                  <div>
                    <Booking />
                  </div>
                  <div className="col-span-2 order-first md:order-last">
                    <MapBoxMap />
                  </div>
                </div>
              </SelectedCarAmountContext.Provider>
            </DirectionDataContext.Provider>
          </DestinationCoordsContext.Provider>
        </PickupCoordsContext.Provider>
      </UserLocationContext.Provider>
    </div>
  )
}