export type Rider = {
  id: number;
  name: string;
  imageUrl?: string;
  rides?: Ride[]
};

export type Driver = {
  id: number;
  name: string;
  imageUrl?: string;
  status: string;
  rides?: Ride[];
}

export type Ride = {
  id?: number;
  status: string;
  fare: number;
  distance: string;
  pickupAddress: string;
  dropoffAddress: string;
  coordinates: string
  rider?: Rider;
  riderId: number;
  driver?: Driver;
  driverId?: number | null;
  canceledBy?: string | null;
  startAt?: Date | null;
  endAt?: Date | null;
}

export enum DriverStatus {
  AVAILABLE = "available",
  ON_RIDE = "on_ride",
  RESERVED = "reserved"
}

export enum Status {
  REQUESTED = "requested",
  ACCEPTED = "accepted",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELED = "canceled"
};

export enum CanceledBy {
  DRIVER = "driver",
  RIDER = "rider"
}

export enum Actions {
  ACCEPT = "accept",
  START = "start",
  DECLINE = "decline",
  CANCEL = "cancel",
  COMPLETE = "complete"
}

export type GeoLocation = { lat: number, lng: number }