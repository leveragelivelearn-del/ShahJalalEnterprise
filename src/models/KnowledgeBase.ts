import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IKnowledgeBase extends Document {
  title: string;
  category: 'Export' | 'Import' | 'Medical Tourism' | 'General';
  content: string;
  fileUrl?: string;
  embedding?: number[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const KnowledgeBaseSchema: Schema<IKnowledgeBase> = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, enum: ['Export', 'Import', 'Medical Tourism', 'General'], required: true },
    content: { type: String, required: true },
    fileUrl: { type: String },
    embedding: { type: [Number] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

KnowledgeBaseSchema.index({ isActive: 1, category: 1 });

const KnowledgeBase: Model<IKnowledgeBase> =
  mongoose.models.KnowledgeBase || mongoose.model<IKnowledgeBase>('KnowledgeBase', KnowledgeBaseSchema);

export default KnowledgeBase;
