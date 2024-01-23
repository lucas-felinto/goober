import { CreateParams, UpdateParams, FindOneParams, IRide, NullableRidePromise } from "~/interfaces/RideInterface";
import { GeoLocation, Ride, Status } from "~/interfaces/types";
import { db } from "../db";
import { calculateDistance } from "../utils/MapsService";

export class RideService implements IRide {
  BASE_FARE: number;
  RATE_PER_KM: number;

  constructor() {
    this.BASE_FARE = 5;
    this.RATE_PER_KM = 2;
  }

  async create({ riderId, driverId, fare, distance, coordinates, pickupAddress, dropoffAddress }: CreateParams): Promise<Ride> {
    return await db.ride.create({
      data: {
        rider: {
          connect: {
            id: riderId
          }
        },
        driver: {
          connect: {
            id: driverId
          }
        },
        fare,
        distance,
        coordinates,
        pickupAddress,
        dropoffAddress,
        status: Status.REQUESTED,
      }
    })
  }

  async update({ rideId, status, driverId, riderId, canceledBy }: UpdateParams): NullableRidePromise {
    return await db.ride.update({
      where: {
        id: rideId,
      },
      data: {
        driver: {
          connect: {
            id: driverId
          }
        },
        status,
        canceledBy
      },
    })
  }

  async findOne({ id, driverId, riderId, status }: FindOneParams): NullableRidePromise {
    return await db.ride.findUnique({
      where: {
        id,
        driverId,
        riderId,
        status
      }
    })
  }

  async findOngoingRide(driverId?: number, riderId?: number): Promise<Ride | null> {
    const potentialStatuses = [Status.ACCEPTED, Status.IN_PROGRESS];
    return await db.ride.findFirst({
      where: {
        driverId,
        riderId,
        status: { in: potentialStatuses },
      }
    });
  };

  async getRideRequestForDriver(driverId: number): NullableRidePromise {
    return await db.ride.findFirst({
      where: {
        driverId,
        status: Status.REQUESTED
      }
    })
  }

  async handleRideRequest(rideId: number, driverId: number): NullableRidePromise {
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
    return (this.BASE_FARE + (distanceInKilometers * this.RATE_PER_KM));
  }
}