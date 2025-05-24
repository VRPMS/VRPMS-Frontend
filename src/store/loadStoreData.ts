import { Poi, TLocation, TState } from "../data/types.tsx";
import { distances, locationTypes, routes, vehicles } from "../data/data.tsx";

const BASE_LINK = 'https://vrpms-backend.fly.dev/';

export async function loadData() {
  const [locations] = await Promise.all([
    loadLocations(),
  ]);

  const points: Poi[] = locations.map(el => {
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
    routes: routes,
    vehicles: vehicles,
    points,
    distances,
    locationTypes,
  } as TState
}

export async function loadLocations() {
  const res = await fetch(BASE_LINK + "Locations");
  if (res.ok) {
    const data = await res.json();
    return data as TLocation[];
  } else {
    throw await res.json();
  }
}
