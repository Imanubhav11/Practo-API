import { Request, Response } from 'express';
import {
  addPharmacy,
  getAllPharmacies,
  getPharmacyById,
  editPharmacy,
  removePharmacy
} from '../services/PharmacyService';
import { Pharmacy } from '../models/PharmacyModel';



// Create a new pharmacy
export const createPharmacy = (req: Request, res: Response): void => {
  try {
    const newPharmacy: Pharmacy = addPharmacy(req.body);
    res.status(201).json({ message: 'Pharmacy created successfully', data: newPharmacy });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create pharmacy', error });
  }
};

// Get all pharmacies
export const getPharmacies = (req: Request, res: Response): void => {
  const pharmacies = getAllPharmacies();
  res.status(200).json({ data: pharmacies });
};

// Get a pharmacy by ID
export const getPharmacy = (req: Request, res: Response): void => {
  const { id } = req.params;
  const pharmacy = getPharmacyById(id);

  if (!pharmacy) {
    res.status(404).json({ message: 'Pharmacy not found' });
    return;
  }

  res.status(200).json({ data: pharmacy });
};

// Update a pharmacy
export const updatePharmacy = (req: Request, res: Response): void => {
  const { id } = req.params;
  const updated = editPharmacy(id, req.body);

  if (!updated) {
    res.status(404).json({ message: 'Pharmacy not found or update failed' });
    return;
  }

  res.status(200).json({ message: 'Pharmacy updated successfully', data: updated });
};

// Delete a pharmacy
export const deletePharmacy = (req: Request, res: Response): void => {
  const { id } = req.params;
  const deleted = removePharmacy(id);

  if (!deleted) {
    res.status(404).json({ message: 'Pharmacy not found or already deleted' });
    return;
  }

  res.status(200).json({ message: 'Pharmacy deleted successfully' });
};
