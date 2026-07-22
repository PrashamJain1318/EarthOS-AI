import { Schema, model, Document, Types } from 'mongoose';

// ─── Enums ───────────────────────────────────────────────

export const OBJECT_CATEGORIES = [
  'ELECTRONICS', 'TEXTILES', 'METALS', 'PLASTICS',
  'ORGANICS', 'GLASS', 'PAPER', 'WOOD', 'CHEMICALS', 'OTHER'
] as const;

export const OBJECT_CONDITIONS = [
  'NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR', 'DAMAGED', 'NON_FUNCTIONAL'
] as const;

export const LIFECYCLE_STAGES = [
  'PRODUCTION', 'ACTIVE', 'REPAIR', 'REFURBISHED',
  'RECYCLED', 'DONATED', 'DISPOSED'
] as const;

export const DONATION_STATUSES = ['NONE', 'PENDING', 'DONATED'] as const;
export const MARKETPLACE_STATUSES = ['NONE', 'LISTED', 'SOLD', 'WITHDRAWN'] as const;

// ─── Interface ───────────────────────────────────────────

export interface IObject extends Omit<Document, 'model'> {
  userId: Types.ObjectId;
  objectId: string;
  objectName: string;
  description?: string;
  category: string;
  subCategory?: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  purchaseDate?: Date;
  purchasePrice?: number;
  currency: string;
  currentValue?: number;
  condition: typeof OBJECT_CONDITIONS[number];
  quantity: number;
  warrantyExpiry?: Date;
  warranty?: {
    provider?: string;
    contact?: string;
    documents: string[];
    reminders: number[];
  };
  maintenanceRecords: {
    recordId: string;
    title: string;
    type: 'REPAIR' | 'PREVENTATIVE' | 'UPGRADE' | 'INSPECTION';
    date: Date;
    cost?: number;
    technicianNotes?: string;
    receipts: string[];
    status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  }[];
  maintenanceDate?: Date;
  location?: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    coordinates?: [number, number]; // [longitude, latitude]
  };
  tags: string[];
  notes?: string;
  images: string[];
  qrCode?: string;
  aiScore: number;
  carbonScore: number;
  repairCount: number;
  lifecycleStage: typeof LIFECYCLE_STAGES[number];
  donationStatus: typeof DONATION_STATUSES[number];
  marketplaceStatus: typeof MARKETPLACE_STATUSES[number];
  archived: boolean;
  barcode?: string;
  passportId?: string;
  currentOwner?: string;
  previousOwners?: string[];
  scanMetadata?: {
    ocrResults?: any;
    aiSuggestions?: any;
    carbonEstimate?: any;
    originalImage?: string;
  };
  passportDocuments?: {
    name: string;
    type: 'INVOICE' | 'WARRANTY' | 'MANUAL' | 'CERTIFICATE' | 'RECEIPT' | 'OTHER';
    url: string;
    uploadedAt?: Date;
  }[];
  passportInsights?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// ─── Schema ──────────────────────────────────────────────

const LocationSchema = new Schema({
  address:     { type: String, trim: true },
  city:        { type: String, trim: true },
  state:       { type: String, trim: true },
  country:     { type: String, trim: true },
  coordinates: { type: [Number], validate: {
    validator: (v: number[]) => !v || v.length === 0 || v.length === 2,
    message: 'Coordinates must be an array of [longitude, latitude].'
  }}
}, { _id: false });

