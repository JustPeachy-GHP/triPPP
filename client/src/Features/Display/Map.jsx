import {
    GoogleMap,
    MarkerF,
    InfoWindowF,
    useJsApiLoader
  } from "@react-google-maps/api";
  import React, { useState, useMemo } from "react";
  
  const libraries = ["places"];
  const API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
  
  const LocationsMap = () => {
  
    const [map, setMap] = React.useState(null);
    const [placesService, setPlacesService] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);
    const [placeDetails, setPlaceDetails] = useState(null);
    
  
    const pinned = useMemo(() => [
      { lat: 41.385063, lng: 2.173404, placeId:"ChIJ5TCOcRaYpBIRCmZHTz37sEQ" },
      { lat: 35.595058, lng: -82.551487, placeId:"ChIJCW8PPKmMWYgRXTo0BsEx75Q"  },
      { lat: 36.1699, lng: -115.1398, placeId:"ChIJ0X31pIK3voARo3mz1ebVzDo" },
      { lat: 41.8781, lng: -87.6298, placeId:"ChIJ7cv00DwsDogRAMDACa2m4K8"  },
      { lat: 39.7392, lng: -104.9903, placeId:"ChIJzxcfI6qAa4cR1jaKJ_j0jhE"  },
      { lat: 24.5551, lng: -81.7800, placeId:"ChIJGZPxxsW20YgRVe3uNrw1q-k" },
      { lat: 40.7128, lng: -74.0060, placeId:"ChIJOwg_06VPwokRYv534QaPC8g" },
      { lat: 34.0522, lng: -118.2437, placeId:"ChIJE9on3F3HwoAR9AhGJW_fL-I"  },
  
      ], []);  
  
    
  
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
      }, [pinned]);
    
      const handleGetLocationInfo = (placeId) => {
        if (placesService && placeId) {
          const request = {
            placeId: placeId,
            fields: ["name", "photos", "type"],
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
    
      const handleZoomToLocation = (lat, lng) => {
        if (map) {
          map.panTo(new window.google.maps.LatLng(lat, lng));
          map.setZoom(15); // You can adjust the zoom level as needed
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
                          <button onClick={() => handleZoomToLocation(lat, lng)}>
                            Zoom to Location
                          </button>
                          {placeDetails && (
                            <div>
                              <h3>{placeDetails.name}</h3>
                              <h3>{placeDetails.types.join(", ")}</h3>
                              {placeDetails.photos && placeDetails.photos.length > 0 && (
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