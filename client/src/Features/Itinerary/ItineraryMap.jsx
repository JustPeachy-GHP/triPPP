import React, { useState, useEffect } from "react";
import { useGoogleMaps } from "../../context/googleMapsContext";
import { fetchItineraryLocations } from "../../helpers/locations";

import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useJsApiLoader
} from "@react-google-maps/api"; // Corrected component names


function DestinationsMap() {

  const [placesService, setPlacesService] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const { isGoogleMapsLoaded, map, setMap, placesDetails, setPlacesDetails } = useGoogleMaps();
  const [activity, setActivity] = useState([]);

  // const { placeId } = useParams();

  // const itineraryLocations = [
  //   { lat: 35.594840999999995, lng: -82.5515138, placeId:"ChIJXYDlZVfzWYgRaimqe4ND4Vs"},
  //   { lat: 35.564009, lng: -82.551487, placeId:"ChIJ9ZsMofuMWYgRPaMd6kPpv70"  },
  //   { lat: 35.592901600000005, lng: -82.481200199999989, placeId:"" },
  //   { lat: 35.57837, lng: -82.500883899999991, placeId:"ChIJZ9il6JPzWYgR1cUrYlcprbw" },
  //   { lat: 35.5321913, lng: -82.5368195, placeId:"ChIJdb2htJTyWYgRG4PVQhGknMY" },
  //   { lat: 35.2396627, lng: -82.731398200000015, placeId:"ChIJ9-sHI0e7WYgRpiJprZdEIWg" },
  //   { lat: 35.5913513, lng: -82.52996379999999, placeId:"ChIJcyDdW2PzWYgRV7WZYmKiOW4" },
  //   { lat: 35.5788237, lng: -82.5947328, placeId:"ChIJ_7Pu4IqNWYgR1CvE0rTQ2Mw"  },

  //   ]; 

  useEffect(() => {
    async function getItineraryLocations() {
      try {
        const itineraryData = await fetchItineraryLocations();
        console.log("Fetched itineraryData:", itineraryData);
        setActivity(itineraryData);
        console.log("Activity state updated:", itineraryData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }

    try {
      getItineraryLocations();
    } catch(e) {
      console.log(e);
    }
  }, []);

  function parseCoordinates(coord) {
    console.log(coord);
    if (coord && typeof coord === 'object' && 'x' in coord && 'y' in coord) {
      const coordinateObj = { lat: coord.x, lng: coord.y };
      console.log(coordinateObj);
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
          fields: ["name", "photos", "geometry"],
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

  const onHandleSetPlacesDetails = React.useCallback(function callback(places) {
    if (Object.keys(places).length > 0) {
      setPlacesDetails(places);
    }
  }, [setPlacesDetails]);

    const onLoad = React.useCallback(async function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();
      const placesService = new window.google.maps.places.PlacesService(map);
      setPlacesService(placesService);
      let places = {};
    
      try {
        for (const item of activity) {
          bounds.extend(parseCoordinates(item.coord));
    
          if (item.place_id) {
            // Log place_id to check if it's present
            console.log("Fetching place details for place_id:", item.place_id);
            places = await onHandleGetItineraryInfo(item.place_id, places);
          } else {
            // Log a message for missing place_id
            console.warn("Skipping item due to missing place_id:", item);
          }
        }
    
        // Log places to check if it's populated
        console.log("Fetched places:", places);
    
        map.fitBounds(bounds);
        setMap(map);
    
        if (Object.keys(places).length > 0) {
          onHandleSetPlacesDetails(places);
        }
      } catch (error) {
        console.error("Error loading location info:", error);
      }
    }, [onHandleGetItineraryInfo, activity, onHandleSetPlacesDetails, setMap]);
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
        {isGoogleMapsLoaded && activity.length > 0 ? 
          (
            <GoogleMap
              mapContainerClassName="map-container"
              zoom={12}
              onLoad={onLoad}
            >
              {Array.isArray(activity) && activity.length > 0 ? (
                activity.map(({ coord, place_id }, index) => (
                  <MarkerF
                    key={index}
                    position={parseCoordinates(coord)}
                    icon={{
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
                                <h3>{placesDetails[place_id].name}</h3>
                                {placesDetails[place_id].photos &&
                                  placesDetails[place_id].photos.length > 0 && (
                                    <img
                                      src={placesDetails[place_id].photos[0].getUrl()}
                                      alt={placesDetails[place_id].name}
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
}

const MemoizedDestinationsMap = React.memo(DestinationsMap);

export default MemoizedDestinationsMap;