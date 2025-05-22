export enum PharmacyStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Suspended = 'Suspended',
}

export interface Pharmacy {
  id: string;
  storeName: string;
  location: {
    street: string;
    city: string;
    state: string;
    pinCode: string; // Must match /^[0-9]{6}$/
    geoLocation: string;
  };
  contact: {
    phone: string; // Must match /^[0-9]{10}$/
    email: string; // Must be a valid email
  };
  legalPapers: {
    drugLicense: string;
    gstNumber: string;
    pan: string;
  };
  status: PharmacyStatus;
  createdAt: Date;
  updatedAt: Date;
}

