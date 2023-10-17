import React from "react";
import { render } from "@testing-library/react";
import AllJournals from "../Features/Journal/AllJournalEntries"; // Update the path

describe("AllJournals component", () => {
  it("renders without errors", () => {
    render(<AllJournals />);
  });
});
