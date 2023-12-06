import { db } from "../db.js"
import jwt from "jsonwebtoken"

export const getExercises = (req, res) => {
    const q = req.query.rid ? "SELECT * FROM exercises WHERE rid = ?" : "SELECT * FROM exercises"

    db.query(q, [req.query.rid], (err, data) => {
        if(err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}


export const addExercise = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, routineInfo) => {
        if (err) return res.status(403).json("Token is invalid")
    
        const q = "INSERT INTO exercises(`etitle`, `edesc`, `sets`, `reps`, `eimg`, `rid`) VALUES (?)"

        const values = [
            req.body.etitle,
            req.body.edesc,
            req.body.sets,
            req.body.reps,
            req.body.eimg,
            routineInfo.id
        ]

        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err)
            return res.json("Exercise has been created")
        })
    })
}


export const deleteExercise = (req, res) => {
    // check for jwt
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, routineInfo) => {
        if (err) return res.status(403).json("Token is invalid")

        const exerciseId = req.params.id
        // can only delete if 1. valid user, 2. correct routine
        const q = "DELETE FROM exercises WHERE `id` = ? AND `rid` = ?"

        db.query(q, [exerciseId, routineInfo.id], (err, data) => {
            if(err) return res.status(403).json("You can only delete your own exercises")
            return res.json("Exercise has been deleted")
        })
    })
}


export const updateExercise = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, routineInfo) => {
        if (err) return res.status(403).json("Token is invalid")
    
        const exerciseId = req.params.id;

        const q = "UPDATE exercises SET `etitle`=?, `edesc`=?, `sets`=?, `reps`=?, `eimg`=?, WHERE `id` = ? AND `rid`= ?"

        const values = [
            req.body.etitle,
            req.body.edesc,
            req.body.sets,
            req.body.reps,
            req.body.eimg,
        ]

        db.query(q, [...values, exerciseId, routineInfo.id], (err, data) => {
            if(err) return res.status(500).json(err)
            return res.json("Exercise has been updated")
        })
    })
}
