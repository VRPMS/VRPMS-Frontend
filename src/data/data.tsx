import outlinedSvg from '../assets/outlined.svg';
import { ELocationType, Poi, TLocation } from "./types.tsx";

export const links = [
  {
    id: 1,
    path: "/",
    title: "Main",
    icon: `${outlinedSvg}#home`,
  },
  {
    id: 2,
    path: "/vehicles",
    title: "Vehicles",
    icon: `${outlinedSvg}#vehicle`,
  },
  {
    id: 3,
    path: "/locations",
    title: "Locations",
    icon: `${outlinedSvg}#location`,
  },
  {
    id: 4,
    path: "/routes",
    title: "Routes",
    icon: `${outlinedSvg}#route`,
  },
];

export const locations: TLocation[] = [
  {
    id: 0,
    name: "вул. Кооперативна, 7, Житомир, Житомирська область, 10001",
    type: ELocationType.WAREHOUSE,
    longitude: 28.7130344,
    latitude: 50.269126,
    serviceTime: 345600,
    penaltyLate: 5000,
    penaltyWait: 50,
    demands: [
      {
        id: "0",
        locationId: "string",
        demand: "string",
      }
    ],
  },
  {
    id: 1,
    name: "вул. Захисників Маріуполя, 5, Рівне, Рівненська область, 33000",
    type: ELocationType.CROSS_DOCK,
    longitude: 26.2855705,
    latitude: 50.6193914,
    serviceTime: 345600,
    penaltyLate: 5000,
    penaltyWait: 50,
    demands: [{
      id: "1",
      locationId: "string",
      demand: "string",
    }],
  },
  {
    id: 2,
    name: "Кіоск N9, вулиця Відінська, 1, Рівне, Рівненська область, 33000",
    type: ELocationType.POINT,
    longitude: 26.2748028,
    latitude: 50.6152662,
    serviceTime: 345600,
    penaltyLate: 5000,
    penaltyWait: 50,
    demands: [{
      id: "2",
      locationId: "string",
      demand: "string",
    }],
  },
];

export const points: Poi[] = locations.map(el => {
  return {
    id: el.id,
    type: el.type,
    location: {
      lat: Number(el.latitude),
      lng: Number(el.longitude)
    }
  }
});

export const cars = [
  {
    id: 0,
    carType: "",
    capacity: "",
    timeWindows: [],
    penaltyCapacityOverload: "",
    penaltyMaxCapacityOverload: "",
    penaltyOverwork: "",
    // routeTemplate: "",
  },
  {
    id: 1,
    carType: "",
    capacity: "",
    timeWindows: [],
    penaltyCapacityOverload: "",
    penaltyMaxCapacityOverload: "",
    penaltyOverwork: "",
    // routeTemplate: "",
  },
  {
    id: 2,
    carType: "",
    capacity: "",
    timeWindows: [],
    penaltyCapacityOverload: "",
    penaltyMaxCapacityOverload: "",
    penaltyOverwork: "",
    // routeTemplate: "",
  },
  {
    id: 3,
    carType: "",
    capacity: "",
    timeWindows: [],
    penaltyCapacityOverload: "",
    penaltyMaxCapacityOverload: "",
    penaltyOverwork: "",
    // routeTemplate: "",
  },
  {
    id: 4,
    carType: "",
    capacity: "",
    timeWindows: [],
    penaltyCapacityOverload: "",
    penaltyMaxCapacityOverload: "",
    penaltyOverwork: "",
    // routeTemplate: "",
  },
  {
    id: 5,
    carType: "",
    capacity: "",
    timeWindows: [],
    penaltyCapacityOverload: "",
    penaltyMaxCapacityOverload: "",
    penaltyOverwork: "",
    // routeTemplate: "",
  },
];

export const distances = [
  {
    id: 0,
    carId: "",
    locationFromId: "",
    locationToId: "",
    distance: "",
    duration: ""
  },
  {
    id: 1,
    carId: "",
    locationFromId: "",
    locationToId: "",
    distance: "",
    duration: ""
  },
  {
    id: 2,
    carId: "",
    locationFromId: "",
    locationToId: "",
    distance: "",
    duration: ""
  },
  {
    id: 3,
    carId: "",
    locationFromId: "",
    locationToId: "",
    distance: "",
    duration: ""
  },
  {
    id: 4,
    carId: "",
    locationFromId: "",
    locationToId: "",
    distance: "",
    duration: ""
  },
  {
    id: 5,
    carId: "",
    locationFromId: "",
    locationToId: "",
    distance: "",
    duration: ""
  },
];