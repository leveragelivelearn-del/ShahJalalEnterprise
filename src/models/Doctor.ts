import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IDoctor extends Document {
  name: string;
  slug: string;
  hospitalId: mongoose.Types.ObjectId;
  specialty: string;
  qualification: string;
  experience: string;
  successStories?: string[];
  country: string;
  availableSlots?: string[];
  image?: string;
  isActive: boolean;
  embedding?: number[];
  createdAt: Date;
  updatedAt: Date;
}

const DoctorSchema: Schema<IDoctor> = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    hospitalId: { type: Schema.Types.ObjectId, ref: 'Hospital', required: true },
    specialty: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: String, required: true },
    successStories: { type: [String], default: [] },
    country: { type: String, required: true },
    availableSlots: { type: [String], default: [] },
    image: { type: String },
    isActive: { type: Boolean, default: true },
    embedding: { type: [Number] },
  },
  { timestamps: true }
);

DoctorSchema.index({ isActive: 1, specialty: 1, country: 1 });

const Doctor: Model<IDoctor> =
  mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema);

export default Doctor;
