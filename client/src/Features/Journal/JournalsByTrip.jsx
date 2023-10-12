import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllJournalsByTrip } from "../../../src/helpers/journals";
import { useSelector } from "react-redux";

function JournalEntriesPage() {
  const [journals, setJournals] = useState([]);
  const { trip_id } = useParams();
  const navigate = useNavigate();
  const user_id = useSelector((state) => state.auth.user_id);
  console.log("journals by trip", user_id);
  console.log(trip_id);

  const fetchJournalEntries = async () => {
    try {
      const response = await fetchAllJournalsByTrip(user_id, trip_id);
      setJournals(response);
      console.log(journals);
    } catch (error) {
      console.error("Error fetching journal entries:", error);
    }
  };
  useEffect(() => {
    fetchJournalEntries();
  }, [user_id, trip_id]);

  return (
    <div className="journal-list">
      {journals.length === 0 ? (
        <div className="journal-card">
          <p>No journal entries found for this trip.</p>
        </div>
      ) : (
        journals.map((journal) => (
          <div key={journal.journal_id} className="journal-card">
            <h3>Date: {journal.timestamp}</h3>
            <h4>Title: {journal.title}</h4>
            <button
              className="button"
              onClick={() => {
                navigate(`/journals/${journal.journal_id}`);
              }}
            >
              See Entry
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default JournalEntriesPage;
