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

            if (!response.token) {
                setContent("Something went wrong!")
            } else {
            dispatch(login({
                email: email,
                token: response.token,
                user_id: response.user.user_id,
                firstname: response.user.firstname,
            }))
        }
            response.token && navigate("/userlanding")
            return response
        } catch (error) {
            console.log(error)
        }
      }
      console.log("selector has: ", values)
    return (
    <>
    <div className="displaytop">
        <div className="loginform">
        <h2>Register</h2>
            <form onSubmit={handleSubmit} >
             <label>
            Username: <input required value={email} onChange={(e) => setEmail(e.target.value)} />
            </label><br/>
            <label>
            Password: <input required value={password} onChange={(e) => setPassword(e.target.value)} />
            </label><br/>
            <label>
            First Name: <input required value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            </label><br/>
            <label>
            Last Name: <input required value={lastname} onChange={(e) => setLastname(e.target.value)} />
            </label><br/>
                <div>
                <button disabled = { 
                    email.length < 1 || 
                    password.length < 1 || 
                    firstname < 1 || 
                    lastname < 1 }>
                        Submit
                </button>
                </div>
            </form>
             <div>
                <h3>Already registered?</h3>
                <button className="registerbutton" onClick={handleClick}>Back to Login</button>
            </div>
        </div>
    </div>
    </>
    )
} 