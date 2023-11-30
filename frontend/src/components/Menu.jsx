import React from "react";

const Menu = () => {

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
        <div className="menu">
            <h1>Other Routines</h1>
            {routines.map(routine => (
                <div className="routine" key={routine.id}>
                    <img src={routine.img} alt="" />
                    <h2>{routine.title}</h2>
                    <button>View Routine</button>
                </div>
            ))}
        </div>
    )
}

export default Menu;