import { useRef, useState, useEffect } from 'react';
import AutoCompleteSearchBox from '~/app/components/Rider/AutoCompleteSearchBox';
import UserCard from '~/app/components/UserCard';
import GoogleMapComponent from '~/app/components/Map';
import RideInfoCard from '~/app/components/Rider/RideInfoCard';
import { useQuery } from '@tanstack/react-query';
import { GeoLocation, Status } from '~/interfaces/types';
import ride from '~/app/services/RideService'
import supabase from '~/app/services/SupabaseService'
import NotificationCard from '~/app/components/Rider/NotificationCard';
import SearchingDriverCard from '~/app/components/Rider/SearchingDriverCard';
import MoveUpPassangerCard from '~/app/components/MoveUpPassangerCard';
import useRider from '~/app/hooks/UseRider';

const Rider = () => {
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [dropoffLocation, setDropoffLocation] = useState<string>('');
  const [pickupCoordinates, setPickupCoordinates] = useState<GeoLocation>({ lat: 0, lng: 0 });
  const [dropoffCoordinates, setDropoffCoordinates] = useState<GeoLocation>({ lat: 0, lng: 0 });
  const [isMapsLoaded, setMapsLoaded] = useState<boolean>(false);
  const [isNotificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [searchingDriver, setSearchingDriver] = useState<boolean>(false);

  const pickupRef = useRef<google.maps.places.Autocomplete>(null);
  const dropoffRef = useRef<google.maps.places.Autocomplete>(null);

  const { riders, selectedRider, setSelectedRider } = useRider();

  const { data: ongoingRide, refetch: refetchOngoingRide } = useQuery({
    queryKey: ['ongoingRide'],
    queryFn: async () => await ride.getOngoingRide({ riderId: selectedRider?.id }),
  });

  //Real time channel 
  supabase.watchRide(refetchOngoingRide);

  const { data: fare, refetch: refetchFare } = useQuery({
    queryKey: ['fare'],
    queryFn: async () => await ride.calculateFare(pickupCoordinates, dropoffCoordinates),
  })

  useEffect(() => {
    if (pickupCoordinates && dropoffCoordinates) refetchFare()
  }, [pickupCoordinates, dropoffCoordinates])

  useEffect(() => {
    if (ongoingRide?.status === Status.ACCEPTED) {
      setSearchingDriver(false)
    }

    // if (ongoingRide?.coordinates && !pickupCoordinates) {
    //   // Set map coordinates in case of route refresh  
    //   const coordinates: {
    //     pickupCoordinates: GeoLocation;
    //     dropoffCoordinates: GeoLocation;
    //   } = JSON.parse(ongoingRide?.coordinates)
    //   setPickupCoordinates(coordinates.pickupCoordinates)
    //   setDropoffCoordinates(coordinates.dropoffCoordinates)
    // }
  }, [ongoingRide])

  useEffect(() => {
    refetchOngoingRide()
  }, [selectedRider])

  const requestRideHandler = async () => {
    if (fare) {
      setSearchingDriver(true)

      const requestRideParams = {
        riderId: 1,
        fare: fare?.price,
        distance: fare?.distance.text,
        coordinates: JSON.stringify({
          pickupCoordinates,
          dropoffCoordinates,
        }),
        pickupAddress: pickupLocation,
        dropoffAddress: dropoffLocation
      }

      const rideReq = await ride.requestRide(requestRideParams)

      if (rideReq.message) {
        setNotificationOpen(true)
        setSearchingDriver(false)
      }
    }
  };

  const cancelRide = async () => {
    if (ongoingRide?.id && ongoingRide?.driverId) {
      await ride.cancel(ongoingRide.id, ongoingRide.driverId)
      setSearchingDriver(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-200 to-pink-200 flex items-center justify-center">
      <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-md rounded-lg space-y-4">
        {selectedRider && !ongoingRide?.id && !searchingDriver && (
          <>
            <h2 className="text-3xl font-semibold text-center mb-4">{`Where today, ${selectedRider.name}?`}</h2>
            <UserCard
              user={selectedRider}
              selectUser={setSelectedRider}
              usersOptions={riders}
            />
          </>
        )}
        <GoogleMapComponent loadMap={setMapsLoaded} pickupMarker={pickupCoordinates} dropoffMarker={dropoffCoordinates} />
        {isMapsLoaded && (
          <>
            <AutoCompleteSearchBox placeholder="Pickup Location" state={{ location: pickupLocation, setLocation: setPickupLocation, ref: pickupRef, setCoordinates: setPickupCoordinates }} />
            <AutoCompleteSearchBox placeholder="Dropoff Location" state={{ location: dropoffLocation, setLocation: setDropoffLocation, ref: dropoffRef, setCoordinates: setDropoffCoordinates }} />
          </>
        )}
        {
          fare?.distance && !ongoingRide && (
            searchingDriver ?
              <SearchingDriverCard />
              :
              <>
                <RideInfoCard fare={fare.price} duration={fare.duration.text} distance={fare.distance.text} />
                <button onClick={requestRideHandler} className="w-full bg-black text-white py-2 rounded-md">
                  Request Ride
                </button>
              </>
          )
        }
        {
          ongoingRide?.id && (<>
            {
              ongoingRide.status === Status.ACCEPTED ? (<MoveUpPassangerCard address={ongoingRide.pickupAddress} message='Find driver at the local A' />) : (<MoveUpPassangerCard address={ongoingRide.dropoffAddress} message='Driver is riding you to the dropoff location B' />)
            }
            <button onClick={cancelRide} className="w-full bg-black text-white py-2 rounded-md">
              Cancel Ride
            </button>
          </>)
        }
        <NotificationCard isVisible={isNotificationOpen} onClose={setNotificationOpen} />
      </div>
    </main>
  );
};

export default Rider;
