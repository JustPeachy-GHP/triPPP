import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllJournalsByTrip } from "../../../src/helpers/journals";
import { useSelector } from "react-redux";

function JournalEntriesPage() {
  const [journals, setJournals] = useState([]);
  const { trip_id } = useParams();
  const navigate = useNavigate();
  const user_id = useSelector((state) => state.auth.user_id);
  // console.log("journals by trip", user_id);
  // console.log(trip_id);

  const formatTimestamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(timestamp).toLocaleString(undefined, options);
  };

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
            <div className="mb-4 p-4 border rounded shadow-md">
              <h3 className="text-xl font-semibold">
                Date: {formatTimestamp(journal.timestamp)}
              </h3>
              <h4 className="text-lg">Title: {journal.title}</h4>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={() => {
                  navigate(`/journals/${journal.journal_id}`);
                }}
              >
                See Entry
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default JournalEntriesPage;
