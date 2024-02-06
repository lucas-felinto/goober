import { IDeclinedRides } from "~/interfaces/DeclineRidesInterface";
import { db } from "../db";
import { RidesDeclined } from "~/interfaces/types";

class DeclineRides implements IDeclinedRides {
  async createDecline(driverId: number, rideId: number): Promise<RidesDeclined> {
    return await db.declinesRides.create({
      data: {
        ride: {
          connect: {
            id: rideId
          }
        },
        driver: {
          connect: {
            id: driverId
          }
        }
      }
    })
  }

  async fetchDeclinedRide(driverId: number, rideId: number): Promise<RidesDeclined | null> {
    return await db.declinesRides.findFirst({
      where: { driverId: driverId, rideId: rideId }
    })
  }
}

export default DeclineRides
