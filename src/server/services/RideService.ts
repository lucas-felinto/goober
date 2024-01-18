import { IRide } from "~/interfaces/RideInterface";
import { CanceledBy, GeoLocation, Ride, Status } from "~/interfaces/types";
import { db } from "../db";
import { calculateDistance } from "../utils/MapsService";

export class RideService implements IRide {
  BASE_FARE: number;
  RATE_PER_KM: number;

  constructor() {
    this.BASE_FARE = 5;
    this.RATE_PER_KM = 2;
  }

  async create(riderId: number, driverId: number, fare: number): Promise<Ride> {
    return await db.ride.create({
      data: {
        riderId,
        driverId,
        fare,
        status: Status.REQUESTED,
      }
    })
  }

  async update(status: Status, rideId: number, driverId?: number, riderId?: number, canceledBy?: CanceledBy): Promise<Ride | null> {
    return await db.ride.update({
      data: {
        status
      },
      where: {
        id: rideId,
        driverId,
        riderId,
        status,
        canceledBy
      }
    })
  }

  async findOne(id: number, driverId?: number, riderId?: number, status?: Status): Promise<Ride | null> {
    return await db.ride.findUnique({
      where: {
        id,
        driverId,
        riderId,
        status
      }
    })
  }

  async getRideRequestsForDriver(driverId: number): Promise<Ride | null> {
    return await db.ride.findFirst({
      where: {
        driverId,
        status: Status.REQUESTED
      }
    })
  }

  async handlerRideRequest(rideId: number, driverId: number): Promise<Ride | null> {
    return await db.ride.update({
      where: { id: rideId },
      data: { driverId, status: Status.ACCEPTED }
    });
  }

  async calculateFare(pickupLocation: GeoLocation, dropoffLocation: GeoLocation): Promise<number> {
    try {
      const rows = await calculateDistance(pickupLocation, dropoffLocation);

      if (!rows?.elements?.[0]?.distance) {
        throw new Error('Unable to retrieve distance information.');
      }

      const distanceInMeters = rows.elements[0].distance.value;
      return this.calculateTotalFare(distanceInMeters);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private calculateTotalFare(distanceInMeters: number): number {
    const distanceInKilometers = distanceInMeters / 1000;
    return this.BASE_FARE + (distanceInKilometers * this.RATE_PER_KM);
  }
}