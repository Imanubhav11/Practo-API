import express from 'express';
import { 
  createPatient, 
  getPatients, 
  getPatient, 
  deletePatient, 
  updatePatientDetails
} from '../controllers/PatientController'
import { validatePatientData } from '../middleware/PatientValidation';
import { PatientRegister } from '../controllers/AuthController';

const router = express.Router();

router.post('/patients', validatePatientData, createPatient);
router.get('/patients', getPatients);
router.get('/patients/:id', getPatient);
router.put('/patients/:id', validatePatientData, updatePatientDetails);
router.delete('/patients/:id', deletePatient);


// 🔐 Login Route
router.post('/patient/login/:id', PatientRegister);



export default router;