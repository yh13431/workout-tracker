import React from "react";
import image2 from "../images/image2.png"

const Exercise = () => {
    const exercises = [
        {
            id: 1,
            title: 'Exercise 1',
            img: 'Img',
            sets: '1',
            reps: '1',
        },
        {
            id: 2,
            title: 'Exercise 2',
            img: 'Img',
            sets: '2',
            reps: '2',
        },
        {
            id: 1,
            title: 'Exercise 3',
            img: 'Img',
            sets: '3',
            reps: '3',
        }
    ]
    return (
        <div className="exercises">
            {exercises.map(exercise => (
                <div className="exercise" key={exercise.id}>
                    <div className="img">
                        <img src={image2} alt="" />
                    </div>
                    <div className="content">
                        <div className="title">{exercise.title}</div>
                        <div className="sets">Sets: {exercise.sets}</div>
                        <div className="reps">Reps: {exercise.reps}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Exercise