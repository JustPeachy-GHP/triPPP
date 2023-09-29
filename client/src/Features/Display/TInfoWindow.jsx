import { useState, useEffect, useMemo } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"];
const API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

const TInfoWindow = () => {
  const [placesService, setPlacesService] = useState(null);
  const [placeDetails, setPlaceDetails] = useState([]);
  
  const placeIds = useMemo(()=> [
    "ChIJ5TCOcRaYpBIRCmZHTz37sEQ",
    "ChIJCW8PPKmMWYgRXTo0BsEx75Q",
    "ChIJ0X31pIK3voARo3mz1ebVzDo",
    "ChIJ7cv00DwsDogRAMDACa2m4K8",
    "ChIJzxcfI6qAa4cR1jaKJ_j0jhE",
    "ChIJGZPxxsW20YgRVe3uNrw1q-k",
    "ChIJOwg_06VPwokRYv534QaPC8g",
    "ChIJE9on3F3HwoAR9AhGJW_fL-I",
  ], []);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  useEffect(() => {
    if (isLoaded && !placesService) {
      const placesServiceInstance = new window.google.maps.places.PlacesService(document.createElement('div'));

      setPlacesService(placesServiceInstance);
    }
  }, [isLoaded, placesService]);

  useEffect(() => {
    if (placesService && placeIds.length > 0) {
      const requests = placeIds.map((placeId) => ({
        placeId: placeId,
        fields: ["name", "photos", "types"],
      }));

      Promise.all(
        requests.map((request) => new Promise((resolve) =>
          placesService.getDetails(request, (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              resolve(place);
            } else {
              console.error("Error fetching place details", request.placeId, status);
              resolve(null); // Resolve with null in case of error
            }
          })
        ))
      ).then((results) => {
        const filteredResults = results.filter(Boolean); // Remove null results
        setPlaceDetails(filteredResults);
      });
    }
  }, [placesService, placeIds]);

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  return (
    <div className="infoContainer">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <div className="info-card">
          <h1>Location Information:</h1>
          {placeDetails.map((place, index) => (
            <div key={index} className="info-item">
              <h2>{place.name}</h2>
              <p>{place.types.join(", ")}</p>
              {place.photos && place.photos.length > 0 && (
                <img src={place.photos[0].getUrl()} alt={place.name} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TInfoWindow;