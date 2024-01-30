import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../context/authContext"
import Hero from "../components/Hero";
import Description from "../components/Description";


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
            <Description />
            <h1>View Routines</h1>
            <div className="routines">
                {routines.map(routine => (
                    <div className="routine-card" key={routine.id}>
                        <div className="routine">
                            {currentUser ? (
                                <Link className="link" to={`/routine/${routine.id}`}>
                                    <img src={`../upload/${routine.img}` }  alt={routine.title} />
                                    <div className="card-content">
                                        <h2>{routine.title}</h2>
                                    </div>
                                </Link>
                            ) : (
                                <div className="logincard">
                                    <img src={`../upload/${routine.img}`} alt={routine.title} />
                                    <div className="card-content">
                                        Login To View
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home