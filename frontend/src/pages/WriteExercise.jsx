import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate  } from "react-router-dom";

const WriteExercise = ({ routineId, onExerciseCreated}) => {
    const [etitle, setETitle] = useState('');
    const [edesc, setEDesc] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');

    
    const handleCreateExercise = async() => {
      try {
        const response = await fetch(`/routines/${routineId}/exercises`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ etitle, edesc, sets, reps }),
        });

        if (response.ok) {
          const data = await response.json();

          onExerciseCreated(data.exercise);
          setETitle('');
          setEDesc('');
          setSets('');
          setReps('');
        } else {
          console.error('Error creating exercise:', response.statusText);
        }
      } catch (error) {
        console.error('Error creating exercise:', error);
      }
    };


    return (
      <div>
        <h2>Create Exercise</h2>
        <input
          value={etitle}
          onChange={(e) => setETitle(e.target.value)}
          placeholder="Exercise title"
        />
        <input
          value={edesc}
          onChange={(e) => setEDesc(e.target.value)}
          placeholder="Exercise desc"
        />
        <input
          value={sets}
          type="number"
          min="0"
          onChange={(e) => setSets(e.target.value)}
          placeholder="Exercise sets"
        />
        <input
          value={reps}
          type="number"
          min="0"
          onChange={(e) => setReps(e.target.value)}
          placeholder="Exercise reps"
        />
        <button onClick={handleCreateExercise}>Create Exercise</button>
      </div>
    );
  }












   /*  const state = useLocation().state;
    const navigate = useNavigate()
    const [etitle, setETitle] = useState(state?.eTitle);
    const [edesc, setEDesc] = useState(state?.eDesc);
    const [sets, setSets] = useState(state?.sets);
    const [reps, setReps] = useState(state?.reps);
    const [file, setFile] = useState(null)

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
  
    const handleClick = async e => {
      e.preventDefault()
      const imgUrl = await upload()

      try {
          state ? await axios.put(`/exercises/${state.id}`, {
              etitle, edesc, sets, reps, eimg: file ? imgUrl : ""
          }) : 
          await axios.post(`/exercises/`, {
            etitle, edesc, sets, reps, eimg: file ? imgUrl : ""
          })
          navigate('/')
      }catch(err) {
          console.log(err)
      }
  }

    return (
      <div className="addexercise">
        <h2>Add Exercise</h2>
            <input type="text" value={etitle} placeholder="Name" onChange={e => setETitle(e.target.value)}/>
            <input type="text" value={edesc} placeholder="Description" onChange={e => setEDesc(e.target.value)}/>
            <input type="number" value={sets} placeholder="Sets" min="0" onChange={e => setSets(e.target.value)}/>
            <input type="number" value={reps} placeholder="Reps" min="0" onChange={e => setReps(e.target.value)}/>
            <input style={{display:"none"}} type="file" name="" id="file" onChange={e => setFile(e.target.files[0])}/>
            <label className="file" htmlFor="file">Upload Image</label>
        <button onClick={handleClick}>Publish</button>
        <button className="back">
            Back to routine
        </button>
      </div>
    );
  }; */

export default WriteExercise