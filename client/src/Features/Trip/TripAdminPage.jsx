import React, { useState, useEffect } from "react";
import { deleteTripAdmin, fetchSingleTrip } from "../../helpers/trips";
import { updateTripAdmin } from "../../helpers/trips";
import { deleteGroupMember } from "../../helpers/trips";
export default function TripAdminPage({ trip_id }) {
  const [tripData, setTripData] = useState("");
  const [email, setEmail] = useState("");
  const [groupMembers, setGroupMembers] = useState("");

  function handleTripData(trip_id, user_id) {
    setTripData(!tripData);
  }

  useEffect(() => {
    async function getSingleTrip() {
      const response = await fetchSingleTrip(trip_id);
      console.log("loading trip", response);
      setTripData(response);
    }
  });
  return (
    <div>
      <h1> TripAdminPage</h1>
      <form>
        {/* <label for="tripname">Trip Name:</label><br>
        <input type="text" id="tripname" name="tripname" /><br /> 
        <label for="tripname">Trip Name:</label><br>
        <input type="text" id="tripname" name="tripname" /><br /> 
        <label for="addtraveler">Add Traveler</label><br>
        <input type="email" id="addtraveler" name="add traveler" /><br /> 
        show all the travelers for the trip based on trip_id */}
      </form>
    </div>
  );
}
