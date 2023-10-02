// const baseUrl = "http://localhost:8080/api";
const journalUrl = "http://localhost:8080/api/journals";

export async function fetchAllJournals() {
  try {
    const response = await fetch(`${journalUrl}/`);
    const returnVal = await response.json();
    return returnVal;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function fetchAllJournalsByTrip(user_id, trip_id) {
  try {
    const response = await fetch(`${journalUrl}/${user_id}/${trip_id}`);
    const returnVal = await response.json();
    return returnVal;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// fetch single journal entry
export async function fetchSingleJournal(journal_id) {
  try {
    const response = await fetch(`${journalUrl}/${journal_id}`);
    const result = await response.json();
    const singleJournal = result;
    console.log(singleJournal);
    return singleJournal;
  } catch (error) {
    console.error("trouble fetching single journal entry", error);
  }
}

// delete single journal entry
export async function deleteJournal(journal_id) {
  try {
    const response = await fetch(`${journalUrl}/${journal_id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("trouble deleting journal entry", error);
  }
}

// make a journal entry
export async function createJournal(
  user_id,
  trip_id,
  videocontent,
  image,
  title,
  timestamp,
  entry
) {
  try {
    const response = await fetch(`${journalUrl}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        trip_id,
        videocontent,
        image,
        title,
        timestamp,
        entry,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("trouble creating journal entry", error);
  }
}

export async function updateJournal(journal_id, journal) {
  try {
    const response = await fetch(`${journalUrl}/${journal_id}/edit`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(journal),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("trouble updating song", error);
  }
}
