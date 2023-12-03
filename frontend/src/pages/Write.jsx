import React, { useState } from "react";
import axios from "axios";

const Write = () => {
    const [value, setValue] = useState("")
    const [title, setTitle] = useState("")
    const [file, setFile] = useState(null)
    const [cat, setCat] = useState("")

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
        const imgUrl = upload()

        try {
            
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="add">
            <div className="content">
                <h2>Add Routine</h2>
                <input type="text" placeholder="Title" onChange={e => setTitle(e.target.value)}/>
                <input type="text" placeholder="Description" />
                <button>Add Exercise</button>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Public
                    </span>
                    <span>
                        <b>Visibility: </b> Draft
                    </span>
                    <input style={{display:"none"}}type="file" name="" id="file" onChange={e => setFile(e.target.files[0])}/>
                    <label className="file" htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save as Draft</button>
                        <button onClick={handleClick}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>

                    <div className="cat">
                        <input type="checkbox" name="cat" value="shoulders" id="shoulders" onChange={e => setCat(e.target.value)}/>
                        <label htmlFor="shoulders">Shoulders</label>
                    </div>

                    <div className="cat">
                        <input type="checkbox" name="cat" value="arms" id="arms" onChange={e => setCat(e.target.value)}/>
                        <label htmlFor="arms">Arms</label>
                    </div>
                    
                    <div className="cat">
                        <input type="checkbox" name="cat" value="abs" id="abs" onChange={e => setCat(e.target.value)}/>
                        <label htmlFor="abs">Abs</label>
                    </div>

                    <div className="cat">
                        <input type="checkbox" name="cat" value="chest" id="chest" onChange={e => setCat(e.target.value)}/>
                        <label htmlFor="chest">Chest</label>
                    </div>

                    <div className="cat">
                        <input type="checkbox" name="cat" value="back" id="back" onChange={e => setCat(e.target.value)}/>
                        <label htmlFor="back">Back</label>
                    </div>

                    <div className="cat">
                        <input type="checkbox" name="cat" value="legs" id="legs" onChange={e => setCat(e.target.value)}/>
                        <label htmlFor="legs">Legs</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Write