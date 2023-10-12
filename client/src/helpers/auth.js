const baseUrl = 'http://localhost:8080/api/users'

export async function postNewUser(newUserObj) {
    try {
        console.log("in postNewUser")
        // remove empty keys that will cause postgresql to choke
        // not needed for new user unless we want to add optional fields
        // Object.keys(newUserObj).forEach(
        //     (key) => (newUserObj[key] === null || newUserObj[key] === '') && delete newUserObj[key])
        const response = await fetch(`${baseUrl}/register`, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserObj)
        })
        const returnVal = response.json()    
        console.log("response from client helper: ", response)

        if (response.status === 200) {
            console.log("helper loginUser return", returnVal)
            console.log("helper status", response.status)
        }

        return returnVal

    } catch (error) {
        console.log(error)
        return error
    }
}


export async function loginUser(loginObj) {
    try {
        console.log("in loginUser", loginObj)
        const response = await fetch(`${baseUrl}/login`, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginObj)
        })

        const returnVal = response.json()
        console.log("response status in client helper", response)

        if (response.status === 500) {
            const message = "Oops"
            console.log("message", message)
            return message
        } else if (response.status === 200) {
            console.log("helper loginUser return", returnVal)
            console.log("helper status", response.status)
            return returnVal
        }

    } catch (error) {
        console.log(error)
        return error
    } 
}