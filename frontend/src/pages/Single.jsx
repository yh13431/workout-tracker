import React, {useState, useEffect, useContext} from "react";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../components/Menu"
import Exercise from "../components/Exercise";
import { useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {AuthContext} from "../context/authContext"

const Single = () => {

    const [routine, setRoutine] = useState({})

    // get user data from routine
    const location = useLocation()
    const navigate = useNavigate()

    const routineId = location.pathname.split("/")[2]

    const {currentUser} = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get(`/routines/${routineId}`)
                setRoutine(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
    }, [routineId])


    const handleDelete = async() => {
        try {
            await axios.delete(`/routines/${routineId}`)
            navigate("/")
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="single">
            <div className="content">
                <img src={`../upload/${routine.img}`} alt="" />
                <div className="user">
                    {routine.userImg && <img src={routine.userImg} alt="" />}
                    <div className="info">
                        <span>{routine.username}</span>
                        <p>Created {moment(routine.date).fromNow()}</p>
                    </div>
                    {currentUser.username === routine.username && (
                        <div className="edit">
                            <Link to={`/write?edit=2`} state={routine}>
                                <CiEdit />
                            </Link>
                            <CiTrash onClick={handleDelete}/>
                        </div>
                    )}
                </div>
                <h1>{routine.title}</h1>
                <p>{routine.desc}</p>
            </div>
            <Exercise className="exercise" rid={routine.id}/>
            <Menu cat={routine.cat}/>
        </div>
    )
}

export default Single