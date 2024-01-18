import { Ride, Status, CanceledBy, GeoLocation } from "~/interfaces/types";

export interface IRide {
  create: (riderId: number, driverId: number, fare: number) => Promise<Ride>;
  // update: (id: number, status: Status, canceledBy?: CanceledBy) => Promise<Ride>;
  getRideRequestsForDriver: (driverId: number) => Promise<Ride | null>;
  handlerRideRequest: (rideId: number, driverId: number) => Promise<Ride | null>;
  calculateFare: (pickupLocation: GeoLocation, dropoffLocation: GeoLocation) => Promise<number>;
}