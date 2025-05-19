import { Request, Response, NextFunction } from 'express';

const allowedFileExtensions = ['.jpeg', '.jpg', '.png', '.pdf'];
const maxFileSize = 5 * 1024 * 1024; // 5MB

function validateFile(file: any, fieldName: string, required: boolean = false, allowedExts = allowedFileExtensions): string | null {
  if (!file) {
    return required ? `${fieldName} is required.` : null;
  }

  const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  if (!allowedExts.includes(ext)) {
    return `${fieldName} must be one of the following types: ${allowedExts.join(', ')}`;
  }

  if (file.size > maxFileSize) {
    return `${fieldName} must not exceed 2MB.`;
  }

  return null;
}

export const validateDoctorData = (req: Request, res: Response, next: NextFunction): void => {
  let {
    fullName,
    dateOfBirth,
    gender,
    phoneNumber,
    email,
    password,
    registrationNumber,
    medicalCouncilName,
    stateOfRegistration,
    yearsOfExperience,
    specializations,
    languagesSpoken,
    clinicName,
    practiceAddress,
    city,
    pinCode,
    consultationFees,
    workingDays,
    availableTimeSlots,
    appointmentModes,
    gstNumber,
    upiId,
  } = req.body;

  const errors: string[] = [];

  // Mandatory field checks
  if (!phoneNumber || !/^\+91\d{10}$/.test(phoneNumber)) {
    errors.push('Phone number is required and must be in the format +91XXXXXXXXXX.');
  }

  if (!password || password.length < 6) {
    errors.push('Password is required and must be at least 6 characters.');
  }

  // Optional field validations
  if (fullName && fullName.trim().length < 3) errors.push('Full name must be at least 3 characters.');
  if (dateOfBirth && isNaN(Date.parse(dateOfBirth))) errors.push('Date of birth must be a valid date.');
  if (gender && !['Male', 'Female', 'Other'].includes(gender)) errors.push('Gender must be Male, Female, or Other.');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Email must be valid.');
  if (registrationNumber && typeof registrationNumber !== 'string') errors.push('Registration number must be a string.');
  if (medicalCouncilName && typeof medicalCouncilName !== 'string') errors.push('Medical council name must be a string.');
  if (stateOfRegistration && typeof stateOfRegistration !== 'string') errors.push('State of registration must be a string.');
  if (yearsOfExperience && isNaN(Number(yearsOfExperience))) errors.push('Years of experience must be a number.');
  
  // JSON parsing for optional arrays
  try {
    if (typeof specializations === 'string') specializations = JSON.parse(specializations);
    if (typeof languagesSpoken === 'string') languagesSpoken = JSON.parse(languagesSpoken);
    if (typeof workingDays === 'string') workingDays = JSON.parse(workingDays);
    if (typeof availableTimeSlots === 'string') availableTimeSlots = JSON.parse(availableTimeSlots);
    if (typeof appointmentModes === 'string') appointmentModes = JSON.parse(appointmentModes);
  } catch {
    res.status(400).json({ message: 'Invalid JSON format in one of the array fields' });
    return;
  }

  if (specializations && (!Array.isArray(specializations) || specializations.length === 0)) {
    errors.push('If provided, at least one specialization is required.');
  }

  if (languagesSpoken && (!Array.isArray(languagesSpoken) || languagesSpoken.length === 0)) {
    errors.push('If provided, at least one language is required.');
  }

  if (clinicName && typeof clinicName !== 'string') errors.push('Clinic name must be a string.');
  if (practiceAddress && typeof practiceAddress !== 'string') errors.push('Practice address must be a string.');
  if (city && typeof city !== 'string') errors.push('City must be a string.');
  if (pinCode && !/^[0-9]{6}$/.test(pinCode)) errors.push('PIN Code must be a 6-digit number.');

  // Consultation Fees (optional, but if present must be valid)
  if (
    req.body['consultationFees[inClinic]'] ||
    req.body['consultationFees[online]']
  ) {
    consultationFees = {
      inClinic: req.body['consultationFees[inClinic]'],
      online: req.body['consultationFees[online]'],
    };

    if (
      isNaN(Number(consultationFees.inClinic)) ||
      isNaN(Number(consultationFees.online))
    ) {
      errors.push('Consultation fees must include valid numeric inClinic and online values.');
    }
  }

  if (workingDays && (!Array.isArray(workingDays) || workingDays.length === 0)) {
    errors.push('If provided, at least one working day is required.');
  }

  if (availableTimeSlots && (!Array.isArray(availableTimeSlots) || availableTimeSlots.length === 0)) {
    errors.push('If provided, available time slots must be an array.');
  }

  const validModes = ['In-person', 'Video', 'Chat'];
  if (
    appointmentModes &&
    (!Array.isArray(appointmentModes) || !appointmentModes.every((mode) => validModes.includes(mode)))
  ) {
    errors.push('Appointment modes must be an array of valid values: In-person, Video, Chat.');
  }

  // File validations
  const files = req.files || {};
  const {
    profilePhoto,
    aadhaarCard,
    panCard,
    mbbsCertificate,
    pgCertificate,
    digitalSignature,
  } = files;

  const fileErrors = [
    validateFile(profilePhoto, 'Profile Photo'),
    validateFile(aadhaarCard, 'Aadhaar Card'),
    validateFile(panCard, 'PAN Card'),
    validateFile(mbbsCertificate, 'MBBS Certificate'),
    validateFile(pgCertificate, 'PG Certificate', false),
    validateFile(digitalSignature, 'Digital Signature', false, ['.jpg', '.jpeg', '.png']),
  ].filter(Boolean) as string[];

  errors.push(...fileErrors);

  // Optional GST and UPI
  if (gstNumber && !gstNumber.match(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)) {
    errors.push('GST number must be a valid 15-character Indian GSTIN.');
  }

  if (upiId && !upiId.match(/^[\w.-]+@[\w.-]+$/)) {
    errors.push('UPI ID must be a valid format (e.g., name@bank).');
  }

  if (errors.length > 0) {
    res.status(400).json({ message: 'Validation failed', errors });
    return;
  }

  next();
};
