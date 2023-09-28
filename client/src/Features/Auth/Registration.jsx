import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { postNewUser } from '../../helpers/auth'
import { login } from '../../slices/authSlice'

export default function Registration({setToken, setActiveUser}) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const values = useSelector((state) => state.auth)
    console.log(values)

    function handleClick () {
        navigate("/login")
      }

      async function handleSubmit(e) {
        e.preventDefault()

        let newUserObject = {
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname
        }
    
        console.log("submit data", newUserObject)

        try {
            const response = await postNewUser(newUserObject)
            console.log("user created", response.user.user_id)
            console.log("token created", response.token)
            // setToken(response.token)
            // setActiveUser(response.user.user_id)
            dispatch(login({
                email: email,
                token: response.token,
                user_id: response.user.user_id,
                firstname: response.user.firstname,
            }))
            return response
        } catch (error) {
            console.log(error)
        }
      }
      console.log("selector has: ", values)
    return (
    <>
    <div className="displaytop">
        <h2>Register</h2>
        <div className="loginform">
            <form onSubmit={handleSubmit} >
             <label>
            Username: <input required value={email} onChange={(e) => setEmail(e.target.value)} />
            </label><br/>
            <label>
            Password: <input required value={password} onChange={(e) => setPassword(e.target.value)} />
            </label><br/>
            <label>
            First Name: <input value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            </label><br/>
            <label>
            Last Name: <input required value={lastname} onChange={(e) => setLastname(e.target.value)} />
            </label><br/>
                <div>
                <button>Submit</button>
                </div>
            </form>
             <div>
                <h2>Already registered?</h2>
                <button className="login" onClick={handleClick}>Back to Login</button>
            </div>
        </div>
    </div>
    </>
    )
} 