import { useEffect, useState } from "react";
import { fetchAllJournals, deleteJournal } from "../../journals";
import { useNavigate } from "react-router-dom";
import CreateJournalForm from "./CreateJournalForm";
import { useSelector } from "react-redux";

export default function AllJournals() {
  const [journal, setJournal] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // need to EDIT so it fetches all journals of that USERS
  useEffect(() => {
    async function fetchJournals() {
      const response = await fetchAllJournals();
      setJournal(response);
    }
    fetchJournals();
    console.log(journal);
  }, []);

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
      const updatedjournals = await fetchAllJournals();
      setJournal(updatedjournals);
    } catch (error) {
      console.error("trouble deleting journal", error);
    }
  };

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
      {isAuthenticated ? (
        journalsToDisplay.map((journal) => {
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
        })
      ) : (
        <p>Please log in to view journals.</p>
      )}
    </div>
  );
}
