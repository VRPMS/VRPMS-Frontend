import outlinedSvg from "../../assets/outlined.svg";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TVehicle } from "../../data/types.tsx";
import '../LocationsPage/LocationsPage.scss';
import dayjs from "dayjs";
import { useStore } from "../../store/store.tsx";

function VehiclesPage() {
  const [{ vehicles }] = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchedVehicles, setSearchedVehicles] = useState<TVehicle[]>([]);

  useEffect(() => {
    setSearchedVehicles(vehicles.filter(el => {
        return (el?.id.toString() && el?.id.toString().includes(query))
          || ("Vehicle ID: " + el?.id).includes(query)
      }
    ))
  }, [searchParams]);

  return <div className="locations">
    <header className="locations__header">
      <div className="locations__header__heading">
        <h1 className="locations__header__heading__title">Vehicles page</h1>
        <p className="locations__header__heading__subtitle">Information about locations</p>
      </div>
      <div className="locations__header__search-container">
        <label className="locations__header__search">
          <svg className="locations__header__search__icon" width="24" height="24">
            <use href={outlinedSvg + "#search"}/>
          </svg>
          <input
            className="locations__header__search__input"
            placeholder="Search by id"
            onChange={(e) => setSearchParams({
              query: e.target.value
            })}/>
        </label>
      </div>
    </header>
    <div className="locations__list-container">
      <h2 className="locations__list-container__title">Active vehicles</h2>
      {searchedVehicles && <ul className="locations__list">
        {searchedVehicles.map((el, index) => {
          return <li key={index} className="locations__list-item">
            <div className="locations__list-item__header">
              <div className="locations__list-item__header__icon-container">
                <svg className="locations__list-item__header__icon" width="40" height="40">
                  <use
                    href={`${outlinedSvg}#truck`}/>
                </svg>
              </div>
              <div className="locations__list-item__header__info">
                <h3 className="locations__list-item__header__info-title">Vehicle ID: {el.id}</h3>
              </div>
            </div>
            <div className="locations__list-item__point">
              <div className="locations__list-item__point-info">
                <div className="locations__list-item__point__icon-container">
                  <svg width="18" height="18" className="locations__list-item__point__icon">
                    <use href={`${outlinedSvg}#clock`}/>
                  </svg>
                </div>
                <div>
                  <p key={index} className="locations__list-item__point__text">
                    {dayjs(`2004-01-01T${el.carWorkHours.windowStart}`).format("HH:mm")} - {dayjs(`2004-01-01T${el.carWorkHours.windowEnd}`).format("HH:mm")}
                  </p>
                </div>
              </div>
            </div>
            <div className="locations__list-item__features">
              <div className="locations__list-item__features-info">
                <p className="locations__list-item__features-info__title">Capacity</p>
                <p className="locations__list-item__features-info__value">{el.carCapacities.map(({capacity})=>capacity).join(', ')}</p>
              </div>
              <div className="locations__list-item__features-info">
                <p className="locations__list-item__features-info__title">Max capacity</p>
                <p
                  className="locations__list-item__features-info__value">{el.carCapacities.map(({maxCapacity})=>maxCapacity).join(', ')}</p>
              </div>
            </div>
            <div className="locations__list-item__footer">
              <div className="locations__list-item__footer-container">
                <p className="locations__list-item__features-title">Penalties</p>
                <div className="locations__list-item__features locations__list-item__features--footer">
                  <div className="locations__list-item__features-info">
                    <p className="locations__list-item__features-info__title">Capacity</p>
                    <p className="locations__list-item__features-info__value">{el.capacityOverloadPenalty}</p>
                  </div>
                  <div className="locations__list-item__features-info">
                    <p className="locations__list-item__features-info__title">Max capacity</p>
                    <p className="locations__list-item__features-info__value">{el.maxCapacityOverloadPenalty}</p>
                  </div>
                  <div className="locations__list-item__features-info">
                    <p className="locations__list-item__features-info__title">Overwork</p>
                    <p className="locations__list-item__features-info__value">{el.overWorkPenalty}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        })}
      </ul>}
    </div>
  </div>
}

export default VehiclesPage;