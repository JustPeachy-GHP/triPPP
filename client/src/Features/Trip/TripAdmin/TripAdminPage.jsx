import React, { useState, useEffect } from "react";
// import { updateTrip } from "../../helpers/tripAdminPage";
// import SingleTrip from "./SingleTrip";
import DeleteTripButton from "./DeleteTripButton";
// import AddGroupMemb from "./AddGroupMemb";
// import AllGroupMembs from "./AllGroupMembs";
export default function TripAdminPage() {
  return (
    <>
      <h1>{/* <SingleTrip /> */}</h1>
      <br />
      {/* <AllGroupMembs /> */}
      {/* <AddGroupMemb /> */}
      <br />
      <br />
      <DeleteTripButton />
    </>
  );
}

// FUNCTIONS
// you take the groupmembs_id and the associated trip_id
// you display the trip based upon the user_id of the person who is logged in
// you display the group membs with the same trip_id

// STATE MANAGEMENT
//what do i need to store?

// BUTTONS
// you create a button that, when clicked, will delete a group memb from the group
// ===deleteGroupMember
// you create a button that, when clicked, will deletet a whole trip
// ===deleteTrip
// you create a button tthat, when clicked, will update a trip
// updateTrip

// TEXT FIELDS
// you create a text field that, when entered, will post/add a member to the group or trip
// addGroupMember
