import React, {useState, useEffect, useContext} from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../components/Menu"
import Exercise from "../components/Exercise";
import { useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {AuthContext} from "../context/authContext"

const Single = () => {
    const [routine, setRoutine] = useState({})
    const [isSaved, setIsSaved] = useState(false);
    const [totalWeight, setTotalWeight] = useState(0);

    // get user data from routine
    const location = useLocation()
    const navigate = useNavigate()

    const routineId = location.pathname.split("/")[2]

    const {currentUser} = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get(`/routines/${routineId}`)
                console.log('Response from server:', res.data);
                setRoutine(res.data)
                setTotalWeight(res.data.total_weight || 0)
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

    const handleSave = async () => {
        try {
          if (isSaved) {
            await axios.delete(`/saved/${routineId}`);
          } else {
            await axios.post(`/saved`, { rid: routineId });
          }
          setIsSaved((prevIsSaved) => !prevIsSaved);
          console.log('Routine saved/unsaved');
        } catch (error) {
          console.error('Error saving/unsaving routine:', error);
        }
      };

    return (
        <div className="single">
            <div className="content">
                <h1>{routine.title}</h1>
                <img src={`../upload/${routine.img}`} alt="" />
                <h3>{routine.desc}</h3>
                <div className="user">
                    {routine.userImg && <img src={routine.userImg} alt="" />}
                    <div className="info">
                        <span className="username">{routine.username}</span>
                        <p>Created {moment(routine.date).fromNow()}</p>
                        {currentUser.username === routine.username && (
                            <div className="edit">
                                <Link to={`/write?edit=2`} state={routine}>
                                    <CiEdit />
                                </Link>
                                <CiTrash onClick={handleDelete}/>
                            </div>
                        )}
                        {isSaved ? (
                            <button className="saved" onClick={handleSave}>
                                Unsave Routine
                            </button>
                            ) : (
                            <button className="unsaved" onClick={handleSave}>
                                Save Routine
                            </button>
                        )}
                    </div>
                </div>
                <div className="total-weight">
                    <p>Total Weight: {totalWeight} kg</p>
                </div>
            </div>
            <Exercise className="exercise" rid={routine.id}/>
            <h2>View Other Routines</h2>
            <Menu cat={routine.cat}/>
        </div>
    )
}

export default Single