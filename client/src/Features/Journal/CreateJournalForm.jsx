import { useState, useEffect } from "react";
import { createJournal } from "../../../src/helpers/journals";
import { fetchAllTrips } from "../../../src/helpers/trips";
// import { fetchAllJournalsByUser } from "../../../src/helpers/journals";
import JournalNavbar from "./JournalNavbar";
import "./Journal.css";

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
  const [timestamp, setTimestamp] = useState("");
  const [entry, setEntry] = useState("");
  const [error, setError] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState("");
  // const [trips, setTrips] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedTrip) {
      alert("Please choose a trip before submitting the form.");
      return;
    }

    const API = await createJournal(
      user_id,
      trip_id,
      videocontent,
      image,
      title,
      timestamp,
      entry
    );
    console.log(API);
    // only alert if form is completed
    alert("New journal has been created!");
    if (API.success) {
      console.log("New journal entry: ", API.data.newJournal);

      const newJournal = API.data.newJournal;
      setJournal((journals) => [...journals, newJournal]);

      setVideocontent("");
      setImage("");
      setTitle("");
      setTimestamp("");
      setEntry("");
    } else {
      setError(API.data.newJournal);
      console.log(error);
    }
  }
  // console.log(trips);

  return (
    <>
      <label htmlFor="trip-select">
        Choose a trip you want to write about:
      </label>
      <select
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
          <input
            id="videocontent"
            autoFocus
            placeholder="Insert Video URL"
            value={videocontent}
            onChange={(e) => setVideocontent(e.target.value)}
          />

          <input
            id="image-text"
            placeholder="Insert Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            id="timestamp"
            placeholder="Date and Time"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
          />
          <input
            id="entry-text"
            placeholder="Entry"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}

// import { useState } from "react";
