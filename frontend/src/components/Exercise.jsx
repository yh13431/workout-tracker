import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import {AuthContext} from "../context/authContext"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";


const Exercise = ({rid}) => {
    const [etitle, setETitle] = useState("")
    const [edesc, setEDesc] = useState(null)
    const [sets, setSets] = useState("")
    const [reps, setReps] = useState("")
    const [weight, setWeight] = useState("")
    const [eimg, setEImg] = useState(null)

    const queryClient = useQueryClient()

    const makeRequest = axios.create({
        baseURL: "http://localhost:3001/api/",
        withCredentials: true,
    })


    const { isLoading, error, data } = useQuery({
        queryKey: ["exercises", { rid }], 
        queryFn:  () =>
        makeRequest.get("/exercises?rid= " + rid)
            .then((res) => {
                return res.data
        })
    });

    
    const mutation = useMutation({
        mutationFn: (newExercise) => {
            return makeRequest.post("/exercises", newExercise)
        },
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['exercises'] })
        },
        
    })
    

    const handleClick = async(e) => {
        e.preventDefault()
        mutation.mutate({ etitle, edesc, sets, reps, weight, eimg, rid })
        setETitle("")
        setEDesc(null)
        setSets("")
        setReps("")
        setWeight("")
        setEImg(null)
        }

    // hide add exercise button if incorrect user
    const { currentUser } = useContext(AuthContext)
    const [routine, setRoutine] = useState({})

 
    const location = useLocation()
    const routineId = location.pathname.split("/")[2]

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


    return (
        <div className="exercises">
                {currentUser.username === routine.username && (
                <div className="write">
                    <h2>Add Exercise</h2>
                    <input type="text" placeholder="Name" value={etitle} onChange={e => setETitle(e.target.value)} />
                    <input type="text" value={edesc} placeholder="Description" onChange={e => setEDesc(e.target.value)}/>
                    <input type="number" value={sets} placeholder="Sets" min="0" onChange={e => setSets(e.target.value)}/>
                    <input type="number" value={reps} placeholder="Reps" min="0" onChange={e => setReps(e.target.value)}/>
                    <input type="number" value={weight} placeholder="Weight" onChange={e => setWeight(e.target.value)}/>
                    <input style={{display:"none"}} type="file" name="" id="file" onChange={e => setEImg(e.target.files[0])}/>
                    <div className="upload">
                        <label className="file" htmlFor="file">Upload Image</label>
                        <button onClick={handleClick}>Add Exercise</button>
                    </div>
                </div>
                )}
            {error ? "Something went wrong" : isLoading ? "loading" : data.map((exercise) => (
                <div className="exercise">
                    <img src={"/upload/" + exercise.eimg} alt="" />
                    <div className="info">
                        <span>{exercise.etitle}</span>
                        <p>{exercise.edesc}</p>
                        <p>Sets: {exercise.sets}</p>
                        <p>Reps: {exercise.reps}</p>
                        <p>Weight (kg): {exercise.weight}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Exercise