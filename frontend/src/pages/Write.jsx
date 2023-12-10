import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";


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
            <div className="content">
                <h2>Add Routine</h2>
                <input type="text" value={title} placeholder="Title" onChange={e => setTitle(e.target.value)}/>
                <input type="text" value={desc} placeholder="Description" onChange={e => setDesc(e.target.value)}/>
                <input style={{display:"none"}} type="file" name="" id="file" onChange={e => setFile(e.target.files[0])}/>
                <label className="file" htmlFor="file">Upload Image</label>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Options</h1>
                    <div className="buttons">
                        <button onClick={handleClick}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input type="checkbox" checked={cat === "shoulders"} name="cat" value="shoulders" id="shoulders" onChange={e => setCat(e.target.value)}/>
                        <label htmlFor="shoulders">Shoulders</label>
                    </div>

                    <div className="cat">
                        <input type="checkbox" checked={cat === "arms"}  name="cat" value="arms" id="arms" onChange={e => setCat(e.target.value)}/>
                        <label htmlFor="arms">Arms</label>
                    </div>
                    
                    <div className="cat">
                        <input type="checkbox" checked={cat === "abs"}  name="cat" value="abs" id="abs" onChange={e => setCat(e.target.value)}/>
                        <label htmlFor="abs">Abs</label>
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
        </div>
    )
}

export default Write