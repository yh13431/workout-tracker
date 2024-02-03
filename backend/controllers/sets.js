import { db } from "../db.js"
import jwt from "jsonwebtoken"

export const getSets = (req, res) => {
    const q = req.query.eid ? "SELECT * FROM sets WHERE eid = ?" : "SELECT * FROM sets"
    console.log("Parameters:", [req.query.eid]);

    db.query(q, [req.query.eid], (err, data) => {
        if(err) return res.status(500).json(err)

        res.status(200).json(data);
    })
}


export const addSet = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is invalid")
    
        // check for valid user, correct user, correct exercise
        const q = "INSERT INTO sets(`weight`, `reps`, `eid`, `uid`) VALUES (?)"

        const values = [
            req.body.weight,
            req.body.reps,
            req.body.eid,
            userInfo.id
        ]

        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err)
            return res.json("Set has been created")
        })
    })
}


export const deleteSet = (req, res) => {
    // check for jwt
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is invalid")

        const setId = req.params.id
        // check for valid user, correct user, correct exercise
        const q = "DELETE FROM sets WHERE `id` = ? AND `uid` = ?"

        db.query(q, [setId, userInfo.id], (err, data) => {
            if(err) return res.status(500).json(err)
            if (data.affectedRows>0) return res.json("Set has been deleted")
            return res.status(403).json("You can only delete your own sets")
        })
    })
}
