import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Menu = ({cat}) => {
    const [routines, setRoutines] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get(`/routines/?cat=${cat}`)
                setRoutines(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
    }, [cat])


    return (
        <div className="menu">
            <h1>Other Routines</h1>
            {routines.map(routine => (
                <div className="routine" key={routine.id}>
                    <img src={`../upload/${routine.img}`} alt="" />
                    <h2>{routine.title}</h2>
                    <button>
                        <Link className="link" to={`/routine/${routine.id}`}><p>View Routine</p></Link>
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Menu;