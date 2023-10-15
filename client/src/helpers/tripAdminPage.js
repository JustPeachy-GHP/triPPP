const BASE_URL = "http://localhost:8081/api/trips";
const GROUPMEMBS_URL = "http://localhost:8081/api/groupmembs";

// deleteGroupMemb-line 10
// addGroupMemb-line 27
// fetchSingleTrip- line 43
// deleteTrip-line 54
// updateTrip-line 71
// ===================Get Group Members=======
export async function getAllMembersbyId(trip_id) {
  try {
    const response = await fetch(`${GROUPMEMBS_URL}/all/${trip_id}`);
    const returnVal = await response.json();
    return returnVal;
  } catch (error) {
    console.error(error);
  }
}
// ==================DELETE GROUP MEMB==========
export async function deleteGroupMember(user_id, trip_id) {
  // what is the url we should be requesting from?
  const url = `${BASE_URL}/${trip_id}/${user_id}`;
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
export async function addGroupMember(userobj) {
  const url = `${GROUPMEMBS_URL}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userobj),
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Adding groupmember is not working", error);
  }
}

// ==============GET SINGLE TRIP==============
export const fetchSingleTrip = async (trip_id) => {
  try {
    const response = await fetch(`${BASE_URL}/${trip_id}`);
    if (!response.ok) {
      throw new Error("error fetching single trip");
    }
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

// ============CHECK USER ===========

export const fetchSingleUserbyEmail = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/users/email/${email}`);
    if (!response.ok) {
      throw new Error("error fetching single user");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Cannot get get user with that email", error);
  }
};
