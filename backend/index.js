import express from 'express';
import routineRoutes from "./routes/routines.js"
import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"

const app = express()

app.use(express.json())
app.use("/api/posts", routineRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)

app.listen(3001, () => {
    console.log("Server running on port 3001")
})

