import express from 'express';
import {
  getAllDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/DoctorController';
import { DoctorLogin } from '../controllers/AuthController';
import { validateDoctorData } from '../middleware/DoctorValidation';

const router = express.Router();

router.get('/doctors/', getAllDoctors);
router.get('/doctors/:id', getDoctor);
router.post('/doctors/',validateDoctorData, createDoctor);
router.put('/doctors/:id', validateDoctorData, updateDoctor);
router.delete('/doctors/:id', deleteDoctor);

// 🔐 Login Route
router.post('/doctor/login/:id', DoctorLogin);

export default router;
