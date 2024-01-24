import React, { useMemo } from 'react';
import type { Coordinates, Ride } from '~/interfaces/types';
import { Actions, Status } from '~/interfaces/types';
import GoogleMapComponent from '~/app/components/Map';
import MoveUpPassangerCard from '../MoveUpPassangerCard';

type OngoingRideType = {
  ride: Ride;
  handleRide: (action: Actions) => void;
};

const OngoingRide: React.FC<OngoingRideType> = ({ ride, handleRide }) => {
  const parsedCoordinates = useMemo(() => {
    return JSON.parse(ride.coordinates) as Coordinates;
  }, [ride.coordinates]);

  const { status } = ride;
  const moveAction = status === Status.ACCEPTED ? Actions.START : Actions.COMPLETE

  const passengerCard = ride.status === Status.ACCEPTED ? (
    <MoveUpPassangerCard address={ride.pickupAddress} message="Move until the local A to pickup the passenger" />
  ) : (
    <MoveUpPassangerCard address={ride.dropoffAddress} message="Move until the local B to dropoff the passenger" />
  );

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <div className="space-y-4">
        <GoogleMapComponent
          pickupMarker={parsedCoordinates.pickupCoordinates}
          dropoffMarker={parsedCoordinates.dropoffCoordinates}
        />
        {passengerCard}
        <div className="items-center p-6 flex justify-between">
          <button onClick={() => handleRide(Actions.CANCEL)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            Cancel Ride
          </button>
          <button onClick={() => handleRide(moveAction)} className="inline-flex bg-black text-white items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            {status === Status.ACCEPTED ? "Start Ride" : "Complete Ride"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OngoingRide;

