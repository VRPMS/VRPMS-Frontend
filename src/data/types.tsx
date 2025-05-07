import { Dispatch, SetStateAction } from "react";

export type TState = {
  locations: TLocation[] | null,
}

export type SetState = Dispatch<SetStateAction<TState>>;

export const defaultStoreState = {
  locations: null,
}

export enum ELocationType {
  WAREHOUSE = 0,
  CROSS_DOCK = 1,
  POINT = 2,
}

export type TDemand = {
  id: string;
  locationId: string;
  demand: string;
}

export type Poi = {
  key: string,
  location: google.maps.LatLngLiteral
}

export type TLocation = {
  id: string;
  name: string;
  type: ELocationType;
  longitude: number;
  latitude: number;
  serviceTime: number;
  penaltyLate: number;
  penaltyWait: number;
  demands: TDemand[],
}