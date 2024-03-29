import { useQuery } from '@tanstack/react-query'
import React, { Suspense, useEffect } from 'react'
import Head from 'next/head'

import OngoingRide from '~/app/components/Driver/OngoingRide'
import RideRequestCard from '~/app/components/Driver/RideRequestCard'
import WaitingRideRequestCard from '~/app/components/Driver/WaitingRideRequestCard'
import UserCard from '~/app/components/UserCard'

import { Actions } from '~/interfaces/types'

import ride from '~/app/services/RideService'
import supabase from '~/app/services/SupabaseService'
import driver from '~/app/services/DriverService'

import useDriver from '~/app/hooks/UseDriver'
import LoadingDriver from '~/app/components/LoadingDriver'

type RideAction = { id: number; driverId: number };

function Driver() {
  const { drivers, selectedDriver, setSelectedDriver } = useDriver();
  const { data: rideRequest, refetch: refetchRequest } = useQuery({
    queryKey: ['rideRequest'],
    queryFn: async () => await driver.fetchRideRequest(selectedDriver?.id as number),
  });

  const { data: ongoingRide, refetch: refetchRide } = useQuery({
    queryKey: ['ongoingRide'],
    queryFn: async () => await ride.getOngoingRide({ driverId: selectedDriver?.id }),
  });

  //Real time channel 
  supabase.watchRideRequests(refetchRequest)
  supabase.watchRide(refetchRide);

  useEffect(() => {
    refetchRequest()
    refetchRide()
  }, [selectedDriver])

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
      refetchRide()
    }
    if (action === Actions.CANCEL || Actions.COMPLETE || Actions.DECLINE) refetchRequest();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <Head>
        <title>Driver</title>
      </Head>
      {!selectedDriver && <LoadingDriver />}
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
      {!ongoingRide?.id && rideRequest?.id && (
        <RideRequestCard
          fare={rideRequest.fare}
          pickupLocation={rideRequest.pickupAddress}
          dropoffLocation={rideRequest.dropoffAddress}
          action={handleRide}
        />
      )}
      {ongoingRide?.id && (
        <OngoingRide handleRide={handleRide} ride={ongoingRide} />
      )}
    </div>
  );

}

export default Driver