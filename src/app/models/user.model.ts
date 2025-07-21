export interface User {
  _id?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  age?: number;
  addressLine1: string;
  addressLine2?: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  occupation: string;
  annualIncome?: number;
  signature: string; // base64 string
}
