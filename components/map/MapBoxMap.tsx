import { UserLocationContext } from '@/context/userLocationContext';
import { useContext, useEffect, useRef } from 'react';
import { Map, Marker } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import Image from 'next/image';
import Markers from './Markers';
import { PickupCoordsContext } from '@/context/pickupCoordsContext';
import { DestinationCoordsContext } from '@/context/destinationCoordsContext';
import { DirectionDataContext } from '@/context/directionData';
import MapBoxRoute from './MapBoxRoute';
import RouteInfo from './RouteInfo';

const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";
const session_token = "5ccce4a4-ab0a-4a7c-943d-580e55542363";

const MapBoxMap = () => {

  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { pickupCoordinates, setPickupCoordinates } = useContext(PickupCoordsContext);
  const { destinationCoordinates, setDestinationCoordinates } = useContext(DestinationCoordsContext);
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  const mapRef = useRef<any>();

  useEffect(() => {
    if (pickupCoordinates) {
      mapRef.current?.flyTo({
        center: [pickupCoordinates.lng, pickupCoordinates.lat],
        duration: 2500,
      });
    }
  }, [pickupCoordinates]);
  //Use to Fly to Destination Markers Location
  useEffect(() => {
    if (destinationCoordinates) {
      mapRef.current?.flyTo({
        center: [destinationCoordinates.lng, destinationCoordinates.lat],
        duration: 2500,
      });
    }

    if (destinationCoordinates && pickupCoordinates) {
      getDirectionAddress()
    }
  }, [destinationCoordinates]);


  const getDirectionAddress = async () => {
    const mapboxEndpoint =
      `${MAPBOX_DRIVING_ENDPOINT}${pickupCoordinates.lng},${pickupCoordinates.lat};${destinationCoordinates.lng},${destinationCoordinates.lat}?overview=full&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;

    const res = await fetch(mapboxEndpoint, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resJson = await res.json();

    setDirectionData(resJson)
  }


  return (
    <div className="p-5">
      <h1 className="text-[20px] font-semibold mb-2">Map</h1>
      <div className="rounded-lg overflow-hidden">
        {
          userLocation && (

            <Map
              ref={mapRef}
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
              initialViewState={{
                longitude: userLocation.lng,
                latitude: userLocation.lat,
                zoom: 14
              }}
              style={{ width: "100%", height: 600 }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            >
              <Markers />
              {directionData?.routes && (
                <MapBoxRoute
                  coordinates={directionData?.routes[0]?.geometry?.coordinates}
                />
              )}
            </Map>
          )
        }
      </div>
      <div className="absolute bottom-[40px]
      z-20 right-[20px]">
        <RouteInfo />
      </div>
    </div>
  )
}

export default MapBoxMap