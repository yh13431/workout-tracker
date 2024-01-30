import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import logo from "../images/logo.png"


const Register = () => {

    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:""
    })

    const [err, setError] = useState(null)

    const navigate = useNavigate()

    const handleChange = e => {
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post("/auth/register", inputs)
            navigate("/login")
        } catch(err) {
            setError(err.response.data)
        }
    }

    return (
        <div className="auth">
            <div className="content">
                <img src={logo} alt="logo" />
                <form>
                    <h1>Register</h1>
                    <input required type="text" placeholder="Username" name='username' onChange={handleChange}/>
                    <input required type="email" placeholder="Email" name='email' onChange={handleChange}/>
                    <input required type="password" placeholder="Password" name='password' onChange={handleChange}/>
                    <button onClick={handleSubmit}>Register</button>
                    {err && <p>{err}</p>}
                    <span>Have an account? <Link to="/login">Log In</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Register