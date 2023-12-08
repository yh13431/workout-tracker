import express from 'express';
import { addExercise, deleteExercise, getExercises } from '../controllers/exercises.js';

const router = express.Router()

router.get("/", getExercises)
router.post("/:routineId/exercises", addExercise)
router.delete("/:routineId/exercises/:id", deleteExercise)


export default router;