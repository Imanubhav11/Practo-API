import express from 'express';
import {
  getAllDoctors,
  getDoctor,
  addDoctor,
  editDoctor,
  removeDoctor,
} from '../controllers/DoctorController';

const router = express.Router();

router.get('/', getAllDoctors);
router.get('/:id', getDoctor);
router.post('/', addDoctor);
router.put('/:id', editDoctor);
router.delete('/:id', removeDoctor);

export default router;
