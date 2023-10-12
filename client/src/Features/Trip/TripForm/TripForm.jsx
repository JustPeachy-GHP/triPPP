// import "./tripform.css";
// import Login from "../Auth/Login";
import { Link } from "react-router-dom";
import { createTrip } from "../../../helpers/trips";
import { useNavigate } from "react-router-dom";


import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";


export default function TripForm() {
  const [trip_id, setTrip_Id] = useState(null);
  const [tripname, settripName] = useState("");
  const [numdays, setNumDays] = useState("");
  const [numtravelers, setNumTravelers] = useState("");
  const [vibeform, setVibeForm] = useState("");
  const navigate = useNavigate();

  //modal stuff here
  const [isOpen, setIsOpen] = useState(true);
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
  //modal stuff ends here


  // hardcoding dummy data for a user_id

  const submitHandler = (e) => {
    e.preventDefault();
    alert("You've submitted your trip!");
    let newTripObject = {
      tripname: tripname,
      numdays: numdays,
      numtravelers: numtravelers,
      vibeform: vibeform,
    };
    console.log("submit data", newTripObject);
    
    
    createNewTrip();
  };
  
  async function createNewTrip(tripObj) {
    const result = await createTrip(tripObj);
    console.log(result);

    return result;
  }

  const handleSubmitClick = async (e) => {
    e.preventDefault();

    let newTripObject = {
      tripname: tripname,
      numdays: numdays,
      numtravelers: numtravelers,
      vibeform: vibeform,
    };
    console.log("submit data", newTripObject);

    const trip = await createNewTrip(newTripObject);
    console.log(trip);
    navigate(`/${trip.trip_id}/locations`);
  }

  return (
    <div>
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>

    <div>
      <form onSubmit={submitHandler}>
        <h1> Let's find out more about your Trippp </h1>
        <h3> Trip Name</h3>
        <input
          placeholder="Trip Name"
          onChange={(e) => settripName(e.target.value)}
          value={tripname}
        />{" "}
        <br />
        <h3> How many people are you traveling with?</h3>
        <input
          type="number"
          placeholder="Number of Travelers"
          onChange={(e) => setNumTravelers(e.target.value)}
          value={numtravelers}
        />{" "}
        <br />
        <h3> How many days do you want to plan for?</h3>
        <input
          type="number"
          placeholder="Number of Days"
          onChange={(e) => setNumDays(e.target.value)}
          value={numdays}
        />{" "}
        <br />
        {/* ====================VIBE QUESTIONS============== */}
        <h3>What's the vibe you're going for?</h3>
        {/* outdoors, chill, party, local, shop*/}
        <fieldset>
          {/* ==============CHILL ============*/}
          <div className="vibe-option">
            <div>
              <input
                type="radio"
                id="chill"
                name="vibe"
                value={vibeform}
                onChange={(e) => setVibeForm(e.target.id)}
              />
              <label htmlFor="chill">
                Chill
                <img
                  id="vibe-img"
                  src="https://tinyurl.com/446u8r4f"
                  alt="woman relaxing on the beach"
                ></img>
              </label>
            </div>
          </div>

          {/* ============OUTDOORS============= */}
          <div className="vibe-option">
            <input
              type="radio"
              id="outdoors"
              name="vibe"
              value={vibeform}
              onChange={(e) => setVibeForm(e.target.id)}
            />
            <label htmlFor="outdoors">
              Outdoors
              <img
                id="vibe-img"
                src="https://tinyurl.com/3f5zeycb"
                alt="couple in mountains"
              ></img>
            </label>
          </div>

          {/* ===========PARTY============= */}
          <div className="vibe-option">
            <input
              type="radio"
              id="party"
              name="vibe"
              value={vibeform}
              onChange={(e) => setVibeForm(e.target.id)}
            />
            <label htmlFor="party">
              Party
              <img
                id="vibe-img"
                src="https://tinyurl.com/4yw8yvbr"
                alt="people partying in a club"
              ></img>
            </label>
          </div>

          {/* ==========LOCAL============ */}
          <div className="vibe-option">
            <input
              type="radio"
              id="local"
              name="vibe"
              value={vibeform}
              onChange={(e) => setVibeForm(e.target.id)}
            />
            <label htmlFor="local">
              Local
              <img
                id="vibe-img"
                src="https://tinyurl.com/5t4sndky"
                alt="man sitting in front of parisian cafe"
              ></img>
            </label>
          </div>
          {/* ==========SHOP============ */}
          <div className="vibe-option">
            <input
              type="radio"
              id="shop"
              name="vibe"
              value={vibeform}
              onChange={(e) => setVibeForm(e.target.id)}
            />
            <label htmlFor="shop">
              Shop{" "}
              <img
                id="vibe-img"
                src=" https://tinyurl.com/5n8mwked"
                alt="woman shopping in a store"
              ></img>
            </label>
          </div>
          <br />
          {/* hook up event listener to  */}
        </fieldset>
        <button type="Submit" onClick={handleSubmitClick}>Submit</button>
      </form>
    </div>
    <br/>
    </Box>
      </Modal>
    </div>
  );
}

// how are we going to pass data up to form.jsx?
