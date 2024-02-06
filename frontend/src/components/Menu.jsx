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
            {routines.map(routine => (
                <>
                <Link className="link" to={`/routine/${routine.id}`}>
                <div className="routine" key={routine.id} style={{ backgroundImage: `url(../upload/${routine.img})` }}>
                    <div className="overlay" />
                    <div className="content">
                        <h1>{routine.title}</h1>
                    </div>
                </div>
                </Link>
                </>
            ))}
        </div>
    )
}

export default Menu;