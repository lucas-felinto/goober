export type Rider = {
  id: number;
  name: string;
  rides: Ride[]
};

export type Driver = {
  id: number;
  name: string;
  status: string;
  rides?: Ride[];
}

export type Ride = {
  id?: number;
  status: string;
  fare: number;
  rider?: Rider;
  riderId: number;
  driver?: Driver;
  driverId: number;
  canceledBy?: string | null;
  startAt?: Date | null;
  endAt?: Date | null;
}

export enum DriverStatus {
  AVAILABLE = "available",
  ON_RIDE = "on_ride"
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
  DECLINE = "decline"
}

export type GeoLocation = { lat: number, lng: number }