import { Poi, TLocation, TState } from "../data/types.tsx";

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

  console.log(locations)
  return {
    locations,
    points
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
