import { db } from "../db.js"
import jwt from "jsonwebtoken"


export const getSaved = (req, res) => {
  const q = req.query.uid
    ? "SELECT saved.id, saved.rid, routines.title FROM saved JOIN routines ON saved.rid = routines.id WHERE saved.uid = ?"
    : "SELECT saved.id, saved.rid, routines.title FROM saved JOIN routines ON saved.rid = routines.id";
  console.log("Parameters:", [req.query.uid]);

  db.query(q, [req.query.uid], (err, data) => {
      if (err) {
          console.error("SQL Error:", err);
          return res.status(500).json(err);
      }

      res.status(200).json(data);
  });
};


export const addSaved = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is invalid")
    
        // check for valid user, correct user
        const q = "INSERT INTO saved(`rid`, `uid`) VALUES (?)"

        const values = [
            req.body.rid,
            userInfo.id
        ]

        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err)
            return res.json("Routine has been saved")
        })
    })
}

export const deleteSaved = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json("Not authenticated");
    }
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) {
        return res.status(403).json("Token is invalid");
      }
  
      const routineId = req.params.id;
  
      // Check for valid user, correct routine
      const q = "DELETE FROM saved WHERE `rid` = ? AND `uid` = ?";
  
      db.query(q, [routineId, userInfo.id], (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
  
        if (data.affectedRows > 0) {
          return res.json("Routine has been unsaved");
        }
  
        return res.status(403).json("Log in to save routine");
      });
    });
  };
  

  export const getSavedStatus = (req, res) => {
    const token = req.cookies.access_token;
  
    if (!token) {
      return res.status(401).json("Not authenticated");
    }
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) {
        return res.status(403).json("Token is invalid");
      }
  
      const routineId = req.params.rid;
  
      const q = "SELECT COUNT(*) as count FROM saved WHERE `rid` = ? AND `uid` = ?";
  
      db.query(q, [routineId, userInfo.id], (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
  
        const isSaved = data[0].count > 0;
        return res.status(200).json({ saved: isSaved });
      });
    });
  };