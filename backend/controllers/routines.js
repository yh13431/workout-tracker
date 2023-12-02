import { db } from "../db.js"

export const getRoutines = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM routines WHERE cat=?" : "SELECT * FROM routines";

    db.query(q, [req.query.cat], (err, data) => {
        if(err) return res.send(err)

        return res.status(200).json(data)
    })
}

export const getRoutine = (req, res) => {
    res.json("add routine")
}


export const addRoutine = (req, res) => {
    res.json("add routine")
}


export const deleteRoutine = (req, res) => {
    res.json("add routine")
}


export const updateRoutine = (req, res) => {
    res.json("add routine")
}
