import { v4 as uuidv4 } from 'uuid';
import { Pharmacy } from '../models/PharmacyModel';

export const pharmacyDB: Pharmacy[] = []; // In-memory DB

export const addPharmacy = (data: Omit<Pharmacy, 'id' | 'createdAt' | 'updatedAt'>): Pharmacy => {
  const newPharmacy: Pharmacy = {
    id: uuidv4(),
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  pharmacyDB.push(newPharmacy);
  return newPharmacy;
};

export const getAllPharmacies = (): Pharmacy[] => pharmacyDB;

export const getPharmacyById = (id: string): Pharmacy | undefined =>
  pharmacyDB.find((pharmacy) => pharmacy.id === id);

export const editPharmacy = (id: string, updates: Partial<Omit<Pharmacy, 'id' | 'createdAt' | 'updatedAt'>>): Pharmacy | null => {
  const index = pharmacyDB.findIndex((p) => p.id === id);
  if (index === -1) return null;
  pharmacyDB[index] = {
    ...pharmacyDB[index],
    ...updates,
    updatedAt: new Date(),
  };
  return pharmacyDB[index];
};

export const removePharmacy = (id: string): boolean => {
  const index = pharmacyDB.findIndex((p) => p.id === id);
  if (index === -1) return false;
  pharmacyDB.splice(index, 1);
  return true;
};
