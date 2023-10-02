import "./App.css";
import { Route, Routes } from "react-router-dom";
import AllJournalEntries from "../Features/Journal/AllJournalEntries";
import SingleJournalEntry from "../Features/Journal/SingleJournalEntry";
import CreateJournalForm from "../Features/Journal/CreateJournalForm";
import EditJournalForm from "../Features/Journal/EditJournalForm";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route
            path="/journals/:user_id/:trip_id"
            element={<AllJournalEntries />}
          />
          <Route
            path="/journals/:journal_id"
            element={<SingleJournalEntry />}
          />
          <Route path="/journalform" element={<CreateJournalForm />}></Route>
          <Route
            path="/journals/:journal_id/edit"
            element={<EditJournalForm />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
