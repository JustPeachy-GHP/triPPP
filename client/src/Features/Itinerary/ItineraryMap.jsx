import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useJsApiLoader
} from "@react-google-maps/api"; // Corrected component names

const libraries = ["places"];
const API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

function DestinationsMap({ onSelectPlace }) {

  const [map, setMap] = React.useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [placeDetails, setPlaceDetails] = useState([]);

//   const { placeId } = useParams();

  const itineraryLocations = [
    { lat: 35.594840999999995, lng: -82.5515138, placeId:"ChIJXYDlZVfzWYgRaimqe4ND4Vs"},
    { lat: 35.564009, lng: -82.551487, placeId:"ChIJ9ZsMofuMWYgRPaMd6kPpv70"  },
    { lat: 35.592901600000005, lng: -82.481200199999989, placeId:"ChIJ0X31pIK3voARo3mz1ebVzDo" },
    { lat: 35.57837, lng: -82.500883899999991, placeId:"ChIJZ9il6JPzWYgR1cUrYlcprbw" },
    { lat: 35.5321913, lng: -82.5368195, placeId:"ChIJdb2htJTyWYgRG4PVQhGknMY" },
    { lat: 35.2396627, lng: -82.731398200000015, placeId:"ChIJ9-sHI0e7WYgRpiJprZdEIWg" },
    { lat: 35.5913513, lng: -82.52996379999999, placeId:"ChIJcyDdW2PzWYgRV7WZYmKiOW4" },
    { lat: 35.5788237, lng: -82.5947328, placeId:"ChIJ_7Pu4IqNWYgR1CvE0rTQ2Mw"  },

    ]; 

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: API_KEY,
        libraries,
      });


const onLoad = React.useCallback(function callback(map) {
  const bounds = new window.google.maps.LatLngBounds();
  itineraryLocations?.forEach(( itineraryLocations ) => bounds.extend(itineraryLocations));
  map.fitBounds(bounds);
  
  const placesService = new window.google.maps.places.PlacesService(map);

  setMap(map);
  setPlacesService(placesService);
}, []);

const handleGetLocationInfo = (placeId) => {
    if (placesService && placeId) {
        const request = {
          placeId: placeId,
          fields: ["name", "photos", "rating"],
          key: API_KEY,
        };

        placesService.getDetails(request, (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setPlaceDetails(place);
              onSelectPlace(place);
        } else {
          console.error("Error fetching place details", placeId, status);
        }
        });
      }
    };


    return (
      <>
        <div className="mapContainer">
          {isLoaded ? (
            <GoogleMap
              mapContainerClassName="map-container"
              zoom={20}
              onLoad={onLoad}
            >
              {itineraryLocations.map(({ lat, lng, placeId }, index) => (
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
                        <button onClick={() => handleGetLocationInfo(placeId)}>
                          Location Information
                        </button>
                        {placeDetails && (
                          <div>
                            <h3>{placeDetails.name}</h3>
                            {placeDetails.photos && placeDetails.photos.length > 0 && (
                              <img
                                src={placeDetails.photos[0].getUrl()}
                                alt={placeDetails.name}
                              />
                            )}
                            <h3>Google Rating: {placeDetails.rating}</h3>
                          </div>
                        )}
                      </div>
                    </InfoWindowF>
                  ) : null}
                </MarkerF>
              ))}
            </GoogleMap>
          ) : (
            <div>Loading Google Maps...</div>
          )}
        </div>
      </>
    );
  }

const MemoizedDestinationsMap = React.memo(DestinationsMap);

export default MemoizedDestinationsMap;