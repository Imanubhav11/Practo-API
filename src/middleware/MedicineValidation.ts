import { Request, Response, NextFunction } from 'express';

export const validateMedicineData = (req: Request, res: Response, next: NextFunction):void => {
  const {
    name,
    brand,
    category,
    description,
    price,
    stock,
    pharmacyId,
    image,
    requiresPrescription,
  } = req.body;

  const errors: string[] = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0) errors.push('Name is required and must be a string.');
  if (!brand || typeof brand !== 'string') errors.push('Brand is required.');
  if (!['OTC', 'Prescription', 'Supplement'].includes(category)) errors.push('Invalid category.');
  if (!description || typeof description !== 'string') errors.push('Description is required.');
  if (price == null || typeof price !== 'number' || price < 0) errors.push('Price must be a non-negative number.');
  if (stock == null || typeof stock !== 'number' || stock < 0) errors.push('Stock must be a non-negative number.');
  if (!pharmacyId || typeof pharmacyId !== 'string') errors.push('pharmacyId is required and must be a string.');
  
  if (image && typeof image !== 'string') {
    errors.push('Image must be a string URL if provided.');
  } else if (image && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(image)) {
    errors.push('Image must be a valid URL ending in jpg, jpeg, png, webp, or gif.');
  }

  if (requiresPrescription != null && typeof requiresPrescription !== 'boolean') {
    errors.push('requiresPrescription must be a boolean if provided.');
  }

  if (errors.length > 0) {
    res.status(400).json({ message: 'Validation failed', errors });
    return;
  }

  next();
};
