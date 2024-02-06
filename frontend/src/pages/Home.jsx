import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../context/authContext"
import Hero from "../components/Hero";
import Description from "../components/Description";


const Home = () => {
    const [routines, setRoutines] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const cat = useLocation().search
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get(`/routines${cat}`, {
                    params: { search: searchQuery }
                })
                setRoutines(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
    }, [cat, searchQuery])    


    return (
        <div className="home">
            <Hero />
            <Description />
            <h1>View Routines</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search routines"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
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
                                        <h2>{routine.title}</h2>
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