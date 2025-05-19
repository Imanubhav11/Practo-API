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
  
  export enum AccountStatus {
    Verified = 'Verified',
    NotVerified = 'Not Verified',
    Suspended = 'Suspended',
    Left = 'Left',
  }
  
  export interface Doctor {
    id: string;
    phoneNumber: string;
    password: string;
  
    fullName?: string;
    dateOfBirth?: string;
    gender?: Gender;
    email?: string;
    profilePhoto?: string;
  
    mbbsCertificate?: string;
    pgCertificate?: string;
    registrationNumber?: string;
    medicalCouncilName?: string;
    stateOfRegistration?: string;
    yearsOfExperience?: number;
    specializations?: string[];
    languagesSpoken?: string[];
  
    clinicName?: string;
    practiceAddress?: string;
    city?: string;
    pinCode?: string;
    geoLocation?: string;
    consultationFees?: {
      inClinic: number;
      online: number;
    };
    workingDays?: string[];
    availableTimeSlots?: string[];
    appointmentModes?: AppointmentMode[];
  
    aadhaarCard?: string;
    panCard?: string;
    gstNumber?: string;
    digitalSignature?: string;
  
    upiId?: string;
  
    holiday?: boolean;
    accountStatus?: AccountStatus;
  }
  