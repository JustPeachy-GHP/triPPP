import { useState, useEffect } from "react";
import { fetchSingleTrip } from "../../helpers/tripAdminPage";

export default function SingleTrip({ trip_id }) {
  const [oneTrip, setoneTrip] = useState([]);

  useEffect(() => {
    async function getSingleTrip() {
      // hardcoded in trip_id of 1
      const response = await fetchSingleTrip(5);
      console.log("One trip to rule them all!", response);
      setoneTrip(response);
    }
    getSingleTrip();
  }, []);
  return (
    <div id="trip-view">
      <h1> {oneTrip}Placeholder Trip</h1>
    </div>
  );
}

// NOTES
// can't see any trips, even when hardcoding in a trip id of 1
