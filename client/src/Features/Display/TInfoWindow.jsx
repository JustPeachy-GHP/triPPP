import PropTypes from "prop-types";
import { useGoogleMaps } from "../../context/googleMapsContext";
import { useState, useEffect } from "react";
import ActivityRater from "./ActivityRater";


const TInfoWindow = () => {
  const { isGoogleMapsLoaded, map, placesDetails } = useGoogleMaps();
  const [placeKeys, setPlaceKeys] = useState([]);
  
  useEffect(() => {
    if (isGoogleMapsLoaded && Object.keys(placesDetails).length > 0 ) {
      const keys = Object.keys(placesDetails);
      setPlaceKeys(keys);
    }
  }, [isGoogleMapsLoaded, map, placesDetails]);

  const handleCardClick = (placeId) => {
    const lat = placesDetails[placeId].geometry.location.lat();
    const lng = placesDetails[placeId].geometry.location.lng();

    if (map) {
      map.panTo(new window.google.maps.LatLng(lat, lng));
      map.setZoom(5); // You can adjust the zoom level as needed
    }
  }
  return (
    <div className="infoContainer">
      {placeKeys.length > 0 ? 
        (
          <>
            <div className="info-card">
              {/* Use a MUI card component here and when it clicks pass in the place ID which is stored as a key */}
              <h1>Location Information:</h1>
              {placeKeys.map((key) => (
                <div key={key} className="info-item">
                  <h2 onClick={(() => handleCardClick(key))}>{placesDetails[key].name}
                  </h2>
                  {placesDetails[key].photos && placesDetails[key].photos.length > 0 && (
                    <img src={placesDetails[key].photos[0].getUrl()} alt={placesDetails[key].name} />
                  )}
                  <ActivityRater/>
                </div>
              ))}
            </div>
          </>
          
        ) 
        : 
        (
          <h1>Loading...</h1>
        )
      }
    </div>
  );
};


TInfoWindow.propTypes = {
  
  placeDetails: PropTypes.arrayOf(PropTypes.object),
};

export default TInfoWindow;