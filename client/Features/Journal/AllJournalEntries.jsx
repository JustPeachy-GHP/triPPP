import { useEffect, useState } from "react";
import {
  fetchAllJournals,
  deleteJournal,
  fetchAllJournalsByTrip,
  // fetchAllJournalsByLocation,
} from "../../src/helpers/journals";
import { useNavigate } from "react-router-dom";
import CreateJournalForm from "./CreateJournalForm";
import { useParams } from "react-router-dom";

// import { useSelector } from "react-redux";

export default function AllJournals() {
  const [journal, setJournal] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  // user_id ? then they are authenticated
  // OR no user_id show 1 thing else ...
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // console.log(isAuthenticated);
  // const user_id = useSelector((state) => state.auth.user_id);

  // need to EDIT so it fetches all journals of that USERS
  useEffect(() => {
    async function fetchJournals() {
      const response = await fetchAllJournalsByTrip(
        params.user_id,
        params.trip_id
      );
      setJournal(response);
    }
    fetchJournals();
  }, []);

  // useEffect(() => {
  //   async function fetchJournals2() {
  //     const response = await fetchAllJournalsByLocation(
  //       params.user_id,
  //       params.location_id
  //     );
  //     setJournal(response);
  //   }
  //   fetchJournals2();
  // }, []);

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
      const updatedjournals = await fetchAllJournalsByTrip(
        params.user_id,
        params.trip_id
      );
      setJournal(updatedjournals);
    } catch (error) {
      console.error("trouble deleting journal", error);
    }
  };

  // const userJournals = journalsToDisplay.filter(
  //   // check db query under users
  //   (journal) => journal.user_id === user_id
  // );
  // this MAPS over all the journals to show each journal with timestamp, title, entry, image and video
  return (
    <div>
      <div>
        <label id="search">Search: </label>
        <input
          type="text"
          placeholder="Search for journal"
          onChange={(event) => setSearchParam(event.target.value.toLowerCase())}
        />
      </div>
      <div>
        <CreateJournalForm journal={journal} setJournal={setJournal} />
      </div>
      {journalsToDisplay.map((journal) => {
        return (
          <div key={journal.id}>
            <h4 id="journal">Time/Date: {journal.timestamp}</h4>
            <h4 id="journal">Title: {journal.title}</h4>
            {/* <h4 id="journal">Entry: {journal.entry}</h4>
            <img id="image" src={journal.image} alt={journal.title} /> */}
            {/* add video */}
            <div>
              <button
                onClick={() => {
                  navigate(`/journals/${journal.journal_id}`);
                }}
              >
                See Details
              </button>
              <button onClick={() => handleDelete(journal.journal_id)}>
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
