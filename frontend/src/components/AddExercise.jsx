import React, { useState } from "react";
import ToggleVisibility from "../components/ToggleVisibility";
import axios from "axios";

const AddExercise = () => {
    const [etitle, setETitle] = useState("");
    const [edesc, setEDesc] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
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
  
    const handleSubmit = (e) => {
      e.preventDefault();
    };
  

    return (
      <ToggleVisibility>
      <div className="addexercise">
        <h3>Add Exercise</h3>
        <form onSubmit={handleSubmit}>
            <input type="text" value={etitle} placeholder="Name" onChange={e => setETitle(e.target.value)}/>
            <input type="text" value={edesc} placeholder="Description" onChange={e => setEDesc(e.target.value)}/>
            <input type="number" value={sets} placeholder="Sets" min="0" onChange={e => setSets(e.target.value)}/>
            <input type="number" value={reps} placeholder="Reps" min="0" onChange={e => setReps(e.target.value)}/>
            <input style={{display:"none"}} type="file" name="" id="file" onChange={e => setFile(e.target.files[0])}/>
            <label className="file" htmlFor="file">UploadImage</label>
          </form>
            <button type="submit">Submit</button>
      </div>
      </ToggleVisibility>
    );
  };
  
  export default AddExercise;