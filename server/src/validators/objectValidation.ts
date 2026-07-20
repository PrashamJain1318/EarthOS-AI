import { z } from 'zod';
import {
  OBJECT_CONDITIONS,
  LIFECYCLE_STAGES,
  DONATION_STATUSES,
  MARKETPLACE_STATUSES
} from '../models/Object';

// ─── Location Sub-Schema ─────────────────────────────────

const locationSchema = z.object({
  address:     z.string().max(300).trim().optional(),
  city:        z.string().max(100).trim().optional(),
  state:       z.string().max(100).trim().optional(),
  country:     z.string().max(100).trim().optional(),
  coordinates: z.array(z.number()).length(2).optional()
}).optional();

// ─── Warranty Sub-Schema ─────────────────────────────────

const warrantySchema = z.object({
  provider: z.string().max(100).trim().optional().nullable(),
  contact: z.string().max(200).trim().optional().nullable(),
  documents: z.array(z.string().url()).max(5).default([]),
  reminders: z.array(z.number()).default([])
}).optional().nullable();

// ─── Maintenance Sub-Schema ──────────────────────────────

const maintenanceRecordSchema = z.object({
  recordId: z.string().min(1),
  title: z.string().max(150).trim(),
  type: z.enum(['REPAIR', 'PREVENTATIVE', 'UPGRADE', 'INSPECTION']),
  date: z.string().datetime().or(z.date()),
  cost: z.number().min(0).optional().nullable(),
  technicianNotes: z.string().max(2000).trim().optional().nullable(),
  receipts: z.array(z.string().url()).max(10).default([]),
  status: z.enum(['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).default('COMPLETED')
});

// ─── Create Object Validation ────────────────────────────

export const createObjectSchema = z.object({
  objectName:       z.string().min(1, 'Object name is required.').max(200).trim(),
  description:      z.string().max(2000).trim().optional(),
  category:         z.string().min(1, 'Category is required.').trim(),
  subCategory:      z.string().max(100).trim().optional(),
  brand:            z.string().max(100).trim().optional(),
  model:            z.string().max(100).trim().optional(),
  serialNumber:     z.string().trim().optional(),
  purchaseDate:     z.string().datetime().optional().or(z.string().optional()),
  purchasePrice:    z.number().min(0, 'Purchase price cannot be negative.').optional(),
  currency:         z.string().max(5).trim().default('USD'),
  currentValue:     z.number().min(0, 'Current value cannot be negative.').optional(),
  condition:        z.enum(OBJECT_CONDITIONS).default('GOOD'),
  quantity:         z.number().int().min(1, 'Quantity must be at least 1.').default(1),
  warrantyExpiry:   z.string().datetime().optional().or(z.string().optional()).nullable(),
  warranty:         warrantySchema,
  maintenanceRecords: z.array(maintenanceRecordSchema).optional(),
  maintenanceDate:  z.string().datetime().optional().or(z.string().optional()).nullable(),
  location:         locationSchema,
  tags:             z.array(z.string().max(50).trim()).max(20).default([]),
  notes:            z.string().max(5000).trim().optional(),
  images:           z.array(z.string()).max(10).default([]),
  qrCode:           z.string().trim().optional(),
  aiScore:          z.number().min(0).max(100).default(0),
  carbonScore:      z.number().min(0).max(100).default(0),
  repairCount:      z.number().int().min(0).default(0),
  lifecycleStage:   z.enum(LIFECYCLE_STAGES).default('ACTIVE'),
  donationStatus:   z.enum(DONATION_STATUSES).default('NONE'),
  marketplaceStatus: z.enum(MARKETPLACE_STATUSES).default('NONE'),
  archived:         z.boolean().default(false),
  barcode:          z.string().trim().optional(),
  currentOwner:     z.string().trim().optional(),
  previousOwners:    z.array(z.string().trim()).optional(),
  scanMetadata:     z.object({
    ocrResults:     z.any().optional(),
    aiSuggestions:  z.any().optional(),
    carbonEstimate: z.any().optional(),
    originalImage:  z.string().optional()
  }).optional()
});

export type CreateObjectInput = z.infer<typeof createObjectSchema>;

// ─── Update Object Validation ────────────────────────────

export const updateObjectSchema = createObjectSchema.partial();

export type UpdateObjectInput = z.infer<typeof updateObjectSchema>;

// ─── Pagination & Sorting ────────────────────────────────

export const paginationSchema = z.object({
  page:      z.string().transform((v) => Math.max(1, parseInt(v, 10) || 1)).default('1'),
  limit:     z.string().transform((v) => Math.min(100, Math.max(1, parseInt(v, 10) || 20))).default('20'),
  sortBy:    z.string().trim().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

export type PaginationInput = z.infer<typeof paginationSchema>;

// ─── Search Validation ───────────────────────────────────

export const searchSchema = z.object({
  q: z.string().min(1, 'Search query is required.').max(200).trim()
});

export type SearchInput = z.infer<typeof searchSchema>;

// ─── Filter Validation ──────────────────────────────────

export const filterSchema = z.object({
  q:                 z.string().trim().optional(),
  name:              z.string().trim().optional(),
  brand:             z.string().trim().optional(),
  model:             z.string().trim().optional(),
  serialNumber:      z.string().trim().optional(),
  location:          z.string().trim().optional(),
  category:          z.string().trim().optional(),
  condition:         z.enum(OBJECT_CONDITIONS).optional(),
  lifecycleStage:    z.enum(LIFECYCLE_STAGES).optional(),
  donationStatus:    z.enum(DONATION_STATUSES).optional(),
  marketplaceStatus: z.enum(MARKETPLACE_STATUSES).optional(),
  hasWarranty:       z.string().transform((v) => v === 'true').optional(),
  minPurchaseDate:   z.string().datetime().optional().or(z.string().optional()),
  maxPurchaseDate:   z.string().datetime().optional().or(z.string().optional()),
  archived:          z.string().transform((v) => v === 'true').optional(),
  minPrice:          z.string().transform((v) => parseFloat(v)).optional(),
  maxPrice:          z.string().transform((v) => parseFloat(v)).optional(),
  minAiScore:        z.string().transform((v) => parseFloat(v)).optional(),
  maxAiScore:        z.string().transform((v) => parseFloat(v)).optional(),
  minCarbonScore:    z.string().transform((v) => parseFloat(v)).optional(),
  maxCarbonScore:    z.string().transform((v) => parseFloat(v)).optional(),
  tags:              z.string().transform((v) => v.split(',')).optional()
});

export type FilterInput = z.infer<typeof filterSchema>;
