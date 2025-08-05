import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: 'patient' | 'doctor' | 'intern';
  phone?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  // Points and rating system
  points: number;
  totalRatings: number;
  averageRating: number;
  // Doctor specific fields
  specialization?: string;
  licenseNumber?: string;
  experience?: number;
  qualifications?: string[];
  // Intern specific fields
  medicalSchool?: string;
  yearOfStudy?: number;
  interests?: string[];
  mentorDoctor?: mongoose.Types.ObjectId;
  // Patient specific fields
  emergencyContact?: {
    name?: string;
    phone?: string;
    relationship?: string;
  };
  medicalHistory?: string[];
  allergies?: string[];
  // Common fields
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AddressSchema = new Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  country: { type: String }
});

const EmergencyContactSchema = new Schema({
  name: { type: String },
  phone: { type: String },
  relationship: { type: String }
});

const UserSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot be more than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  userType: {
    type: String,
    required: [true, 'User type is required'],
    enum: ['patient', 'doctor', 'intern']
  },
  phone: {
    type: String,
    match: [/^\+?[\d\s-()]+$/, 'Please add a valid phone number']
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  address: AddressSchema,
  // Points and rating system
  points: {
    type: Number,
    default: 0,
    min: [0, 'Points cannot be negative']
  },
  totalRatings: {
    type: Number,
    default: 0,
    min: [0, 'Total ratings cannot be negative']
  },
  averageRating: {
    type: Number,
    default: 0,
    min: [0, 'Average rating cannot be negative'],
    max: [5, 'Average rating cannot exceed 5']
  },
  // Doctor specific fields
  specialization: {
    type: String,
    required: function(this: IUser) {
      return this.userType === 'doctor';
    }
  },
  licenseNumber: {
    type: String,
    required: function(this: IUser) {
      return this.userType === 'doctor';
    },
    sparse: true // Allow null values to be non-unique
  },
  experience: {
    type: Number,
    min: [0, 'Experience cannot be negative']
  },
  qualifications: [{
    type: String
  }],
  // Intern specific fields
  medicalSchool: {
    type: String,
    required: function(this: IUser) {
      return this.userType === 'intern';
    }
  },
  yearOfStudy: {
    type: Number,
    min: [1, 'Year of study must be at least 1'],
    max: [7, 'Year of study cannot exceed 7'],
    required: function(this: IUser) {
      return this.userType === 'intern';
    }
  },
  interests: [{
    type: String
  }],
  mentorDoctor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // Patient specific fields
  emergencyContact: EmergencyContactSchema,
  medicalHistory: [{
    type: String
  }],
  allergies: [{
    type: String
  }],
  // Common fields
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Index for better performance (email and licenseNumber already indexed via unique: true)
UserSchema.index({ userType: 1 });

export default mongoose.model<IUser>('User', UserSchema);
