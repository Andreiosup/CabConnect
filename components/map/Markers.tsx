import { useContext } from 'react'
import { UserLocationContext } from '@/context/userLocationContext';
import { Marker } from 'react-map-gl'
import { PickupCoordsContext } from '@/context/pickupCoordsContext';
import { DestinationCoordsContext } from '@/context/destinationCoordsContext';

const Markers = () => {

    const { userLocation, setUserLocation } = useContext(UserLocationContext);
    const { pickupCoordinates, setPickupCoordinates } = useContext(PickupCoordsContext);
    const { destinationCoordinates, setDestinationCoordinates } = useContext(DestinationCoordsContext);

    return (
        <div>
            {/* User Marker */}
            <Marker longitude={userLocation.lng} latitude={userLocation.lat} anchor="bottom" >
                <img src="./assets/pin.png" className='w-10 h-10' />
            </Marker>

            {/* Source Marker */}
            {pickupCoordinates && pickupCoordinates.length!=0 && (
                <Marker longitude={pickupCoordinates.lng} latitude={pickupCoordinates.lat} anchor="bottom" >
                    <img src="./assets/location.png" className='w-10 h-10' />
                </Marker>
            )}

            {/* Destination Marker */}

            {destinationCoordinates && destinationCoordinates.length!=0 && (
                <Marker longitude={destinationCoordinates.lng} latitude={destinationCoordinates.lat} anchor="bottom" >
                    <img src="./assets/location.png" className='w-10 h-10' />
                </Marker>
            )}
        </div>
    )
}

export default Markers