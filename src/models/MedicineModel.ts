
export enum MedicineCategory {
    OTC = 'OTC',
    Prescription = 'Prescription',
    Supplement = 'Supplement',
  }
  
  export interface Medicine {
    medicineId: string;
    name: string;
    brand: string;
    category: MedicineCategory;
    description: string;
    price: number;
    stock: number;
    pharmacyId: string; // Reference to Pharmacy
    image?: string;
    requiresPrescription: boolean;
    createdAt: Date;
    updatedAt: Date;
  }