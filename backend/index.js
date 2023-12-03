import express from 'express';
import routineRoutes from "./routes/routines.js"
import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import cookieParser from 'cookie-parser';
import multer from 'multer';

const app = express()

// middleware
app.use(express.json())
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/public/upload')
    },
    filename: function (req, file, cb) {
        // make file name unique
      cb(null, Date.now()+file.originalname)
    }
  })
  


// routes
app.use("/api/routines", routineRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)

// upload route
const upload = multer({ storage })
app.post("/api/upload", upload.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename)
})

app.listen(3001, () => {
    console.log("Server running on port 3001")
})

