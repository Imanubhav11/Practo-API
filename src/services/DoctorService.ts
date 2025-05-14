import { v4 as uuidv4 } from 'uuid';
import { Doctor } from '../models/DoctorModel';

// In-memory storage
export const doctors: Doctor[] = [];

export const createDoctor = (data: Omit<Doctor, 'id'>): Doctor => {
  const newDoctor: Doctor = { id: uuidv4(), ...data };
  doctors.push(newDoctor);
  return newDoctor;
};

export const getAllDoctors = (): Doctor[] => {
  return doctors;
};

export const getDoctorById = (id: string): Doctor | undefined => {
  return doctors.find((doc) => doc.id === id);
};

export const updateDoctor = (id: string, updates: Partial<Doctor>): Doctor | undefined => {
  const index = doctors.findIndex((doc) => doc.id === id);
  if (index === -1) return undefined;
  doctors[index] = { ...doctors[index], ...updates };
  return doctors[index];
};

export const deleteDoctor = (id: string): boolean => {
  const index = doctors.findIndex((doc) => doc.id === id);
  if (index === -1) return false;
  doctors.splice(index, 1);
  return true;
};
