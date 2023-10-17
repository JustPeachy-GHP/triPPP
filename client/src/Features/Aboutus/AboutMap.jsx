import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useState } from "react";
const libraries = ["places"];
const API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
const LocationsMap = () => {
  const [map, setMap] = React.useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [placeDetails, setPlaceDetails] = useState(null);
  const pinned = [
    { lat: 40.72304188542622, lng: -74.01269760988193 },
    { lat: 40.829445231364105, lng: -73.1470572026469 },
    { lat: 41.58256431381637, lng: -93.62334239098554 },
    { lat: 47.56939350503413, lng: -122.31049148269511 },
    { lat: 34.032557126361965, lng: -118.20168264082076 },
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
  const handleGetLocationInfo = (placeId) => {
    if (placesService && placeId) {
      const request = {
        placeId: placeId,
        fields: ["name", "photos", "type"],
        key: "AIzaSyCAzIfZMMLLhXLAO_QnX60PEpTWSyndAb8",
      };
      placesService.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaceDetails(place);
        } else {
          console.error("Error fetching place details", placeId, status);
        }
      });
    }
  };
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
            {pinned.map(({ lat, lng, placeId }, index) => (
              <MarkerF
                key={index}
                position={{ lat, lng }}
                setIcon={{
                  scaledSize: new window.google.maps.Size(30, 30),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                }}
                onClick={() => {
                  setActiveMarker(index);
                  handleGetLocationInfo(placeId);
                }}
              >
                {placesService && activeMarker === index ? (
                  <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                    <div className="locationInformation">
                      <button onClick={handleGetLocationInfo(placeId)}>
                        {" "}
                        Location Information
                      </button>
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
export default LocationsMap;
