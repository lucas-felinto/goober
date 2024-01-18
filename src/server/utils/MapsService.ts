import { Client, TravelMode, UnitSystem } from "@googlemaps/google-maps-services-js";
import { GeoLocation } from "~/interfaces/types";
export const maps = new Client({})

export async function calculateDistance(pickupLocation: GeoLocation, dropoffLocation: GeoLocation) {
  if (!process.env.GOOGLE_MAPS_API_KEY) throw new Error("Missing GOOGLE_MAPS_API_KEY")

  const { data } = await maps.distancematrix({
    params: {
    key: process.env.GOOGLE_MAPS_API_KEY,
    origins: [
      pickupLocation,
    ],
    destinations: [
      dropoffLocation
    ],
    mode: TravelMode.driving,
    units: UnitSystem.imperial
  }});

  const elements = data.rows
  return elements[0]
}
