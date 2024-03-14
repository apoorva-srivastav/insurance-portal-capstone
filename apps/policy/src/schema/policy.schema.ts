import * as mongoose from 'mongoose';

export const PolicySchema = new mongoose.Schema({
  policyId: { type: String, required: true },
  company: { type: String, required: true },
  coverage: { type: String, required: true },
  policyType: { type: String, required: true },
  maxAge: { type: String, required: true },
  premium: { type: String, required: true },
});
