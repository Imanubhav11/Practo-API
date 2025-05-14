import { Request, Response } from 'express';
import {
  doctors,
  createDoctor,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} from '../services/DoctorService';

export const getAllDoctors = (_: Request, res: Response) => {
  res.status(200).json(doctors);
};

export const getDoctor = (req: Request, res: Response): void => {
    const doctor = getDoctorById(req.params.id);
    if (!doctor) {
      res.status(404).json({ message: 'Doctor not found' });
      return;
    }
    res.status(200).json(doctor);
  };
  

export const addDoctor = (req: Request, res: Response) => {
  try {
    const newDoctor = createDoctor(req.body);
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(400).json({ message: 'Invalid doctor data', error });
  }
};


export const editDoctor = (req: Request, res: Response): void => {
    const updated = updateDoctor(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ message: 'Doctor not found' });
      return;
    }
    res.status(200).json(updated);
};


export const removeDoctor = (req: Request, res: Response): void => {
    const success = deleteDoctor(req.params.id);
    if (!success) {
      res.status(404).json({ message: 'Doctor not found' });
      return;
    }
    res.status(200).json({ message: 'Doctor deleted successfully' });
  };
  
