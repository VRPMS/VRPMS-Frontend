import outlinedSvg from '../assets/outlined.svg';
import { Poi, TDistance, TLocation, TLocationType, TRoute, TVehicle, TVehicleType } from "./types.tsx";

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
    type: {
      id: 0,
      name: "warehouse"
    },
    longitude: 28.7130344,
    latitude: 50.269126,
    serviceTime: 300,
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        from: 28800,
        to: 46800,
      }
    ],
    demands: [
      {
        id: 0,
        demand: 0,
      },
      {
        id: 1,
        demand: 0,
      },
    ],
  },
  {
    id: 1,
    type: {
      id: 1,
      name: "cross-dock"
    },
    longitude: 26.2855705,
    latitude: 50.6193914,
    serviceTime: 300,
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        from: 28800,
        to: 46800,
      }
    ],
    demands: [
      {
        id: 0,
        demand: 0,
      },
      {
        id: 1,
        demand: 0,
      },
    ],
  },
  {
    id: 2,
    type: {
    id: 2,
    name: "client"
  },
    longitude: 26.2748028,
    latitude: 50.6152662,
    serviceTime: 300,
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        from: 28800,
        to: 46800,
      }
    ],
    demands: [
      {
        id: 0,
        demand: 0.66,
      },
      {
        id: 1,
        demand: 1,
      },
    ],
  },
  {
    id: 3,
    type: {
    id: 2,
    name: "client"
  },
    longitude: 26.2754707,
    latitude: 50.6152946,
    serviceTime: 300,
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        from: 28800,
        to: 46800,
      }
    ],
    demands: [
      {
        id: 0,
        demand: 2.33,
      },
      {
        id: 1,
        demand: 1,
      },
    ],
  },
  {
    id: 4,
    type: {
    id: 2,
    name: "client"
  },
    longitude: 26.2752341,
    latitude: 50.6152333,
    serviceTime: 300,
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        from: 28800,
        to: 46800,
      }
    ],
    demands: [
      {
        id: 0,
        demand: 0.86,
      },
      {
        id: 1,
        demand: 1,
      },
    ],
  },
  {
    id: 5,
    type: {
    id: 2,
    name: "client"
  },
    longitude: 26.2846243,
    latitude: 50.6297512,
    serviceTime: 300,
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        from: 28800,
        to: 46800,
      }
    ],
    demands: [
      {
        id: 0,
        demand: 6.07,
      },
      {
        id: 1,
        demand: 1,
      },
    ],
  },
  {
    id: 6, //27
    type: {
    id: 2,
    name: "client"
  },
    longitude: 27.2195519,
    latitude: 51.2703183,
    serviceTime: 300,
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        from: 28800,
        to: 46800,
      }
    ],
    demands: [
      {
        id: 0,
        demand: 0.51,
      },
      {
        id: 1,
        demand: 1,
      },
    ],
  },
  {
    id: 7, //28
    type: {
    id: 2,
    name: "client"
  },
    longitude: 25.8569188,
    latitude: 51.3399703,
    serviceTime: 300,
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        from: 28800,
        to: 46800,
      }
    ],
    demands: [
      {
        id: 0,
        demand: 1.05,
      },
      {
        id: 1,
        demand: 1,
      },
    ],
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

export const pointDefault = {
  id: 0,
  type: {
      id: 2,
      name: "client"
    },
  location: {
    lat: 0,
    lng: 0
  }
}

export const routes: TRoute[] = [
  {
    id: 0,
    vehicleId: 0,
    points: [points[0], points[1], points[2], points[3], points[0]]
  },
  {
    id: 1,
    vehicleId: 1,
    points: [points[0], points[6], points[7], points[0]]
  },
  {
    id: 2,
    vehicleId: 2,
    points: [points[0], points[5], points[1], points[0]]
  },
]

export const colors = [
  "#FF862A",
  "#46D100",
  "#D678FF",
  "#74AEFF",
]

export const vehicles: TVehicle[] = [
  {
    id: 0,
    vehicleType: {
      id: 0,
      name: "Truck"
    },
    capacity: [40, 20],
    timeWindows: [
      {
        from: 28800,
        to: 892800
      }
    ],
    penaltyCapacityOverload: 1000,
    penaltyMaxCapacityOverload: 1000,
    penaltyOverwork: 1000,
  },
  {
    id: 1,
    vehicleType: {
      id: 0,
      name: "Truck"
    },
    capacity: [40, 20],
    timeWindows: [
      {
        from: 28800,
        to: 892800
      }
    ],
    penaltyCapacityOverload: 1000,
    penaltyMaxCapacityOverload: 1000,
    penaltyOverwork: 1000,
  },
  {
    id: 2,
    vehicleType: {
      id: 0,
      name: "Truck"
    },
    capacity: [40, 20],
    timeWindows: [
      {
        from: 28800,
        to: 892800
      }
    ],
    penaltyCapacityOverload: 1000,
    penaltyMaxCapacityOverload: 1000,
    penaltyOverwork: 1000,
  },
];

export const distances: TDistance[] = [
  {
    id: 0,
    vehicleId: 0,
    locationFromId: 0,
    locationToId: 1,
    distance: 190162.012578476,
    duration: 8640
  },
  {
    id: 1,
    vehicleId: 0,
    locationFromId: 1,
    locationToId: 2,
    distance: 1648.596667861,
    duration: 180
  },
  {
    id: 2,
    vehicleId: 0,
    locationFromId: 2,
    locationToId: 3,
    distance: 53.19274487,
    duration: 0
  },
  {
    id: 3,
    vehicleId: 0,
    locationFromId: 3,
    locationToId: 0,
    distance: 190829.035818777,
    duration: 8700
  },
  {
    id: 4,
    vehicleId: 1,
    locationFromId: 0,
    locationToId: 6,
    distance: 198479.171007548,
    duration: 8700
  },
  {
    id: 5,
    vehicleId: 1,
    locationFromId: 6,
    locationToId: 7,
    distance: 108820.263557334,
    duration: 5520
  },
  {
    id: 6,
    vehicleId: 1,
    locationFromId: 7,
    locationToId: 0,
    distance: 300387.376663843,
    duration: 13500
  },
  {
    id: 7,
    vehicleId: 2,
    locationFromId: 0,
    locationToId: 5,
    distance: 191669.403569066,
    duration: 8760
  },
  {
    id: 8,
    vehicleId: 2,
    locationFromId: 5,
    locationToId: 1,
    distance: 1700.218382256,
    duration: 180
  },
  {
    id: 9,
    vehicleId: 2,
    locationFromId: 1,
    locationToId: 0,
    distance: 190162.012578476,
    duration: 8640
  },
];

export const locationTypes: TLocationType[] = [
  {
    id: 0,
    name: "warehouse"
  },
  {
    id: 1,
    name: "cross-dock"
  },
  {
    id: 2,
    name: "client"
  },
]

export const vehicleTypes: TVehicleType[] = [
  {
    id: 0,
    name: "Truck"
  },
]