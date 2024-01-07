import React, { useContext } from "react";
import logo from "../images/logo.png"
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {

    const { currentUser, logout } = useContext(AuthContext)

    return (
        <div className="navbar">
            <div className="container">
                <div className="header">
                        <div className="logo">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="title">
                            <h1>Workout Tracker</h1>
                        </div>
                </div>
                <div className="username">
                    <span>{currentUser?.username}</span>
                </div>
                <span className="write">
                        {currentUser ? (
                            <Link className="link" to="/write">Write</Link>
                        ) : (
                            <div></div>
                        )}
                </span>
                <div className="home">
                    <Link className="link" to="/">
                        <span>Home</span>
                    </Link>
                </div>
                <div className="links">
                    <div className="dropdown">
                        <span className="link">Categories</span>
                        <div className="dropdown-content">
                            <Link className="link" to="/?cat=shoulders">
                                <h6>Shoulders</h6>
                            </Link>
                            <Link className="link" to="/?cat=arms">
                                <h6>Arms</h6>
                            </Link>
                            <Link className="link" to="/?cat=core">
                                <h6>Core</h6>
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
                        </div>
                    </div>
                    {currentUser ? (
                        <span onClick={logout}>Log Out</span>
                    ) : (
                        <span>
                            <Link className="link" to="/login">Log In</Link>
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar