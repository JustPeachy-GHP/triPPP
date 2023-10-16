const BASE_URL = "http://localhost:8081/api/groupmembs";


export async function createNewGroupMemb (newGroupMembObject) {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newGroupMembObject),
        })
        const returnVal = await response.json()
        return returnVal
    } catch (error) {
      return error
    }
  }

  
  
  