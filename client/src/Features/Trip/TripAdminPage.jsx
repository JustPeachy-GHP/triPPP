import React, { useState, useEffect } from "react";
import { deleteGroupMember } from "../../helpers/tripAdminPage";
import { deleteTrip } from "../../helpers/tripAdminPage";
import { updateTrip } from "../../helpers/tripAdminPage";
import { addGroupMember } from "../../helpers/tripAdminPage";
import { fetchSingleTrip } from "../../helpers/tripAdminPage";

export default function TripAdminPage({ group_id, trip_id }) {
  const [tripData, setTripData] = useState(null);

  // use helper function created on client side to get the trip data

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   alert("You've submitted your updated trip");
  // };
  // comeback to this later, we need to figure out what to pass later

  // get trip, checked by amy
  useEffect(() => {
    async function getSingleTrip() {
      const response = await fetchSingleTrip(trip_id);
      setTripData(response);
      console.log("loading trip", response);
      return response;
    }
    getSingleTrip();
  }, []);

  // delete group member

  const deleteMember = async (user_id) => {
    try {
      await deleteGroupMember(user_id);
      console.log(group_id, user_id);
    } catch (error) {
      console.error("can't delete member", error);
    }
  };

  // delete trip

  const deleteSingleTrip = async (trip_id) => {
    try {
      await deleteTrip(trip_id);
      const deletedTrip = await fetchSingleTrip();
      setGroupMembers(updatedGroup);
    } catch (error) {
      console.error("can't delete trip", error);
    }
  };

  // function DeleteButton() {
  //   const handleDelete = () => {
  //     alert("Group Member Deleted");
  //   };
  //   function DeleteTrip() {
  //     const handleDelete = () => {
  //       alert("Trip Deleted");
  //     };
  //   }
  // }
  return (
    <h1>something</h1>
    // <div>
    //   <h1> Your Trip</h1>
    //   <h3> {trip.tripname} </h3>
    //   <p> {groupmembs.groupmembs} </p>

    //   <button onClick={() => handleDelete(post._id)}>Delete Post</button>

    //   <form>
    //     <label for="addTraveler">Add New Traveler:</label>
    //     <input type="email" id="email" placeholder="Email" /> <br />
    //     <button type="submit" value="submit" /> <br />
    //     {/* display emails of trip members  */}
    //     <br />
    //     <DeleteButton onClick={handleDelete} />
    //     <DeleteTrip onClick={handleTripDelete} />
    //   </form>
    // </div>
  );
}
