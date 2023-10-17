import { useState, useEffect } from "react";
import { createJournal } from "../../../src/helpers/journals";
import { fetchAllTrips } from "../../../src/helpers/trips";
// import { fetchAllJournalsByUser } from "../../../src/helpers/journals";
import JournalNavbar from "./JournalNavbar";
import "./Journal.css";
import SuccessMessage from "../Display/SuccessMessage";

export default function CreateJournalForm({
  journal,
  setJournal,
  trip_id,
  user_id,
  trips,
  allTrips,
}) {
  const [videocontent, setVideocontent] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  // const [timestamp, setTimestamp] = useState("");
  const [entry, setEntry] = useState("");
  const [error, setError] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const currentTimestamp = new Date().toISOString();
  // const location_id = 1;
  // const [trips, setTrips] = useState([]);

  const formStyle = {
    backgroundColor: "white",
    color: "black",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "5px",
    margin: "5px",
  };

  const centerContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedTrip) {
      alert("Please choose a trip before submitting the form.");
      return;
    }

    const API = await createJournal(
      user_id,
      // location_id,
      selectedTrip,
      videocontent,
      image,
      title,
      currentTimestamp,
      entry
    );
    console.log(API);
    // only alert if form is completed
    alert("New journal has been created!");
    if (API.success) {
      console.log("New journal entry: ", API.data);

      const newJournal = API.data;
      setJournal((journals) => [...journals, newJournal]);

      setVideocontent("");
      setImage("");
      setTitle("");
      // setTimestamp("");
      setEntry("");
      setSubmissionSuccess(true);
    } else {
      setError(API.data);
      // console.log(API.data);
    }
  }
  // console.log(trips);

  return (
    <>
      <div className="create-journal-form p-4" style={{ marginTop: "100px" }}>
        <label htmlFor="trip-select" className="mb-2">
          Choose a trip you want to write about:
        </label>
        <select
          style={formStyle}
          className="mb-2"
          value={selectedTrip}
          onChange={(event) => setSelectedTrip(event.target.value)}
        >
          <option value="">--Please choose a trip--</option>
          {allTrips.map((trip) => {
            if (trips.includes(trip.trip_id)) {
              return (
                <option key={trip.trip_id} value={trip.trip_id}>
                  {trip.tripname}
                </option>
              );
            } else {
              return null;
            }
          })}
        </select>
        {selectedTrip && (
          <form onSubmit={handleSubmit}>
            <div style={centerContainerStyle}>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <input
                  style={formStyle}
                  id="videocontent"
                  autoFocus
                  placeholder="Insert Video URL"
                  value={videocontent}
                  onChange={(e) => setVideocontent(e.target.value)}
                  className="col-span-1 p-2 border border-gray-300 rounded center-input"
                />

                <input
                  style={formStyle}
                  id="image-text"
                  placeholder="Insert Image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="col-span-1 p-2 border border-gray-300 rounded center-container"
                />
                <input
                  style={formStyle}
                  id="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="col-span-1 p-2 border border-gray-300 rounded center-container"
                />
              </div>
              {/* <input
            id="timestamp"
            placeholder="Date and Time"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
          /> */}

              <textarea
                id="entry-text"
                placeholder="Entry"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded larger-textarea center-container"
              />
            </div>
            <br></br>
            <button
              type="submit"

              // className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        )}
        {submissionSuccess && <SuccessMessage />}
      </div>
    </>
  );
}

// import { useState } from "react";
