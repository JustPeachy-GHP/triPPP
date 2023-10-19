import React, { useState, useEffect } from "react";
import { useGoogleMaps } from "../../context/googleMapsContext";
import { fetchAllLocations } from "../../helpers/locations";
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useJsApiLoader,
} from "@react-google-maps/api"; // Corrected component names

const LocationsMap = () => {
  const [placesService, setPlacesService] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const { isGoogleMapsLoaded, map, setMap, placesDetails, setPlacesDetails } = useGoogleMaps();
  const [locations, setLocations] = useState([]);
  const libraries = ["places"];
  const API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  useEffect(() => {
    async function getAllLocations() {
      try {
        const locationsData = await fetchAllLocations();
        setLocations(locationsData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }

    try {
      getAllLocations();
    } catch(e) {
      console.log(e);
    }
  }, []);

  function parseCoordinates(coord) {
    if (coord && typeof coord === 'object' && 'x' in coord && 'y' in coord) {
      const coordinateObj = { lat: coord.x, lng: coord.y };
      return coordinateObj;
    } else {
      console.error("Invalid coordinate format:", coord);
      return { lat: 0, lng: 0 }; // Provide default coordinates or handle the error as needed
    }
  }

  const onHandleGetLocationInfo = React.useCallback(function callback(placeId, placesObj) {
    return new Promise((resolve, reject) => {
      if (placesService && placeId) {
        const request = {
          placeId: placeId,
          fields: ["name", "photos", "geometry"],
          key: API_KEY
        };

        placesService.getDetails(request, (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            placesObj[placeId] = place;
            resolve(placesObj);
          } else {
            console.error("Error fetching place details", placeId, status);
            reject(status);
          }
        });
      } else {
        if (!placesService) {
          reject("Missing places service: ", placesService);
        }
        if (!placeId) {
          reject("Missing place id: ", placeId);
        }
        reject("Undetermined error in handing get location information");
      }
    });
  }, [placesService]);

  const onHandleSetPlacesDetails = React.useCallback(function callback(places) {
    if (Object.keys(places).length > 0) {
      setPlacesDetails(places);
    }
  }, [setPlacesDetails]);

  
  const onLoad = React.useCallback(async function callback(map) {
    if (!map || !window.google || !window.google.maps) {
      console.error("Google Maps or map not available.");
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();
    let places = {};

    try {
      const placesService = new window.google.maps.places.PlacesService(map);
      setPlacesService(placesService);

      for (const location of locations) {
        bounds.extend(parseCoordinates(location.coord));
        if (location.place_id) {
          const placesDetails = await onHandleGetLocationInfo(location.place_id, places);
          if (placesDetails) {
            places = placesDetails;
          } else {
            console.warn("Skipping item due to place details issue: ", location);
          }
        } else {
          console.warn("Skipping item due to place_id", location);
        }
      }

      map.fitBounds(bounds);
      setMap(map);

      if (Object.keys(places).length > 0) {
        onHandleSetPlacesDetails(places);
      }
    } catch (error) {
      console.error("Error loading location info:", error);
    }
  }, [onHandleGetLocationInfo, locations, onHandleSetPlacesDetails, setMap]);

  const handleZoomToLocation = (lat, lng) => {
    if (map) {
      map.panTo(new window.google.maps.LatLng(lat, lng));
      map.setZoom(15); // You can adjust the zoom level as needed
    }
  };

  if (!window.google || !window.google.maps) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <>
      <div className="mapContainer">
        {isLoaded && locations.length > 0 ? 
          (
            <GoogleMap
              mapContainerClassName="map-container"
              zoom={12}
              onLoad={onLoad}
            >
              {Array.isArray(locations) && locations.length > 0 ? (
                locations.map(({ coord, place_id, vibes }, index) => (
                  <MarkerF
                    key={index}
                    position={parseCoordinates(coord)}
                    icon={{
                      url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                      scaledSize: new window.google.maps.Size(30, 30),
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(15, 15),
                    }}
                    onClick={() => {
                      setActiveMarker(index);
                    }}
                  >
                    {placesService && activeMarker === index ? (
                      <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                        <div className="locationInformation">
                          <button onClick={() => handleZoomToLocation(parseCoordinates(coord).lat, parseCoordinates(coord).lng)}>
                            Zoom to Location
                          </button>
                          {
                            (
                              <div>
                                <h3>{placesDetails[place_id]?.name}</h3>
                                {vibes && vibes.length > 0 && (
                                  <h3>Vibes: {vibes.replace(/[{}]/g, '').split(',').join(", ")}</h3>
                                )}
                                {placesDetails[place_id]?.photos &&
                                  placesDetails[place_id].photos?.length > 0 && (
                                    <img
                                      src={placesDetails[place_id].photos[0].getUrl()}
                                      alt={placesDetails[place_id]?.name}
                                    />
                                  )}
                              </div>
                            )
                          }
                        </div>
                      </InfoWindowF>
                    ) : null}
                  </MarkerF>
                ))
              ) : (
                <h1>No locations to display.</h1>
              )}
            </GoogleMap>
          ) : (
            <h1>Loading...</h1>
          )
        }
      </div>
    </>
  );
};

const MemoizedLocationsMap = React.memo(LocationsMap);

export default MemoizedLocationsMap;
