import PropTypes from "prop-types";
import { useGoogleMaps } from "../../context/googleMapsContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TInfoWindow = () => {
  const { isGoogleMapsLoaded, map, placesDetails } = useGoogleMaps();
  const [placeKeys, setPlaceKeys] = useState([]);
  const navigate = useNavigate(); // Add React Router's useHistory hook

  useEffect(() => {
    if (isGoogleMapsLoaded && Object.keys(placesDetails).length > 0) {
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
  };

  const handleLetsGoClick = () => {
    // Navigate to the itinerary page with the placeId as a URL parameter
    navigate(`/itinerary/`);
  };

  return (
    <div className="infoContainer">
      {placeKeys.length > 0 ? (
        <>
          <div className="info-card">
            <h1>Location Information:</h1>
            {placeKeys.map((key) => (
              <div key={key} className="info-item">
                <h2 className="nameZoom" onClick={() => handleCardClick(key)}>
                  {placesDetails[key].name}
                </h2>
                {placesDetails[key].photos && placesDetails[key].photos.length > 0 && (
                  <img
                    src={placesDetails[key].photos[0].getUrl()}
                    alt={placesDetails[key].name}
                    style={{ width: '400px', height: 'auto' }}
                  />
                )}
                <br></br>
                <button className="confirmButton" onClick={() => handleLetsGoClick(key)}>
                  Lets Go!
                </button>
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



TInfoWindow.propTypes = {
  
  placeDetails: PropTypes.arrayOf(PropTypes.object),
};

export default TInfoWindow;