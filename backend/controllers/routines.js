import { db } from "../db.js"
import jwt from "jsonwebtoken"

export const getRoutines = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM routines WHERE cat=?" : "SELECT * FROM routines";

    db.query(q, [req.query.cat], (err, data) => {
        if(err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}

export const getRoutine = (req, res) => {
    // get single routine from user
    const q = "SELECT r.id, `username`, `title`, `desc`, r.img, u.img AS userImg, `cat`, `date` FROM users u JOIN routines r ON u.id = r.uid WHERE r.id = ?"

    db.query(q, [req.params.id], (err, data) => {
        if(err) return res.status(500).json(err)

        return res.status(200).json(data[0])
    })
}


export const addRoutine = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is invalid")
    
        const q = "INSERT INTO routines(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id
        ]

        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err)
            return res.json("Post has been created")
        })
    })
}


export const deleteRoutine = (req, res) => {
    // check for jwt
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is invalid")

        const routineId = req.params.id
        // can only delete if 1. valid user, 2. correct user
        const q = "DELETE FROM routines WHERE `id` = ? AND `uid` = ?"

        db.query(q, [routineId, userInfo.id], (err, data) => {
            if(err) return res.status(403).json("You can only delete your own routines")
            return res.json("Routine has been deleted")
        })
    })
}


export const updateRoutine = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is invalid")
    
        const routineId = req.params.id;

        const q = "UPDATE routines SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id` = ? AND `uid`= ?"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat
        ]

        db.query(q, [...values, routineId, userInfo.id], (err, data) => {
            if(err) return res.status(500).json(err)
            return res.json("Post has been updated")
        })
    })
}