const ObjectSchema = new Schema<IObject>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  objectId: {
    type: String,
    required: true,
    unique: true
  },
  objectName: {
    type: String,
    required: [true, 'Object name is required.'],
    trim: true,
    maxlength: [200, 'Object name cannot exceed 200 characters.']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters.']
  },
  category: {
    type: String,
    required: [true, 'Category is required.'],
    index: true
  },
  subCategory: {
    type: String,
    trim: true,
    maxlength: [100, 'Sub-category cannot exceed 100 characters.']
  },
  brand: {
    type: String,
    trim: true,
    maxlength: [100, 'Brand cannot exceed 100 characters.']
  },
  model: {
    type: String,
    trim: true,
    maxlength: [100, 'Model cannot exceed 100 characters.']
  },
  serialNumber: {
    type: String,
    trim: true,
    sparse: true,
    index: true
  },
  purchaseDate: { type: Date },
  purchasePrice: {
    type: Number,
    min: [0, 'Purchase price cannot be negative.']
  },
  currency: {
    type: String,
    default: 'USD',
    trim: true,
    maxlength: [5, 'Currency code cannot exceed 5 characters.']
  },
  currentValue: {
    type: Number,
    min: [0, 'Current value cannot be negative.']
  },
  condition: {
    type: String,
    enum: OBJECT_CONDITIONS,
    default: 'GOOD',
    index: true
  },
  quantity: {
    type: Number,
    default: 1,
    min: [1, 'Quantity must be at least 1.']
  },
  warrantyExpiry: { type: Date },
  warranty: {
    provider: { type: String, trim: true, maxlength: 100 },
    contact: { type: String, trim: true, maxlength: 200 },
    documents: {
      type: [String],
      default: [],
      validate: {
        validator: (v: string[]) => v.length <= 5,
        message: 'Cannot have more than 5 warranty documents.'
      }
    },
    reminders: {
      type: [Number],
      default: []
    }
  },
  maintenanceRecords: {
    type: [{
      recordId: { type: String, required: true },
      title: { type: String, required: true, trim: true, maxlength: 150 },
      type: { type: String, enum: ['REPAIR', 'PREVENTATIVE', 'UPGRADE', 'INSPECTION'], required: true },
      date: { type: Date, required: true },
      cost: { type: Number, min: 0 },
      technicianNotes: { type: String, trim: true, maxlength: 2000 },
      receipts: { type: [String], default: [] },
      status: { type: String, enum: ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'], default: 'COMPLETED' }
    }],
    default: []
  },
  maintenanceDate: { type: Date },
  location: { type: LocationSchema },
  tags: {
    type: [String],
    default: [],
    validate: {
      validator: (v: string[]) => v.length <= 20,
      message: 'Cannot have more than 20 tags.'
    }
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [5000, 'Notes cannot exceed 5000 characters.']
  },
  images: {
    type: [String],
    default: [],
    validate: {
      validator: (v: string[]) => v.length <= 10,
      message: 'Cannot have more than 10 images.'
    }
  },
  qrCode: { type: String, trim: true },
  aiScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  carbonScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  repairCount: {
    type: Number,
    default: 0,
    min: 0
  },
  lifecycleStage: {
    type: String,
    enum: LIFECYCLE_STAGES,
    default: 'ACTIVE',
    index: true
  },
  donationStatus: {
    type: String,
    enum: DONATION_STATUSES,
    default: 'NONE'
  },
  marketplaceStatus: {
    type: String,
    enum: MARKETPLACE_STATUSES,
    default: 'NONE'
  },
  archived: {
    type: Boolean,
    default: false,
    index: true
  },
  barcode: {
    type: String,
    trim: true,
    index: true,
    sparse: true
  },
  scanMetadata: {
    type: Schema.Types.Mixed
  },
  passportId: {
    type: String,
    unique: true,
    sparse: true,
    index: true
  },
  currentOwner: {
    type: String,
    default: 'EarthOS Registered User'
  },
  previousOwners: {
    type: [String],
    default: ['Primary Retailer Store', 'Genesis Production Facility']
  },
  passportDocuments: {
    type: [{
      name: { type: String, required: true },
      type: { type: String, enum: ['INVOICE', 'WARRANTY', 'MANUAL', 'CERTIFICATE', 'RECEIPT', 'OTHER'], required: true },
      url: { type: String, required: true },
      uploadedAt: { type: Date, default: Date.now }
    }],
    default: []
  },
  passportInsights: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

// ─── Text Index for Full-Text Search ─────────────────────

ObjectSchema.index(
  { objectName: 'text', description: 'text', brand: 'text', tags: 'text' },
  { name: 'object_text_search', weights: { objectName: 10, brand: 5, tags: 3, description: 1 } }
);

// ─── Compound Index for Multi-Tenant Querying ────────────
ObjectSchema.index({ userId: 1, archived: 1, category: 1, condition: 1 });

// ─── Pre-save: Auto-generate objectId ────────────────────

ObjectSchema.pre<IObject>('save', async function (next) {
  if (!this.objectId) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    this.objectId = `EO-${randomSuffix}`;
  }
  if (!this.passportId) {
    let isUnique = false;
    let attempts = 0;
    while (!isUnique && attempts < 10) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let randomPart = '';
      for (let i = 0; i < 7; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      const candidate = `EARTH-2026-${randomPart}`;
      const existing = await model('Object').findOne({ passportId: candidate });
      if (!existing) {
        this.passportId = candidate;
        isUnique = true;
      }
      attempts++;
    }
    if (!isUnique) {
      this.passportId = `EARTH-2026-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    }
  }
  this.currentOwner = this.currentOwner || 'EarthOS Registered User';
  if (!this.previousOwners || this.previousOwners.length === 0) {
    this.previousOwners = ['Primary Retailer Store', 'Genesis Production Facility'];
  }
  if (!this.passportDocuments || this.passportDocuments.length === 0) {
    this.passportDocuments = [
      { name: 'Purchase_Invoice.pdf', type: 'INVOICE', url: '#' },
      { name: 'Manufacturer_Warranty_Card.pdf', type: 'WARRANTY', url: '#' },
      { name: 'User_Operations_Manual.pdf', type: 'MANUAL', url: '#' },
      { name: 'Material_Circularity_Certificate.pdf', type: 'CERTIFICATE', url: '#' }
    ];
  }
  if (!this.passportInsights || this.passportInsights.length === 0) {
    const isTech = ['ELECTRONICS', 'COMPUTERS', 'PHONES', 'TABLETS', 'LAPTOPS'].includes(this.category?.toUpperCase() || '') ||
                   this.objectName?.toLowerCase().includes('laptop') || 
                   this.objectName?.toLowerCase().includes('phone') ||
                   this.objectName?.toLowerCase().includes('computer');
    if (isTech) {
      this.passportInsights = [
        'AI suggestion: Service this hardware within 6 months.',
        'AI metrics: Replace battery to restore peak energy efficiency.',
        'AI market tip: Sell after 8 months to retain maximum resale value.',
        'AI environmental tip: Donate instead of recycling to maximize lifecycle extension.'
      ];
    } else {
      this.passportInsights = [
        'AI suggestion: Perform preventative cleaning every quarter.',
        'AI environmental tip: Consider donating to a local charity instead of disposing.',
        'AI circularity tip: Repairing represents a significant carbon offset.'
      ];
    }
  }
  next();
});

// ─── Export ──────────────────────────────────────────────

export const ObjectModel = model<IObject>('Object', ObjectSchema);
export default ObjectModel;
