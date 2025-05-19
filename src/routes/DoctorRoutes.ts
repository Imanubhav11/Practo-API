import express from 'express';
import {
  getAllDoctors,
  getDoctor,
  addDoctor,
  editDoctor,
  removeDoctor,
} from '../controllers/DoctorController';
import { validateDoctorData } from '../middleware/DoctorValidation';

const router = express.Router();

router.get('/doctors/', getAllDoctors);
router.get('/doctors/:id', getDoctor);
router.post('/doctors/',validateDoctorData, addDoctor);
router.put('/doctors/:id', validateDoctorData, editDoctor);
router.delete('/doctors/:id', removeDoctor);

export default router;
