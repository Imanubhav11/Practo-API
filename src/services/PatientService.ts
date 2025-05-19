import { Patient, PatientInput } from "../models/PatientModel";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export const patients: Patient[] = [];

export const addPatient = (patientData: PatientInput): Patient => {
  const hashedPassword = bcrypt.hashSync(patientData.password, 10);

  const newPatient: Patient = {
    id: uuidv4(),
    ...patientData,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  patients.push(newPatient);
  return newPatient;
};

export const getAllPatients = (): Patient[] => {
  return patients;
};

export const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

export const updatePatient = (id: string, updateData: PatientInput): Patient => {
  const patientIndex = patients.findIndex(p => p.id === id);

  if (patientIndex === -1) {
    throw new Error("No patient with this ID exists");
  }

  const hashedPassword = bcrypt.hashSync(updateData.password, 10);

  const updatedPatient: Patient = {
    ...patients[patientIndex],
    ...updateData,
    password: hashedPassword,
    updatedAt: new Date()
  };

  patients[patientIndex] = updatedPatient;
  return updatedPatient;
};

export const deletePatientById = (id: string): boolean => {
  const index = patients.findIndex(patient => patient.id === id);
  if (index !== -1) {
    patients.splice(index, 1);
    return true;
  }
  return false;
};
