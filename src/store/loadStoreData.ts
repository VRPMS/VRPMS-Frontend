import { Poi, TLocation, TState } from "../data/types.tsx";
import uniqolor from "uniqolor";
// import { locations } from "../data/data.tsx";

const BASE_LINK = 'https://vrpms-backend.fly.dev/';

export async function loadData() {
  const [locations, vehicles, locationTypes, routes] = await Promise.all([
    loadCollection("locations"),
    loadCollection("cars"),
    loadCollection("points/types/lov"),
    loadCollection("solutions/current/routes"),
  ]);

  const points: Poi[] = locations.map((el : TLocation) => {
    return {
      id: el.id,
      pointType: el.pointType,
      location: {
        lat: Number(el.latitude),
        lng: Number(el.longitude)
      }
    }
  });

  const colors = routes.map(()=>{
    return uniqolor.random({
      saturation: 80,
      lightness: [45, 70],
    })
  })

  return {
    locations,
    vehicles,
    locationTypes,
    routes,
    points,
    colors
  } as TState
}

export async function loadCollection(key: string) {
  const res = await fetch(BASE_LINK + key);
  if (res.ok) {
    return res.json();
  } else {
    throw await res.json();
  }
}
