import "./App.css";
import { Route, Routes } from "react-router-dom";
import AllJournalEntries from "../Features/Journal/AllJournalEntries";
import SingleJournalEntry from "../Features/Journal/SingleJournalEntry";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/allJournals" element={<AllJournalEntries />} />
          <Route
            path="/journals/:journal_id"
            element={<SingleJournalEntry />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
