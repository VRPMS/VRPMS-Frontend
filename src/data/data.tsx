import outlinedSvg from '../assets/outlined.svg';
import { Poi, TDistance, TLocation, TLocationType, TRoute, TVehicle } from "./types.tsx";

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
    icon: `${outlinedSvg}#client`,
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
    pointType: {
      typeId: 0,
      typeName: "warehouse"
    },
    longitude: 28.7130344,
    latitude: 50.269126,
    serviceTime: "00:00:00",
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        windowStart: "00:00:00",
        windowEnd: "00:00:00",
      }
    ],
    demands: [
      {
        demandId: 0,
        demandValue: 0,
        demandName: "",
      },
      {
        demandId: 1,
        demandValue: 0,
        demandName: "",
      },
    ],
  },
  {
    id: 1,
    pointType: {
      typeId: 1,
      typeName: "cross-dock"
    },
    longitude: 26.2855705,
    latitude: 50.6193914,
    serviceTime: "00:00:00",
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        windowStart: "00:00:00",
        windowEnd: "00:00:00",
      }
    ],
    demands: [
      {
        demandId: 0,
        demandValue: 0,
        demandName: "",
      },
      {
        demandId: 1,
        demandValue: 0,
        demandName: "",
      },
    ],
  },
  {
    id: 2,
    pointType: {
      typeId: 2,
      typeName: "client"
    },
    longitude: 26.2748028,
    latitude: 50.6152662,
    serviceTime: "00:00:00",
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        windowStart: "00:00:00",
        windowEnd: "00:00:00",
      }
    ],
    demands: [
      {
        demandId: 0,
        demandValue: 0.66,
        demandName: "",
      },
      {
        demandId: 1,
        demandValue: 1,
        demandName: "",
      },
    ],
  },
  {
    id: 3,
    pointType: {
      typeId: 2,
      typeName: "client"
    },
    longitude: 26.2754707,
    latitude: 50.6152946,
    serviceTime: "00:00:00",
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        windowStart: "00:00:00",
        windowEnd: "00:00:00",
      }
    ],
    demands: [
      {
        demandId: 0,
        demandValue: 2.33,
        demandName: "",
      },
      {
        demandId: 1,
        demandValue: 1,
        demandName: "",
      },
    ],
  },
  {
    id: 4,
    pointType: {
      typeId: 2,
      typeName: "client"
    },
    longitude: 26.2752341,
    latitude: 50.6152333,
    serviceTime: "00:00:00",
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        windowStart: "00:00:00",
        windowEnd: "00:00:00",
      }
    ],
    demands: [
      {
        demandId: 0,
        demandValue: 0.86,
        demandName: "",
      },
      {
        demandId: 1,
        demandValue: 1,
        demandName: "",
      },
    ],
  },
  {
    id: 5,
    pointType: {
      typeId: 2,
      typeName: "client"
    },
    longitude: 26.2846243,
    latitude: 50.6297512,
    serviceTime: "00:00:00",
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        windowStart: "00:00:00",
        windowEnd: "00:00:00",
      }
    ],
    demands: [
      {
        demandId: 0,
        demandValue: 6.07,
        demandName: "",
      },
      {
        demandId: 1,
        demandValue: 1,
        demandName: "",
      },
    ],
  },
  {
    id: 6, //27
    pointType: {
      typeId: 2,
      typeName: "client"
    },
    longitude: 27.2195519,
    latitude: 51.2703183,
    serviceTime: "00:00:00",
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        windowStart: "00:00:00",
        windowEnd: "00:00:00",
      }
    ],
    demands: [
      {
        demandId: 0,
        demandValue: 0.51,
        demandName: "",
      },
      {
        demandId: 1,
        demandValue: 1,
        demandName: "",
      },
    ],
  },
  {
    id: 7, //28
    pointType: {
      typeId: 2,
      typeName: "client"
    },
    longitude: 25.8569188,
    latitude: 51.3399703,
    serviceTime: "00:00:00",
    penaltyLate: 0,
    penaltyWait: 5000,
    timeWindows: [
      {
        windowStart: "00:00:00",
        windowEnd: "00:00:00",
      }
    ],
    demands: [
      {
        demandId: 0,
        demandValue: 1.05,
        demandName: "",
      },
      {
        demandId: 1,
        demandValue: 1,
        demandName: "",
      },
    ],
  },
];


// defaults
export const locationDefault: TLocation = {
  id: 0,
  pointType: {
    typeId: 0,
    typeName: ""
  },
  longitude: 0,
  latitude: 0,
  serviceTime: "00:00:00",
  penaltyLate: 0,
  penaltyWait: 0,
  timeWindows: [
    {
      windowStart: "00:00:00",
      windowEnd: "00:00:00",
    }
  ],
  demands: [
    {
      demandId: 0,
      demandName: "",
      demandValue: 0,
    },
  ],
}

export const pointDefault: Poi = {
  id: 0,
  pointType: {
    typeId: 0,
    typeName: ""
  },
  location: {
    lat: 0,
    lng: 0
  }
}

export const vehicleDefault: TVehicle = {
  id: 0,
  capacity: [0],
  maxCapacity: [0],
  timeWindows: [
    {
      windowStart: "00:00:00",
      windowEnd: "00:00:00"
    }
  ],
  penaltyCapacityOverload: 0,
  penaltyMaxCapacityOverload: 0,
  penaltyOverwork: 0,
}

export const distanceDefault: TDistance = {
  id: 0,
  vehicleId: 0,
  locationFromId: 0,
  locationToId: 0,
  distance: 0,
  duration: 0
}

export const routeDefault: TRoute = {
  id: 0,
  vehicleId: 0,
  points: [pointDefault]
}

export const locationTypeDefault: TLocationType = {
  typeId: 0,
  typeName: ""
}


// data
export const points: Poi[] = locations.map(el => {
  return {
    id: el.id,
    pointType: el.pointType,
    location: {
      lat: Number(el.latitude),
      lng: Number(el.longitude)
    }
  }
});

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
    capacity: [40, 20],
    maxCapacity: [40, 20],
    timeWindows: [
      {
        windowStart: "00:00:00",
        windowEnd: "00:00:00"
      }
    ],
    penaltyCapacityOverload: 1000,
    penaltyMaxCapacityOverload: 1000,
    penaltyOverwork: 1000,
  },
  {
    id: 1,
    capacity: [40, 20],
    maxCapacity: [40, 20],
    timeWindows: [
      {
        windowStart: "00:00:00",
        windowEnd: "00:00:00"
      }
    ],
    penaltyCapacityOverload: 1000,
    penaltyMaxCapacityOverload: 1000,
    penaltyOverwork: 1000,
  },
  {
    id: 2,
    capacity: [40, 20],
    maxCapacity: [40, 20],
    timeWindows: [
      {
        windowStart: "00:00:00",
        windowEnd: "00:00:00"
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
    typeId: 1,
    typeName: "warehouse"
  },
  {
    typeId: 2,
    typeName: "cross-dock"
  },
  {
    typeId: 3,
    typeName: "client"
  },
]



export const defaultStoreState = {
  locations: [locationDefault],
  vehicles: [vehicleDefault],
  distances: [distanceDefault],
  routes: [routeDefault],
  locationTypes: [locationTypeDefault],
  points: [pointDefault],
  dataLoaded: false,
  isLoading: true
}