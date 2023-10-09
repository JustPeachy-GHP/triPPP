import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchSingleJournal } from "../../../src/helpers/journals";
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

  return (
    <div
      className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
      key={journal.journal_id}
    >
      <JournalNavbar />
      <h4>{journal.title}</h4>
      <h4 className="text-slate-500">Entry: {journal.entry}</h4> <br />
      <img id="image" src={journal.image} alt={journal.title} /> <br />
      <Link to={`/journals/${params.journal_id}/edit`}>
        <button className="button">Edit</button>
      </Link>
    </div>
  );
}
