import { Poi, TLocation, TState } from "../data/types.tsx";
import { distances, locations, routes } from "../data/data.tsx";

const BASE_LINK = 'https://vrpms-backend.fly.dev/';

export async function loadData() {
  const [locations, vehicles, locationTypes] = await Promise.all([
    loadCollection("locations"),
    loadCollection("cars"),
    loadCollection("points/types/lov"),
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

  return {
    locations,
    routes,
    vehicles,
    points,
    distances: distances,
    locationTypes,
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
