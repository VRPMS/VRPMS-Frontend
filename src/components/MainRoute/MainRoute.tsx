import routeIcon from '../../assets/route.png';
import routePointIcon from '../../assets/route-point.png';
import routeActivePointIcon from '../../assets/route-active-point.png';
import './MainRoute.scss';
import { useEffect, useState } from "react";
import { TDistance, TRoute } from "../../data/types.tsx";
import { distances, routes } from "../../data/data.tsx";
import { NavLink } from "react-router-dom";
import { paths } from "../../routes/routes.tsx";
import outlinedSvg from "../../assets/outlined.svg";
import dayjs from "dayjs";

type TProps = {
  activeRoute: number | null,
  activeLocation: number | null,
  onLocationClick: (ev: (google.maps.MapMouseEvent | null), pointId: number) => void
}

function MainRoute({ activeRoute, activeLocation, onLocationClick }: TProps) {
  const [route, setRoute] = useState<TRoute | null>(null);
  const [routeDistances, setRouteDistances] = useState<TDistance[]>([]);
  const [tripDuration, setTripDuration] = useState<number>(0);

  useEffect(() => {
    setRoute(routes.find(el => el.id === activeRoute));
  }, [activeRoute]);

  useEffect(() => {
    const filteredDistances = distances?.filter(el => el.vehicleId === route?.vehicleId);

    setRouteDistances(filteredDistances);
    setTripDuration(filteredDistances.reduce((dur, el) => dur + el.duration, 0));
  }, [route, distances]);

  const getDistance = (index: number, array: any) => {
    const tempDistance = routeDistances.find(item => item.locationToId === array[index].id && item.locationFromId === array[index - 1].id)?.distance;

    const km = Math.floor(tempDistance / 1000);
    const m = Math.round(tempDistance % 1000);
    return `${km ? km + ' km' : ""} ${m ? m + ' m' : ""}`

  }

  return <>
    <div className="main-route">
      <h2 className="main-route__title">Route details</h2>
      <div className="main-route__route-info">
        {activeRoute !== null
          ? <div className="main-route__route-info__container">
            <NavLink to={paths.vehicles} className="main-route__route-info__header">
              <h3 className="main-route__route-info__header__title">Vehicle ID: {route?.vehicleId}</h3>
              <svg className="main-route__route-info__header__icon" width="24" height="24">
                <use href={`${outlinedSvg}#arrow-link`}/>
              </svg>
            </NavLink>
            <p className="main-route__route-info__header__subtitle">Trip
              duration: {dayjs.duration(tripDuration, 'seconds').hours()} h {dayjs.duration(tripDuration, 'seconds').minutes()} min</p>
            <div className="main-route__route-info__list">
              <ul className="main-route__route-info__list-content">
                {route?.points.map((el, index, array) => {
                  return <li
                    onClick={() => onLocationClick(null, el.id)}
                    key={index}
                    className={(el.id === activeLocation)
                      ? "main-route__route-info__list-item main-route__route-info__list-item--active"
                      : "main-route__route-info__list-item"
                    }>
                    {(activeLocation === el.id)
                      ? <img
                        src={routeActivePointIcon}
                        alt="route icon"
                        className="main-route__route-info__list-item__icon"
                        width={16}
                        height={16}/>
                      : <img
                        src={routePointIcon}
                        alt="route icon"
                        className="main-route__route-info__list-item__icon"
                        width={16}
                        height={16}/>}
                    <div className="main-route__route-info__list-item__info">
                      <h4 className="main-route__route-info__list-item__info-header">Location ID: {el?.id}</h4>
                      {index ? (
                        <p className="main-route__route-info__list-item__info-text">Distance to
                          location: {getDistance(index, array)}</p>) : ""}
                    </div>
                  </li>
                })}
              </ul>
            </div>
          </div>
          : <div className="main-route__no-route">
            <img src={routeIcon} alt="route icon" className="main-route__no-route__icon" width={52} height={52}/>

            <p className="main-route__no-route__text">Choose the route on a map to see detailed information about it</p>
          </div>}
      </div>
    </div>
  </>;
}

export default MainRoute;