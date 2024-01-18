import { Ride, Status, CanceledBy, GeoLocation } from "~/interfaces/types";

export interface IRide {
  create: (riderId: number, driverId: number, fare: number) => Promise<Ride>;
  update: (status: Status, rideId: number, driverId?: number, riderId?: number, canceledBy?: CanceledBy) => Promise<Ride | null>;
  findOne: (id: number, driverId?: number, riderId?: number, status?: Status) => Promise<Ride | null>;
  getRideRequestsForDriver: (driverId: number) => Promise<Ride | null>;
  handlerRideRequest: (rideId: number, driverId: number) => Promise<Ride | null>;
  calculateFare: (pickupLocation: GeoLocation, dropoffLocation: GeoLocation) => Promise<number>;
}