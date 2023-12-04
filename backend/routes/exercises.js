import express from 'express';
import { addExercise, deleteExercise, getExercises, updateExercise } from '../controllers/exercises.js';

const router = express.Router()

router.get("/", getExercises)
router.post("/", addExercise)
router.delete("/:id", deleteExercise)
router.put("/:id", updateExercise)


export default router;