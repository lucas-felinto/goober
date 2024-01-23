import { IRiderService } from "~/interfaces/RiderInterface";
import { db } from "../db";
import { Rider } from "~/interfaces/types";

export class RiderService implements IRiderService {
  async fetchAll(): Promise<Rider[]> {
    return await db.rider.findMany({});
  }
}