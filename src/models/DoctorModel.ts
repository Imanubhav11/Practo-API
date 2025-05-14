
export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export enum AppointmentMode {
  InPerson = 'In-person',
  Video = 'Video',
  Chat = 'Chat',
}

export interface Doctor {
  id: string;

  // Section 1: Personal Info
  fullName: string;
  dateOfBirth: string;
  gender: Gender;
  phoneNumber: string;
  email: string;
  profilePhoto: string;

  // Section 2: Professional Credentials
  mbbsCertificate: string;
  pgCertificate?: string;
  registrationNumber: string;
  medicalCouncilName: string;
  stateOfRegistration: string;
  yearsOfExperience: number;
  specializations: string[];
  languagesSpoken: string[];

  // Section 3: Practice / Clinic Details
  clinicName: string;
  practiceAddress: string;
  city: string;
  pinCode: string;
  geoLocation?: string;
  consultationFees: {
    inClinic: number;
    online: number;
  };
  workingDays: string[];
  availableTimeSlots: string[];
  appointmentModes: AppointmentMode[];

  // Section 4: Identity & Compliance
  aadhaarCard: string;
  panCard: string;
  gstNumber?: string;
  digitalSignature?: string;

  // Section 5: Banking & Payments
  upiId?: string;
}


