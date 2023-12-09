import express from 'express';
import { addExercise, deleteExercise, getExercises } from '../controllers/exercises.js';

const router = express.Router()

router.get("/", getExercises)
router.post("/", addExercise)
router.delete("/:id", deleteExercise)


export default router;