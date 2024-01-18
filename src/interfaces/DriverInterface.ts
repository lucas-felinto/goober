import { Driver, DriverStatus } from '~/interfaces/types';

export interface IDriverService {
  findAvailableDriver: () => Promise<Driver | null>;
  getDriverDetails: (driverId: number) => Promise<Driver | null>;
  update: (driverId: number, status: DriverStatus) => Promise<Driver>;
  updateDriverStatus: (driverId: number, status: DriverStatus) => Promise<void>;
  completeRide: (rideId: number) => Promise<void>;
}
