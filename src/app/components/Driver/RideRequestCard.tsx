import React from 'react'
import { Actions } from '~/interfaces/types';

type RideRequestCardType = {
  fare: number;
  pickupLocation: string;
  dropoffLocation: string;
  action: (action: Actions) => void
}

export default function RideRequestCard(props: RideRequestCardType) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-8">
      <div className="rounded-lg border bg-white text-card-foreground shadow-sm w-full max-w-md" data-v0-t="card">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">Ride Request</h3>
        </div>
        <div className="p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="passenger-name"
              >
                Fare
              </label>
              <p id="passenger-name" className="text-gray-500 dark:text-gray-400">
                ${props.fare}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="pickup-location"
              >
                Pickup Location
              </label>
              <p id="pickup-location" className="text-gray-500 dark:text-gray-400">
                {props.pickupLocation}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="dropoff-location"
              >
                Dropoff Location
              </label>
              <p id="dropoff-location" className="text-gray-500 dark:text-gray-400">
                {props.dropoffLocation}
              </p>
            </div>
          </div>
        </div>
        <div className="items-center p-6 flex justify-between">
          <button onClick={() => props.action(Actions.DECLINE)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            Decline
          </button>
          <button onClick={() => props.action(Actions.ACCEPT)} className="inline-flex bg-black text-white items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
