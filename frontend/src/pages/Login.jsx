import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="auth">
            <h1>Log In</h1>
            <form>
                <input required type="text" placeholder="Username" />
                <input required type="password" placeholder="Password" />
                <button>Log In</button>
                <p>Error!</p>
                <span>No account? <Link to="/register">Register Here</Link></span>
            </form>
        </div>
    )
}

export default Login