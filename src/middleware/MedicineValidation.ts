import { Request, Response, NextFunction } from 'express';

export const validateMedicineData = (req: Request, res: Response, next: NextFunction): void => {
  const {
    name,
    brand,
    category,
    description,
    price,
    discountedPrice,
    quantity,
    stock,
    pharmacyId,
    image,
    requiresPrescription,
  } = req.body;

  const errors: string[] = [];

  // Name validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string.');
  }

  // Brand validation
  if (!brand || typeof brand !== 'string') {
    errors.push('Brand is required and must be a string.');
  }

  // Category enum validation
  const validCategories = ['OTC', 'Prescription', 'Supplement'];
  if (!category || typeof category !== 'string' || !validCategories.includes(category)) {
    errors.push(`Category must be one of: ${validCategories.join(', ')}.`);
  }

  // Description validation
  if (!description || typeof description !== 'string') {
    errors.push('Description is required and must be a string.');
  }

  // Price validation
  if (price == null || typeof price !== 'number' || price < 0) {
    errors.push('Price must be a non-negative number.');
  }

  // Discounted Price validation
  if (discountedPrice != null) {
    if (typeof discountedPrice !== 'number' || discountedPrice < 0) {
      errors.push('Discounted price must be a non-negative number if provided.');
    } else if (discountedPrice > price) {
      errors.push('Discounted price cannot be greater than original price.');
    }
  }

  // Quantity validation
  if (!quantity || typeof quantity !== 'string' || quantity.trim().length === 0) {
    errors.push('Quantity is required and must be a non-empty string.');
  }

  // Stock validation (boolean now)
  if (stock == null || typeof stock !== 'boolean') {
    errors.push('Stock must be a boolean.');
  }

  // Pharmacy ID validation
  if (!pharmacyId || typeof pharmacyId !== 'string') {
    errors.push('pharmacyId is required and must be a string.');
  }

  // Image URL validation
  if (image) {
    if (typeof image !== 'string') {
      errors.push('Image must be a string URL.');
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(image)) {
      errors.push('Image URL must end with .jpg, .jpeg, .png, .webp, or .gif.');
    }
  }

  // requiresPrescription boolean validation
  if (requiresPrescription != null && typeof requiresPrescription !== 'boolean') {
    errors.push('requiresPrescription must be a boolean if provided.');
  }

  // Final check
  if (errors.length > 0) {
    res.status(400).json({ message: 'Validation failed', errors });
    return;
  }

  next();
};
