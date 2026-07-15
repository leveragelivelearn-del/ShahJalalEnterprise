import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ILead extends Document {
  clientName: string;
  email: string;
  phone: string;
  division: 'Export' | 'Import' | 'Medical Tourism';
  serviceType: string;
  details: string;
  uploadedDocuments?: { name: string; url: string }[];
  applicationStatus: 'Submitted' | 'Reviewing' | 'Document Verification' | 'Processing' | 'Completed' | 'Rejected';
  assignedAdmin?: mongoose.Types.ObjectId;
  logs?: { status: string; notes: string; date: Date }[];
  paymentDetails?: {
    paidAmount: number;
    trxId: string;
    status: 'Pending' | 'Paid' | 'Failed';
  };
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema<ILead> = new Schema(
  {
    clientName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    division: { type: String, enum: ['Export', 'Import', 'Medical Tourism'], required: true },
    serviceType: { type: String, required: true },
    details: { type: String, required: true },
    uploadedDocuments: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    applicationStatus: {
      type: String,
      enum: ['Submitted', 'Reviewing', 'Document Verification', 'Processing', 'Completed', 'Rejected'],
      default: 'Submitted',
    },
    assignedAdmin: { type: Schema.Types.ObjectId, ref: 'User' },
    logs: [
      {
        status: { type: String, required: true },
        notes: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    paymentDetails: {
      paidAmount: { type: Number, default: 0 },
      trxId: { type: String },
      status: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
    },
  },
  { timestamps: true }
);

LeadSchema.index({ phone: 1, email: 1, division: 1 });

const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

export default Lead;
