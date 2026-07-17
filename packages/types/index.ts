export type UserRole = 
  | 'GUEST' 
  | 'USER' 
  | 'NGO' 
  | 'REPAIR_SHOP' 
  | 'RECYCLER' 
  | 'PICKUP_PARTNER' 
  | 'ENTERPRISE' 
  | 'GOVERNMENT' 
  | 'ADMIN' 
  | 'SUPER_ADMIN';

export interface LocationPoint {
  type: 'Point';
  coordinates: [number, number]; // [Longitude, Latitude]
}

export interface UserProfile {
  name: string;
  avatarUrl?: string;
  phone?: string;
  location?: LocationPoint;
}

export interface User {
  id: string;
  organizationId?: string;
  role: UserRole;
  email: string;
  profile: UserProfile;
  earthScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ObjectStatus = 
  | 'REGISTERED' 
  | 'MATCHED' 
  | 'IN_TRANSIT' 
  | 'DELIVERED' 
  | 'RECLAIMED';

export interface ChemicalComposition {
  [key: string]: number; // Percentage values summing to <= 1.0 (e.g. "polyethylene": 0.95)
}

export interface PhysicalObject {
  id: string;
  ownerId: string;
  status: ObjectStatus;
  name: string;
  category: string;
  description?: string;
  images: string[];
  chemicalComposition?: ChemicalComposition;
  hazardClassification?: string;
  estimatedValue?: number;
  carbonFootprintKgCO2e: number;
  registeredAt: Date;
}

export interface LineageCheckpoint {
  stage: string;
  timestamp: Date;
  facilityId: string;
  verifiedBy: string;
}

export interface EarthPassport {
  id: string;
  objectId: string;
  dppToken: string; // Cryptographic lineage signature
  manufactureOrigin: string;
  materialLineage: LineageCheckpoint[];
  purityCertificateUrl?: string;
  complianceCertificates: string[];
  generatedAt: Date;
}

export type RepairStatus = 
  | 'REQUESTED' 
  | 'SCHEDULED' 
  | 'IN_PROGRESS' 
  | 'COMPLETED' 
  | 'CANCELLED';

export interface RepairJob {
  id: string;
  objectId: string;
  repairShopId: string;
  issueDescription: string;
  estimatedCost?: number;
  scheduledDate: Date;
  status: RepairStatus;
  warrantyPeriodMonths?: number;
  createdAt: Date;
}

export type DonationStatus = 
  | 'PENDING_APPROVAL' 
  | 'ARRANGED' 
  | 'COLLECTED' 
  | 'DELIVERED';

export interface DonationRecord {
  id: string;
  objectId: string;
  donorId: string;
  ngoId: string;
  pickupManifestId?: string;
  status: DonationStatus;
  taxReceiptUrl?: string;
  createdAt: Date;
}

export type ListingType = 'SALE' | 'TRADE' | 'REQUEST';
export type ListingStatus = 'ACTIVE' | 'RESERVED' | 'SOLD' | 'WITHDRAWN';

export interface MarketplaceListing {
  id: string;
  objectId: string;
  sellerId: string;
  buyerId?: string;
  listingType: ListingType;
  price: number;
  currency: string;
  status: ListingStatus;
  matchedAt?: Date;
  createdAt: Date;
}

export type WalletTxType = 'CREDIT' | 'DEBIT';

export interface CarbonTransaction {
  id: string;
  amount: number;
  type: WalletTxType;
  description: string;
  timestamp: Date;
}

export interface CarbonWallet {
  id: string;
  userId: string;
  balanceCredits: number;
  transactions: CarbonTransaction[];
  lastUpdatedAt: Date;
}

export interface Community {
  id: string;
  name: string;
  region: string;
  memberIds: string[];
  totalCo2Abated: number;
  createdAt: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  communityId: string;
  targetMetric: 'CO2_KG' | 'TONS_DIVERTED' | 'OBJECTS_SCANNED';
  targetValue: number;
  currentProgress: number;
  startDate: Date;
  endDate: Date;
}

export interface Notification {
  id: string;
  recipientId: string;
  type: 'MATCH_FOUND' | 'DELIVERY_CONFIRMED' | 'WALLET_CREDIT';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}
