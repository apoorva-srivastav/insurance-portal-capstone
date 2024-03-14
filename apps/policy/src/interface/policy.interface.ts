import { Document } from 'mongoose';
export interface IPolicy extends Document {
  readonly policyId: string;
  readonly company: string;
  readonly coverage: string;
  readonly policyType: string;
  readonly maxAge: string;
  readonly premium: string;
}
