const baseUrl = 'http://localhost:8080/api/users'

export async function getMyGroupAdmin (user_id) {
    try {
        const response = await fetch (`${baseUrl}/utripadmin/${user_id}`)
        const returnVal = response.json()
        return returnVal
    } catch (error) {
        return error
    }
}

export async function getMyMembGroups (user_id) {
    try {
        const response = await fetch (`${baseUrl}/utripmemb/${user_id}`)
        const returnVal = response.json()
        return returnVal
    } catch (error) {
        return error
    }
}

export async function getMyJEntries (user_id) {
    try {
        const response = await fetch (`${baseUrl}/ujournal/${user_id}`)
        const returnVal = response.json()
        return returnVal
    } catch (error) {
        return error
    }
}

