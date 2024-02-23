import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {AuthContext} from "../context/authContext"
import { useLocation } from "react-router-dom";


const Set = ({eid}) => {
    const [reps, setReps] = useState("")
    const [weight, setWeight] = useState("")
    const queryClient = useQueryClient()


    const makeRequest = axios.create({
        baseURL: "https://workout-tracker-backend-yh13431s-projects.vercel.app/api",
        withCredentials: true,
    })

    const { isLoading, error, data: sets } = useQuery({
        queryKey: ["sets", { eid }], 
        queryFn:  () =>
            makeRequest.get("/sets?eid= " + eid)
            .then((res) => {
                return res.data
        })
    });


    // mutations
    const addSetMutation = useMutation({
        mutationFn: (newSet) => {
            return makeRequest.post("/sets", newSet)
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['sets'] })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: (setId) => {
          return makeRequest.delete(`/sets/${setId}`);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['sets'] });
        },
    });
    


    const handleDelete = async (setId) => {
        deleteMutation.mutate(setId)
    };
    
    const handleClick = async(e) => {
        e.preventDefault()
        addSetMutation.mutate({ reps, weight, eid })
        setReps("")
        setWeight("")  
    }

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
        <div className="sets">
            {error ? "Something went wrong" : isLoading ? "loading" : sets.map((set) => (
                <div className="set" key={set.id}>
                    <div className="info">
                        <h4>Reps: {set.reps}</h4>
                        <h4>Weight (kg): {set.weight}</h4>
                    </div>
                    <div className="delete" key={set.id}>
                        {currentUser.username === routine.username && (
                            <>
                            <button onClick={() => handleDelete(set.id)}>Delete</button>
                            </>
                        )}
                    </div>
                </div>
            ))}
            <div className="listsets">
                {currentUser.username === routine.username && (
                    <>
                    <h2>Add Set</h2>
                    <div className="form">
                        <input type="number" placeholder="Reps" min="0" value={reps} onChange={e => setReps(e.target.value)} />
                        <input type="number" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} />
                        <button onClick={handleClick}>Add to Exercise</button>
                    </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Set