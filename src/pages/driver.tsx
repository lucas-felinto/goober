import { useQuery, QueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import OngoingRide from '~/app/components/Driver/OngoingRide'
import RideRequestCard from '~/app/components/Driver/RideRequestCard'
import WaitingRideRequestCard from '~/app/components/Driver/WaitingRideRequestCard'
import { Actions, Status } from '~/interfaces/types'
import ride from '~/app/services/RideService'
import driver from '~/app/services/DriverService'
import UserCard from '~/app/components/UserCard'
import useDriver from '~/app/hooks/UseDriver'

type RideAction = { id: number; driverId: number };

function Driver() {
  const [onRide, setOnRide] = useState<boolean>(false);
  const { drivers, selectedDriver, setSelectedDriver } = useDriver();
  const query = new QueryClient();

  const { data: rideRequest, refetch: refetchRequest } = useQuery({
    queryKey: ['rideRequest'],
    queryFn: async () => await driver.fetchRideRequest(selectedDriver?.id as number),
    enabled: !!selectedDriver && !onRide,
    refetchInterval: onRide ? false : 3000
  });

  const { data: ongoingRide, refetch: refetchRide } = useQuery({
    queryKey: ['ongoingRide'],
    queryFn: async () => await ride.getOngoingRide({ driverId: selectedDriver?.id }),
    refetchInterval: 3000,
    enabled: !!selectedDriver
  });

  useEffect(() => {
    if (ongoingRide?.status === Status.CANCELED) refetchRequest()
  }, [ongoingRide]);

  const rideActionsMap = {
    [Actions.ACCEPT]: async ({ id, driverId }: RideAction) => await ride.handler(id, driverId, Actions.ACCEPT),
    [Actions.DECLINE]: async ({ id, driverId }: RideAction) => await ride.decline(id, driverId),
    [Actions.START]: async ({ id, driverId }: RideAction) => await ride.start(id, driverId),
    [Actions.CANCEL]: async ({ id, driverId }: RideAction) => await ride.cancel(id, driverId),
    [Actions.COMPLETE]: async ({ id, driverId }: RideAction) => await ride.complete(id, driverId),
  };

  const handleRide = async (action: Actions) => {
    const requestActions = [Actions.ACCEPT, Actions.DECLINE];
    const rideId = requestActions.includes(action) ? rideRequest?.id : ongoingRide?.id;
    const act = rideActionsMap[action];
    if (rideId && selectedDriver) {
      await act({ id: rideId, driverId: selectedDriver?.id });
    }
    setOnRide(action === Actions.ACCEPT || (action !== Actions.CANCEL && action !== Actions.COMPLETE));
    refetchRide();
    if (action !== Actions.DECLINE) query.invalidateQueries({ queryKey: ['rideRequest'] }) //If declines, keep searching rides
    if (action === Actions.CANCEL || Actions.COMPLETE || Actions.DECLINE) refetchRequest();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      {ongoingRide?.id && (
        <OngoingRide handleRide={handleRide} ride={ongoingRide} />
      )}
      {!ongoingRide?.id && rideRequest && (
        <RideRequestCard
          fare={rideRequest.fare}
          pickupLocation={rideRequest.pickupAddress}
          dropoffLocation={rideRequest.dropoffAddress}
          action={handleRide}
        />
      )}
      {!ongoingRide?.id && !rideRequest && selectedDriver && (
        <div>
          <WaitingRideRequestCard driver={selectedDriver} />
          <UserCard
            user={selectedDriver}
            selectUser={setSelectedDriver}
            usersOptions={drivers}
          />
        </div>
      )}
    </div>
  );

}

export default Driver