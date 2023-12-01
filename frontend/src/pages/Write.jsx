import React from "react";

const Write = () => {
    return (
        <div className="add">
            <div className="content">
                <h2>Add Routine</h2>
                <input type="text" placeholder="Title" />
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
                    <input style={{display:"none"}}type="file" name="" id="file" />
                    <label className="file" htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save as Draft</button>
                        <button>Update</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>

                    <div className="cat">
                        <input type="checkbox" name="cat" value="shoulders" id="shoulders"/>
                        <label htmlFor="shoulders">Shoulders</label>
                    </div>

                    <div className="cat">
                        <input type="checkbox" name="cat" value="arms" id="arms"/>
                        <label htmlFor="arms">Arms</label>
                    </div>
                    
                    <div className="cat">
                        <input type="checkbox" name="cat" value="abs" id="abs"/>
                        <label htmlFor="abs">Abs</label>
                    </div>

                    <div className="cat">
                        <input type="checkbox" name="cat" value="chest" id="chest"/>
                        <label htmlFor="chest">Chest</label>
                    </div>

                    <div className="cat">
                        <input type="checkbox" name="cat" value="back" id="back"/>
                        <label htmlFor="back">Back</label>
                    </div>

                    <div className="cat">
                        <input type="checkbox" name="cat" value="legs" id="legs"/>
                        <label htmlFor="legs">Legs</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Write