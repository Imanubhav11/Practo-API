import { Request, Response, NextFunction } from 'express';

export const validatePatientData = (req: Request, res: Response, next: NextFunction): void => {
  const {
    phone,
    password,
    name,
    address,
    email,
    age,
    allergies,
    medicalHistory
  } = req.body;

  const errors: string[] = [];

  // Phone (mandatory)
  if (!phone) {
    errors.push('Phone number is required.');
  } else if (!/^[0-9]{10}$/.test(phone)) {
    errors.push('Phone must be a 10-digit number.');
  }
  

  // Password (mandatory)
  if (!password) {
    errors.push('Password is required.');
  } else if (typeof password !== 'string' || password.length < 6) {
    errors.push('Password must be a string with at least 6 characters.');
  }

  // Optional validations
  if (name && (typeof name !== 'string' || name.trim().length < 3)) {
    errors.push('If provided, name must be a string with at least 3 characters.');
  }

  if (address) {
    const { street, city, state, pinCode } = address;

    if (pinCode && !/^[0-9]{6}$/.test(pinCode)) {
      errors.push('PIN Code must be a 6-digit number.');
    }

    if(street && typeof street !== 'string' || street.trim().length < 3) {
      errors.push('Street must be a string with at least 3 characters.');
    }

    if(city && typeof city !== 'string') {
        errors.push("City must be a string.");
    }

    if(state && typeof state !== 'string') {
        errors.push("State must be a string.");
    }
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Email must be a valid format.');
  }

  if (age != null && (typeof age !== 'number' || age < 0)) {
    errors.push('Age must be a non-negative number if provided.');
  }

  if (allergies && (!Array.isArray(allergies) || allergies.some((a) => typeof a !== 'string'))) {
    errors.push('Allergies must be an array of strings.');
  }

  if (medicalHistory) {
    if (!Array.isArray(medicalHistory)) {
      errors.push('Medical history must be an array.');
    } else {
      for (const entry of medicalHistory) {
        if (
          typeof entry !== 'object' ||
          !entry.condition ||
          typeof entry.condition !== 'string' ||
          !entry.diagnosedDate ||
          isNaN(Date.parse(entry.diagnosedDate))
        ) {
          errors.push('Each medical history entry must contain a valid condition and diagnosedDate.');
          break;
        }
      }
    }
  }

  if (errors.length > 0) {
    res.status(400).json({ message: 'Validation failed', errors });
    return;
  }

  next();
};
