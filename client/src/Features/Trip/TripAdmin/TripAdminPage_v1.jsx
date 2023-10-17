import React, { useState, useEffect } from "react";
import {
  fetchSingleTrip,
  fetchSingleUserbyEmail,
  addGroupMember,
  getAllMembersbyId,
} from "../../../helpers/tripAdminPage";
import EachMemb from "./EachMemb";

export default function TripAdminPage({ trip_id }) {
  const [email, setEmail] = useState(null);
  const [oneTrip, setoneTrip] = useState([]);
  // const [trip_id, setTripId] = useState();
  const [allGMembs, setAllGMembs] = useState([]);

  // useEffect(() => setTripId(trip_id), [trip_id]);
  // console.log(trip_id, "this is my trip id ");
  useEffect(() => {
    async function getSingleTrip() {
      const response = await fetchSingleTrip(trip_id);
      console.log("One trip to rule them all!", response);
    }
    getSingleTrip(response.trip_id);
  }, [trip_id]);
  // ==========Getting All Group Membs
  useEffect(() => {
    async function membersingroup() {
      const response = await getAllMembersbyId(trip_id);
      console.log("All members showing", response);
      setAllGMembs(response);
      console.log(response);
    }
    membersingroup();
  }, [trip_id]);
  // ========Adding Traveler
  useEffect(() => {
    async function addTraveler(trip_id, email) {
      const response = await fetchSingleUserbyEmail(email);
      if (response !== null) {
        await addGroupMember(response.user_id, trip_id);
        setEmail(email);
        membersingroup();
        console.log("Adding member", response);
      } else {
        alert("User not in system. Try Again.");
      }
    }
  });

  // =========Deleting Trip ===========
  async function handleDelete() {
    try {
      const response = await deleteTrip();
      // navigate("/userlanding");
    } catch (error) {
      console.error(error);
    }
  }
  // ==========RETURN ================
  return (
    <>
      <h1>{oneTrip.tripname}</h1>
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

      <form onSubmit={() => handleSubmit()}>
        <label>
          <h2> Add Traveler </h2>
          {/* // check if this is right */}
          <input
            // className="inputField"
            // id="username"
            value={email}
            type="email"
            // name="username"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
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
