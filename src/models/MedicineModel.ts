
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
    discountedPrice?: number;
    quantity: string;
    stock: boolean; // Changed from number to boolean
    pharmacyId: string; // Reference to Pharmacy
    image?: string;
    requiresPrescription: boolean;
    createdAt: Date;
    updatedAt: Date;
  }