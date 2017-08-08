// required
export const required = value => (value ? undefined : 'Required');

// max length
export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

// min length
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

// number
export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;

// minValue
export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;

// alphanumeric
export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined;

// char
export const alphabets = value =>
  value && /[^a-zA-Z ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined;

// phone number
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined;

// isEmail
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

// Minimum Title Length
export const minTitleLength = minLength(5);

// Maximum Title Length
export const maxTitleLength = maxLength(64);

// Minimum Paragraph Length
export const minParagraphLength = minLength(3);

// Maximum Paragraph Length
export const maxParagraphLength = maxLength(255);
