import { Dispatch, SetStateAction } from "react";
import {
  distanceDefault,
  locationDefault,
  locationTypeDefault,
  pointDefault,
  routeDefault,
  vehicleDefault, vehicleTypeDefault
} from "./data.tsx";

export type TState = {
  locations: TLocation[],
  vehicles: TVehicle[],
  distances: TDistance[],
  locationTypes: TLocationType[],
  vehicleTypes: TVehicleType[],
  routes: TRoute[],
  points: Poi[],
  dataLoaded: boolean
}

export type SetState = Dispatch<SetStateAction<TState>>;

export const defaultStoreState = {
  locations: [locationDefault],
  vehicles: [vehicleDefault],
  distances: [distanceDefault],
  routes: [routeDefault],
  locationTypes: [locationTypeDefault],
  vehicleTypes: [vehicleTypeDefault],
  points: [pointDefault],
  dataLoaded: false
}

export type TLocationType = {
  id: number,
  name: string
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
  type: TLocationType,
  location: google.maps.LatLngLiteral
}

export type TLocation = {
  id: number;
  type: TLocationType;
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
  maxCapacity: number[],
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