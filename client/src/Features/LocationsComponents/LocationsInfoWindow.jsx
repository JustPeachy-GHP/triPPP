import PropTypes from "prop-types";
import { useGoogleMaps } from "../../context/googleMapsContext";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LocationsInfoWindow = () => {
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

  const handleLetsGoClick = (key) => {
    const place = key;
    console.log(place);

    // Navigate to the itinerary page and pass the current destination
    // navigate function can pass props to the component rendered at the /itinerary/ path
    // this is passed as an object with a key called state
    navigate(`/itinerary/`, { state: place });
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



LocationsInfoWindow.propTypes = {
  
  placesDetails: PropTypes.arrayOf(PropTypes.object),
};

export default LocationsInfoWindow;