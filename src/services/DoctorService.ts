import { v4 as uuidv4 } from 'uuid';
import { Doctor } from '../models/DoctorModel';
import bcrypt from 'bcryptjs';

export const doctors: Doctor[] = [];

export const createDoctor = (data: Omit<Doctor, 'id'>): Doctor => {
  const hashedPassword = bcrypt.hashSync(data.password, 10);

  const newDoctor: Doctor = {
    id: uuidv4(),
    ...data,
    password: hashedPassword
  };

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

  if (updates.password) {
    updates.password = bcrypt.hashSync(updates.password, 10);
  }

  doctors[index] = {
    ...doctors[index],
    ...updates
  };

  return doctors[index];
};

export const deleteDoctor = (id: string): boolean => {
  const index = doctors.findIndex((doc) => doc.id === id);
  if (index === -1) return false;
  doctors.splice(index, 1);
  return true;
};
