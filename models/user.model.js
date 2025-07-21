import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  age: { type: Number },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  occupation: { type: String, required: true },
  annualIncome: { type: Number },
  signature: { type: String, required: true } // base64 string
}, { timestamps: true });

export default mongoose.model('User', userSchema);
