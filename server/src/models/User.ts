import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserRole } from '@earthos/types';

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  role: { 
    type: String, 
    enum: ['GUEST', 'USER', 'NGO', 'REPAIR_SHOP', 'RECYCLER', 'PICKUP_PARTNER', 'ENTERPRISE', 'GOVERNMENT', 'ADMIN', 'SUPER_ADMIN'],
    default: 'USER'
  },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  refreshToken: { type: String }
}, {
  timestamps: true
});

// Pre-save hook: Hash passwords before writing to db
UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

// Instance method: Verify passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = model('User', UserSchema);
export default UserModel;
