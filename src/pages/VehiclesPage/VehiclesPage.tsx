import outlinedSvg from "../../assets/svg/outlined.svg";
import notFoundPNG from "../../assets/images/not-found.png";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TVehicle } from "../../data/types.tsx";
import '../LocationsPage/LocationsPage.scss';
import '../VehiclesPage/VehiclesPage.scss';
import dayjs from "dayjs";
import { useStore } from "../../store/store.tsx";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { MenuItem } from "@mui/material";

function VehiclesPage() {
  const [{ vehicles, routes }] = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [vehicleStatus, setVehicleStatus] = useState<number | string>("");
  let query = searchParams.get("query") || "";
  const [searchedVehicles, setSearchedVehicles] = useState<TVehicle[]>([]);

  useEffect(() => {
    let tempVehicles = vehicles;

    if (vehicleStatus === 0) {
      tempVehicles = vehicles.filter(vehicle => !(routes.find(route => route.carId === vehicle.id)));
    }

    if (vehicleStatus === 1) {
      tempVehicles = vehicles.filter(vehicle => routes.find(route => route.carId === vehicle.id));
    }

    setSearchedVehicles(tempVehicles.filter(el => {
        return (el?.id.toString() && el?.id.toString().includes(query))
          || ("Vehicle ID: " + el?.id).toLowerCase().includes(query)
      }
    ))
  }, [searchParams, vehicleStatus]);

  useEffect(() => {
    query = ""
  }, []);

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
        <Select
          id="demo-simple-select-filled"
          displayEmpty
          value={vehicleStatus}
          onChange={(e: SelectChangeEvent<unknown>) => setVehicleStatus(e?.target?.value as number)}
          label="Vehicle status"
          IconComponent={KeyboardArrowDownRoundedIcon}
          sx={{
            width: '168px',
            height: '56px',
            padding: '8px 16px',
            border: '0px solid transparent',
            borderRadius: '12px',
            backgroundColor: "#FFFFFF",
            boxShadow: '0px -3px 46px 0px rgba(0, 0, 0, 0.06), -1px -1.184px 19.234px 0px rgba(0, 0, 0, 0.00), 0px -0.674px 7.475px 0px rgba(0, 0, 0, 0.00), 1px -0.332px 2.426px 0px rgba(0, 0, 0, 0.00)',
            '.MuiSelect-select': {
              fontWeight: 500,
              fontSize: 16,
              fontFamily: 'SF Pro Display, sans-serif',
              color: '#262626',
              '&.MuiInputBase-input': {
                padding: '28px 12px 12px 0',
                textTransform: 'capitalize',
              },
            },
            '& .MuiOutlinedInput-notchedOutline': {
              top: 0,
              border: 'none',
              '& legend': {
                overflow: 'visible',
                paddingTop: '4px',
                paddingLeft: '4px',
                '& span': {
                  color: '#262626',
                  opacity: 1,
                  fontFamily: 'SF Pro Display, sans-serif',
                  fontWeight: 400,
                  fontSize: 12,
                  lineHeight: '12px',
                  visibility: 'visible',
                },
              },
            },
          }}>
          <MenuItem
            value=""
            sx={{
              fontSize: 16,
              textTransform: 'capitalize',
            }}>
            <span>All</span>
          </MenuItem>
          <MenuItem
            value={1}
            sx={{
              fontSize: 16,
              textTransform: 'capitalize',
            }}>
            <span>Active</span>
          </MenuItem>
          <MenuItem
            value={0}
            sx={{
              fontSize: 16,
              textTransform: 'capitalize',
            }}>
            <span>Non-active</span>
          </MenuItem>
        </Select>
      </div>
    </header>
    <div className="locations__list-container">
      <h2
        className="locations__list-container__title">{`${vehicleStatus === 0 ? "Non-active" : vehicleStatus === 1 ? "Active" : "All"}`} vehicles</h2>
      {searchedVehicles.length !== 0 ? <ul className="locations__list">
          {searchedVehicles.map((el, index) => {
            const status = !!(routes.find(route => route.carId === el.id)) ? 1 : 0;
            return <li key={index} className="locations__list-item">
              <div className="locations__list-item__header">
                <div className="locations__list-item__header__icon-container vehicles__list-item__header__icon-container">
                  <svg className="locations__list-item__header__icon" width="40" height="40">
                    <use
                      href={`${outlinedSvg}#truck`}/>
                  </svg>
                  <div className={`${status === 0
                  ? "vehicles__list-item__header__info-status--non-active"
                  : "vehicles__list-item__header__info-status--active"} 
                    vehicles__list-item__header__info-status`}></div>
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
                  <p
                    className="locations__list-item__features-info__value">{el.carCapacities.map(({ capacity }) => capacity).join(', ')}</p>
                </div>
                <div className="locations__list-item__features-info">
                  <p className="locations__list-item__features-info__title">Max capacity</p>
                  <p
                    className="locations__list-item__features-info__value">{el.carCapacities.map(({ maxCapacity }) => maxCapacity).join(', ')}</p>
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
        </ul>
        : <div className="not-found">
          <img className="not-found__image" src={notFoundPNG} alt="" width="64" height="64"/>
          <p className="not-found__text">No vehicles at your request</p>
        </div>}
    </div>
  </div>
}

export default VehiclesPage;