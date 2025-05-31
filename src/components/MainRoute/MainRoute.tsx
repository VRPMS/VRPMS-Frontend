import routeIcon from '../../assets/images/route.png';
import routePointIcon from '../../assets/images/route-point.png';
import routeActivePointIcon from '../../assets/images/route-active-point.png';
import './MainRoute.scss';
import { useEffect, useRef, useState } from "react";
import { TRoute } from "../../data/types.tsx";
import { NavLink } from "react-router-dom";
import { paths } from "../../routes/routes.tsx";
import outlinedSvg from "../../assets/svg/outlined.svg";
import dayjs from "dayjs";
import { useStore } from "../../store/store.tsx";

type TProps = {
  activeRoute: number | null,
  activeLocation: number | null,
  onLocationClick: (ev: (google.maps.MapMouseEvent | null), pointId: number) => void
}

function MainRoute({ activeRoute, activeLocation, onLocationClick }: TProps) {
  const [{ routes }] = useStore();
  const [route, setRoute] = useState<TRoute | null>(null);
  const [tripDuration, setTripDuration] = useState<number>(0);
  const itemRef = useRef<Record<string, HTMLLIElement>>({});

  useEffect(() => {
  }, [activeLocation]);

  const elementIsVisible = (el: HTMLLIElement) => {
    if (!el) return false;
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
  };

  useEffect(() => {
    setRoute(routes.find(el => el.id === activeRoute) ?? null);
    if (activeLocation) {
      if (!elementIsVisible(itemRef.current[activeLocation.toString()])) {
        itemRef.current[activeLocation.toString() as string]?.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [activeRoute, activeLocation]);

  useEffect(() => {
    if (route) {
      console.log(111, route.visits.reduce((dur, el) => dur + new Date(`2004-01-01T${el.duration}`).getTime(), 0))
      setTripDuration(route.visits.reduce((dur, el) => dur + new Date(`2004-01-01T${el.duration}`).getTime(), 0));
    }
  }, [route]);

  const getDistance = (distance: number) => {
    const km = Math.floor(distance / 1000);
    const m = Math.round(distance % 1000);
    return `${km ? km + ' km' : ""} ${m ? m + ' m' : ""}`
  }

  const getDuration = (duration: number) => {
    const h = dayjs(`2004-01-01T${duration}`).get('hours') ?? 0;
    const min = dayjs(`2004-01-01T${duration}`).get('minutes') ?? 0;

    return `${h ? h + ' h' : ""} ${min ? min + ' min' : "0 min"}`
  }

  return <>
    <div className="main-route">
      <h2 className="main-route__title">Route details</h2>
      <div className="main-route__route-info">
        {activeRoute !== null
          ? <div className="main-route__route-info__container">
            <NavLink to={paths.vehicles} className="main-route__route-info__header">
              <h3 className="main-route__route-info__header__title">Vehicle ID: {route?.carId}</h3>
              <svg className="main-route__route-info__header__icon" width="24" height="24">
                <use href={`${outlinedSvg}#arrow-link`}/>
              </svg>
            </NavLink>
            <p className="main-route__route-info__header__subtitle">Trip
              duration: {getDuration(tripDuration)}</p>
            <div className="main-route__route-info__list">
              <ul className="main-route__route-info__list-content">
                {route?.visits.map((el, index) => {
                  return <li
                    ref={(item) => {
                      if (item) {
                        itemRef.current[el.locationId] = item
                      }
                    }}
                    onClick={() => onLocationClick(null, el.locationId)}
                    key={index}
                    className={(el.locationId === activeLocation)
                      ? "main-route__route-info__list-item main-route__route-info__list-item--active"
                      : "main-route__route-info__list-item"
                    }>
                    {(activeLocation === el.locationId)
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
                      <h4 className="main-route__route-info__list-item__info-header">Location ID: {el?.locationId}</h4>
                      {index ? (
                        <p className="main-route__route-info__list-item__info-text">Distance to
                          location: {getDistance(el.distance)}</p>) : ""}
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