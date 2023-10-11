import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useGoogleMaps } from "../../context/googleMapsContext";
import { fetchItineraryLocations } from "../../helpers/locations";
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api"; // Corrected component names

function ItineraryMap(destination) {
  const [placesService, setPlacesService] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const { isGoogleMapsLoaded, map, setMap, itineraryPlacesDetails, setItineraryPlacesDetails } = useGoogleMaps();
  const [activities, setActivities] = useState([]);
  

  useEffect(() => {
    async function getItineraryLocations(destination) {
      try {
        const itineraryData = await fetchItineraryLocations(destination);
        setActivities(itineraryData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }

    try {
      // the prop destination comes to the component
      // as an object with a key of props
      // the value of that props is the destination place id
      getItineraryLocations(destination.props);
    } catch(e) {
      console.log(e);
    }
  }, [destination.props]);

  function parseCoordinates(coord) {
    if (coord && typeof coord === 'object' && 'x' in coord && 'y' in coord) {
      const coordinateObj = { lat: coord.x, lng: coord.y };
      return coordinateObj;
    } else {
      console.error("Invalid coordinate format:", coord);
      return { lat: 0, lng: 0 }; // Provide default coordinates or handle the error as needed
    }
  }

  const onHandleGetItineraryInfo = React.useCallback(function callback(placeId, placesObj) {
    return new Promise((resolve, reject) => {
      if (placesService && placeId) {
        const request = {
          placeId: placeId,
          fields: ["name", "photos", "geometry", "rating"],
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
        reject("Missing placesService or placeId");
      }
    });
  }, [placesService]);

  const onHandleSetItineraryPlacesDetails = React.useCallback(function callback(places) {
    if (Object.keys(places).length > 0) {
      setItineraryPlacesDetails(places);
    }
  }, [setItineraryPlacesDetails]);


  const onLoad = React.useCallback(async function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    
    let itineraryPlaces = {};
    
    for (const item of activities) {
      bounds.extend(parseCoordinates(item.coord));
    }
    map.fitBounds(bounds);
    setMap(map);

    try {
      const placesService = new window.google.maps.places.PlacesService(map);
      console.log("placesService:", placesService);
      setPlacesService(placesService);

      for (const item of activities) {
        if (item.place_id) {
          itineraryPlaces = await onHandleGetItineraryInfo(item.place_id, itineraryPlaces);
        } else {
          // Log a message for missing place_id
          console.warn("Skipping item due to missing place_id:", item);
        }
      }
  
      if (Object.keys(itineraryPlaces).length > 0) {
        onHandleSetItineraryPlacesDetails(itineraryPlaces);
      }
    } catch (error) {
      console.error("Error loading location info:", error);
    }
  }, [onHandleGetItineraryInfo, activities, onHandleSetItineraryPlacesDetails, setMap]);

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
        {isGoogleMapsLoaded && activities.length > 0 ? 
          (
            <GoogleMap
              mapContainerClassName="map-container"
              zoom={12}
              onLoad={onLoad}
            >
              {Array.isArray(activities) && activities.length > 0 ? (
                activities.map(({ coord, place_id }, index) => (
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
                                <h3>{itineraryPlacesDetails[place_id].name}</h3>
                                {itineraryPlacesDetails[place_id].photos &&
                                  itineraryPlacesDetails[place_id].photos.length > 0 && (
                                    <img
                                      src={itineraryPlacesDetails[place_id].photos[0].getUrl()}
                                      alt={itineraryPlacesDetails[place_id].name}
                                    />
                                  )}
                                  <h3>Google Rating: {itineraryPlacesDetails[place_id].rating}</h3>
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
}

ItineraryMap.propTypes = {
  destination: PropTypes.string,
};

const MemoizedItineraryMap = React.memo(ItineraryMap);

export default MemoizedItineraryMap;