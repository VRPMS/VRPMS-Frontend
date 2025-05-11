import './MainPage.scss'
import { JSX, ReactNode, useEffect, useRef, useState } from "react";
import MainLocations from "../../components/MainLocations/MainLocations.tsx";
import MainRoute from "../../components/MainRoute/MainRoute.tsx";
import { AdvancedMarker, Map, useMap } from '@vis.gl/react-google-maps';
import { colors, locations, pointDefault, points, routes, vehicles } from "../../data/data.tsx";
import warehousePNG from '../../assets/images/warehouse.png';
import crossdockPNG from '../../assets/images/crossdock.png'
import pointPNG from '../../assets/images/point.png'
import { ELocationType, Poi, TVehicle } from "../../data/types.tsx";
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextField from '@mui/material/TextField';
import { Checkbox } from "@mui/material";
import outlinedSvg from "../../assets/outlined.svg";

function MainPage() {
  const [activeTab, setActiveTab] = useState("locations");
  const [activeLocation, setActiveLocation] = useState<number | null>(null);
  const [selectedVehicles, setSelectedVehicles] = useState<TVehicle[]>([]);
  const map = useMap();
  const markerRefs = useRef<Record<string, google.maps.marker.AdvancedMarkerElement>>({});
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const polylinesRef = useRef<google.maps.Polyline[] | null>([]);
  const selectedPolylineRef = useRef<google.maps.Polyline | null>(null);

  const drawRoute = (routePoints: Poi[], index: number) => {
    if (routePoints.length < 2) return;
    const origin = routePoints.find(el => el.type === ELocationType.WAREHOUSE)?.location ?? pointDefault.location;
    const destination = routePoints.find(el => el.type === ELocationType.WAREHOUSE)?.location ?? pointDefault.location;
    const waypoints = routePoints.filter(el => el.type !== ELocationType.WAREHOUSE).map(p => ({
      location: p.location,
      stopover: true
    }));

    const directionsService = new google.maps.DirectionsService();
    directionsService.route({
      origin,
      destination,
      waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        const path = result.routes[0].overview_path;
        const newPolyline = new google.maps.Polyline({
          path,
          map,
          clickable: true,
          strokeColor: colors[index],
          strokeOpacity: 0.8,
          strokeWeight: 5,
        });

        newPolyline.addListener('click', () => {
          if (selectedPolylineRef.current && selectedPolylineRef.current !== newPolyline) {
            selectedPolylineRef.current?.setOptions({ strokeWeight: 4 });
          }
          newPolyline.setOptions({ strokeWeight: 8 });
          selectedPolylineRef.current = newPolyline;
        });

        polylinesRef.current?.push(newPolyline);
      }
    });
  };

  useEffect(() => {
    if (!map) return;

    polylinesRef.current?.forEach(polyline => polyline.setMap(null));
    polylinesRef.current = [];

    let activeRoutes = routes;
    if (selectedVehicles.length!==0) {
      activeRoutes = activeRoutes.filter(el => {
        return selectedVehicles.find(item => item.id === el.id) && el;
      })
    }

    activeRoutes.map(el => el.points).forEach((el, index) => drawRoute(el, index));

    const mapClickListener = map.addListener('click', () => {
      if (selectedPolylineRef.current) {
        selectedPolylineRef.current?.setOptions({ strokeWeight: 4 });
        selectedPolylineRef.current = null;
      }
      if (infoWindowRef.current) {
        infoWindowRef.current?.close();
        setActiveLocation(null);
        infoWindowRef.current = null;
      }
    });

    return () => {
      google.maps.event.removeListener(mapClickListener);
    };
  }, [map, selectedVehicles]);

  function onTabClick(tab: string) {
    if (tab !== activeTab) {
      setActiveTab(tab)
    }
  }

  const handleClick = (ev: google.maps.MapMouseEvent | null, pointId: number) => {
    if (!map) return;

    const marker = markerRefs.current[pointId.toString()];
    const location = locations.find(el => el.id === pointId);
    if (!marker || !location) return;

    if (infoWindowRef.current) {
      infoWindowRef.current?.close();
      setActiveLocation(null);
    }

    const infoWindow = new google.maps.InfoWindow({
      content: `<div class="main-map__map__info-window">
      <h3>Location ID: ${location.id}</h3>
      <p>Type: ${location.type === 0 ? 'warehouse' : location.type === 1 ? 'cross-dock' : 'client'}</p>
      <p>Point: ${location.latitude}, ${location.longitude}</p>
    </div>`
    });

    infoWindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });

    infoWindow.addListener('close', () => {
      setActiveLocation(null);
    });

    if (ev?.latLng) {
      map.panTo(ev.latLng);
    } else if (marker.position) {
      map.panTo(marker.position);
    }

    if ((map.getZoom() ?? 0) <= 13) map.setZoom(13);

    infoWindowRef.current = infoWindow;
    setActiveLocation(pointId);
  };


  return <div className="main">
    <header className="main__header">
      <div className="main__header__heading">
        <h1 className="main__header__heading__title">Main page</h1>
        <p className="main__header__heading__subtitle">View locations and routes</p>
      </div>
      <div className="main__header__filter-container">
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={vehicles}
          disableCloseOnSelect
          onChange={(event: any, newValue: TVehicle[] | null) => {
            setSelectedVehicles(newValue ?? []);
          }}
          value={selectedVehicles}
          getOptionLabel={(option) => option?.number}
          renderOption={(props, option, { selected }) => {
            const { key, ...optionProps } = props;
            return (
              <li key={key} {...optionProps}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon/> as ReactNode}
                  checkedIcon={<CheckBoxIcon/> as ReactNode}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option?.number}
              </li> as ReactNode
            );
          }}
          popupIcon={<svg width="24" height="24">
            <use href={outlinedSvg + "#arrow-down"}/>
          </svg> as ReactNode}
          renderInput={(params: AutocompleteRenderInputParams): JSX.Element => {
            return <TextField
              inputRef={params.InputProps.ref}
              inputProps={params.inputProps}
              InputProps={params.InputProps}
              InputLabelProps={{ ...params.InputLabelProps, shrink: true }}
              disabled={false}
              fullWidth={true}
              label="Vehicles filter"
              placeholder="Search vehicle"
            />
          }}
          sx={{
            '.MuiAutocomplete-tag': {
              borderRadius: '6px',
              backgroundColor: '#F2F2F2',
              margin: 0,
              fontFamily: 'SF Pro Display, sans-serif',
            },
            '.MuiOutlinedInput-root': {
              padding: '0',
              fontFamily: 'SF Pro Display, sans-serif',
              paddingTop: '20px',
              '.MuiOutlinedInput-notchedOutline ': {
                borderWidth: '0',
              },
              '.MuiAutocomplete-input': {
                color: '#262626',
                paddingBottom: '0'
              },
              columnGap: '8px',
              rowGap: '8px',
            },
            '.MuiInputLabel-root': {
              fontSize: '16px',
              fontWeight: '500',
              fontFamily: 'SF Pro Display, sans-serif',
              left: '-8px',
              top: '3px',
              color: '#262626'
            },
            '.MuiInputLabel-root.Mui-disabled': {
              color: '#262626'
            },
            '.MuiInputBase-root': {
              width: '400px',
            },
          }}
        />
      </div>
    </header>
    <div className="main__app">
      <div className="main__map-info">
        <div className="main__map-info__tabs">
          <button
            onClick={() => onTabClick("locations")}
            className={activeTab === "locations"
              ? "main__map-info__tab main__map-info__tab--active"
              : "main__map-info__tab"}>
            <p>Locations</p>
          </button>
          <button
            onClick={() => onTabClick("route")}
            className={activeTab === "route"
              ? "main__map-info__tab main__map-info__tab--active"
              : "main__map-info__tab"}>
            <p>Route</p>
          </button>
        </div>
        <div className="main__map-info__container">
          {activeTab === "locations"
            ? <MainLocations activeLocation={activeLocation} onLocationClick={handleClick}/>
            : <MainRoute/>}
        </div>
      </div>
      <div className="main__map__container">
        <div className="main__map">
          <Map
            mapId='MAP_ID'
            defaultZoom={7}
            defaultCenter={{ lat: Number(locations[0].latitude), lng: Number(locations[0].longitude) }}>
            <>
              {points.map((poi: Poi) => {
                const icon = poi.type === ELocationType.WAREHOUSE ? warehousePNG : poi.type === ELocationType.CROSS_DOCK ? crossdockPNG : pointPNG;
                return <AdvancedMarker
                  key={poi.id}
                  position={poi.location}
                  clickable={true}
                  ref={(el) => {
                    if (el) markerRefs.current[poi.id] = el;
                  }}
                  onClick={(ev) => handleClick(ev, poi.id)}>
                  <img src={icon} alt="point" width="40" height="40"/>
                </AdvancedMarker>
              })}
            </>
          </Map>
        </div>
      </div>
    </div>
  </div>
}

export default MainPage;