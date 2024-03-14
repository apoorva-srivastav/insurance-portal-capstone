import { Document } from 'mongoose';
export interface IUser extends Document {
  readonly username: string;
  readonly userId: string;
  readonly password: string;
  readonly role: string;
}
