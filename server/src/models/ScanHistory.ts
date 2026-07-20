import { Schema, model, Document, Types } from 'mongoose';

export interface IScanHistory extends Document {
  userId: Types.ObjectId;
  status: 'success' | 'failed';
  category: string;
  barcode?: string;
  ocrData?: any;
  aiResult?: any;
  carbonEstimate?: any;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ScanHistorySchema = new Schema<IScanHistory>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['success', 'failed'],
    required: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  barcode: {
    type: String,
    trim: true,
    sparse: true
  },
  ocrData: {
    type: Schema.Types.Mixed
  },
  aiResult: {
    type: Schema.Types.Mixed
  },
  carbonEstimate: {
    type: Schema.Types.Mixed
  },
  image: {
    type: String
  }
}, {
  timestamps: true
});

export const ScanHistoryModel = model<IScanHistory>('ScanHistory', ScanHistorySchema);
export default ScanHistoryModel;
