import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { getPatientById } from '../services/PatientService';
import { getDoctorById } from '../services/DoctorService';


//Patient login/Sign in
export const PatientRegister = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { phone, password } = req.body;
  
    if (!phone || !password) {
      res.status(400).json({ error: 'Phone and password are required' });
      return;
    }
  
    const patient = getPatientById(id);
  
    if (!patient) {
      res.status(404).json({ error: 'Patient not found with this ID' });
      return;
    }
  
    const isPasswordMatch = bcrypt.compareSync(password, patient.password);
  
    if (!isPasswordMatch) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }
  
    const { password: _, ...patientWithoutPassword } = patient;
  
    res.status(200).json({ message: 'Login successful', patient: patientWithoutPassword });
  };
  


//Doctor Login/Signin
export const DoctorLogin = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { phoneNumber, password } = req.body;
  
    if (!phoneNumber || !password) {
      res.status(400).json({ error: 'Phone number and password are required' });
      return;
    }
  
    const doctor = getDoctorById(id);
  
    if (!doctor) {
      res.status(404).json({ error: 'Doctor not found with this ID' });
      return;
    }
  
    const isPasswordMatch = bcrypt.compareSync(password, doctor.password);
  
    if (!isPasswordMatch) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }
  
    const { password: _, ...doctorWithoutPassword } = doctor;
  
    res.status(200).json({ message: 'Doctor login successful', doctor: doctorWithoutPassword });
  };
  