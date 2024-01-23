import { Ride, Status, CanceledBy, GeoLocation, Rider } from "~/interfaces/types";

export type NullableRidePromise = Promise<Ride | null>;

export interface CreateParams {
  riderId: number;
  driverId?: number;
  fare: number;
  coordinates: string;
  pickupAddress: string;
  dropoffAddress: string;
  distance: string
}

export interface UpdateParams {
  status?: Status;
  rideId: number;
  driverId?: number;
  riderId?: number;
  canceledBy?: CanceledBy;
}

export interface FindOneParams {
  id?: number;
  driverId?: number;
  riderId?: number;
  status?: Status;
}

export interface IRide {
  create(params: CreateParams): Promise<Ride>;
  update(params: UpdateParams): NullableRidePromise;
  findOne(params: FindOneParams): NullableRidePromise;
  getRideRequestForDriver(driverId: number): NullableRidePromise;
  handleRideRequest(rideId: number, driverId: number): NullableRidePromise;
  calculateFare(pickupLocation: GeoLocation, dropoffLocation: GeoLocation): Promise<number>;
}
