import { Schema, model, Document, Types } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  parentId?: Types.ObjectId; // If null, it's a top-level category
  usageCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, 'Category name is required.'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters.']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
    index: true
  },
  usageCount: {
    type: Number,
    default: 0,
    min: 0,
    index: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

CategorySchema.index({ name: 'text' });

export const CategoryModel = model<ICategory>('Category', CategorySchema);
export default CategoryModel;
