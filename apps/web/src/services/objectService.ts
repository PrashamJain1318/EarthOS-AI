import { api } from '../lib/api';

export type ObjectCondition = 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR' | 'POOR';
export type LifecycleStage = 'ACTIVE' | 'IN_MAINTENANCE' | 'DECOMMISSIONED' | 'RECYCLED';
export type DonationStatus = 'NONE' | 'PENDING' | 'DONATED';
export type MarketplaceStatus = 'NONE' | 'LISTED' | 'SOLD';

export interface MaintenanceRecord {
  recordId: string;
  title: string;
  type: 'REPAIR' | 'PREVENTATIVE' | 'UPGRADE' | 'INSPECTION';
  date: string;
  cost?: number;
  technicianNotes?: string;
  receipts: string[];
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

export interface ObjectItem {
  _id: string;
  objectId: string;
  objectName: string;
  description?: string;
  category: string;
  subCategory?: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  purchaseDate?: string;
  purchasePrice?: number;
  currency: string;
  currentValue?: number;
  condition: string;
  quantity: number;
  warrantyExpiry?: string;
  warranty?: {
    provider?: string;
    contact?: string;
    documents: string[];
    reminders: number[];
  };
  maintenanceRecords?: MaintenanceRecord[];
  maintenanceDate?: string;
  location?: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    coordinates?: [number, number];
  };
  tags: string[];
  notes?: string;
  images: string[];
  qrCode?: string;
  aiScore: number;
  carbonScore: number;
  repairCount: number;
  lifecycleStage: string;
  donationStatus: string;
  marketplaceStatus: string;
  archived: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetObjectsResponse {
  success: boolean;
  data: ObjectItem[];
  pagination: PaginationMeta;
}

export interface ObjectFilters {
  q?: string;
  name?: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  category?: string;
  condition?: string;
  location?: string;
  hasWarranty?: string;
  minPurchaseDate?: string;
  maxPurchaseDate?: string;
  minPrice?: string;
  maxPrice?: string;
  minAiScore?: string;
  maxAiScore?: string;
  minCarbonScore?: string;
  maxCarbonScore?: string;
  tags?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export const objectService = {
  getObjects: async (filters: ObjectFilters): Promise<GetObjectsResponse> => {
    const params = new URLSearchParams();
    
    // Add all defined filter properties to URLSearchParams
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, String(value));
      }
    });

    const hasAdvancedFilters = Array.from(params.keys()).some(
      key => !['q', 'sortBy', 'sortOrder', 'page', 'limit'].includes(key)
    );

    const hasSearchQuery = params.has('q');

    let endpoint = `/objects?${params.toString()}`;
    
    if (hasAdvancedFilters) {
      endpoint = `/objects/filter?${params.toString()}`;
    } else if (hasSearchQuery) {
      endpoint = `/objects/search?${params.toString()}`;
    }

    return api.get(endpoint);
  },

  getObjectById: async (id: string): Promise<{ success: boolean; data: ObjectItem }> => {
    return api.get(`/objects/${id}`);
  },

  updateObject: async (id: string, data: Partial<ObjectItem>): Promise<{ success: boolean; data: ObjectItem }> => {
    return api.put(`/objects/${id}`, data);
  },

  deleteObject: async (id: string): Promise<{ success: boolean }> => {
    return api.delete(`/objects/${id}`);
  }
};
