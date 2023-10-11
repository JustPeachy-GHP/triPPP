import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAllJournalsByTrip,
  deleteJournal,
} from "../../../src/helpers/journals";
import { useSelector } from "react-redux";

function JournalEntriesPage() {
  const [journals, setJournals] = useState([]);
  const { trip_id } = useParams();
  const navigate = useNavigate();
  const user_id = useSelector((state) => state.auth.user_id);
  console.log("journals by trip", user_id);
  console.log(trip_id);

  useEffect(() => {
    // Fetch the journal entries for the specific trip using 'tripId'
    async function fetchJournalEntries() {
      try {
        const response = await fetchAllJournalsByTrip(user_id, trip_id);
        setJournals(response);
        console.log(journals);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      }
    }
    fetchJournalEntries();
  }, [user_id, trip_id]);

  // DELETE journal
  const handleDelete = async (journal_id) => {
    try {
      await deleteJournal(journal_id);
      const updatedjournals = await fetchAllJournalsByTrip(user_id, trip_id);
      setJournals(updatedjournals);
    } catch (error) {
      console.error("trouble deleting journal", error);
    }
  };

  return (
    <div className="journal-list">
      {journals.map((journal) => (
        <div key={journal.journal_id} className="journal-card">
          <h3>Date: {journal.timestamp}</h3>
          <h4>Title: {journal.title}</h4>
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
      ))}
    </div>
  );
}

export default JournalEntriesPage;
