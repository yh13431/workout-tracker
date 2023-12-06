import axios from "axios";
import React, { useEffect, useState } from "react";


const Exercise = ({rid}) => {
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get(`/exercises/?rid=${rid}`)
                setExercises(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
    }, [rid])


    return (
        <div className="exercises">
            {exercises.map(exercise => (
                <div className="exercise" key={exercise.id}>
                    <div className="img">
                        <img src={exercise.img} alt="" />
                    </div>
                    <div className="content">
                        <h1>{exercise.title}</h1>
                        Description: {exercise.desc}
                        Sets: {exercise.sets}
                        Reps: {exercise.reps}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Exercise