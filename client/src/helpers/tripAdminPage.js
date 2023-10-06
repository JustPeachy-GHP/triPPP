const BASE_URL = "http://localhost:8081/api/trips";
const GROUP_URL = "http://localhost:8081/api/groups";

// deleteGroupMemb-line 10
// addGroupMemb-line 27
// fetchSingleTrip- line 43
// deleteTrip-line 54
// updateTrip-line 71
// ==================DELETE GROUP MEMB==========
export async function deleteGroupMember(group_id, user_id) {
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
// /api/groupmembs/:groupid/:userid for the route

// delete from group membs where groupid=groupid
// ================ADD GROUP MEMB==============
export async function addGroupMember(trip_id, user_id) {
  const url = `${BASE_URL}/${trip_id}/groupmemb/${user_id}`;
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

export async function updateTrip(username, password) {
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
