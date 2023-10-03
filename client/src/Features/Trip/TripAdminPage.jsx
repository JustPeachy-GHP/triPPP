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
// get trip 
  useEffect(() => {
    async function getSingleTrip() {
      const response = await fetchSingleTrip(trip_id);
      console.log("loading trip", response);
      setTripData(response);
    }
// delete trip member 
  useEffect(() =>{
    async function deleteMember() {
      const response = Await deleteGroupMember(user_id,trip_id); 
      console.log("deleting trip", response);

    }
  })
  function DeleteButton(){
    const handleDelete = () => { 
      alert ('Group Member Deleted');
    };
  function DeleteTrip() {
    const handleDelete = () => { 
      alert ("Trip Deleted");
    }
  }
  }
  });
  return (
    <div>
      <h1> TripAdminPage</h1>
      <h2> tripname</h2>
      <form> 
      <label for ="addTraveler">Add New Traveler:</label>
      <input type="email" id="email" placeholder="Email" /> <br />
      <button type="submit" value="submit" /> <br /> 
      {/* display emails of trip members  */}
       <br /> 
       <DeleteButton onClick={handleDelete} />
        <DeleteTrip onClick={handleTripDelete} /> 
      </form>
    </div>
  );
}


// store new travelers 
// store trip 
// 