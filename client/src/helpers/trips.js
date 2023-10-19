const BASE_URL = "https://peachypits.onrender.com/api/trips";

export async function fetchAllTrips() {
  try {
    const response = await fetch(`${BASE_URL}`);
    const returnVal = await response.json();
    return returnVal;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function createTrip(tripobj) {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: tripobj,
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
    console.log("Fetching trip: ", trip_id);
    const response = await fetch(`${BASE_URL}/${trip_id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Cannot fetch single trip", error);
  }
};

export async function editIsDecidedTrip(trip_id, trip) {
  try {
    console.log("in client helper, trip:", trip)
    const response = await fetch(`${BASE_URL}/decided/${trip_id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(trip),
    });
    const result = await response.json();
    console.log("decided trip client helper", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateTrip(trip_id, updated_trip) {
  try {
    console.log("in client helper, trip:", updated_trip)
    const response = await fetch(`${BASE_URL}/${trip_id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updated_trip),
    });
    const result = await response.json();
    console.log("updated trip client helper", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getExtTripData (trip_id) {
  try {
    console.log("in getExtTripData", trip_id)
      const response = await fetch (`${BASE_URL}/exttripdata/${trip_id}`)
      const returnVal = await response.json()
      return returnVal
  } catch (error) {
      return error
  }
}

// delete trip
// delete groupmemb
// update trip
// get trip by id
