import { createTrip } from "../../../helpers/trips";
import { createNewGroupMemb } from "../../../helpers/groupmembs";
import { useNavigate } from "react-router-dom";
import shopping from "../../../Assets/shopping.jpeg";
import { useSelector } from "react-redux";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export default function TripForm() {
  const [tripname, settripName] = useState("");
  const [numdays, setNumDays] = useState("");
  const [numtravelers, setNumTravelers] = useState("");
  const [vibeform, setVibeForm] = useState("");
  const navigate = useNavigate();

  // Modal stuff here
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
  // Modal stuff ends here

  const user_id = useSelector((state) => state.auth.user_id);

  console.log("my user id", user_id);

  const submitHandler = (e) => {
    e.preventDefault();
    alert("You've submitted your trip!");
    const newTripObject = {
      tripname: tripname,
      numdays: numdays,
      numtravelers: numtravelers,
      vibeform: vibeform,
      user_id: user_id,
    };
    console.log("submit data", newTripObject);

    handleSubmitClick(newTripObject);
  };

  async function createNewTrip(tripObj) {
    const result = await createTrip(tripObj);
    console.log(result);
    return result;
  }

  const handleSubmitClick = async (newTripObject) => {
    const trip = await createNewTrip(newTripObject);
    console.log(trip);

    const newGroupMembObject = {
      trip_id: trip.trip_id,
      user_id: user_id,
    };

    console.log("new group member", newGroupMembObject);
    const memb = await createNewGroupMemb(newGroupMembObject);
    console.log("memb after submit", memb);

    navigate(`/trips/${trip.trip_id}/locations`, { replace: true });
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="scrollable-content">
          <div>
            <form onSubmit={submitHandler}>
              <h1> Let's find out more about your Trip</h1>
              <h3> Trip Name</h3>
              <input
                placeholder="Trip Name"
                onChange={(e) => settripName(e.target.value)}
                value={tripname}
                required
              />{" "}
              <br />
              <h3> How many people are in your party?</h3>
              <input
                type="number"
                min="1"
                onInput="validity.valid||(value='');"
                onKeyPress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                placeholder="Number of Travelers"
                onChange={(e) => setNumTravelers(e.target.value)}
                value={numtravelers}
                required
              />{" "}
              <br />
              <h3> How many days do you want to plan for?</h3>
              <input
                type="number"
                min="1"
                onInput="validity.valid||(value='');"
                onKeyPress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                placeholder="Number of Days"
                onChange={(e) => setNumDays(e.target.value)}
                value={numdays}
                required
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
                    Local Culture
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
                    Shop
                    <img
                      id="vibe-img"
                      src={shopping}
                      alt="woman shopping"
                    ></img>
                  </label>
                </div>
                <br />
                {/* hook up event listener to  */}
              </fieldset>
              <button type="Submit" onClick={handleSubmitClick}>
                Submit
              </button>
            </form>
          </div>
          <br />
        </Box>
      </Modal>
    </div>
  );
}
