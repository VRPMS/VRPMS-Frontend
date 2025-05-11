import outlinedSvg from '../assets/outlined.svg';
import { ELocationType, EVehicleType, Poi, TLocation, TVehicle } from "./types.tsx";

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
    type: ELocationType.WAREHOUSE,
    longitude: 28.7130344,
    latitude: 50.269126,
    serviceTime: 300,
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        id: 0,
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
    type: ELocationType.CROSS_DOCK,
    longitude: 26.2855705,
    latitude: 50.6193914,
    serviceTime: 300,
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        id: 0,
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
    type: ELocationType.CLIENT,
    longitude: 26.2748028,
    latitude: 50.6152662,
    serviceTime: 300,
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        id: 0,
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
    type: ELocationType.CLIENT,
    longitude: 26.2754707,
    latitude: 50.6152946,
    serviceTime: 300,
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        id: 0,
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
    type: ELocationType.CLIENT,
    longitude: 26.2752341,
    latitude: 50.6152333,
    serviceTime: 300,
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        id: 0,
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
    type: ELocationType.CLIENT,
    longitude: 26.2846243,
    latitude: 50.6297512,
    serviceTime: 300,
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        id: 0,
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
    id: 6,
    type: ELocationType.CLIENT,
    longitude: 27.2195519,
    latitude: 51.2703183,
    serviceTime: 300,
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        id: 0,
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
    id: 7,
    type: ELocationType.CLIENT,
    longitude: 25.8569188,
    latitude: 51.3399703,
    serviceTime: 300,
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        id: 0,
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
  type: ELocationType.CLIENT,
  location: {
    lat: 0,
    lng: 0
  }
}

export const routes = [
  {
    id: 0,
    carId: 0,
    points: [points[0], points[1], points[2], points[0]]
  },
  {
    id: 1,
    carId: 1,
    points: [points[0], points[6], points[7], points[0]]
  },
  {
    id: 2,
    carId: 2,
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
    number: "КМ1038ПО",
    vehicleType: EVehicleType.TRUCK,
    capacity: [40, 20],
    timeWindows: [
      {
        id: 0,
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
    number: "КМ3765МР",
    vehicleType: EVehicleType.TRUCK,
    capacity: [40, 20],
    timeWindows: [
      {
        id: 0,
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
    number: "КМ9437ТА",
    vehicleType: EVehicleType.TRUCK,
    capacity: [40, 20],
    timeWindows: [
      {
        id: 0,
        from: 28800,
        to: 892800
      }
    ],
    penaltyCapacityOverload: 1000,
    penaltyMaxCapacityOverload: 1000,
    penaltyOverwork: 1000,
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