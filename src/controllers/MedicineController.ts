import { Request, Response } from 'express';
import {
  addMedicine,
  getAllMedicines,
  getMedicineById,
  editMedicine,
  removeMedicine,
} from '../services/MedicineService';

export const createMedicine = (req: Request, res: Response) : void => {
  const newMedicine = addMedicine(req.body);
  res.status(201).json(newMedicine);
};

export const getMedicines = (req: Request, res: Response):void => {
  const meds = getAllMedicines();
  res.json(meds);
};

export const getMedicine = (req: Request, res: Response):void => {
  const medicine = getMedicineById(req.params.id);
  if (!medicine){ 
     res.status(404).json({ message: 'Medicine not found' })
     return
    };

  res.json(medicine);
};

export const updateMedicine = (req: Request, res: Response) : void => {
  const updated = editMedicine(req.params.id, req.body);
  if (!updated){ 
     res.status(404).json({ message: 'Medicine not found' })
     return;
    };
  res.json(updated);
};

export const deleteMedicine = (req: Request, res: Response) => {
  const success = removeMedicine(req.params.id);
  if (!success){
     res.status(404).json({ message: 'Medicine not found' });
     return;
  } 
  res.status(200).json({ message: 'Medicine deleted successfully' });
};
