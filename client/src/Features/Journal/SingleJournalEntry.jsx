import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  fetchSingleJournal,
  deleteJournal,
} from "../../../src/helpers/journals";
import { Link } from "react-router-dom";
import EditJournalForm from "./EditJournalForm";
import JournalNavbar from "./JournalNavbar";
import "./Journal.css";

export default function SingleJournal() {
  const params = useParams();
  const [journal, setJournal] = useState({});

  async function getSingleJournal() {
    try {
      setJournal(await fetchSingleJournal(params.journal_id));
    } catch (error) {
      console.log("trouble getting single journal", error);
    }
  }

  useEffect(() => {
    getSingleJournal();
  }, []);

  // DELETE journal
  const handleDelete = async (journal_id) => {
    try {
      const response = await deleteJournal(journal_id);
      console.log(response);
    } catch (error) {
      console.error("Trouble deleting journal", error);
    }
  };

  return (
    <div
      className="single-journal-container font-montserrat"
      key={journal.journal_id}
      style={{ marginTop: "100px" }}
    >
      <JournalNavbar />
      <div className="journal-card text-center p-4">
        <h4 className="journal-title font-montserrat">{journal.title}</h4>
        <p className="journal-entry font-montserrat">Entry: {journal.entry}</p>
        <div className="image-container">
          <img
            className="mx-auto my-4 max-w-full h-auto"
            src={journal.image}
            alt={journal.title}
          />
        </div>
        <div className="text-center">
          <Link to={`/journals/${params.journal_id}/edit`}>
            <button className="edit-button my-2">Edit</button>
          </Link>
          <div className="button-space"></div>
          <button
            className="button my-2 mx-2"
            onClick={() => handleDelete(journal.journal_id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
