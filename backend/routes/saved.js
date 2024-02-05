import express from 'express';
import { addSaved, deleteSaved, getSaved, getSavedStatus } from '../controllers/saved.js';

const router = express.Router()

router.get("/", getSaved)
router.post("/", addSaved)
router.delete("/:id", deleteSaved)
router.get("/status/:rid", getSavedStatus);


export default router;
