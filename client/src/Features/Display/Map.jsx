import React, { useState, useEffect } from "react";
import { useGoogleMaps } from "../../context/googleMapsContext";
import { fetchAllLocations } from "../../helpers/locations";
import {
  GoogleMap,
  MarkerF,
  InfoWindowF
} from "@react-google-maps/api";

const LocationsMap = () => {
  const [placesService, setPlacesService] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const { isGoogleMapsLoaded, map, setMap, placesDetails, setPlacesDetails } = useGoogleMaps();
  const [locations, setLocations] = useState([]);
  
  
    async function getAllLocations() {
      console.log("Fetching location data");
      const locationsData = await fetchAllLocations();
      setLocations(locationsData)
    } 

    useEffect (() => {
    getAllLocations()
  }, []);

 

  function parseCoordinates(coord) {
    const [lat, lng] = coord.split(',').map(parseFloat);
    return { lat, lng };
  }
  
  const coordinates = locations.map((item) => parseCoordinates(item.coord));
  console.log(coordinates);
  


  const onHandleGetLocationInfo = React.useCallback(function callback(placeId, placesObj) {
    return new Promise((resolve, reject) => {
      if (placesService && placeId) {
        const request = {
          placeId: placeId,
          fields: ["name", "photos", "type", "geometry"],
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
      for (const location of locations) {
        bounds.extend(parseCoordinates(location.coord));
        places = await onHandleGetLocationInfo(location.placeId, places);
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
        {isGoogleMapsLoaded ? 
          (
            <GoogleMap
              mapContainerClassName="map-container"
              zoom={12}
              onLoad={onLoad}
            >
              {locations.map(({ lat, lng, placeId }, index) => (
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
                  }}
                >
                  {placesService && activeMarker === index ? (
                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                      <div className="locationInformation">
                        <button onClick={() => handleZoomToLocation(lat, lng)}>
                          Zoom to Location
                        </button>
                        {
                          (
                            <div>
                              <h3>{placesDetails[placeId].name}</h3>
                              <h3>{placesDetails[placeId].types.join(", ")}</h3>
                              {placesDetails[placeId].photos &&
                                placesDetails[placeId].photos.length > 0 && (
                                  <img
                                    src={placesDetails[placeId].photos[0].getUrl()}
                                    alt={placesDetails[placeId].name}
                                  />
                                )}
                            </div>
                          )
                        }
                      </div>
                    </InfoWindowF>
                  ) : null}
                </MarkerF>
              ))}
            </GoogleMap>
          )
          :
          (
            <h1>Loading...</h1>
          )
        }
      
      </div>
    </>
  );
};

const MemoizedLocationsMap = React.memo(LocationsMap);

export default MemoizedLocationsMap;
