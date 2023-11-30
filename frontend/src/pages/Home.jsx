import React from "react";
import { Link } from "react-router-dom";
import testimage from '../images/testimage.png'

const Home = () => {

    const routines = [
        {
            id: 1,
            title: 'Title',
            desc: 'Desc',
            img: 'Img'
        },
        {
            id: 2,
            title: 'Title',
            desc: 'Desc',
            img: 'Img'
        },
        {
            id: 3,
            title: 'Title',
            desc: 'Desc',
            img: 'Img'
        },
    ]
    return (
        <div className="home">
            <div className="routines">
                {routines.map(routine => (
                    <div className="routine" key={routine.id}>
                        <div className="img">
                            <img src={testimage} alt="" />
                        </div>
                        <div className="content">
                            <Link className="link" to={`/post/${routine.id}`}>
                                <h1>{routine.title}</h1>
                            </Link>
                            <p>{routine.desc}</p>
                            <button>View Routine</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home