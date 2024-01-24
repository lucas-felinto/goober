import { CreateParams } from "~/interfaces/RideInterface"
import { Actions, GeoLocation, Ride } from "~/interfaces/types"

type FareResponse = {
  distance: {
    text: string,
    value: string
  },
  duration: {
    text: string,
    value: string
  },
  price: number
}

type StandartResponse = { message: string }

class RideService {
  path: string;

  constructor() {
    this.path = '/api/rides'
  }

  async calculateFare(pickupLocation: GeoLocation, dropoffLocation: GeoLocation): Promise<FareResponse> {
    const elements = await fetch(this.path + '/fare', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pickupLocation,
        dropoffLocation
      })
    }).then((res) => res.json());

    return elements
  }

  async requestRide(params: CreateParams): Promise<StandartResponse> {
    return await fetch(this.path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then((res) => res.json())
  }

  async handler(rideId: number, driverId: number, action: Actions): Promise<StandartResponse> {
    return await fetch(this.path + `/${rideId}/handler`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ driverId, action })
    }).then((res) => res.json())
  }

  async start(rideId: number, driverId: number): Promise<StandartResponse> {
    return await fetch(this.path + `/${rideId}/start`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ driverId })
    }).then((res) => res.json())
  }

  async cancel(rideId: number, driverId: number): Promise<StandartResponse> {
    return await fetch(this.path + `/${rideId}/cancel`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ driverId })
    }).then((res) => res.json())
  }

  async complete(rideId: number, driverId: number): Promise<StandartResponse> {
    return await fetch(this.path + `/${rideId}/complete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ driverId })
    }).then((res) => res.json())
  }

  async decline(rideId: number, driverId: number): Promise<StandartResponse> {
    return await fetch(this.path + `/${rideId}/decline`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ driverId })
    }).then((res) => res.json())
  }

  async getOngoingRide({ driverId, riderId }: { driverId?: number, riderId?: number }): Promise<Ride | null> {
    return await fetch(this.path + `/ongoing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ driverId, riderId })
    }).then((res) => res.json())
  }
}

export default new RideService()