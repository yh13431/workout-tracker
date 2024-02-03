import express from 'express';
import { addSet, deleteSet, getSets } from '../controllers/sets.js';

const router = express.Router()

router.get("/", getSets)
router.post("/", addSet)
router.delete("/:id", deleteSet)


export default router;