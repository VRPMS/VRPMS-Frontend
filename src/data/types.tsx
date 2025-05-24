import { Dispatch, SetStateAction } from "react";

export type TState = {
  locations: TLocation[],
  vehicles: TVehicle[],
  distances: TDistance[],
  locationTypes: TLocationType[],
  routes: TRoute[],
  points: Poi[],
  dataLoaded: boolean,
  isLoading: boolean
}

export type SetState = Dispatch<SetStateAction<TState>>;

export type TLocationType = {
  typeId: number,
  typeName: string
}

export type TDemand = {
  demandId: number,
  demandName: string,
  demandValue: number
}

export type TTimeWindow = {
  windowStart: string,
  windowEnd: string
}

export type Poi = {
  id: number,
  pointType: TLocationType,
  location: google.maps.LatLngLiteral
}

export type TLocation = {
  id: number;
  pointType: TLocationType;
  longitude: number;
  latitude: number;
  serviceTime: string;
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