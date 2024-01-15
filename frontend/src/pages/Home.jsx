import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../context/authContext"
import Hero from "../components/Hero";

const Home = () => {
    const [routines, setRoutines] = useState([])

    // send routine to its category
    const cat = useLocation().search

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get(`/routines${cat}`)
                setRoutines(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
    }, [cat])    
    const { currentUser } = useContext(AuthContext)


    return (
        <div className="home">
            <Hero />
            <div className="routines">
                {routines.map(routine => (
                    <div className="routine" key={routine.id} style={{ backgroundImage: `url(../upload/${routine.img})` }}>
                        {currentUser ? (
                            <Link className="link" to={`/routine/${routine.id}`}>
                                <div className="overlay" />
                                <div className="content">
                                    <h1>{routine.title}</h1>
                                </div>
                            </Link>
                        ) : (
                            <div className="content">
                                <h1>Log In to View Routine</h1>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home