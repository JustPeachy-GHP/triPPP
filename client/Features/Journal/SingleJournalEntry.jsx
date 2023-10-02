import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchSingleJournal } from "../../src/helpers/journals";
import { Link } from "react-router-dom";
import EditJournalForm from "./EditJournalForm";

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
    <div key={journal.journal_id}>
      <h4>{journal.title}</h4>
      <h4 id="journal">Entry: {journal.entry}</h4> <br />
      <img id="image" src={journal.image} alt={journal.title} /> <br />
      <Link to={`/journals/${params.journal_id}/edit`}>
        <button>Edit</button>
      </Link>
    </div>
  );
}
