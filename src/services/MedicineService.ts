import { Medicine } from "../models/MedicineModel";
import { v4 as uuidv4 } from 'uuid';

export const medicineDB: Medicine[] = []; // In-memory DB

export const addMedicine = (data: Omit<Medicine, 'medicineId' | 'createdAt' | 'updatedAt'>): Medicine => {
  const newMedicine: Medicine = {
    medicineId: uuidv4(),
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  medicineDB.push(newMedicine);
  return newMedicine;
};

export const getAllMedicines = (): Medicine[] => medicineDB;

export const getMedicineById = (medicineId: string): Medicine | undefined =>
  medicineDB.find((m) => m.medicineId === medicineId);

export const editMedicine = (
  medicineId: string,
  updates: Partial<Omit<Medicine, 'medicineId' | 'createdAt' | 'updatedAt'>>
): Medicine | null => {
  const index = medicineDB.findIndex((m) => m.medicineId === medicineId);
  if (index === -1) return null;
  medicineDB[index] = {
    ...medicineDB[index],
    ...updates,
    updatedAt: new Date(),
  };
  return medicineDB[index];
};

export const removeMedicine = (medicineId: string): boolean => {
  const index = medicineDB.findIndex((m) => m.medicineId === medicineId);
  if (index === -1) return false;
  medicineDB.splice(index, 1);
  return true;
};