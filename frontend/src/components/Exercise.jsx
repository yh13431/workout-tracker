import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import {AuthContext} from "../context/authContext"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Set from "./Set";

const Exercise = ({rid}) => {
    const [etitle, setETitle] = useState("")
    const [edesc, setEDesc] = useState(null)
    const [file, setFile] = useState(null)

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
                return Array.isArray(res.data) ? res.data : [];
        })
    });

    const upload = async() => {
        try {
            const formData = new FormData()
            formData.append("file", file)
            const res = await axios.post("/upload", formData)
            return res.data
        } catch(err) {
            console.log(err)
        }
    }


    // mutations
    const addExerciseMutation = useMutation({
        mutationFn: (newExercise) => {
            return makeRequest.post("/exercises", newExercise)
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['exercises'] })
        }
    })

    const deleteExerciseMutation = useMutation({
        mutationFn: (exerciseId) => {
          return makeRequest.delete(`/exercises/${exerciseId}`);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['exercises'] });
        },
      });




    const handleDelete = async (exerciseId) => {
        deleteExerciseMutation.mutate(exerciseId)
    };

    const handleClick = async(e) => {
        e.preventDefault()
        const imgUrl = await upload()
        addExerciseMutation.mutate({ etitle, edesc, eimg: file ? imgUrl : "", rid })
        setETitle("")
        setEDesc("")
        setFile(null)
    }


    // hide add exercise button if incorrect user
    const { currentUser } = useContext(AuthContext)
    const [routine, setRoutine] = useState({})

    const location = useLocation();
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
            <div className="listexercises">
                {error ? "Something went wrong" : isLoading ? "loading" : data && Array.isArray(data) ? data.map((exercise) => (
                <div className="exercise" key={exercise.id}>
                    <img src={"/upload/" + exercise.eimg} alt="" />
                    <div className="info">
                        <h4>{exercise.etitle}</h4>
                        <h4>{exercise.edesc}</h4>
                    </div>
                    <Set eid={exercise.id} />
                    {currentUser.username === routine.username && (
                        <div className="delete" key={exercise.id}>
                            <button className="deleteexercise" onClick={() => handleDelete(exercise.id)}>Delete Exercise</button>
                        </div>
                    )}
                </div>
            )) : "No data" }
            </div>
            <div className="write">
                {currentUser.username === routine.username && (
                    <>
                        <h2>Add Exercise</h2>
                        <div className="form">
                            <input type="text" placeholder="Name" value={etitle} onChange={e => setETitle(e.target.value)} />
                            <input type="text" value={edesc} placeholder="Description" onChange={e => setEDesc(e.target.value)}/>
                            <input style={{display:"none"}} type="file" name="" id="file" onChange={e => setFile(e.target.files[0])}/>
                            <label className="file" htmlFor="file">Upload Image</label>
                            <button onClick={handleClick}>Add to Routine</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Exercise