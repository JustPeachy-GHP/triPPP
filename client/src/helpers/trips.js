const BASE_URL = "http://localhost:8081/api/trips";

export async function createTrip(tripobj) {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(tripobj),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log("Your trip was not made");

    throw error;
  }
}

export const fetchSingleTrip = async (trip_id) => {
  try {
    const response = await fetch(`${BASE_URL}/${trip_id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Cannot fetch single trip", error);
  }
};

// delete trip
// delete groupmemb
// update trip
// get trip by id
