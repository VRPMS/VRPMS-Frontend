import './MainPage.scss';
import { JSX, ReactNode, useEffect, useRef, useState } from "react";
import MainLocations from "../../components/MainLocations/MainLocations.tsx";
import MainRoute from "../../components/MainRoute/MainRoute.tsx";
import { AdvancedMarker, Map, useMap } from '@vis.gl/react-google-maps';
import { pointDefault } from "../../data/data.tsx";
import warehousePNG from '../../assets/images/warehouse.png';
import crossdockPNG from '../../assets/images/crossdock.png';
import pointPNG from '../../assets/images/point.png';
import { Poi, TVehicle } from "../../data/types.tsx";
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TextField from '@mui/material/TextField';
import { Checkbox } from "@mui/material";
import outlinedSvg from "../../assets/svg/outlined.svg";
import { useStore } from "../../store/store.tsx";

type TPolylineRef = {
  routeId: number,
  line: google.maps.Polyline,
  vehicleId: number
}

function MainPage() {
  const [{ locations, points, routes, vehicles, colors }] = useStore();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeLocation, setActiveLocation] = useState<number | null>(null);
  const [activeRoute, setActiveRoute] = useState<number | null>(null);
  const [selectedVehicles, setSelectedVehicles] = useState<TVehicle[]>([]);
  const map = useMap();
  const markerRefs = useRef<Record<string, google.maps.marker.AdvancedMarkerElement>>({});
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const polylinesRef = useRef<TPolylineRef[]>([]);
  const selectedPolylineRef = useRef<google.maps.Polyline | null>(null);

  const drawRoute = (routePoints: Poi[], index: number, origin: Poi = pointDefault) => {
    if (routePoints.length < 2) return;
    const waypoints = routePoints.filter(el => el?.pointType.typeId && el?.pointType.typeId !== 1).map(p => ({
      location: p.location,
      stopover: true
    }));

    const directionsService = new google.maps.DirectionsService();
    directionsService.route({
      origin: origin.location,
      destination: origin.location,
      waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: false,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        const fullPath: google.maps.LatLng[] = [];
        result.routes[0].legs.forEach(leg => {
          leg.steps.forEach(step => {
            fullPath.push(...step.path);
          });
        });
        const newPolyline = new google.maps.Polyline({
          path: fullPath,
          map,
          clickable: true,
          strokeColor: colors[index],
          strokeOpacity: 0.8,
          strokeWeight: 5,
          geodesic: true,
        });

        const zIndex = newPolyline.get('zIndex');

        newPolyline.addListener('click', () => {
          if (selectedPolylineRef.current && selectedPolylineRef.current !== newPolyline) {
            selectedPolylineRef.current?.setOptions({ strokeWeight: 5, zIndex: zIndex });
          }
          newPolyline.setOptions({ strokeWeight: 10, zIndex: 10 });
          selectedPolylineRef.current = newPolyline;
          setActiveRoute(routes[index].id);
        });

        const vehicleId = routes[index].carId

        polylinesRef.current.push({ routeId: routes[index].id, line: newPolyline, vehicleId: vehicleId });
      }
    });
  };

  useEffect(() => {
    if (!map) return;

    polylinesRef.current = [];

    routes.forEach((route, index) => {
      const currentPoints = route.visits.map(el => {
        return points.find(point => el.locationId === point.id) as Poi;
      })
      drawRoute(currentPoints, index, currentPoints[0])
    });

    const zIndex = selectedPolylineRef.current?.get('zIndex');
    const mapClickListener = map.addListener('click', () => {
      if (selectedPolylineRef.current) {
        selectedPolylineRef.current?.setOptions({ strokeWeight: 5, zIndex: zIndex });
        selectedPolylineRef.current = null;
      }
      if (infoWindowRef.current) {
        infoWindowRef.current?.close();
        setActiveLocation(null);
        infoWindowRef.current = null;
      }
      setActiveRoute(null);
    });

    return () => {
      google.maps.event.removeListener(mapClickListener);
    };
  }, [map]);

  useEffect(() => {
    if (selectedVehicles.length !== 0) {
      polylinesRef.current.forEach(el => {
        const route = selectedVehicles.find(item => {
          return item.id === el.vehicleId
        });
        if (!route) {
          el.line.setVisible(false);
          if (el.routeId === activeRoute) {
            setActiveRoute(null);
            if (selectedPolylineRef.current) {
              selectedPolylineRef.current?.setOptions({ strokeWeight: 5 });
              selectedPolylineRef.current = null;
            }
          }
        } else {
          el.line.setVisible(true);
        }
      })
    } else {
      polylinesRef.current.forEach(el => {
        el.line.setVisible(true);
      })
    }
  }, [selectedVehicles]);

  function onTabClick(tab: number) {
    if (tab !== activeTab) {
      setActiveTab(tab)
    }
  }

  const handleClick = (ev: google.maps.MapMouseEvent | null, pointId: number) => {
    if (!map) return;

    const marker = markerRefs.current[pointId.toString()];
    const location = locations?.find(el => el.id === pointId);
    if (!marker || !location) return;

    if (infoWindowRef.current) {
      infoWindowRef.current?.close();
      setActiveLocation(null);
    }

    const infoWindow = new google.maps.InfoWindow({
      content: `<div class="main-map__map__info-window">
      <h3>Location ID: ${location.id}</h3>
      <p>Type: ${location.pointType.typeName.toLowerCase()}</p>
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
          getOptionLabel={(option) => "Vehicle ID: " + option?.id.toString()}
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
                Vehicle ID: {option?.id.toString()}
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
            onClick={() => onTabClick(0)}
            className={activeTab === 0
              ? "main__map-info__tab main__map-info__tab--active"
              : "main__map-info__tab"}>
            <p>Locations</p>
          </button>
          <button
            onClick={() => onTabClick(1)}
            className={activeTab === 1
              ? "main__map-info__tab main__map-info__tab--active"
              : "main__map-info__tab"}>
            <p>Route</p>
          </button>
        </div>
        <div className="main__map-info__container">
          {activeTab === 0
            ? <MainLocations activeLocation={activeLocation} onLocationClick={handleClick}/>
            : <MainRoute activeRoute={activeRoute} activeLocation={activeLocation} onLocationClick={handleClick}/>}
        </div>
      </div>
      <div className="main__map__container">
        <div className="main__map">
          <Map
            mapId='cbc451e2502704713e08c741'
            defaultZoom={7}
            defaultCenter={{
              lat: Number(locations.find(el => el?.pointType.typeId === 1)?.latitude ?? 0),
              lng: Number(locations.find(el => el?.pointType.typeId === 1)?.longitude ?? 0)
            }}>
            <>
              {points?.map((poi: Poi) => {
                const icon = poi.pointType.typeId === 1 ? warehousePNG : poi.pointType.typeId === 2 ? crossdockPNG : pointPNG;
                return <AdvancedMarker
                  key={poi.id}
                  position={poi.location}
                  clickable={true}
                  ref={(el) => {
                    if (el) markerRefs.current[poi.id] = el;
                  }}
                  zIndex={poi.pointType.typeId === 1 ? 100 : poi.pointType.typeId === 2 ? 10 : 1}
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