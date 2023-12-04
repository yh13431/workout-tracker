import express from 'express';
import { addExercise, deleteExercise, getExercises, updateExercise } from '../controllers/exercises.js';

const router = express.Router()

router.get("/routines/", getExercises)
router.post("/routines/", addExercise)
router.delete("/routines/:id", deleteExercise)
router.put("/routines/:id", updateExercise)


export default router;