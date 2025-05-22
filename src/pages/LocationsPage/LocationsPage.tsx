import outlinedSvg from "../../assets/outlined.svg";
import { useSearchParams } from "react-router-dom";
import { ReactElement, useEffect, useState } from "react";
import { locations, locationTypes } from "../../data/data.tsx";
import { TLocation } from "../../data/types.tsx";
import { MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import './LocationsPage.scss';
import dayjs from "dayjs";

//TODO add button (arrow) to location card to show it on map

function LocationsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [locationType, setLocationType] = useState<number | string>("");
  const [searchedLocations, setSearchedLocations] = useState<TLocation[]>([]);

  useEffect(() => {
    let tempLocations = locations;

    if (locationType !== "" && !isNaN(Number(locationType))) {
      tempLocations = locations.filter(el => el.type.id === Number(locationType));
    }

    setSearchedLocations(tempLocations.filter(el => {
        return (el?.id.toString() && el?.id.toString().includes(query))
          || (el?.longitude.toString() && el?.longitude.toString().includes(query))
          || (el?.latitude && el?.latitude.toString().includes(query))
          || ("Location ID: " + el?.id).includes(query)
      }
    ))
  }, [locationType, searchParams]);

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    setLocationType(event.target.value as number | null);
  };

  return <div className="locations">
    <header className="locations__header">
      <div className="locations__header__heading">
        <h1 className="locations__header__heading__title">Locations page</h1>
        <p className="locations__header__heading__subtitle">Information about locations</p>
      </div>
      <div className="locations__header__search-container">
        <label className="locations__header__search">
          <svg className="locations__header__search__icon" width="24" height="24">
            <use href={outlinedSvg + "#search"}/>
          </svg>
          <input
            className="locations__header__search__input"
            placeholder="Search by id or coordinates"
            onChange={(e) => setSearchParams({
              query: e.target.value
            })}/>
        </label>
        <Select
          id="demo-simple-select-filled"
          displayEmpty
          value={locationType}
          onChange={handleSelectChange}
          label="Location type"
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
          {locationTypes.map((el) => {
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
      <h2 className="locations__list-container__title">Locations</h2>
        {searchedLocations && <ul className="locations__list">
          {searchedLocations.map((el, index) => {
            return <li key={index} className="locations__list-item">
              <div className="locations__list-item__header">
                <div className="locations__list-item__header__icon-container">
                  <svg className="locations__list-item__header__icon" width="40" height="40">
                    <use
                      href={`${outlinedSvg}#${el.type.id === 0 ? "warehouse" : el.type.id === 1 ? "cross-dock" : "location"}`}/>
                  </svg>
                </div>
                <div className="locations__list-item__header__info">
                  <h3 className="locations__list-item__header__info-title">Location ID: {el.id}</h3>
                  <p
                    className="locations__list-item__header__info-subtitle">Type: {el.type.id === 0 ? "warehouse" : el.type.id === 1 ? "cross-dock" : "client"}</p>
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
                <div className="locations__list-item__point-info">
                  <div className="locations__list-item__point__icon-container">
                    <svg width="18" height="18" className="locations__list-item__point__icon">
                      <use href={`${outlinedSvg}#coordinates`}/>
                    </svg>
                  </div>
                  <p className="locations__list-item__point__text">{el.latitude}, {el.longitude}</p>
                </div>
              </div>
              <div className="locations__list-item__features">
                <div className="locations__list-item__features-info">
                  <p className="locations__list-item__features-info__title">Demands</p>
                  <p className="locations__list-item__features-info__value">{el.demands.map(d => d.demand).join(', ')}</p>
                </div>
                <div className="locations__list-item__features-info">
                  <p className="locations__list-item__features-info__title">Service time</p>
                  <p
                    className="locations__list-item__features-info__value">{dayjs.duration(el.serviceTime, 'seconds').minutes()}min</p>
                </div>
              </div>
              <div className="locations__list-item__footer">
                <div>
                  <p className="locations__list-item__features-title">Penalties</p>
                  <div className="locations__list-item__features">
                    <div className="locations__list-item__features-info">
                      <p className="locations__list-item__features-info__title">Late arrival</p>
                      <p className="locations__list-item__features-info__value">{el.penaltyLate}</p>
                    </div>
                    <div className="locations__list-item__features-info">
                      <p className="locations__list-item__features-info__title">Waiting</p>
                      <p className="locations__list-item__features-info__value">{el.penaltyWait}</p>
                    </div>
                  </div>
                </div>
                <button
                  className="locations__list-item__footer-btn">
                  <svg className="locations__list-item__footer-btn__icon" width="24" height="24">
                    <use href={`${outlinedSvg}#arrow-link`}/>
                  </svg>
                </button>
              </div>
            </li>
          })}
        </ul>}
    </div>
  </div>
}

export default LocationsPage;