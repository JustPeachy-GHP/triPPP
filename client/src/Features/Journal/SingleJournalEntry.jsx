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
    <div className="single-journal-container" key={journal.journal_id}>
      <JournalNavbar />
      <div className="journal-card">
        <h4 className="journal-title">{journal.title}</h4>
        <p className="journal-entry">Entry: {journal.entry}</p> <br />
        <img
          className="journal-image"
          src={journal.image}
          alt={journal.title}
        />{" "}
        <br />
        <Link to={`/journals/${params.journal_id}/edit`}>
          <button className="edit-button">Edit</button>
        </Link>
      </div>
      <button
        className="button"
        onClick={() => handleDelete(journal.journal_id)}
      >
        Delete
      </button>
    </div>
  );
}
