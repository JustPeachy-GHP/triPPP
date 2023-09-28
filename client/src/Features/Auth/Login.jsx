import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../helpers/auth'
import { login } from '../../slices/authSlice'

// export default function Login({ token, setActiveUser, setToken}){
export default function Login(){

    // const [userId, setUserId] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [firstname, setFirstname] = useState("")
    // const [token, setToken] = useState(false)
    const [tried, setTried] = useState(0)
    const [content, setContent] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const values = useSelector((state) => state.auth)
    console.log(values)
    
    function handleClick () {
        navigate("/register")
      }

    async function handleSubmit(e){
        e.preventDefault()

        let loginObj = {
            email: email,
            password: password
        }

        console.log("submit data login", loginObj)

        try {

            let attempts = tried + 1
            setTried(attempts)
            console.log(tried)
 
            const response = await loginUser(loginObj)
            console.log("Login response", response)
            
            if (!response.token) {
                setContent("Something went wrong! Do you need to register?")
            } else { 

            // setToken(response.token)
            // setUserId(response.user.user_id)
            // setFirstname(response.user.firstname)
            // response.token && navigate("/userpage")

            dispatch(login({
                email: email,
                token: response.token,
                user_id: response.user.user_id,
                firstname: response.user.firstname,
                }))
            }

            return content

        } catch (error) {
            console.log(error)
        }
    }
    console.log("selector has: ", values)
    return (

        <div className="loginform">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit} >
        <label>
            Username: <input id="username" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
        </label><br/>
        <label>
            Password: <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label><br/>
        <div>
            <button>Submit</button>
        </div>
        </form>

        <div>
        <p>{content}</p>
        </div>

        <div>
            <button className="register" onClick={handleClick}>Register</button>
        </div>
        </div>
    )
}