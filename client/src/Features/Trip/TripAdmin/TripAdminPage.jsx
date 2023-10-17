import React, { useState, useEffect } from "react";
import {
  fetchSingleTrip,
  fetchSingleUserbyEmail,
  addGroupMember,
  getAllMembersbyId,
} from "../../../helpers/tripAdminPage";
import EachMemb from "./EachMemb";
import { Modal, Box } from "@mui/material";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function TripAdminPage() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/userlanding");
  };
  useEffect(() => {
    setIsOpen(true);
  }, []);
  const closeModal = () => {
    setIsOpen(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "scroll",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [email, setEmail] = useState(null);
  const [oneTrip, setoneTrip] = useState([]);
  const [trip_id, setTripId] = useState(1);
  const [allGMembs, setAllGMembs] = useState([]);
  // useEffect(() => setTripId(trip_id), [trip_id]);
  // console.log(trip_id, "this is my trip id ");
  useEffect(() => {
    async function getSingleTrip(trip_id) {
      const response = await fetchSingleTrip();
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
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <h1>{oneTrip.tripname}</h1> */}
          <h1>European Adventure </h1>
          <br />
          {console.log(allGMembs, "mapmapmap")}
          {allGMembs?.map((member) => {
            return (
              //  groupmembs.trip_id, groupmembs.group_id, users.email, users.firstname, users.lastname
              <EachMemb
                key={member}
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
          <button onClick={() => handleDelete(trip_id)}>
            Delete Trip
          </button>
          <button onClick={handleClick}>See My Trips</button>
        </Box>
      </Modal>
    </>
  );
}
