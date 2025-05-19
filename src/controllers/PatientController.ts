import { Request, Response } from 'express';
import { PatientInput } from '../models/PatientModel';
import {
  addPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatientById
} from '../services/PatientService';

export const createPatient = (req: Request, res: Response): void => {
  try {
    const patientData: PatientInput = req.body;

    if (!patientData.phone || !patientData.password) {
      res.status(400).json({ error: 'Phone and password are required' });
      return;
    }

    const newPatient = addPatient(patientData);
    res.status(201).json(newPatient);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

export const getPatients = (req: Request, res: Response): void => {
  try {
    const patients = getAllPatients();
    res.status(200).json(patients);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPatient = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const patient = getPatientById(id);

    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
      return;
    }

    res.status(200).json(patient);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePatientDetails = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const patientData: PatientInput = req.body;

    if (!patientData.phone || !patientData.password) {
      res.status(400).json({ error: 'Phone and password are required' });
      return;
    }

    const updatedPatient = updatePatient(id, patientData);
    res.status(200).json(updatedPatient);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update patient' });
  }
};

export const deletePatient = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const isDeleted = deletePatientById(id);

    if (!isDeleted) {
      res.status(404).json({ error: 'Patient not found' });
      return;
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Delete failed' });
  }
};
