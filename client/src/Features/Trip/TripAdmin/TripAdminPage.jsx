import React, { useState, useEffect } from "react";
import {
  fetchSingleTrip,
  fetchSingleUserbyEmail,
  addGroupMember,
  getAllMembersbyId,
  deleteTrip,
} from "../../../helpers/tripAdminPage";
import EachMemb from "./EachMemb";
import { Modal, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function TripAdminPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState(null);
  const [oneTrip, setOneTrip] = useState([]);
  const [allGMembs, setAllGMembs] = useState([]);
  const [groupState, setGroupState] = useState([]);

  const navigate = useNavigate();
  const params = useParams();
  console.log("params trip admin page", params)

  const trip_id = params.trip_id;


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

  // db queries - get own trip info, members in my group
  useEffect(() => {
    async function getSingleTrip(trip_id) {
      try {
        const response = await fetchSingleTrip(trip_id);
        console.log("One trip to rule them all!", response);
        setOneTrip(response);
      } catch (error) {
        console.log(error);
      }
    }
    getSingleTrip(trip_id);

    async function membersingroup(trip_Id) {
      try {
        const response = await getAllMembersbyId(trip_id);
        console.log("All members showing", response);
        setAllGMembs(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    membersingroup(trip_id);
  }, [trip_id]);

  // form and entry handlers

  // ========Adding Traveler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("in handle submit");
    addTraveler(trip_id, email);
    location.reload()
  };

  async function addTraveler(trip_id, email) {
    const response = await fetchSingleUserbyEmail(email);
    console.log(response, "response in adding traveler");

    if (response.user_id !== null) {
      const groupMembObj = {
        user_id: response.user_id,
        trip_id: trip_id,
      };
      try {
        await addGroupMember(groupMembObj);
        console.log("Adding member", response);
        // setEmail(email);
        // membersingroup();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("User not in system. Try Again.");
    }
  }

  // navigate back to userlanding
  const handleClick = () => {
    navigate("/userlanding");
  };

  // delete trip and return to userlanding
  // *** this one needs work still ***
  async function handleDelete() {
    try {
      const response = await deleteTrip(trip_id);
      console.log("handle delete", response);
      navigate("/userlanding");
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
          <h1>{oneTrip.tripname}</h1>
          <br />
          {allGMembs?.map((member) => {
            return (
              <EachMemb
                key={member.user_id}
                email={member.email}
                firstname={member.firstname}
                lastname={member.lastname}
                trip_id={member.trip_id}
                user_id={member.user_id}
                groupState={groupState}
                setGroupState={setGroupState}
              />
            );
          })}

          <form onSubmit={handleSubmit}>
            <label>
              <h2> Add Traveler </h2>
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
          <button onClick={handleClick}>See My Trips</button>
        </Box>
      </Modal>
    </>
  );
}
