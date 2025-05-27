import outlinedSvg from "../../assets/outlined.svg";
import notFoundPNG from "../../assets/not-found.png";
import { useSearchParams } from "react-router-dom";
import { ReactElement, useEffect, useState } from "react";
import { TLocation } from "../../data/types.tsx";
import { MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import './LocationsPage.scss';
import dayjs from "dayjs";
import { useStore } from "../../store/store.tsx";

//TODO add button (arrow) to location card to show it on map

function LocationsPage() {
  const [{ locations, locationTypes }] = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  let query = searchParams.get("query") || "";
  const [locationType, setLocationType] = useState<number | string>("");
  const [searchedLocations, setSearchedLocations] = useState<TLocation[]>([]);

  useEffect(() => {
    let tempLocations = locations;

    if (locationType !== "" && !isNaN(Number(locationType))) {
      tempLocations = locations.filter(el => el.pointType.typeId === Number(locationType));
    }

    setSearchedLocations(tempLocations.filter(el => {
        return (el?.id.toString() && el?.id.toString().includes(query))
          || (el?.longitude.toString() && el?.longitude.toString().includes(query))
          || (el?.latitude && el?.latitude.toString().includes(query))
          || ("Location ID: " + el?.id).includes(query)
      }
    ))
  }, [locationType, searchParams]);

  useEffect(() => {
    query = ""
  }, []);

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
          onChange={(e: SelectChangeEvent<unknown>) => setLocationType(e?.target?.value as number)}
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
              value={el.typeId}
              sx={{
                fontSize: 16,
                textTransform: 'capitalize',
              }}>
              {el.typeName}
            </MenuItem> as ReactElement
          })}
        </Select>
      </div>
    </header>
    <div className="locations__list-container">
      <h2 className="locations__list-container__title">Locations</h2>
      {searchedLocations.length !== 0 ? <ul className="locations__list">
        {searchedLocations.map((el, index) => {
          return <li key={index} className="locations__list-item">
            <div className="locations__list-item__header">
              <div className="locations__list-item__header__icon-container">
                <svg className="locations__list-item__header__icon" width="40" height="40">
                  <use
                    href={`${outlinedSvg}#${el.pointType.typeName.length !== 0 ? el.pointType.typeName.toLowerCase() : "image-cover"}`}/>
                </svg>
              </div>
              <div className="locations__list-item__header__info">
                <h3 className="locations__list-item__header__info-title">Location ID: {el.id}</h3>
                <p
                  className="locations__list-item__header__info-subtitle">Type: {el.pointType.typeName.toLowerCase()}</p>
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
                  {el.timeWindows.map(({ windowEnd, windowStart }, index) => {
                    return <p key={index} className="locations__list-item__point__text">
                      {dayjs(`2004-01-01T${windowStart}`).format("HH:mm")} - {dayjs(`2004-01-01T${windowEnd}`).format("HH:mm")}
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
              {el.demands.length !== 0 && <div className="locations__list-item__features-info">
                <p className="locations__list-item__features-info__title">Demands</p>
                <p
                  className="locations__list-item__features-info__value">{el.demands.map(d => d.demandValue).join(', ')}</p>
              </div>}
              <div className="locations__list-item__features-info">
                <p className="locations__list-item__features-info__title">Service time</p>
                <p
                  className="locations__list-item__features-info__value">{dayjs(`2004-01-01T${el.serviceTime}`).minute()} min</p>
              </div>
            </div>
            <div className="locations__list-item__footer">
              <div className="locations__list-item__footer-container">
                <p className="locations__list-item__features-title">Penalties</p>
                <div className="locations__list-item__features locations__list-item__features--footer">
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
              {/*<button*/}
              {/*  className="locations__list-item__footer-btn">*/}
              {/*  <svg className="locations__list-item__footer-btn__icon" width="24" height="24">*/}
              {/*    <use href={`${outlinedSvg}#arrow-link`}/>*/}
              {/*  </svg>*/}
              {/*</button>*/}
            </div>
          </li>
        })}
      </ul>
      : <div className="not-found">
          <img className="not-found__image"  src={notFoundPNG} alt="" width="64" height="64"/>
          <p className="not-found__text" >No locations at your request</p>
        </div>}
    </div>
  </div>
}

export default LocationsPage;