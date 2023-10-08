import PropTypes from "prop-types";
import { useGoogleMaps } from "../../context/googleMapsContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActivityRater from "../Display/ActivityRater";

const ItineraryInfoWindow = () => {
  const { isGoogleMapsLoaded, map, itineraryPlacesDetails } = useGoogleMaps();
  const [placeKeys, setPlaceKeys] = useState([]);

  useEffect(() => {
    if (isGoogleMapsLoaded && Object.keys(itineraryPlacesDetails).length > 0) {
      const keys = Object.keys(itineraryPlacesDetails);
      setPlaceKeys(keys);
    }
  }, [isGoogleMapsLoaded, map, itineraryPlacesDetails]);

  const handleCardClick = (placeId) => {
    const lat = itineraryPlacesDetails[placeId].geometry.location.lat();
    const lng = itineraryPlacesDetails[placeId].geometry.location.lng();

    if (map) {
      map.panTo(new window.google.maps.LatLng(lat, lng));
      map.setZoom(5); // You can adjust the zoom level as needed
    }
  };


  return (
    <div className="infoContainer">
      {placeKeys.length > 0 ? (
        <>
          <div className="info-card">
            <h1>Activity Options:</h1>
            {placeKeys.map((key) => (
              <div key={key} className="info-item">
                <h2 className="nameZoom" onClick={() => handleCardClick(key)}>
                  {itineraryPlacesDetails[key].name}
                </h2>
                {itineraryPlacesDetails[key].photos && itineraryPlacesDetails[key].photos.length > 0 && (
                  <img
                    src={itineraryPlacesDetails[key].photos[0].getUrl()}
                    alt={itineraryPlacesDetails[key].name}
                    style={{ width: '400px', height: 'auto' }}
                  />
                )}
                <br>
                </br>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>No location information available.</div>
      )}
    </div>
  );
};



export default ItineraryInfoWindow;
