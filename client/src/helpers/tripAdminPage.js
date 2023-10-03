const BASE_URL = "http://localhost:8080/api/trips";
const GROUP_URL = "http://localhost:8080/api/groups";

// deleteGroupMemb
// addGroupMemb
// getSingleTrip
// deleteSingleTrip

// do i need to get group members by the trip_id?

export async function deleteGroupMember(trip_id, user_id) {
  // what is the url we should be requesting from?
  const url = `${BASE_URL}/${trip_id}/groupmemb/${user_id}`;
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

export const fetchSingleTrip = async (trip_id) => {
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
    const response = await fetch(`${BASE_URL}/${trip_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Cannot delete trip", error);
  }
};
// ====================DELETING A TRIP MEMBER
// get trip by id. join trip_id with group. access the user_ids of each member
// show users for that particular trip
// do i need to do a join on the server side that i didn't do before?
// what are the parameters?
export async function deleteTripMemb(trip_id, user_id) {
  try {
    console.log("deleting trip member");
    // what is the url for the tripmembers? This definitely isn't right
    const response = await fetch(`${BASE_URL}/${trip_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Cannot delete trip", error);
  }
}
