import React, { useEffect, useState, useRef } from "react";
import {
  deleteJournal,
  fetchAllJournalsByUser,
  fetchAllJournalsByTrip,
} from "../../../src/helpers/journals";
import { fetchAllTrips } from "../../../src/helpers/trips";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import JournalNavbar from "./JournalNavbar";
import "./Journal.css";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";


export default function AllJournals() {
  const [journal, setJournal] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();
  const searchTripNameRef = useRef("");
  const [trips, setTrips] = useState([]);
  const [allTrips, setAllTrips] = useState([]);
  const user_id = useSelector((state) => state.auth.user_id);


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


  useEffect(() => {
    async function fetchJournals() {
      try {
        const response = await fetchAllJournalsByUser(user_id);
        console.log("Response:", response);

        setJournal(response);
        const tripIds = response.map((journal) => journal.trip_id);
        const uniqueTripIds = [...new Set(tripIds)];

        setTrips(uniqueTripIds);
      } catch (error) {
        console.error("Error fetching journals by user:", error);
      }
    }
    if (user_id) {
      fetchJournals();
    }
  }, [user_id]);

  useEffect(() => {
    async function fetchTrips() {
      const response = await fetchAllTrips();
      // console.log("Response:", response);
      setAllTrips(response);
      // console.log(allTrips);
    }
    fetchTrips();
  }, []);

  const searchHandler = () => {
    setSearchParam(searchTripNameRef.current.value.toLowerCase());
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="modal-content">
    <div>
      <JournalNavbar />
      <div>
        <label id="search">Search Trip Name: </label>
        <input
          type="text"
          placeholder="Search for trip name"
          ref={searchTripNameRef}
        />
        <button className="button" onClick={searchHandler}>
          Search
        </button>
      </div>

      {/* if journal.trip_id = number in array then map over */}


      <div>
        {allTrips.map((trip) => {
          if (
            trips.includes(trip.trip_id) &&
            (!searchParam || trip.tripname.toLowerCase().includes(searchParam))
          ) {
            return (
              <div key={trip.trip_id}>
                <h4>Trip Name: {trip.tripname}</h4>
                <button
                  className="button"
                  onClick={() => {
                    navigate(`/journals/trip/${trip.trip_id}`);
                  }}
                >
                  See Journal Entries
                </button>
              </div>
            );
          }
          return null;
        })}
      </div>

            <div>
              <button
                className="button"
                onClick={() => {
                  navigate(`/journals/${journal.journal_id}`);
                }}
              >
                See Details
              </button>
              <button
                className="button"
                onClick={() => handleDelete(journal.journal_id)}
              >
                Delete
              </button>
            </div>
          </div>
          <br />
          </div>
        </Box>
      </Modal>
    </div>
        );
      }


// function getCoordinatesForJournal(journalId, journals, trips, locations) {
//   // Find the journal entry with the given journal_id
//   const journalEntry = journals.find((journal) => journal.journal_id === journalId);
//   if (!journalEntry) {
//     return "Journal entry not found";
//   }
//   // Find the trip with the matching trip_id
//   const trip = trips.find((trip) => trip.trip_id === journalEntry.trip_id);
//   if (!trip) {
//     return "Trip not found";
//   }
//   // Find the location with the matching location_id
//   const location = locations.find((location) => location.location_id === trip.location_id);
//   if (!location) {
//     return "Location not found";
//   }
//   // Extract and return the coordinates from the location
//   const coordinates = location.coord;
//   return coordinates;
// }








