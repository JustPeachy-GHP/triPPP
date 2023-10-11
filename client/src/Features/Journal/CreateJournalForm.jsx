
import { useState } from "react";
import { createJournal } from "../../helpers/journals";
import JournalNavbar from "./JournalNavbar";
import "./Journal.css";

export default function CreateJournalForm({ journal, setJournal }) {
  const [videocontent, setVideocontent] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [entry, setEntry] = useState("");
  const [error, setError] = useState(null);
  // had to hard code for now
  const user_id = 1;
  const trip_id = 1;

  async function handleSubmit(e) {
    e.preventDefault();
    const API = await createJournal(
      user_id,
      trip_id,
      videocontent,
      image,
      title,
      timestamp,
      entry
    );
    console.log(API);
    // only alert if form is completed
    alert("New journal has been created!");
    if (API.success) {
      console.log("New journal entry: ", API.data.newJournal);

      const newJournal = API.data.newJournal;
      setJournal((journals) => [...journals, newJournal]);

      setVideocontent("");
      setImage("");
      setTitle("");
      setTimestamp("");
      setEntry("");
    } else {
      setError(API.data.newJournal);
      console.log(error);
    }
  }

  return (
    <>
      <JournalNavbar />
      <form onSubmit={handleSubmit}>
        <input
          id="videocontent"
          autoFocus
          placeholder="Insert Video URL"
          value={videocontent}
          onChange={(e) => setVideocontent(e.target.value)}
        />

        <input
          id="image-text"
          placeholder="Insert Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          id="timestamp"
          placeholder="Date and Time"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
        />
        <input
          id="entry-text"
          placeholder="Entry"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

// import { useState } from "react";

