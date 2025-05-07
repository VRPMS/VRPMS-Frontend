import './MainPage.scss'
import { useCallback, useEffect, useRef, useState } from "react";
import MainLocations from "../../components/MainLocations/MainLocations.tsx";
import MainRoute from "../../components/MainRoute/MainRoute.tsx";
import { AdvancedMarker, Map, useAdvancedMarkerRef, useMap, InfoWindow } from '@vis.gl/react-google-maps';
import { locations, points } from "../../data/data.tsx";
import warehousePNG from '../../assets/images/warehouse.png';
import crossdockPNG from '../../assets/images/crossdock.png'
import pointPNG from '../../assets/images/point.png'
import { ELocationType, Poi } from "../../data/types.tsx";

function MainPage() {
  const [activeTab, setActiveTab] = useState("locations");
  const map = useMap();
  const markerRefs = useRef<Record<string, google.maps.marker.AdvancedMarkerElement>>({});
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const polylineRef = useRef<google.maps.Polyline | null>(null);
  const isSelected = { current: false };

  const origin = points[0].location;
  const destination = points[0].location;
  const waypoints = points.slice(1).map(p => ({
    location: p.location,
    stopover: true,
  }));

  useEffect(() => {
    if (!map) return;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: false,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          const path = result.routes[0].overview_path;
          console.log(result)

          // Створити або оновити полілінію
          if (polylineRef.current) {
            polylineRef.current?.setPath(path);
          } else {
            const newPolyline = new google.maps.Polyline({
              path,
              map,
              clickable: true,
              strokeColor: '#FF862A',
              strokeOpacity: 0.8,
              strokeWeight: 4,
            });

            newPolyline.addListener('click', () => {
              isSelected.current = true;
              const currentWeight = newPolyline.get('strokeWeight');
              newPolyline.setOptions({
                strokeWeight: currentWeight === 4 ? 8 : 4,
              });
            });

            polylineRef.current = newPolyline;
          }

          map.addListener('click', () => {
            if (polylineRef.current && isSelected.current) {
              polylineRef.current?.setOptions({ strokeWeight: 4 });
              isSelected.current = false;
            }
          });
        } else {
          console.error('Directions request failed:', status);
        }
      }
    );
  }, [map]);

  function onTabClick(tab) {
    if (tab !== activeTab) {
      setActiveTab(tab)
    }
  }

  const handleClick = (ev: google.maps.MapMouseEvent, pointId: number) => {
    if (!map) return;
    if (!ev.latLng) return;

    const marker = markerRefs.current[pointId.toString()]
    if (infoWindowRef.current) {
      infoWindowRef.current?.close();
    }

    console.log('marker clicked:', ev.latLng.toString());
    map.panTo(ev.latLng);
    if (map.getZoom() <= 13) {
      map.setZoom(13);
    }

    const infoWindow = new google.maps.InfoWindow({
      content: `<div class="main-map__map__info-window">
      <h3>${locations.find(el => el.id === pointId)?.name}</h3>
      <p>${locations.find(el => el.id === pointId)?.latitude}, ${locations.find(el => el.id === pointId)?.longitude}</p>
    </div>`,
    });
    infoWindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });

    infoWindowRef.current = infoWindow;
  };

  return <div className="main">
    <header className="main__header">
      <div className="main__header__heading">
        <h1 className="main__header__heading__title">Main page</h1>
        <p className="main__header__heading__subtitle">View locations and routes</p>
      </div>
      <div>autocomplete</div>
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
            ? <MainLocations/>
            : <MainRoute/>}
        </div>
      </div>
      <div className="main__map__container">
        <div className="main__map">
          <Map
            mapId='MAP_ID'
            defaultZoom={6}
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
                  <img src={icon} alt="point" width="40" height="40" />
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