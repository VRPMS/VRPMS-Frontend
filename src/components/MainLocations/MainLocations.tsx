import { NavLink, useSearchParams } from "react-router-dom";
import { paths } from "../../routes/routes.tsx";
import outlinedSvg from '../../assets/outlined.svg';
import './MainLocations.scss';
import { locations } from "../../data/data.tsx";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration);

type TProps = {
  activeLocation: number | null,
  onLocationClick: (ev: (google.maps.MapMouseEvent | null), pointId: number) => void
}

function MainLocations({ activeLocation, onLocationClick }: TProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  let searchedLocations = locations.filter(el => {
      return (el?.id.toString() && el?.id.toString().includes(query))
        || (el?.longitude.toString() && el?.longitude.toString().includes(query))
        || (el?.latitude && el?.latitude.toString().includes(query))
        || ("Location ID: "+el?.id).includes(query)
    }
  );

  if (activeLocation !== null) {
    searchedLocations = searchedLocations.sort((a, b) => {
      if (a.id === activeLocation) return -1;
      if (b.id === activeLocation) return 1;
      return 0;
    });
  }

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
        <button className="main-locations__header-button">
          <svg className="main-locations__header-button__icon" width="24" height="24">
            <use href={`${outlinedSvg}#add`}/>
          </svg>
        </button>
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
      <ul className="main-locations__list">
        {searchedLocations.map((el, index) => {
          const isActive = el.id === activeLocation;
          const itemRef = isActive ? (el: HTMLLIElement | null) => {
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          } : undefined;

          return <li
            onClick={() => onLocationClick(null, el.id)}
            key={index}
            className={el.id === activeLocation
              ? "main-locations__list-item main-locations__list-item--active"
              : "main-locations__list-item"
          }>
            <div className="main-locations__list-item__header">
              <h3 className="main-locations__list-item__header-title">Location ID: {el.id}</h3>
              <div>
                {el.timeWindows.map(({ id, from, to }, index) => {
                  return <p key={index} className="main-locations__list-item__header-window">
                    {dayjs.duration(from, 'seconds').format("HH:MM")} - {dayjs.duration(to, 'seconds').format("HH:MM")}
                  </p>
                })}
              </div>
            </div>
            {el.type.id === 2 && <p
              className="main-locations__list-item__info">Demands: {el.demands.map(({ demand }) => demand).join(', ')}</p>}
            <p className="main-locations__list-item__info">Service
              time: {dayjs.duration(el.serviceTime, 'seconds').minutes()}min</p>
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
    </div>
  );
}

export default MainLocations;