import { Request, Response } from 'express';
import {
  doctors,
  createDoctor,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} from '../services/DoctorService';
import  bcrypt from 'bcryptjs';

const allowedFileExtensions = ['.jpeg', '.jpg', '.png', '.pdf'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const validateFile = (file: any, fieldName: string): string | null => {
  if (!file) return null;
  const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  if (!allowedFileExtensions.includes(ext)) {
    return `${fieldName} must be a valid file type: ${allowedFileExtensions.join(', ')}`;
  }
  if (file.size > MAX_SIZE) {
    return `${fieldName} exceeds 5MB size limit.`;
  }
  return null;
};


export const addDoctor = async (req: Request, res: Response):Promise<void> => {
    console.log(req.body);
    try {
      const {
        phoneNumber,
        password,
        ...otherFields
      } = req.body;
  
      const errors: string[] = [];
  
      // Required field validations
      if (!phoneNumber || !/^\+91\d{10}$/.test(phoneNumber)) {
        errors.push('Phone number is required and must be in the format +91XXXXXXXXXX.');
      }
      if (!password || password.length < 6) {
        errors.push('Password is required and must be at least 6 characters long.');
      }

  
      // File validation
      const files = req.files || {};
      const {
        profilePhoto,
        aadhaarCard,
        panCard,
        mbbsCertificate,
        pgCertificate,
        digitalSignature,
      } = files;
  
      const fileErrors = [
        validateFile(profilePhoto, 'Profile Photo'),
        validateFile(aadhaarCard, 'Aadhaar Card'),
        validateFile(panCard, 'PAN Card'),
        validateFile(mbbsCertificate, 'MBBS Certificate'),
        validateFile(pgCertificate, 'PG Certificate'),
        validateFile(digitalSignature, 'Digital Signature'),
      ].filter(Boolean) as string[];
  
      errors.push(...fileErrors);
  
      if (errors.length > 0) {
         res.status(400).json({ message: 'Validation failed', errors });
         return;
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newDoctor = createDoctor({
        phoneNumber,
        password: hashedPassword,
        ...otherFields,
      });
  
      res.status(201).json(newDoctor);
    } catch (error) {
      console.error('Upload Error:', error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  };


export const getAllDoctors = (_: Request, res: Response) => {
  res.status(200).json(doctors);
};

export const getDoctor = (req: Request, res: Response): void => {
  const doctor = getDoctorById(req.params.id);
  if (!doctor) {
    res.status(404).json({ message: 'Doctor not found' });
    return;
  }

  if (doctor.holiday) {
    res.status(404).json({ message: 'Doctor is currently on leave and not available for appointments.' });
    return;
  }

  res.status(200).json(doctor);
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
