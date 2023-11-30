import React from "react";
import image2 from '../images/image2.png'
import image3 from '../images/image3.png'
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { Link } from "react-router-dom";
import Menu from "../components/Menu"

const Single = () => {
    return (
        <div className="single">
            <div className="content">
                <img src={image2} alt="" />
            <div className="user">
                <img src={image3} alt="" />
            <div className="info">
                <span>User</span>
                <p>Created 2 days ago</p>
            </div>
            <div className="edit">
                <Link to={`/write?edit=2`}>
                    <CiEdit />
                </Link>
                <CiTrash />
            </div>
            </div>
            <h1>Title</h1>
            <p>Description</p>
            </div>
            <Menu />
        </div>
    )
}

export default Single