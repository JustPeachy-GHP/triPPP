import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useState } from "react";
import { useGoogleMaps } from "../../context/googleMapsContext";
const libraries = ["places"];
const API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

const AboutMap = () => {
  const [map, setMap] = React.useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [placeDetails, setPlaceDetails] = useState(null);
  const pinned = [
    { lat: 41.7128, lng: 74.006 },
    { lat: 40.7891, lng: 73.135 },
    { lat: 41.5868, lng: 98.625 },
    { lat: 47.6061, lng: 122.3328 },
    { lat: 34.0549, lng: 118.2426 },
  ];
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries,
  });
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    pinned?.forEach((pinned) => bounds.extend(pinned));
    map.fitBounds(bounds);
    const placesService = new window.google.maps.places.PlacesService(map);
    setMap(map);
    setPlacesService(placesService);
  }, []);
  return (
    <>
      <div className="mapContainer">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="map-container"
            zoom={12}
            onLoad={onLoad}
          >
            {pinned.map(({ lat, lng }, index) => (
              <MarkerF
                key={index}
                position={{ lat, lng }}
                setIcon={{
                  scaledSize: new window.google.maps.Size(30, 30),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                }}
                //   onClick={() => {
                //     setActiveMarker(index);
                //     handleGetLocationInfo(placeId);
                //   }}
              >
                {placesService && activeMarker === index ? (
                  <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                    <div className="locationInformation">
                      {/* <button
                  onClick={handleGetLocationInfo(placeId)}
                > Location Information</button> */}
                      {placeDetails && (
                        <div>
                          <h3>{placeDetails.name}</h3>
                          <h3>{placeDetails.types.join(", ")}</h3>
                          {placeDetails.photos &&
                            placeDetails.photos.length > 0 && (
                              <img
                                src={placeDetails.photos[0].getUrl()}
                                alt={placeDetails.name}
                              />
                            )}
                        </div>
                      )}
                    </div>
                  </InfoWindowF>
                ) : null}
              </MarkerF>
            ))}
          </GoogleMap>
        )}
      </div>
    </>
  );
};

export default AboutMap;
