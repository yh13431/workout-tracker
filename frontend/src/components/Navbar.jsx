import React, { useContext } from "react";
import logo from "../images/logo.png"
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {

    const { currentUser, logout } = useContext(AuthContext)

    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="title">
                    <h1>Workout Tracker</h1>
                </div>
                <div className="links">
                    <Link className="link" to="/?cat=shoulders">
                        <h6>Shoulders</h6>
                    </Link>
                    <Link className="link" to="/?cat=arms">
                        <h6>Arms</h6>
                    </Link>
                    <Link className="link" to="/?cat=abs">
                        <h6>Abs</h6>
                    </Link>
                    <Link className="link" to="/?cat=chest">
                        <h6>Chest</h6>
                    </Link>
                    <Link className="link" to="/?cat=back">
                        <h6>Back</h6>
                    </Link>
                    <Link className="link" to="/?cat=legs">
                        <h6>Legs</h6>
                    </Link>
                    <span>{currentUser?.username}</span>
                    {currentUser ? (
                        <span onClick={logout}>Logout</span>
                    ) : (
                        <Link className="link" to="/login">Login</Link>
                    )}
                    <span className="write">
                        <Link className="link" to="/write">Write</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Navbar