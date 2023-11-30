import React from "react";
import logo from "../images/logo.png"
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="links">
                    <Link className="link">
                        <h6>My Routines</h6>
                    </Link>
                    <span>User</span>
                    <span>Logout</span>
                    <span className="write">
                        <Link className="link" to="/write">Write</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Navbar