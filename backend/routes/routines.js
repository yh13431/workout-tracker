import express from 'express';
import { addRoutine, deleteRoutine, getRoutine, getRoutines, updateRoutine } from '../controllers/routines.js';

const router = express.Router()

router.get("/", getRoutines)
router.get("/:id", getRoutine)
router.post("/", addRoutine)
router.delete("/:id", deleteRoutine)
router.put("/:id", updateRoutine)


export default router;