import PropTypes from "prop-types";
import { useGoogleMaps } from "../../context/googleMapsContext";
import React, { useState, useEffect } from "react";
import ActivityRater from "../Display/ActivityRater";
import { useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"];
const API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

const ItineraryInfoWindow = () => {
  const [map, setMap] = React.useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [placeDetails, setPlaceDetails] = useState([]);

  const placeIds = [
    "ChIJXYDlZVfzWYgRaimqe4ND4Vs",
    "ChIJ9ZsMofuMWYgRPaMd6kPpv70",
    "ChIJ0X31pIK3voARo3mz1ebVzDo",
    "ChIJZ9il6JPzWYgR1cUrYlcprbw",
    "ChIJdb2htJTyWYgRG4PVQhGknMY",
    "ChIJ9-sHI0e7WYgRpiJprZdEIWg",
    "ChIJcyDdW2PzWYgRV7WZYmKiOW4",
    "ChIJ_7Pu4IqNWYgR1CvE0rTQ2Mw",
  ];

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  useEffect(() => {
    if (isLoaded && map && placesService) {
      // Initialize placesService here
      const placesService = new window.google.maps.places.PlacesService(map);
      setPlacesService(placesService);

      // Fetch place details for each placeId
      placeIds.forEach((placeId) => {
        const request = {
          placeId: placeId,
          fields: ["name", "photos"],
          key: API_KEY,
        };

        placesService.getDetails(request, (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setPlaceDetails((prevPlaceDetails) => [...prevPlaceDetails, place]);
          } else {
            console.error("Error fetching place details", placeId, status);
          }
        });
      });
    }
  }, [isLoaded, map, placesService]); // Include isLoaded and map in the dependency array

  return (
    <>
      <div className="infoContainer">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <div className="info-card">
            <h1>Activity Options:</h1>
            {placeDetails.map((place, index) => (
              <div key={index} spacing={2} className="info-card">
                <h1>{place.name}</h1>
                {place.photos && place.photos.length > 0 && (
                  <img src={place.photos[0].getUrl()} alt={place.name} />
                )}
              </div>
            ))}
          </div>
        )}
        <ActivityRater />
      </div>
    </>
  );
};

export default ItineraryInfoWindow;
