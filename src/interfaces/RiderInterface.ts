import { Rider } from "./types";

export interface IRiderService {
  fetchAll: () => Promise<Rider[]>;
}