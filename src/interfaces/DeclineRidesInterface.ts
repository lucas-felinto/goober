// import { RidesDeclined } from ''

import { RidesDeclined } from "./types";

export interface IDeclinedRides {
  createDecline: (driverId: number, rideId: number) => Promise<RidesDeclined>;
  fetchDeclinedRide: (driverId: number, rideId: number) => Promise<RidesDeclined | null>;
}