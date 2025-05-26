import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TDistance } from "../../data/types.tsx";
import outlinedSvg from "../../assets/outlined.svg";
import '../LocationsPage/LocationsPage.scss';
import './RoutesPage.scss';
import dayjs from "dayjs";
import { useStore } from "../../store/store.tsx";
import { locationDefault, vehicleDefault } from "../../data/data.tsx";

function RoutesPage() {
  const [{ locations, distances, vehicles }] = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchedDistances, setSearchedDistances] = useState<TDistance[]>([]);

  useEffect(() => {
    setSearchedDistances(distances.filter(el => {
        const locationFrom = locations.find(item => item.id === el.locationFromId);
        const locationTo = locations.find(item => item.id === el.locationToId);
        const vehicle = vehicles.find(item => item.id === el.vehicleId);

        return (locationFrom?.longitude.toString() && locationFrom?.longitude.toString().includes(query))
          || (locationFrom?.latitude && locationFrom?.latitude.toString().includes(query))
          || (locationTo?.longitude.toString() && locationTo?.longitude.toString().includes(query))
          || (locationTo?.latitude && locationTo?.latitude.toString().includes(query))
          || ("Vehicle ID: " + vehicle?.id).includes(query)
          || ("Location ID: " + locationFrom?.id).includes(query)
          || ("Location ID: " + locationTo?.id).includes(query)
      }
    ))
  }, [searchParams, locations, vehicles]);

  return <div className="routes">
    <header className="locations__header">
      <div className="locations__header__heading">
        <h1 className="locations__header__heading__title">Routes page</h1>
        <p className="locations__header__heading__subtitle">Information about routes between the locations</p>
      </div>
      <div className="locations__header__search-container">
        <label className="locations__header__search">
          <svg className="locations__header__search__icon" width="24" height="24">
            <use href={outlinedSvg + "#search"}/>
          </svg>
          <input
            className="locations__header__search__input"
            placeholder="Search by location or vehicle"
            onChange={(e) => setSearchParams({
              query: e.target.value
            })}/>
        </label>
      </div>
    </header>
    <div className="locations__list-container">
      <h2 className="locations__list-container__title">Distances and durations</h2>
      {searchedDistances && <ul className="routes__list">
        {searchedDistances.map((el, index) => {
          const locationFrom = locations.find(item => item.id === el.locationFromId) ?? locationDefault;
          const locationTo = locations.find(item => item.id === el.locationToId) ?? locationDefault;
          const vehicle = vehicles.find(item => item.id === el.vehicleId) ?? vehicleDefault;

          const km = Math.floor(el?.distance / 1000);
          const m = Math.round(el?.distance % 1000);
          const h = dayjs(`2004-01-01T${el.duration}`).get('hours') ?? 0;
          const min = dayjs(`2004-01-01T${el.duration}`).get('minutes') ?? 0;

          return <li key={index} className="routes__list-item">
            <div className="routes__list-item__info">
              <p className="routes__list-item__info-title">From</p>
              <div className="routes__list-item__info-data">Location ID: {locationFrom.id}</div>
              <div className="routes__list-item__info">
                <div className="routes__list-item__coordinates">
                  <div className="routes__list-item__coordinates__icon-container">
                    <svg className="routes__list-item__coordinates__icon" width="14" height="14">
                      <use href={`${outlinedSvg}#coordinates`}/>
                    </svg>
                  </div>
                  <p
                    className="routes__list-item__coordinates__coordinates">{locationFrom?.latitude}, {locationFrom?.longitude}</p>
                </div>
              </div>
            </div>
            <div className="routes__list-item__info">
              <p className="routes__list-item__info-title">To</p>
              <div className="routes__list-item__info-data">Location ID: {locationTo.id}</div>
              <div>
                <div className="routes__list-item__coordinates">
                  <div className="routes__list-item__coordinates__icon-container">
                    <svg className="routes__list-item__coordinates__icon" width="14" height="14">
                      <use href={`${outlinedSvg}#coordinates`}/>
                    </svg>
                  </div>
                  <p
                    className="routes__list-item__coordinates__coordinates">{locationTo?.latitude}, {locationTo?.longitude}</p>
                </div>
              </div>
            </div>
            <div className="routes__list-item__info routes__list-item__info--small">
              <p className="routes__list-item__info-title">Vehicle</p>
              <p className="routes__list-item__info-data">Vehicle ID: {vehicle.id}</p>
            </div>
            <div className="routes__list-item__info routes__list-item__info--small">
              <p className="routes__list-item__info-title">Distance</p>
              <p className="routes__list-item__info-data">{`${km ? km + ' km' : ''} ${m ? m + ' m' : "0 m"}`}</p>
            </div>
            <div className="routes__list-item__info routes__list-item__info--small">
              <p className="routes__list-item__info-title">Duration</p>
              <p className="routes__list-item__info-data">{(h || min) ?`${h ? h + ' h' : ""} ${min ? min + ' min' : ""}` : '0 min'}</p>
            </div>
          </li>
        })}
      </ul>}
    </div>
  </div>
}

export default RoutesPage;