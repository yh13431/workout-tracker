import express from 'express';
import routineRoutes from "./routes/routines.js"
import authRoutes from "./routes/auth.js"
import exerciseRoutes from "./routes/exercises.js"
import setRoutes from "./routes/sets.js"
import savedRoutes from "./routes/saved.js"
import cookieParser from 'cookie-parser';
import multer from 'multer';
import cors from "cors";

const app = express()

// middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true)
  next()
})
app.use(express.json())
app.use(
  cors({
    origin: ["http://localhost:3000", "https://vercel.com/yh13431s-projects/workout-tracker-backend", "https://workout-tracker-backend-yh13431s-projects.vercel.app/", "https://workout-tracker-backend-git-main-yh13431s-projects.vercel.app/"],
    credentials: true
  })
)
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
  

// upload route
const upload = multer({ storage })
app.post("/api/upload", upload.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename)
})


// routes
app.use("/api/routines", routineRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/exercises", exerciseRoutes)
app.use("/api/sets", setRoutes)
app.use("/api/saved", savedRoutes)


app.listen(3001, () => {
    console.log("Server running on port 3001")
})

