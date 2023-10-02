import React, { useState, useMemo } from "react";
import { useGoogleMaps } from "../../context/googleMapsContext";
import {
  GoogleMap,
  MarkerF,
  InfoWindowF
} from "@react-google-maps/api";

const LocationsMap = () => {
  const [placesService, setPlacesService] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const { isGoogleMapsLoaded, map, setMap, placesDetails, setPlacesDetails } = useGoogleMaps();
  const pinned = useMemo(
    () => [
      { lat: 41.385063, lng: 2.173404, placeId: "ChIJ5TCOcRaYpBIRCmZHTz37sEQ" },
      { lat: 35.595058, lng: -82.551487, placeId: "ChIJCW8PPKmMWYgRXTo0BsEx75Q" },
      { lat: 36.1699, lng: -115.1398, placeId: "ChIJ0X31pIK3voARo3mz1ebVzDo" },
      { lat: 41.8781, lng: -87.6298, placeId: "ChIJ7cv00DwsDogRAMDACa2m4K8" },
      { lat: 39.7392, lng: -104.9903, placeId: "ChIJzxcfI6qAa4cR1jaKJ_j0jhE" },
      { lat: 24.5551, lng: -81.7800, placeId: "ChIJGZPxxsW20YgRVe3uNrw1q-k" },
      { lat: 40.7128, lng: -74.0060, placeId: "ChIJOwg_06VPwokRYv534QaPC8g" },
      { lat: 34.0522, lng: -118.2437, placeId: "ChIJE9on3F3HwoAR9AhGJW_fL-I" },
    ],
    []
  );

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
      for (const pinnedItem of pinned) {
        bounds.extend(pinnedItem);
        places = await onHandleGetLocationInfo(pinnedItem.placeId, places);
      }
  
      map.fitBounds(bounds);
      setMap(map);
  
      if (Object.keys(places).length > 0) {
        onHandleSetPlacesDetails(places);
      }
    } catch (error) {
      console.error("Error loading location info:", error);
    }
  }, [onHandleGetLocationInfo, pinned, onHandleSetPlacesDetails, setMap]);

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
