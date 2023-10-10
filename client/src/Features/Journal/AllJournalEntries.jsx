import { useEffect, useState } from "react";
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

export default function AllJournals() {
  const [journal, setJournal] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const [trips, setTrips] = useState([]);
  const [allTrips, setAllTrips] = useState([]);
  const user_id = useSelector((state) => state.auth.user_id);

  console.log(user_id);

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
      console.log("Response:", response);
      setAllTrips(response);
      console.log(allTrips);
    }
    fetchTrips();
  }, []);

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
  // to SEARCH through journals
  const journalsToDisplay = searchParam
    ? journal.filter(
        (journal) =>
          journal.title.toLowerCase().includes(searchParam) ||
          journal.entry.toLowerCase().includes(searchParam)
      )
    : journal;

  // DELETE journal
  const handleDelete = async (journal_id) => {
    try {
      await deleteJournal(journal_id);
      const updatedjournals = await fetchAllJournalsByUser(user_id);
      setJournal(updatedjournals);
    } catch (error) {
      console.error("trouble deleting journal", error);
    }
  };

  return (
    <div>
      <JournalNavbar />
      <div>
        <label id="search">Search: </label>
        <input
          type="text"
          placeholder="Search for journal"
          onChange={(event) => setSearchParam(event.target.value.toLowerCase())}
        />
      </div>

      {/* if journal.trip_id = number in array then map over */}

      <div>
        {allTrips.map((trip) => {
          if (trips.includes(trip.trip_id)) {
            return (
              <div key={trip.trip_id}>
                <h4>Trip Name: {trip.tripname}</h4>
                <button
                  className="button"
                  onClick={() => {
                    navigate(`/journals/${journal.trip_id}`);
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
    </div>
  );
}

{
  /* <div>
  {journalsToDisplay
    .filter((journal) => trips.includes(journal.trip_id))
    .map((journal) => (
      <div key={journal.journal_id}>
        <h4>Title: {journal.title}</h4>
      </div>
    )}
</div> */
}

{
  /* <div>
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
</div> */
}
