import React, { useState, useEffect } from "react";
import { fetchSingleTrip } from "../../../helpers/tripAdminPage";
// import DeleteTripButton from "./DeleteTripButton";
import { addGroupMember } from "../../../helpers/tripAdminPage";
import { getAllMembersbyId } from "../../../helpers/tripAdminPage";
import { deleteTrip } from "../../../helpers/tripAdminPage";

export default function TripAdminPage() {
  const [username, setUsername] = useState(null);
  const [oneTrip, setoneTrip] = useState([]);
  const [trip_id, setTripId] = useState(1);
  const [allGMembs, setAllGMembs] = useState([]);

  useEffect(() => setTripId(trip_id), []);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const APIData = await addGroupMember(username);
      console.log("API Data", APIData);
    } catch (error) {
      console.error(error);
    }
  }
  console.log(trip_id, "this is my trip id ");
  useEffect(() => {
    async function getSingleTrip(trip_id) {
      // hardcoded in trip_id of 1
      const response = await fetchSingleTrip(trip_id);
      console.log("One trip to rule them all!", response);
      setoneTrip(response);
    }
    getSingleTrip(trip_id);
  }, [trip_id]);

  useEffect(() => {
    async function membersingroup() {
      const response = await getAllMembersbyId(trip_id);
      console.log("All members showing", response);
      setAllGMembs(...allGMembs, ...response);
      console.log(response);
    }
    membersingroup();
  }, [trip_id]);

  // async function handleDelete() {
  //   try {
  //     const response = await deleteTrip();
  //     // navigate("/userlanding");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <>
      <h1>haaaayyyy</h1>
      <h1>
        {oneTrip.name}
        {/* stretch- add location */}
      </h1>
      <br />
      {console.log(allGMembs, "mapmapmap")}
      {allGMembs.map((member) => {
        return (
          //  groupmembs.trip_id, groupmembs.group_id, users.email, users.firstname, users.lastname
          <EachMemb
            email={member.email}
            firstname={member.firstname}
            lastname={member.lastname}
            trip_id={member.trip_id}
            user_id={member.user_id}
          />
          // whatever you've got in all g membs array
        );
      })}

      <form onSubmit={() => handleSubmit}>
        <label>
          <h2> Add Traveler </h2>
          {/* // check if this is right */}
          <input
            // className="inputField"
            // id="username"
            value={username}
            type="text"
            // name="username"
            placeholder="email"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <button> Submit</button>
      </form>
      <br />
      <br />
      <button type="button" onClick={() => handleDelete(trip_id)}>
        Delete Trip
      </button>
    </>
  );
}
