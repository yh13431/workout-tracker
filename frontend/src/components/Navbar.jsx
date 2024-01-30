import React, { useState, useContext, useEffect, useRef } from "react";
import logo from "../images/logo.png"
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext)
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    const handleDropdownToggle = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const closeDropdown = (event) => {
          setDropdownVisible(false);
    }

    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };
      
        document.addEventListener("click", handleDocumentClick);
      
        return () => {
        document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    return (
        <div className="navbar">
            <div className="container">
                <div className="header">
                    <div className="logo">
                        <Link className="link" to="/">
                            <img src={logo} alt="logo" />
                            <h2>Workout Tracker</h2>
                        </Link>
                    </div>
                </div>
                <div className="body" ref={dropdownRef}>
                    <div className="write">
                        <Link className="link" to="/write">
                            <button>
                                Add Routine
                            </button>
                        </Link>
                    </div>
                    <button className="dropdown-toggle" onClick={handleDropdownToggle}>
                        ☰
                    </button>
                        <div className={`dropdown-menu ${dropdownVisible ? 'visible' : ''}`}>      
                            <div className="categories">
                                <Link className="link" to="/?cat=shoulders">
                                    <h6>Shoulders</h6>
                                </Link>
                                <Link className="link" to="/?cat=shoulders">
                                    <h6>Arms</h6>
                                </Link>                    
                                <Link className="link" to="/?cat=shoulders">
                                    <h6>Core</h6>
                                </Link>                          
                                <Link className="link" to="/?cat=shoulders">
                                    <h6>Chest</h6>
                                </Link>                      
                                <Link className="link" to="/?cat=shoulders">
                                    <h6>Back</h6>
                                </Link>                     
                                <Link className="link" to="/?cat=shoulders">
                                    <h6>Legs</h6>
                                </Link>       
                            </div>
                            <div className="log">
                                {currentUser ? (
                                    <button onClick={logout}>Log Out</button >
                                ) : (
                                    <Link className="link" to="/login">
                                        <button>
                                            Login or Register
                                        </button>    
                                    </Link>
                                )}
                            </div>  
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Navbar