const BASE_URL = "http://localhost:8080/api/trips";
// ==================Create trip======> tripfor.jsx
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
// ================DeleteTripAdmin======> tripadminpage.jsx
export async function deleteTripAdmin(trip_is) {
  try {
    const response = await fetch(`${BASE_URL}/${trip_id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Deleting trip? is not working", error);
  }
}

// ==============UPDATE TRIP=================

export async function updateTripAdmin(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
// delete group member
// ===========================CHECK IF THIS IS RIGHT
export async function deleteGroupMember(trip_id, user_id) {
  const url = `${BASE_URL}/${trip_id}/users/${user_id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Deleting groupmember is not working", error);
  }
}
export const fetchSingleTrip = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${trip_id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Cannot fetch single trip", error);
  }
};

export const deleteTrip = async (id) => {
  try {
    console.log("..entering delete trip");
    const response = await fetch(`${BASE_URL}/trips/${trip_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Cannot delete trip", error);
  }
};

//
// =====TRIP ADMIN FORM
// delete groupmemb
// get trip by id and members for that trip
