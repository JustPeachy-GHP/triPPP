import { useGoogleMaps } from "../../context/googleMapsContext";
import React, { useState, useEffect } from "react";
import ActivityRater from "./ActivityRater";
import PropTypes from "prop-types";


const ItineraryInfoWindow = () => {
  const { isGoogleMapsLoaded, map, itineraryPlacesDetails } = useGoogleMaps();
  const [placeKeys, setPlaceKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 

  useEffect(() => {
    if (isGoogleMapsLoaded && itineraryPlacesDetails) {
      const keys = Object.keys(itineraryPlacesDetails);
      setPlaceKeys(keys);
      setIsLoading(false);
    }
  }, [isGoogleMapsLoaded, map, itineraryPlacesDetails]);

  const handleCardClick = (placeId) => {
    const lat = itineraryPlacesDetails[placeId]?.geometry?.location?.lat();
    const lng = itineraryPlacesDetails[placeId]?.geometry?.location?.lng();

    if (map && lat !== undefined && lng !== undefined) {
      map.panTo(new window.google.maps.LatLng(lat, lng));
      map.setZoom(10); // You can adjust the zoom level as needed
    }

  };


  return (
    <div className="infoContainer">
      {isLoading ? (
        <div>Loading...</div>
      ) : placeKeys.length > 0 ? 
      (
         <div className="info-card">
          <br/>
           <h1>Activity Options:</h1>
          {placeKeys.map((key) => (
        <div key={key} className="info-item">
          <h2 className="nameZoom" onClick={() => handleCardClick(key)}>
                  {itineraryPlacesDetails[key]?.name || "Name not available"}
                </h2>
        {itineraryPlacesDetails[key]?.photos && 
          itineraryPlacesDetails[key].photos.length > 0 ? (
                  <img
                    src={itineraryPlacesDetails[key].photos[0].getUrl()}
                    alt={itineraryPlacesDetails[key].name}
                    style={{ width: '400px', height: 'auto' }}
                  />
                  
                  ): null}
                  <ActivityRater place_id={key}/>
        </div> 
      ))}
      </div>
      ): (
        <div>No location information available.</div>
  )}
  </div>
);
};

ItineraryInfoWindow.propTypes = {
  itineraryPlacesDetails: PropTypes.object,
}

export default ItineraryInfoWindow;
