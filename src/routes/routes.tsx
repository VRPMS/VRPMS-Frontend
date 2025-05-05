import MainPage from "../pages/MainPage/MainPage.tsx";
import VehiclesPage from "../pages/VehiclesPage/VehiclesPage.tsx";
import LocationsPage from "../pages/LocationsPage/LocationsPage.tsx";
import RoutesPage from "../pages/RoutesPage/RoutesPage.tsx";
import PageNotFound from "../pages/PageNotFound/PageNotFound.tsx";
import { JSX } from "react";

type Route = {
  path: string,
  Component: JSX.Element
};

export const paths = {
  main: "/",
  vehicles: "/vehicles",
  locations: "/locations",
  routes: "/routes",
  error: "/*",
};

export const AppRoutes: Route[] = [
  {
    path: paths.main,
    Component: <MainPage/>,
  },
  {
    path: paths.vehicles,
    Component: <VehiclesPage/>,
  },
  {
    path: paths.locations,
    Component: <LocationsPage/>,
  },
  {
    path: paths.routes,
    Component: <RoutesPage/>,
  },
  {
    path: paths.error,
    Component: <PageNotFound/>,
  }
];
