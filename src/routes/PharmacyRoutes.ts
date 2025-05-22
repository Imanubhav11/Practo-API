import express from 'express';
import { 
  createPharmacy, 
  getPharmacy, 
  getPharmacies, 
  deletePharmacy, 
  updatePharmacy
} from '../controllers/PharmacyController';
import { validatePharmacyData } from '../middleware/PharmacyValidation'

const router = express.Router();

router.post('/pharmacy', validatePharmacyData, createPharmacy);
router.get('/pharmacy', getPharmacies);
router.get('/pharmacy/:id', getPharmacy);
router.put('/pharmacy/:id', validatePharmacyData, updatePharmacy);
router.delete('/pharmacy/:id', deletePharmacy);

export default router;