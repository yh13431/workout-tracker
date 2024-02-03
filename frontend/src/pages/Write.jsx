import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import write from '../images/write.jpg';


const Write = () => {

    const navigate = useNavigate()
    const state = useLocation().state;
    const [title, setTitle] = useState(state?.title)
    const [desc, setDesc] = useState(state?.desc)
    const [file, setFile] = useState(null)
    const [cat, setCat] = useState(state?.cat)


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
            state ? await axios.put(`/routines/${state.id}`, {
                title, desc, cat, img: file ? imgUrl : ""
            }) : 
            await axios.post(`/routines/`, {
                title, desc, cat, img: file ? imgUrl : "", date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
            })
            navigate('/')
        }catch(err) {
            console.log(err)
        }
    }


    return (
        <div className="add">
            <div className="image">
                <img src={write} alt="Write" />
            </div>
            <div className="title">
                <h1 className="contenttitle">Add Routine</h1>
            </div>
            <div className="content">
                <div className="inputs">
                    <input className="routineinput" type="text" value={title} placeholder="Title" onChange={e => setTitle(e.target.value)}/>
                    <input className="routineinput" type="text" value={desc} placeholder="Description" onChange={e => setDesc(e.target.value)}/>
                    <input className="routineinput" style={{display:"none"}} type="file" name="" id="file" onChange={e => setFile(e.target.files[0])}/>
                    <label className="file" htmlFor="file">Upload Image</label>
                </div>
                <div className="menu">
                    <div className="item">
                        <div className="cat">
                            <input type="checkbox" checked={cat === "shoulders"} name="cat" value="shoulders" id="shoulders" onChange={e => setCat(e.target.value)}/>
                            <label htmlFor="shoulders">Shoulders</label>
                        </div>

                        <div className="cat">
                            <input type="checkbox" checked={cat === "arms"}  name="cat" value="arms" id="arms" onChange={e => setCat(e.target.value)}/>
                            <label htmlFor="arms">Arms</label>
                        </div>
                        
                        <div className="cat">
                            <input type="checkbox" checked={cat === "core"}  name="cat" value="core" id="core" onChange={e => setCat(e.target.value)}/>
                            <label htmlFor="core">Core</label>
                        </div>

                        <div className="cat">
                            <input type="checkbox" checked={cat === "chest"} name="cat" value="chest" id="chest" onChange={e => setCat(e.target.value)}/>
                            <label htmlFor="chest">Chest</label>
                        </div>

                        <div className="cat">
                            <input type="checkbox" checked={cat === "back"} name="cat" value="back" id="back" onChange={e => setCat(e.target.value)}/>
                            <label htmlFor="back">Back</label>
                        </div>

                        <div className="cat">
                            <input type="checkbox" checked={cat === "legs"} name="cat" value="legs" id="legs" onChange={e => setCat(e.target.value)}/>
                            <label htmlFor="legs">Legs</label>
                        </div>
                    </div>
                </div>
                <button onClick={handleClick}>Publish</button>
            </div>
        </div>
    )
}

export default Write