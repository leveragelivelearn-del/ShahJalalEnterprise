import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IHospital extends Document {
  name: string;
  slug: string;
  description: string;
  country: string;
  city: string;
  address: string;
  departments: string[];
  advancedFacilities: string[];
  logo?: string;
  images?: string[];
  packages?: { title: string; price: number; description: string }[];
  contactSupport?: string;
  isActive: boolean;
  embedding?: number[];
  createdAt: Date;
  updatedAt: Date;
}

const HospitalSchema: Schema<IHospital> = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    departments: { type: [String], default: [] },
    advancedFacilities: { type: [String], default: [] },
    logo: { type: String },
    images: { type: [String], default: [] },
    packages: [
      {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
      },
    ],
    contactSupport: { type: String },
    isActive: { type: Boolean, default: true },
    embedding: { type: [Number] },
  },
  { timestamps: true }
);

HospitalSchema.index({ isActive: 1, country: 1 });

const Hospital: Model<IHospital> =
  mongoose.models.Hospital || mongoose.model<IHospital>('Hospital', HospitalSchema);

export default Hospital;
