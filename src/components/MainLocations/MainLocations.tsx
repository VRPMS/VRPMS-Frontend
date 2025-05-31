import { NavLink, useSearchParams } from "react-router-dom";
import { paths } from "../../routes/routes.tsx";
import outlinedSvg from '../../assets/svg/outlined.svg';
import notFoundPNG from "../../assets/images/not-found.png";
import './MainLocations.scss';
import dayjs from "dayjs";
import { useStore } from "../../store/store.tsx";
import { useEffect, useRef, useState } from "react";
import { TLocation } from "../../data/types.tsx";

type TProps = {
  activeLocation: number | null,
  onLocationClick: (ev: (google.maps.MapMouseEvent | null), pointId: number) => void
}

function MainLocations({ activeLocation, onLocationClick }: TProps) {
  const [{ locations }] = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  let query = searchParams.get("query") || "";
  const itemRef = useRef<Record<string, HTMLLIElement>>({});
  const [searchedLocations, setSearchedLocations] = useState<TLocation[]>([]);

  useEffect(() => {
    query = ""
  }, []);

  useEffect(() => {
    setSearchedLocations(locations.filter(el => {
        return (el?.id.toString() && el?.id.toString().includes(query))
          || (el?.longitude.toString() && el?.longitude.toString().includes(query))
          || (el?.latitude && el?.latitude.toString().includes(query))
          || ("Location ID: " + el?.id).toLowerCase().includes(query)
      }
    ))
  }, [searchParams]);

  useEffect(() => {
    if (activeLocation) {
      if (!elementIsVisible(itemRef.current[activeLocation.toString()])) {
        itemRef.current[activeLocation.toString() as string]?.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [activeLocation]);

  const elementIsVisible = (el: HTMLLIElement) => {
    if (!el) return false;
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
  };


  return (<div className="main-locations">
    <div className="main-locations__header">
      <NavLink
        to={paths.locations}
        className="main-locations__header-title">
        <h2 className="main-locations__header-title__text">Locations</h2>
        <svg className="main-locations__header-title__icon" width="24" height="24">
          <use href={`${outlinedSvg}#arrow-link`}/>
        </svg>
      </NavLink>
    </div>
    <label className="main-locations__search">
      <svg className="main-locations__search__icon" width="24" height="24">
        <use href={outlinedSvg + "#search"}/>
      </svg>
      <input
        className="main-locations__search__input"
        placeholder="Search by id or coordinates"
        onChange={(e) => setSearchParams({
          query: e.target.value
        })}/>
    </label>
    {searchedLocations.length !== 0 ? <ul className="main-locations__list">
        {searchedLocations.map((el, index) => {
          return <li
            ref={(item) => {
              if (item) {
                itemRef.current[el.id] = item
              }
            }}
            onClick={() => onLocationClick(null, el.id)}
            key={index}
            className={el.id === activeLocation
              ? "main-locations__list-item main-locations__list-item--active"
              : "main-locations__list-item"
            }>
            <div className="main-locations__list-item__header">
              <h3 className="main-locations__list-item__header-title">Location ID: {el.id}</h3>
              <div>
                {el.timeWindows.map(({ windowEnd, windowStart }, index) => {
                  return <p key={index} className="main-locations__list-item__header-window">
                    {dayjs(`2004-01-01T${windowStart}`).format("HH:mm")} - {dayjs(`2004-01-01T${windowEnd}`).format("HH:mm")}
                  </p>
                })}
              </div>
            </div>
            {el.pointType.typeId === 3 && <p
              className="main-locations__list-item__info">Demands: {el.demands.map(({ demandValue }) => demandValue).join(', ')}</p>}
            <p className="main-locations__list-item__info">Service
              time: {dayjs(`2004-01-01T${el.serviceTime}`).minute()} min</p>
            <div className="main-locations__list-item__footer">
              <div className="main-locations__list-item__footer-coordinates">
                <div className="main-locations__list-item__footer-coordinates__icon-container">
                  <svg className="main-locations__list-item__footer-coordinates__icon" width="14" height="14">
                    <use href={`${outlinedSvg}#coordinates`}/>
                  </svg>
                </div>
                <p
                  className="main-locations__list-item__footer-coordinates__coordinates">{el?.latitude}, {el?.longitude}</p>
              </div>
              <button
                className="main-locations__list-item__footer-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onLocationClick(null, el.id);
                }}>
                <svg className="main-locations__list-item__footer-btn__icon" width="18" height="18">
                  <use href={`${outlinedSvg}#arrow-link`}/>
                </svg>
              </button>
            </div>
          </li>
        })}
      </ul>
      : <div className="not-found">
        <img className="not-found__image" src={notFoundPNG} alt="" width="64" height="64"/>
        <p className="not-found__text">No locations at your request</p>
      </div>}
  </div>);
}

export default MainLocations;