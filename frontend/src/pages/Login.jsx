import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const Login = () => {

    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:""
    })

    const [err, setError] = useState(null)

    const navigate = useNavigate()

    const {login} = useContext(AuthContext)

    const handleChange = e => {
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            login(inputs)
            await axios.post("/auth/login", inputs)
            navigate("/")
        } catch(err) {
            setError(err.response.data)
        }
    }
    return (
        <div className="auth">
            <h1>Log In</h1>
            <form>
                <input required type="text" placeholder="Username" name="username" onChange={handleChange}/>
                <input required type="password" placeholder="Password" name="password" onChange={handleChange}/>
                <button onClick={handleSubmit}>Log In</button>
                {err && <p>{err}</p>}
                <span>No account? <Link to="/register">Register Here</Link></span>
            </form>
        </div>
    )
}

export default Login