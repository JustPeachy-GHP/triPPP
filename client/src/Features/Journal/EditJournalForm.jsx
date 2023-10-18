import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { updateJournal } from "../../../src/helpers/journals";
import { fetchSingleJournal } from "../../../src/helpers/journals";
import JournalNavbar from "./JournalNavbar";
import "./Journal.css";
// import { time } from "console";

export default function EditJournal() {
  const { journal_id } = useParams();

  const [videocontent, setVideocontent] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [entry, setEntry] = useState("");
  const user_id = useSelector((state) => state.auth.user_id);
  //   hard code for now
  // const user_id = 1;
  const trip_id = 1;

  // const navigate = useNavigate();

  useEffect(() => {
    async function getSingleJournal() {
      try {
        const response = await fetchSingleJournal(journal_id);
        console.log(response);
        setVideocontent(response.videocontent);
        setImage(response.image);
        setTitle(response.title);
        setTimestamp(response.timestamp);
        setEntry(response.entry);
      } catch (error) {
        console.error("trouble getting journal to EDIT", error);
      }
    }
    getSingleJournal();
  }, [journal_id]);

  async function handleSubmit(e) {
    // add timestamp???

    const getTimeStamp = () => {
      const date = new Date(Date.now()).toISOString().split(".");
      let timestamp = date[0].replace("T", " ");
      return timestamp;
    };

    const tStamp = getTimeStamp();
    console.log(tStamp);

    e.preventDefault();

    let editJournalObject = {
      journal_id: journal_id,
      user_id: user_id,
      trip_id: trip_id,
      videocontent: videocontent,
      image: image,
      title: title,
      timestamp: timestamp,
      entry: entry,
    };

    console.log("submit", editJournalObject);
    alert("Entry succesfully edited!");

    try {
      console.log("before post", editJournalObject);
      const response = await updateJournal(
        editJournalObject.journal_id,
        editJournalObject
      );
      console.log("posted", response);
      const returnVal = response;
      return returnVal;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <JournalNavbar />
        <h2>Edit Journal</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              id="videocontent"
              autoFocus
              placeholder="Insert Video URL"
              value={videocontent}
              default={videocontent}
              onChange={(e) => setVideocontent(e.target.value)}
            />

            <input
              id="image-text"
              placeholder="Insert Image URL"
              default={image}
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <input
              id="title"
              placeholder="Title"
              default={title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              id="timestamp"
              placeholder="Date and Time"
              default={timestamp}
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
            />
            <input
              id="entry-text"
              placeholder="Entry"
              default={entry}
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
