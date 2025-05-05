import './MainPage.scss'
import { useCallback, useRef, useState } from "react";
import MainLocations from "../../components/MainLocations/MainLocations.tsx";
import MainRoute from "../../components/MainRoute/MainRoute.tsx";
import { AdvancedMarker, Map, MapCameraChangedEvent, useMap } from '@vis.gl/react-google-maps';
import { locations, points } from "../../data/data.tsx";
import pointPNG from '../../assets/images/point.png'
import { Poi } from "../../data/types.tsx";

function MainPage() {
  const [activeTab, setActiveTab] = useState("locations");
  const map = useMap();
  const markerRefs = useRef<Record<string, google.maps.marker.AdvancedMarkerElement>>({});
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  function onTabClick(tab) {
    if (tab !== activeTab) {
      setActiveTab(tab)
    }
  }

  const handleClick = (ev: google.maps.MapMouseEvent, key:string) => {
    if(!map) return;
    if(!ev.latLng) return;
    const marker = markerRefs.current[key]
    if (infoWindowRef.current) {
      infoWindowRef.current?.close();
    }

    console.log('marker clicked:', ev.latLng.toString());
    map.panTo(ev.latLng);
    if(map.getZoom() <=13){
      map.setZoom(13);
    }

    const infoWindow = new google.maps.InfoWindow({
      content: `
    <div class="custom-info-window">
      <h3>${locations.find(el=>el.id===key)?.name}</h3>
      <p>${locations.find(el=>el.id===key)?.latitude}, ${locations.find(el=>el.id===key)?.longitude}</p>
    </div>
  `,
    });
    infoWindow.open({
      anchor: marker,
      map,
      shouldFocus: true,
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
            defaultCenter={ { lat: Number(locations[0].latitude), lng: Number(locations[0].longitude) } }>
            <>
              {points.map((poi: Poi)=>{
                return <AdvancedMarker
                  key={poi.key}
                  position={poi.location}
                  clickable={true}
                  ref={(el) => {
                    if (el) markerRefs.current[poi.key] = el;
                  }}
                  onClick={(ev)=>handleClick(ev, poi.key)}>
                  <img src={pointPNG} alt="point" width="40" height="40"/>
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