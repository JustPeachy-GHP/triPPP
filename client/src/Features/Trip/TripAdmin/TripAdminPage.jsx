import React, { useState, useEffect } from "react";
import {
  fetchSingleTrip,
  fetchSingleUserbyEmail,
  addGroupMember,
  getAllMembersbyId,
} from "../../../helpers/tripAdminPage";
import EachMemb from "./EachMemb";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import UserTrips from "../../User/UserTripDetail";
// { trip_id }
export default function TripAdminPage({ trip_id }) {
  const [email, setEmail] = useState([]);
  const [oneTrip, setoneTrip] = useState([]);
  const [allGMembs, setAllGMembs] = useState([]);
  // const [user_id, setUserId] = useState(initialUserId);
  // const [tripId, setTripId] = useState();

  // console.log("trip_id passed through props", trip_id);
  // console.log(useSelector((state) => state.trips.trip_id));
  // console.log(useSelector((state) => state.trips.user_id));

  // const navigate = useNavigate();

  // the trip_id, this would need to be dispatched to the slice to update it
  // const initialTripId = useSelector((state) => state.trips.trip_id);

  // if (initialTripId !== trip_id) {
  //   let tripId = trip_id;
  // } else {
  // }
  // confirming user_id (if the trip admin)
  // const initialUserId = useSelector((state) => state.trips.user_id);

  // useEffect(() => setTripId(trip_id), [trip_id]);
  console.log(trip_id, "this is my trip id ");
  useEffect(() => {
    async function getSingleTrip() {
      const response = await fetchSingleTrip(trip_id);
      console.log("One trip to rule them all!", response);
    }
    getSingleTrip(trip_id);
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
        await addGroupMember(user_id, trip_id);
        setEmail(email);
        membersingroup();
        console.log("Adding member", response);
      } else {
        alert("User not in system. Try Again.");
      }
    }
    addTraveler();
  }, [trip_id, email]);

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
      {/* <buttton ttype="button" onClick={()=> navigate}> */}
    </>
  );
}

TripAdminPage.propTypes = {
  trip_id: PropTypes.object,
};
// have x out go to userlanding page
//

// step1 get it to show
// step 2 reconfirm with the slice
//

// confirm with if else that trip_id in state is the same as in props, if not we cwould want it to be the one stored in props
// dispatch the one from props in state
