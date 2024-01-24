import { db } from '../db';
import { Driver, DriverStatus, Status } from '~/interfaces/types';
import { IDriverService } from '~/interfaces/DriverInterface';

export class DriverService implements IDriverService {
  async fetchAll(): Promise<Driver[] | []> {
    return await db.driver.findMany({});
  }

  async findAvailableDriver(): Promise<Driver | null> {
    return await db.driver.findFirst({
      where: { status: DriverStatus.AVAILABLE }
    });
  }

  async getDriverDetails(driverId: number): Promise<Driver | null> {
    return await db.driver.findUnique({
      where: { id: driverId }
    });
  }

  async update(driverId: number, status: DriverStatus): Promise<void> {
    await db.driver.update({
      where: {
        id: driverId
      },
      data: {
        status
      }
    })
  }

  async completeRide(rideId: number): Promise<void> {
    await db.ride.update({
      where: { id: rideId },
      data: { status: Status.COMPLETED }
    });
  }
}
