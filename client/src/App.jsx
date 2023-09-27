import "./App.css";
import { Route, Routes } from "react-router-dom";
import AllJournalEntries from "../Features/Journal/AllJournalEntries";

function App() {
  return (
    <>
      <Routes>
        <Route path="/allJournals" element={<AllJournalEntries />} />
      </Routes>
    </>
  );
}

export default App;
