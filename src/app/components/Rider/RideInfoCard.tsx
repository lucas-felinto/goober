import React from 'react';
import { GeoLocation } from '~/interfaces/types';
import CarIcon from '../Icons/CarIcon';

type RideInfoCardType = {
  fare?: number,
  duration?: string,
  distance?: string,
  pickupLocation?: GeoLocation,
  dropoffLocation?: GeoLocation
}

const RideInfoCard = ({ fare, distance, duration }: RideInfoCardType) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-6">
        <div className="text-lg font-bold">Ride Details</div>
        <CarIcon className="h-6 w-6 text-gray-400" />
      </div>
      <div className="p-6">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">Distance</h4>
            <span className="text-sm text-gray-500">{distance}</span>
          </div>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">Duration</h4>
            <span className="text-sm text-gray-500">{duration}</span>
          </div>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">Fare</h4>
            <span className="text-sm text-gray-500">${fare?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default RideInfoCard;
