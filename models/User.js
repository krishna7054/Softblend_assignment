import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const { hash } = bcrypt;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});

export default model('User', userSchema);