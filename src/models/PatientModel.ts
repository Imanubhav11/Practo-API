
export interface Address {
  street?: string;
  city?: string;
  state?: string;
  pinCode?: string; // Should match /^[0-9]{6}$/
}

export interface MedicalHistoryEntry {
  condition: string;
  diagnosedDate: Date;
}

export interface Patient {
  id: string; // UUID
  name?: string;
  address?: Address;
  phone: string; // Must match /^[0-9]{10}$/
  email?: string; // Should match /.+\@.+\..+/
  age?: number; // Must be >= 0
  allergies?: string[];
  medicalHistory?: MedicalHistoryEntry[];
  password: string; // Hashed using bcryptjs
  createdAt: Date;
  updatedAt: Date;
}

export interface PatientInput {
  phone: string; // Required
  name?: string;
  address?: Address;
  email?: string;
  age?: number;
  allergies?: string[];
  medicalHistory?: MedicalHistoryEntry[];
  password: string; // Plain text input; should be hashed before storing
}
