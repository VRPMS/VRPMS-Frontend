import { Dispatch, SetStateAction } from "react";

export type TState = {
  locations: TLocation[] | null,
}

export type SetState = Dispatch<SetStateAction<TState>>;

export const defaultStoreState = {
  locations: null,
}

export enum ELocationType {
  WAREHOUSE,
  CROSS_DOCK,
  CLIENT,
}
export type TVehicleType = {
  id: number,
  name: string
}

export type TDemand = {
  id: number,
  demand: number
}

export type TTimeWindow = {
  from: number,
  to: number
}

export type Poi = {
  id: number,
  type: ELocationType,
  location: google.maps.LatLngLiteral
}

export type TLocation = {
  id: number;
  type: ELocationType;
  longitude: number;
  latitude: number;
  serviceTime: number;
  penaltyLate: number;
  penaltyWait: number;
  timeWindows: TTimeWindow[],
  demands: TDemand[],
}

export type TRoute = {
  id: number,
  vehicleId: number,
  points: Poi[]
}

export type TVehicle = {
  id: number,
  vehicleType: TVehicleType,
  capacity: number[],
  timeWindows: TTimeWindow[],
  penaltyCapacityOverload: number,
  penaltyMaxCapacityOverload: number,
  penaltyOverwork: number,
}



export type TDistance = {
  id: number,
  vehicleId: number,
  locationFromId: number,
  locationToId: number,
  distance: number,
  duration: number
}