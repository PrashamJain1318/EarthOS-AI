import { Schema, model, Document } from 'mongoose';

export interface ITag extends Document {
  name: string;
  slug: string;
  usageCount: number;
  lastUsedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TagSchema = new Schema<ITag>({
  name: {
    type: String,
    required: [true, 'Tag name is required.'],
    trim: true,
    maxlength: [50, 'Tag name cannot exceed 50 characters.']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  usageCount: {
    type: Number,
    default: 1,
    min: 0,
    index: true
  },
  lastUsedAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

TagSchema.index({ name: 'text' });

export const TagModel = model<ITag>('Tag', TagSchema);
export default TagModel;
