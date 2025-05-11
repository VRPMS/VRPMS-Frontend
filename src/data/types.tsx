import { Dispatch, SetStateAction } from "react";
import { vehicles } from "./data.tsx";

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
  CLIENT = 2,
}
export enum EVehicleType {
  TRUCK = 0,
  CAR = 1,
}

export type TDemand = {
  id: number,
  demand: number
}

export type TTimeWindow = {
  id: number,
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

export type TVehicle = {
  id: number,
  number: string,
  vehicleType: EVehicleType,
  capacity: number[],
  timeWindows: TTimeWindow[],
  penaltyCapacityOverload: number,
  penaltyMaxCapacityOverload: number,
  penaltyOverwork: number,
}