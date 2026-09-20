import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  PackagingOption, 
  CompanyConfig, 
  Enquiry, 
  NotificationItem, 
  EnquiryStatus, 
  EnquiryType,
  BillPayment,
  PaymentPurpose,
  PaymentStatus
} from '../types';
import { 
  INITIAL_COMPANY_CONFIG, 
  INITIAL_PACKAGING_OPTIONS, 
  INITIAL_PRODUCTS, 
  INITIAL_ENQUIRIES,
  INITIAL_BILL_PAYMENTS 
} from '../data/initialData';

interface AppContextType {
  // Navigation & View
  activeView: string;
  setActiveView: (view: string) => void;
  selectedProductForQuote: Product | null;
  setSelectedProductForQuote: (product: Product | null) => void;
  selectedProductDetail: Product | null;
  setSelectedProductDetail: (product: Product | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: 'all' | 'fruits' | 'vegetables';
  setCategoryFilter: (category: 'all' | 'fruits' | 'vegetables') => void;

  // Bill Desk & UPI Navigation State
  billDeskPreset: { enquiryRef?: string; amount?: number; purpose?: PaymentPurpose; billNumber?: string } | null;
  openBillDesk: (preset?: { enquiryRef?: string; amount?: number; purpose?: PaymentPurpose; billNumber?: string }) => void;

  // Bill Payments & UPI State & Actions
  billPayments: BillPayment[];
  userPaymentIds: string[];
  addBillPayment: (paymentData: Omit<BillPayment, 'id' | 'receiptNumber' | 'status' | 'paymentDate' | 'receiptGenerated'>) => BillPayment;
  updatePaymentStatus: (id: string, status: PaymentStatus, adminNotes?: string) => void;

  // Products state & actions
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  toggleProductVisibility: (id: string) => void;

  // Packaging state & actions
  packagingOptions: PackagingOption[];
  addPackagingOption: (option: Omit<PackagingOption, 'id'>) => void;
  updatePackagingOption: (option: PackagingOption) => void;
  deletePackagingOption: (id: string) => void;

  // Company configuration
  companyConfig: CompanyConfig;
  updateCompanyConfig: (config: Partial<CompanyConfig>) => void;

  // Enquiries
  enquiries: Enquiry[];
  userEnquiryIds: string[];
  addEnquiry: (enquiryData: Omit<Enquiry, 'id' | 'referenceNumber' | 'status' | 'createdAt' | 'updatedAt'>) => Enquiry;
  updateEnquiryStatus: (id: string, status: EnquiryStatus, adminNotes?: string, quotedAmount?: string) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Admin authentication
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;

  // Modal helpers
  isQuoteModalOpen: boolean;
  openQuoteModal: (product?: Product | null, type?: EnquiryType) => void;
  closeQuoteModal: () => void;
  quoteModalDefaultType: EnquiryType;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'kalyan_products_v1',
  ENQUIRIES: 'kalyan_enquiries_v1',
  USER_ENQUIRY_IDS: 'kalyan_user_enquiries_v1',
  NOTIFICATIONS: 'kalyan_notifications_v1',
  COMPANY_CONFIG: 'kalyan_company_config_v1',
  PACKAGING: 'kalyan_packaging_v1',
  ADMIN_AUTH: 'kalyan_admin_auth_v1',
  BILL_PAYMENTS: 'kalyan_bill_payments_v1',
  USER_PAYMENT_IDS: 'kalyan_user_payments_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<Product | null>(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'fruits' | 'vegetables'>('all');

  // Bill Desk Navigation Preset
  const [billDeskPreset, setBillDeskPreset] = useState<{ 
    enquiryRef?: string; 
    amount?: number; 
    purpose?: PaymentPurpose; 
    billNumber?: string 
  } | null>(null);

  const openBillDesk = (preset?: { 
    enquiryRef?: string; 
    amount?: number; 
    purpose?: PaymentPurpose; 
    billNumber?: string 
  }) => {
    if (preset) {
      setBillDeskPreset(preset);
    }
    setActiveView('billdesk');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Modal helper
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quoteModalDefaultType, setQuoteModalDefaultType] = useState<EnquiryType>('general_quote');

  const openQuoteModal = (product: Product | null = null, type: EnquiryType = 'general_quote') => {
    setSelectedProductForQuote(product);
    setQuoteModalDefaultType(type);
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  // State: Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PRODUCTS;
  });

