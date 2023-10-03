const BASE_URL = "http://localhost:8080/api/trips";
const GROUPMEMBS_URL = "http://localhost:8080/api/groupmembs";

// deleteGroupMemb-line 10
// addGroupMemb-line 27
// fetchSingleTrip- line 43
// deleteTrip-line 54
// updateTrip-line 71
// ==================DELETE GROUP MEMB==========
export async function deleteGroupMember(group_id, user_id) {
  // what is the url we should be requesting from?
  const url = `${GROUPMEMBS_URL}/${group_id}/${user_id}`;
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
// /api/groupmembs/:groupid/:userid for the route

// delete from group membs where groupid=groupid
// ================ADD GROUP MEMB==============
export async function addGroupMember(group_id, user_id) {
  const url = `${GROUPMEMBS_URL}/${group_id}/${user_id}`;
  try {
    const response = await fetch(url, {
      method: "POST",
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
// ==============GET SINGLE TRIP==============
export const fetchSingleTrip = async (trip_id) => {
  try {
    const response = await fetch(`${BASE_URL}/${trip_id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Cannot fetch single trip", error);
  }
};
// ===============DELETE TRIP================
export async function deleteTrip(trip_id) {
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

export async function updateTrip(trip_id, tripData) {
  try {
    const response = await fetch(`${BASE_URL}/${trip_id}`, {
      method: "PUT", // Changed method to PUT for updating
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripData), // Added tripData to JSON.stringify()
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
