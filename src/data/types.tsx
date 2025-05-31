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

export type TCapacities = {
  demandId: number,
  demandName: string,
  capacity: number,
  maxCapacity: number,
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
  carId: number,
  visits: TVisit[]
}

export type TVisit = {
  locationId: number,
  arrivalTime: string | null,
  departureTime: string | null,
  distance: number,
  duration: number
}

export type TVehicle = {
  id: number,
  carCapacities: TCapacities[],
  carWorkHours: TTimeWindow,
  capacityOverloadPenalty: number,
  maxCapacityOverloadPenalty: number,
  overWorkPenalty: number,
  routeTemplate: any[], // TODO when routeTemplate is ready
}

export type TDistance = {
  id: number,
  vehicleId: number,
  locationFromId: number,
  locationToId: number,
  distance: number,
  duration: number
}