  // State: Packaging
  const [packagingOptions, setPackagingOptions] = useState<PackagingOption[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PACKAGING);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PACKAGING_OPTIONS;
  });

  // State: Company Config
  const [companyConfig, setCompanyConfig] = useState<CompanyConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMPANY_CONFIG);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_COMPANY_CONFIG;
  });

  // State: Enquiries
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_ENQUIRIES;
  });

  // State: User's own enquiry IDs for tracking
  const [userEnquiryIds, setUserEnquiryIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_ENQUIRY_IDS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    // Default include the demo ones so customer can immediately explore tracking
    return ['enq-101', 'enq-102', 'enq-103'];
  });

  // State: Bill Payments & UPI Transactions
  const [billPayments, setBillPayments] = useState<BillPayment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BILL_PAYMENTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_BILL_PAYMENTS;
  });

  // State: User's own payment IDs
  const [userPaymentIds, setUserPaymentIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_PAYMENT_IDS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return ['pay-101', 'pay-102'];
  });

  // State: Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'notif-1',
        title: 'New Export Quotation Sent',
        message: 'Status for Gulf Harvest Trading LLC (#KF-2026-0841) updated to Quotation Sent.',
        timestamp: new Date().toISOString(),
        read: false,
        enquiryId: 'enq-101',
        type: 'status_update',
      },
      {
        id: 'notif-2',
        title: 'Welcome to Kalyan Fresh App',
        message: 'Explore fresh fruits and vegetables procurement, request quotations, or connect with our export team.',
        timestamp: new Date().toISOString(),
        read: false,
        type: 'system',
      }
    ];
  });

  // State: Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  // Persist state updates to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PACKAGING, JSON.stringify(packagingOptions));
  }, [packagingOptions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPANY_CONFIG, JSON.stringify(companyConfig));
  }, [companyConfig]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER_ENQUIRY_IDS, JSON.stringify(userEnquiryIds));
  }, [userEnquiryIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BILL_PAYMENTS, JSON.stringify(billPayments));
  }, [billPayments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER_PAYMENT_IDS, JSON.stringify(userPaymentIds));
  }, [userPaymentIds]);

  // Actions: Products
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
    };
    setProducts(prev => [newProduct, ...prev]);

    // Notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Product Added',
      message: `${newProduct.name} (${newProduct.category}) has been added to the catalog.`,
      timestamp: new Date().toISOString(),
      read: false,
      type: 'system',
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const toggleProductVisibility = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };

  // Actions: Packaging
  const addPackagingOption = (data: Omit<PackagingOption, 'id'>) => {
    const newOption: PackagingOption = {
      ...data,
      id: `pack-${Date.now()}`,
    };
    setPackagingOptions(prev => [...prev, newOption]);
  };

  const updatePackagingOption = (updated: PackagingOption) => {
    setPackagingOptions(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const deletePackagingOption = (id: string) => {
    setPackagingOptions(prev => prev.filter(p => p.id !== id));
  };

  // Actions: Company Config
  const updateCompanyConfig = (config: Partial<CompanyConfig>) => {
    setCompanyConfig(prev => ({ ...prev, ...config }));
  };

  // Actions: Enquiries
  const addEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'referenceNumber' | 'status' | 'createdAt' | 'updatedAt'>): Enquiry => {
    const id = `enq-${Date.now()}`;
    const referenceNumber = `KF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    const newEnquiry: Enquiry = {
      ...enquiryData,
      id,
      referenceNumber,
      status: 'New',
      createdAt: now,
      updatedAt: now,
    };

    setEnquiries(prev => [newEnquiry, ...prev]);
    setUserEnquiryIds(prev => [id, ...prev]);

    // Add notification
    const typeLabel =
      enquiryData.type === 'export_enquiry'
        ? 'Export Enquiry'
        : enquiryData.type === 'bulk_order'
        ? 'Bulk Order Enquiry'
        : 'Quotation Request';

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `New ${typeLabel} Received`,
      message: `${enquiryData.fullName} from ${enquiryData.companyName || enquiryData.city} requested quotation for ${enquiryData.productRequired}. Ref: #${referenceNumber}`,
      timestamp: now,
      read: false,
      enquiryId: id,
      type: 'enquiry',
    };
    setNotifications(prev => [notif, ...prev]);

    return newEnquiry;
  };

  const updateEnquiryStatus = (id: string, status: EnquiryStatus, adminNotes?: string, quotedAmount?: string) => {
    const now = new Date().toISOString();
    let targetEnquiry: Enquiry | undefined;

    setEnquiries(prev =>
      prev.map(enq => {
        if (enq.id === id) {
          targetEnquiry = {
            ...enq,
            status,
            updatedAt: now,
            adminNotes: adminNotes !== undefined ? adminNotes : enq.adminNotes,
            quotedAmount: quotedAmount !== undefined ? quotedAmount : enq.quotedAmount,
          };
          return targetEnquiry;
        }
        return enq;
      })
    );

    if (targetEnquiry) {
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: `Enquiry Status: ${status}`,
        message: `Reference #${targetEnquiry.referenceNumber} for ${targetEnquiry.productRequired} is now marked as "${status}".`,
        timestamp: now,
        read: false,
        enquiryId: id,
        type: 'status_update',
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  // Actions: Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Actions: Bill Payments & UPI
  const addBillPayment = (paymentData: Omit<BillPayment, 'id' | 'receiptNumber' | 'status' | 'paymentDate' | 'receiptGenerated'>): BillPayment => {
    const id = `pay-${Date.now()}`;
    const year = new Date().getFullYear();
    const rand = Math.floor(1000 + Math.random() * 9000);
    const receiptNumber = `KF-RCP-${year}-${rand}`;
    const now = new Date().toISOString();

    const newPayment: BillPayment = {
      ...paymentData,
      id,
      receiptNumber,
      status: 'Pending Verification',
      paymentDate: now,
      receiptGenerated: true,
    };

    setBillPayments(prev => [newPayment, ...prev]);
    setUserPaymentIds(prev => [id, ...prev]);

    // Add notification
    const formattedAmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(paymentData.amount);
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'UPI Payment Submitted',
      message: `${paymentData.payerName} submitted ${formattedAmt} via ${paymentData.paymentMode.replace('_', ' ')} (UTR: ${paymentData.upiRefId}) for ${paymentData.purpose}. Receipt #${receiptNumber} generated.`,
      timestamp: now,
      read: false,
      type: 'enquiry',
    };
    setNotifications(prev => [notif, ...prev]);

    // If an enquiry reference was linked, add administrative payment note and update status if appropriate
    if (paymentData.enquiryRef) {
      setEnquiries(prev => prev.map(enq => {
        if (enq.referenceNumber.toLowerCase() === paymentData.enquiryRef?.toLowerCase() || enq.id === paymentData.enquiryRef) {
          const updatedNotes = enq.adminNotes 
            ? `${enq.adminNotes} | Payment of ${formattedAmt} received (UTR: ${paymentData.upiRefId}, RCP: ${receiptNumber}).`
            : `Payment of ${formattedAmt} received (UTR: ${paymentData.upiRefId}, RCP: ${receiptNumber}).`;
          return {
            ...enq,
            adminNotes: updatedNotes,
            status: enq.status === 'Quotation Sent' ? 'Confirmed' : enq.status,
            updatedAt: now,
          };
        }
        return enq;
      }));
    }

    return newPayment;
  };

  const updatePaymentStatus = (id: string, status: PaymentStatus, adminNotes?: string) => {
    let targetPayment: BillPayment | undefined;

    setBillPayments(prev => prev.map(pay => {
      if (pay.id === id) {
        targetPayment = {
          ...pay,
          status,
          adminNotes: adminNotes !== undefined ? adminNotes : pay.adminNotes,
        };
        return targetPayment;
      }
      return pay;
    }));

    if (targetPayment) {
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: `Payment Status: ${status}`,
        message: `Receipt #${targetPayment.receiptNumber} (${targetPayment.payerName}, UTR: ${targetPayment.upiRefId}) is now marked as "${status}".`,
        timestamp: new Date().toISOString(),
        read: false,
        type: 'status_update',
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  // Actions: Admin Auth
  const loginAdmin = (password: string): boolean => {
    // Standard access key for Kalyan Fresh Admin
    if (password === 'kalyan2026' || password === 'admin' || password === 'admin123') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedProductForQuote,
        setSelectedProductForQuote,
        selectedProductDetail,
        setSelectedProductDetail,
        searchQuery,
        setSearchQuery,
        categoryFilter,
        setCategoryFilter,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductVisibility,
        packagingOptions,
        addPackagingOption,
        updatePackagingOption,
        deletePackagingOption,
        companyConfig,
        updateCompanyConfig,
        enquiries,
        userEnquiryIds,
        addEnquiry,
        updateEnquiryStatus,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        isQuoteModalOpen,
        openQuoteModal,
        closeQuoteModal,
        quoteModalDefaultType,
        billDeskPreset,
        openBillDesk,
        billPayments,
        userPaymentIds,
        addBillPayment,
        updatePaymentStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
