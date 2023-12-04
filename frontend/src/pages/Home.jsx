import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

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


    return (
        <div className="home">
            <div className="routines">
                {routines.map(routine => (
                    <div className="routine" key={routine.id}>
                        <div className="img">
                            <img src={`../upload/${routine.img}`} alt="" />
                        </div>
                        <div className="content">
                            <h1>{routine.title}</h1>
                            <p>{routine.desc}</p>
                            <button>
                                <Link className="link" to={`/routine/${routine.id}`}><p>View Routine</p></Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home