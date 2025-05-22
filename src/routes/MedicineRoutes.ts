import { Router } from 'express';
import { validateMedicineData } from '../middleware/MedicineValidation';
import { createMedicine, deleteMedicine, getMedicine, getMedicines, updateMedicine } from '../controllers/MedicineController';



const router = Router();

router.post('/medicine', validateMedicineData,createMedicine);
router.get('/medicine', getMedicines);
router.get('/medicine/:id', getMedicine);
router.put('/medicine/:id', validateMedicineData, updateMedicine);
router.delete('/medicine/:id', deleteMedicine);

export default router;
