export type ProductCategory = 'fruits' | 'vegetables';

export type EnquiryStatus = 'New' | 'Contacted' | 'Quotation Sent' | 'Confirmed' | 'Completed';

export type EnquiryType = 'general_quote' | 'export_enquiry' | 'bulk_order';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  imageUrl: string;
  variety: string;
  grade: string;
  size: string;
  origin: string;
  availability: 'In Season' | 'Year-round' | 'Limited Stock' | 'Upcoming Harvest';
  packagingOptions: string[];
  minOrderQuantity: string;
  domesticAvailability: boolean;
  domesticDetails?: string;
  exportAvailability: boolean;
  exportDetails?: string;
  description: string;
  shelfLife?: string;
  storageTemp?: string;
  isActive: boolean;
  isFeatured?: boolean;
}

export interface PackagingOption {
  id: string;
  name: string;
  description: string;
  suitableFor: string;
  image?: string;
  dimensions?: string;
  capacity?: string;
}

export interface Enquiry {
  id: string;
  referenceNumber: string;
  type: EnquiryType;
  fullName: string;
  companyName: string;
  mobileNumber: string;
  whatsappNumber: string;
  email: string;
  country: string;
  city: string;
  productRequired: string;
  quantity: string;
  packagingRequirement: string;
  deliveryLocation: string;
  requiredDeliveryDate: string;
  additionalRequirements?: string;
  destinationPort?: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
  quotedAmount?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  enquiryId?: string;
  type: 'enquiry' | 'status_update' | 'system';
}

export interface CompanyConfig {
  businessName: string;
  tagline: string;
  secondaryTagline: string;
  website: string;
  whatsapp: string;
  phone: string;
  email: string;
  instagram: string;
  address: string;
  bannerNotice: string;
  showBanner: boolean;
  upiId: string;
  upiName: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankIfsc: string;
  bankName: string;
  bankBranch: string;
}

export type PaymentPurpose = 
  | 'Advance Procurement'
  | 'Invoice Settlement'
  | 'Wholesale Order'
  | 'Export Consignment'
  | 'Sample Freight';

export type PaymentStatus = 'Pending Verification' | 'Verified' | 'Completed' | 'Rejected';

export interface BillPayment {
  id: string;
  receiptNumber: string;
  enquiryRef?: string;
  billNumber?: string;
  payerName: string;
  payerCompany?: string;
  payerPhone: string;
  payerEmail?: string;
  amount: number;
  purpose: PaymentPurpose;
  upiRefId: string; // 12-digit UTR / transaction ID
  paymentMode: 'UPI_QR' | 'UPI_APP' | 'UPI_ID' | 'BANK_TRANSFER';
  status: PaymentStatus;
  paymentDate: string;
  adminNotes?: string;
  receiptGenerated: boolean;
}
