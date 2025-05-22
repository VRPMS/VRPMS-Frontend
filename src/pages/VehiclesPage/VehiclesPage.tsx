import outlinedSvg from "../../assets/outlined.svg";
import { useSearchParams } from "react-router-dom";
import { ReactElement, useEffect, useState } from "react";
import { TVehicle } from "../../data/types.tsx";
import { MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import '../LocationsPage/LocationsPage.scss';
import dayjs from "dayjs";
import { useStore } from "../../store/store.tsx";

function VehiclesPage() {
  const [{ vehicleTypes, vehicles }] = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [vehicleType, setVehicleType] = useState<number | string>("");
  const [searchedVehicles, setSearchedVehicles] = useState<TVehicle[]>([]);

  useEffect(() => {
    let tempVehicles = vehicles;

    if (vehicleType !== "" && !isNaN(Number(vehicleType))) {
      tempVehicles = vehicles.filter(el => el.vehicleType.id === Number(vehicleType));
    }

    setSearchedVehicles(tempVehicles.filter(el => {
        return (el?.id.toString() && el?.id.toString().includes(query))
          || ("Vehicle ID: " + el?.id).includes(query)
      }
    ))
  }, [vehicleType, searchParams]);

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    setVehicleType(event.target.value as number | null);
  };

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
          value={vehicleType}
          onChange={handleSelectChange}
          label="Vehicle type"
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
          {vehicleTypes.map((el) => {
            return <MenuItem
              value={el.id}
              sx={{
                fontSize: 16,
                textTransform: 'capitalize',
              }}>
              {el.name}
            </MenuItem> as ReactElement
          })}
        </Select>
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
                    href={`${outlinedSvg}#${el.vehicleType.name.length!==0 ? el.vehicleType.name : "image-cover"}`}/>
                </svg>
              </div>
              <div className="locations__list-item__header__info">
                <h3 className="locations__list-item__header__info-title">Vehicle ID: {el.id}</h3>
                <p
                  className="locations__list-item__header__info-subtitle">Type: {el.vehicleType.name}</p>
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
                  {el.timeWindows.map(({ id, from, to }, index) => {
                    return <p key={index} className="locations__list-item__point__text">
                      {dayjs.duration(from, 'seconds').format("HH:MM")} - {dayjs.duration(to, 'seconds').format("HH:MM")}
                    </p>
                  })}
                </div>
              </div>
            </div>
            <div className="locations__list-item__features">
              <div className="locations__list-item__features-info">
                <p className="locations__list-item__features-info__title">Capacity</p>
                <p className="locations__list-item__features-info__value">{el.capacity.join(', ')}</p>
              </div>
              <div className="locations__list-item__features-info">
                <p className="locations__list-item__features-info__title">Max capacity</p>
                <p
                  className="locations__list-item__features-info__value">{el.maxCapacity.join(', ')}</p>
              </div>
            </div>
            <div className="locations__list-item__footer">
              <div>
                <p className="locations__list-item__features-title">Penalties</p>
                <div className="locations__list-item__features">
                  <div className="locations__list-item__features-info">
                    <p className="locations__list-item__features-info__title">Capacity</p>
                    <p className="locations__list-item__features-info__value">{el.penaltyCapacityOverload}</p>
                  </div>
                  <div className="locations__list-item__features-info">
                    <p className="locations__list-item__features-info__title">Max capacity</p>
                    <p className="locations__list-item__features-info__value">{el.penaltyMaxCapacityOverload}</p>
                  </div>
                  <div className="locations__list-item__features-info">
                    <p className="locations__list-item__features-info__title">Overwork</p>
                    <p className="locations__list-item__features-info__value">{el.penaltyOverwork}</p>
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