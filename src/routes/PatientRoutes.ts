import express from 'express';
import { 
  createPatient, 
  getPatients, 
  getPatient, 
  deletePatient, 
  updatePatientDetails
} from '../controllers/PatientController'
import { validatePatientData } from '../middleware/PatientValidation';

const router = express.Router();

router.post('/patients', validatePatientData, createPatient);
router.get('/patients', getPatients);
router.get('/patients/:id', getPatient);
router.put('/patients/:id', validatePatientData, updatePatientDetails);
router.delete('/patients/:id', deletePatient);



export default router;