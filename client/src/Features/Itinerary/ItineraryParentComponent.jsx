import React, { useState } from "react";
import ItineraryInfoWindow from "./ItineraryInfoWindow";
import MapComponent from "./MapComponent";

function ParentComponent() {
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState(null);

  const handleSelectPlace = (placeDetails) => {
    setSelectedPlaceDetails(placeDetails);
  };

  return (
    <div>
      <MapComponent onSelectPlace={handleSelectPlace} />
      <ItineraryInfoWindow placeDetails={selectedPlaceDetails} />
    </div>
  );
}

export default ParentComponent;





