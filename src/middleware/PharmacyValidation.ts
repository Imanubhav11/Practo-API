import { Request, Response, NextFunction } from 'express';

export const validatePharmacyData = (req: Request, res: Response, next: NextFunction): void => {
  const { storeName, location, contact, legalPapers, status } = req.body;
  const errors: string[] = [];

  if (!storeName || typeof storeName !== 'string' || storeName.trim() === '') {
    errors.push('Store name is required.');
  }

  if (!location) {
    errors.push('Location is required.');
  } else {
    const { street, city, state, pinCode, geoLocation } = location;
    if (!street) errors.push('Street is required.');
    if (!city) errors.push('City is required.');
    if (!state) errors.push('State is required.');
    if (!pinCode || !/^[0-9]{6}$/.test(pinCode)) errors.push('PIN Code must be a valid 6-digit number.');
    if (!geoLocation) errors.push('GeoLocation is required.');
  }

  if (!contact) {
    errors.push('Contact information is required.');
  } else {
    const { phone, email } = contact;
    if (!phone || !/^[0-9]{10}$/.test(phone)) errors.push('Phone must be a valid 10-digit number.');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Email must be valid.');
  }

  if (!legalPapers) {
    errors.push('Legal papers are required.');
  } else {
    const { drugLicense, gstNumber, pan } = legalPapers;
    if (!drugLicense) errors.push('Drug License is required.');
    if (!gstNumber || !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstNumber)) {
      errors.push('GST number must be a valid 15-character GSTIN.');
    }
    if (!pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
      errors.push('PAN must be valid.');
    }
  }

  if (status && !['Active', 'Inactive', 'Suspended'].includes(status)) {
    errors.push('Status must be either Active, Inactive, or Suspended.');
  }

  if (errors.length > 0) {
    res.status(400).json({ message: 'Validation failed', errors });
    return;
  }

  next();
};
