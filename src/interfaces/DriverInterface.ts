import { Driver, DriverStatus } from '~/interfaces/types';

export interface IDriverService {
  fetchAll: () => Promise<Driver[] | null>;
  findAvailableDriver: () => Promise<Driver | null>;
  getDriverDetails: (driverId: number) => Promise<Driver | null>;
  update: (driverId: number, status: DriverStatus) => Promise<void>;
  completeRide: (rideId: number) => Promise<void>;
}
