import { Ride } from "~/interfaces/types"

class DriverService {
  path: string
  constructor() {
    this.path = '/api/drivers/'
  }

  async fetchRideRequest(driverId: number): Promise<Ride | null> {
    return await fetch(this.path + `${driverId}/request`, {
      method: 'GET',
    }).then((res) => res.json())
  }
}

export default new DriverService()