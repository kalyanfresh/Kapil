import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Package, 
  Layers, 
  FileText, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  Check, 
  Search, 
  Save, 
  X, 
  MessageSquare, 
  Globe2, 
  Clock, 
  Building, 
  Phone, 
  Mail, 
  ExternalLink,
  DollarSign,
  CreditCard,
  Receipt,
  Printer,
  QrCode,
  AlertCircle
} from 'lucide-react';
import { Product, EnquiryStatus, EnquiryType, PackagingOption, CompanyConfig, BillPayment, PaymentStatus } from '../types';
import { KalyanFreshLogo } from '../components/KalyanFreshLogo';

export const AdminDashboardView: React.FC = () => {
  const { 
    isAdminLoggedIn, 
    loginAdmin, 
    logoutAdmin,
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    toggleProductVisibility,
    enquiries, 
    updateEnquiryStatus,
    companyConfig, 
    updateCompanyConfig,
    packagingOptions,
    addPackagingOption,
    updatePackagingOption,
    deletePackagingOption,
    billPayments,
    updatePaymentStatus,
    setActiveView
  } = useApp();

  // Login form state
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active Admin Tab
  const [adminTab, setAdminTab] = useState<'overview' | 'enquiries' | 'billdesk' | 'products' | 'packaging' | 'settings'>('overview');

  // Bill Desk Filter & Receipt Modal State
  const [paymentFilterStatus, setPaymentFilterStatus] = useState<string>('all');
  const [paymentSearch, setPaymentSearch] = useState<string>('');
  const [adminViewingReceipt, setAdminViewingReceipt] = useState<BillPayment | null>(null);

  // Product Edit Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({
    name: '',
    category: 'fruits',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
    variety: '',
    grade: 'Export Grade A',
    size: 'Uniformly calibrated',
    origin: 'Maharashtra, India',
    availability: 'In Season',
    packagingOptions: ['Corrugated Export Cartons (CFB)'],
    minOrderQuantity: '1 Metric Ton',
    domesticAvailability: true,
    domesticDetails: 'Supplied to wholesale and retail networks.',
    exportAvailability: true,
    exportDetails: 'Export-grade packaging with inspection certificates.',
    description: '',
    shelfLife: '20-30 days',
    storageTemp: '10°C - 12°C',
    isActive: true,
    isFeatured: false,
  });

  // Packaging Edit State
  const [editingPackaging, setEditingPackaging] = useState<PackagingOption | null>(null);
  const [isAddingPackaging, setIsAddingPackaging] = useState(false);
  const [packagingForm, setPackagingForm] = useState<Omit<PackagingOption, 'id'>>({
    name: '',
    description: '',
    suitableFor: '',
    capacity: '',
    dimensions: '',
  });

  // Company Settings Form State
  const [configForm, setConfigForm] = useState<CompanyConfig>(companyConfig);
  const [configSaved, setConfigSaved] = useState(false);

  // Enquiry Filter & Action State
  const [enquiryFilterStatus, setEnquiryFilterStatus] = useState<string>('all');
  const [enquiryFilterType, setEnquiryFilterType] = useState<string>('all');
  const [selectedEnquiryForStatus, setSelectedEnquiryForStatus] = useState<string | null>(null);
  const [statusUpdateForm, setStatusUpdateForm] = useState<{
    status: EnquiryStatus;
    notes: string;
    quotedAmount: string;
  }>({
    status: 'New',
    notes: '',
    quotedAmount: '',
  });

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passwordInput);
    if (success) {
      setLoginError(false);
      setPasswordInput('');
    } else {
      setLoginError(true);
    }
  };

  // If Not Logged In -> Show Secure Login Gate
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-8 space-y-6 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="rounded-full p-1 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-md">
              <KalyanFreshLogo size={80} className="rounded-full" />
            </div>
            <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              Official Management Portal
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-stone-900 font-serif">
              Kalyan Fresh Admin
            </h2>
            <p className="text-xs text-stone-500">
              Secure console for catalog, orders, and company settings.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Admin Access Key / Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin password..."
                value={passwordInput}
                onChange={e => {
                  setPasswordInput(e.target.value);
                  setLoginError(false);
                }}
                className="w-full px-3 py-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
              {loginError && (
                <span className="text-[11px] text-red-600 mt-1 block">
                  Invalid credentials. Default key is <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-800">kalyan2026</code>
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-md"
            >
              Sign In to Dashboard
            </button>
          </form>

          {/* Quick Demo Access Helper */}
          <div className="pt-2 border-t border-stone-100">
            <button
              onClick={() => loginAdmin('kalyan2026')}
              className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold underline"
            >
              One-Click Demo Access (kalyan2026)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle Product Save
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct({
        ...productForm,
        id: editingProduct.id,
      });
      setEditingProduct(null);
    } else {
      addProduct(productForm);
      setIsAddingProduct(false);
    }
  };

  // Open Edit Product
  const startEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      category: p.category,
      imageUrl: p.imageUrl,
      variety: p.variety,
      grade: p.grade,
      size: p.size,
      origin: p.origin,
      availability: p.availability,
      packagingOptions: p.packagingOptions,
      minOrderQuantity: p.minOrderQuantity,
      domesticAvailability: p.domesticAvailability,
      domesticDetails: p.domesticDetails || '',
      exportAvailability: p.exportAvailability,
      exportDetails: p.exportDetails || '',
      description: p.description,
      shelfLife: p.shelfLife || '',
      storageTemp: p.storageTemp || '',
      isActive: p.isActive,
      isFeatured: p.isFeatured || false,
    });
  };

  // Open Add Product
  const startAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'fruits',
      imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
      variety: '',
      grade: 'Export Grade A',
      size: 'Calibrated',
      origin: 'India',
      availability: 'In Season',
      packagingOptions: ['Corrugated Export Cartons (CFB)'],
      minOrderQuantity: '1 Metric Ton',
      domesticAvailability: true,
      domesticDetails: 'Available for domestic supply.',
      exportAvailability: true,
      exportDetails: 'Available for containerized export.',
      description: '',
      shelfLife: '15-25 days',
      storageTemp: '10°C - 12°C',
      isActive: true,
      isFeatured: false,
    });
    setIsAddingProduct(true);
  };

  // Handle Packaging Save
  const handlePackagingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPackaging) {
      updatePackagingOption({
        ...packagingForm,
        id: editingPackaging.id,
      });
      setEditingPackaging(null);
    } else {
      addPackagingOption(packagingForm);
      setIsAddingPackaging(false);
    }
  };

  // Handle Settings Save
  const handleConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyConfig(configForm);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 3000);
  };

  // Handle Enquiry Status Save
  const handleStatusUpdateSubmit = (enquiryId: string) => {
    updateEnquiryStatus(
      enquiryId,
      statusUpdateForm.status,
      statusUpdateForm.notes,
      statusUpdateForm.quotedAmount
    );
    setSelectedEnquiryForStatus(null);
  };

  const filteredEnquiries = enquiries.filter(enq => {
    if (enquiryFilterStatus !== 'all' && enq.status !== enquiryFilterStatus) return false;
    if (enquiryFilterType !== 'all' && enq.type !== enquiryFilterType) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Admin Header Bar */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="rounded-full p-1 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-md shrink-0">
            <KalyanFreshLogo size={52} className="rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-serif">
                Kalyan Fresh Administration
              </h1>
              <span className="bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                ®
              </span>
              <span className="bg-emerald-800 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                Active Portal
              </span>
            </div>
            <p className="text-xs text-stone-300">
              Manage produce products, customer quotation requests, export orders, packaging, and company profile.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('home')}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Preview Site
          </button>
          <button
            onClick={logoutAdmin}
            className="px-3.5 py-2 bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-stone-200">
        <button
          onClick={() => setAdminTab('overview')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shrink-0 ${
            adminTab === 'overview'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setAdminTab('enquiries')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shrink-0 ${
            adminTab === 'enquiries'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Enquiries & Pipeline ({enquiries.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('billdesk')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shrink-0 ${
            adminTab === 'billdesk'
              ? 'bg-amber-500 text-stone-950 shadow-xs font-extrabold'
              : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <CreditCard className="w-4 h-4 text-amber-700" />
          <span>Bill Desk & UPI ({billPayments.length})</span>
          {billPayments.filter(p => p.status === 'Pending Verification').length > 0 && (
            <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
              {billPayments.filter(p => p.status === 'Pending Verification').length} pending
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('products')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shrink-0 ${
            adminTab === 'products'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products Catalog ({products.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('packaging')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shrink-0 ${
            adminTab === 'packaging'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Packaging Options ({packagingOptions.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('settings')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shrink-0 ${
            adminTab === 'settings'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Company & Contact Info</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {adminTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider">Total Enquiries</span>
              <div className="text-2xl font-bold text-stone-900">{enquiries.length}</div>
              <span className="text-[11px] text-emerald-700 font-medium">Domestic & Export</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider">Active Products</span>
              <div className="text-2xl font-bold text-stone-900">{products.filter(p => p.isActive).length}</div>
              <span className="text-[11px] text-stone-500">Fruits & Vegetables</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider">Pending Quotes (New)</span>
              <div className="text-2xl font-bold text-amber-700">{enquiries.filter(e => e.status === 'New').length}</div>
              <span className="text-[11px] text-amber-800 font-medium">Awaiting contact</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider">Export Inquiries</span>
              <div className="text-2xl font-bold text-blue-700">{enquiries.filter(e => e.type === 'export_enquiry').length}</div>
              <span className="text-[11px] text-blue-800 font-medium">Global buyer desk</span>
            </div>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="bg-stone-50 p-6 rounded-3xl border border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-stone-900">Quick Administrative Actions</h3>
              <p className="text-xs text-stone-500">Manage catalog and enquiries with single-click access</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={startAddProduct}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Produce</span>
              </button>
              <button
                onClick={() => setAdminTab('enquiries')}
                className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-xl text-xs font-bold"
              >
                Review Inbound Quotes
              </button>
            </div>
          </div>

          {/* Recent Enquiries Preview */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-stone-900">Recent Customer Enquiries</h3>
              <button
                onClick={() => setAdminTab('enquiries')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
              >
                View All Enquiries →
              </button>
            </div>

            <div className="divide-y divide-stone-100">
              {enquiries.slice(0, 3).map(enq => (
                <div key={enq.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-900">#{enq.referenceNumber}</span>
                      <span className="text-[10px] text-stone-500">• {enq.fullName} ({enq.companyName || enq.city})</span>
                    </div>
                    <span className="text-stone-600">{enq.productRequired} — {enq.quantity}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                    {enq.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ENQUIRIES MANAGEMENT PIPELINE */}
      {adminTab === 'enquiries' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="font-semibold text-stone-700">Filter by Status:</span>
              {(['all', 'New', 'Contacted', 'Quotation Sent', 'Confirmed', 'Completed'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setEnquiryFilterStatus(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    enquiryFilterStatus === s
                      ? 'bg-emerald-800 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {s === 'all' ? 'All Statuses' : s}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-stone-700">Type:</span>
              <select
                value={enquiryFilterType}
                onChange={e => setEnquiryFilterType(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
              >
                <option value="all">All Types</option>
                <option value="general_quote">General Quote</option>
                <option value="export_enquiry">Export Enquiry</option>
                <option value="bulk_order">Bulk Order</option>
              </select>
            </div>
          </div>

          {/* Enquiries List */}
          <div className="space-y-4">
            {filteredEnquiries.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center text-stone-500 text-xs">
                No enquiries found matching this filter.
              </div>
            ) : (
              filteredEnquiries.map(enq => (
                <div
                  key={enq.id}
                  className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-900 text-sm">
                        #{enq.referenceNumber}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {enq.type === 'export_enquiry' ? 'Export' : enq.type === 'bulk_order' ? 'Bulk' : 'Quote'}
                      </span>
                      <span className="text-xs text-stone-400">
                        {new Date(enq.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                        Current Status: {enq.status}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedEnquiryForStatus(enq.id);
                          setStatusUpdateForm({
                            status: enq.status,
                            notes: enq.adminNotes || '',
                            quotedAmount: enq.quotedAmount || '',
                          });
                        }}
                        className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold"
                      >
                        Update Status
                      </button>
                    </div>
                  </div>

                  {/* Customer and Requirement Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs bg-stone-50 p-4 rounded-2xl">
                    <div>
                      <span className="text-stone-400 block text-[11px]">Client & Company:</span>
                      <strong className="text-stone-900">{enq.fullName}</strong>
                      <div className="text-stone-500">{enq.companyName || 'Individual / Retailer'}</div>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[11px]">Contact Details:</span>
                      <div>Ph: {enq.mobileNumber}</div>
                      <div className="text-stone-500 truncate">{enq.email}</div>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[11px]">Product & Quantity:</span>
                      <strong className="text-stone-900">{enq.productRequired}</strong>
                      <div className="text-emerald-800 font-semibold">{enq.quantity}</div>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[11px]">Delivery Location:</span>
                      <div>{enq.deliveryLocation}, {enq.city}</div>
                      <div className="text-stone-500">Date: {enq.requiredDeliveryDate}</div>
                    </div>
                  </div>

                  {/* Notes / Quote Info */}
                  {(enq.adminNotes || enq.quotedAmount || enq.additionalRequirements) && (
                    <div className="space-y-1 text-xs pt-1">
                      {enq.additionalRequirements && (
                        <p className="text-stone-600 text-[11px]">
                          <strong>Customer Note:</strong> {enq.additionalRequirements}
                        </p>
                      )}
                      {enq.quotedAmount && (
                        <p className="text-emerald-900 font-semibold">
                          <strong>Quotation Provided:</strong> {enq.quotedAmount}
                        </p>
                      )}
                      {enq.adminNotes && (
                        <p className="text-stone-500 text-[11px]">
                          <strong>Admin Internal Note:</strong> {enq.adminNotes}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Edit Status Drawer / Box if selected */}
                  {selectedEnquiryForStatus === enq.id && (
                    <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 space-y-3 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-emerald-950">
                          Update Status & Quote for #{enq.referenceNumber}
                        </h4>
                        <button
                          onClick={() => setSelectedEnquiryForStatus(null)}
                          className="text-stone-400 hover:text-stone-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 mb-1">
                            New Status
                          </label>
                          <select
                            value={statusUpdateForm.status}
                            onChange={e => setStatusUpdateForm({ ...statusUpdateForm, status: e.target.value as EnquiryStatus })}
                            className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Quotation Sent">Quotation Sent</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 mb-1">
                            Quoted Price / CIF / FOB
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. ₹42/kg CIF Dubai or ₹35,000/MT"
                            value={statusUpdateForm.quotedAmount}
                            onChange={e => setStatusUpdateForm({ ...statusUpdateForm, quotedAmount: e.target.value })}
                            className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 mb-1">
                            Trade Desk Notes
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Discussed reefer freight; sample approved."
                            value={statusUpdateForm.notes}
                            onChange={e => setStatusUpdateForm({ ...statusUpdateForm, notes: e.target.value })}
                            className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          onClick={() => setSelectedEnquiryForStatus(null)}
                          className="px-3 py-1.5 text-xs text-stone-600 font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleStatusUpdateSubmit(enq.id)}
                          className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold"
                        >
                          Save Status & Notify Client
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB: BILL DESK & UPI RECONCILIATION */}
      {adminTab === 'billdesk' && (
        <div className="space-y-6">
          {/* Header & Quick Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-stone-900 font-serif">
                  Bill Desk & UPI Payment Settlements
                </h3>
                <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-300">
                  Instant Verification
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Track customer Bharat UPI transfers, verify bank 12-digit UTRs, and audit digital receipts.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveView('billdesk')}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Open Live Customer Bill Desk</span>
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-xs text-stone-500 font-semibold block">Total Verified Collections</span>
              <span className="text-2xl font-black text-emerald-900 font-mono">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
                  billPayments
                    .filter(p => p.status === 'Verified' || p.status === 'Completed')
                    .reduce((acc, curr) => acc + curr.amount, 0)
                )}
              </span>
              <span className="text-[11px] text-emerald-700 block font-medium">
                {billPayments.filter(p => p.status === 'Verified' || p.status === 'Completed').length} verified transactions
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-xs text-stone-500 font-semibold block">Pending Approvals</span>
              <span className="text-2xl font-black text-amber-700 font-mono">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
                  billPayments
                    .filter(p => p.status === 'Pending Verification')
                    .reduce((acc, curr) => acc + curr.amount, 0)
                )}
              </span>
              <span className="text-[11px] text-amber-800 block font-medium">
                {billPayments.filter(p => p.status === 'Pending Verification').length} awaiting bank UTR confirmation
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-xs text-stone-500 font-semibold block">Active Merchant VPA</span>
              <span className="text-sm font-bold text-stone-900 font-mono truncate block">
                {companyConfig.upiId || '9702123919@upi'}
              </span>
              <span className="text-[11px] text-stone-500 block">
                Beneficiary: {companyConfig.upiName || 'Kalyan Fresh'}
              </span>
            </div>
          </div>

          {/* Search & Status Filter */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search UTR, receipt #, payer, order ref..."
                value={paymentSearch}
                onChange={e => setPaymentSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-stone-300 rounded-xl focus:outline-emerald-700"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-semibold text-stone-600 shrink-0">Filter Status:</span>
              <select
                value={paymentFilterStatus}
                onChange={e => setPaymentFilterStatus(e.target.value)}
                className="px-3 py-1.5 text-xs border border-stone-300 rounded-xl bg-white w-full sm:w-auto"
              >
                <option value="all">All Transactions ({billPayments.length})</option>
                <option value="Pending Verification">Pending Verification</option>
                <option value="Verified">Verified</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Receipt / Date</th>
                    <th className="py-3 px-4">Payer Details</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Purpose</th>
                    <th className="py-3 px-4">UPI Ref / UTR</th>
                    <th className="py-3 px-4">Linked Ref</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {billPayments
                    .filter(p => {
                      if (paymentFilterStatus !== 'all' && p.status !== paymentFilterStatus) return false;
                      if (paymentSearch) {
                        const q = paymentSearch.toLowerCase();
                        return (
                          p.receiptNumber.toLowerCase().includes(q) ||
                          p.payerName.toLowerCase().includes(q) ||
                          (p.payerCompany && p.payerCompany.toLowerCase().includes(q)) ||
                          p.upiRefId.toLowerCase().includes(q) ||
                          (p.enquiryRef && p.enquiryRef.toLowerCase().includes(q)) ||
                          p.payerPhone.includes(q)
                        );
                      }
                      return true;
                    })
                    .map(pay => (
                      <tr key={pay.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-stone-900 block">
                            {pay.receiptNumber}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            {new Date(pay.paymentDate).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-semibold text-stone-900 block truncate max-w-[160px]">
                            {pay.payerName}
                          </span>
                          {pay.payerCompany && (
                            <span className="text-[10px] text-stone-500 block truncate max-w-[160px]">
                              {pay.payerCompany}
                            </span>
                          )}
                          <span className="text-[10px] text-stone-400 font-mono block">
                            {pay.payerPhone}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-bold text-emerald-950 font-mono text-sm block">
                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(pay.amount)}
                          </span>
                          <span className="text-[9px] text-stone-400 uppercase">
                            {pay.paymentMode.replace('_', ' ')}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-medium text-stone-700 block">
                            {pay.purpose}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded text-[11px]">
                            {pay.upiRefId}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          {pay.enquiryRef ? (
                            <span className="font-mono text-emerald-800 font-semibold">
                              #{pay.enquiryRef}
                            </span>
                          ) : (
                            <span className="text-stone-300">—</span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                              pay.status === 'Verified' || pay.status === 'Completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : pay.status === 'Rejected'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {pay.status}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {pay.status === 'Pending Verification' && (
                              <button
                                onClick={() => updatePaymentStatus(pay.id, 'Verified', 'Verified via Bank UPI Settlement')}
                                className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                                title="Approve & Mark Verified"
                              >
                                Approve
                              </button>
                            )}

                            {pay.status === 'Pending Verification' && (
                              <button
                                onClick={() => {
                                  const reason = prompt('Enter rejection reason for client:');
                                  if (reason) {
                                    updatePaymentStatus(pay.id, 'Rejected', reason);
                                  }
                                }}
                                className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                                title="Reject"
                              >
                                Reject
                              </button>
                            )}

                            <button
                              onClick={() => setAdminViewingReceipt(pay)}
                              className="p-1.5 hover:bg-stone-100 text-stone-600 rounded-lg transition-colors cursor-pointer"
                              title="View & Print Official Receipt"
                            >
                              <Receipt className="w-4 h-4 text-emerald-700" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRODUCTS MANAGEMENT */}
      {adminTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900">Manage Fresh Produce Catalog</h3>
              <p className="text-xs text-stone-500">Add, edit, hide, or remove fruits and vegetables</p>
            </div>
            <button
              onClick={startAddProduct}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Product Modal / Inline Form */}
          {(isAddingProduct || editingProduct) && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-300 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h4 className="text-base font-bold text-stone-900">
                  {editingProduct ? `Edit: ${editingProduct.name}` : 'Add New Produce Item'}
                </h4>
                <button
                  onClick={() => {
                    setIsAddingProduct(false);
                    setEditingProduct(null);
                  }}
                  className="text-stone-400 hover:text-stone-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Product Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fresh Mango"
                      value={productForm.name}
                      onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Category</label>
                    <select
                      value={productForm.category}
                      onChange={e => setProductForm({ ...productForm, category: e.target.value as 'fruits' | 'vegetables' })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white"
                    >
                      <option value="fruits">Fresh Fruits</option>
                      <option value="vegetables">Fresh Vegetables</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Variety</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alphonso (Hapus), Kesar"
                      value={productForm.variety}
                      onChange={e => setProductForm({ ...productForm, variety: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Grade / Quality</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Export Grade A / Commercial Grade 1"
                      value={productForm.grade}
                      onChange={e => setProductForm({ ...productForm, grade: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Size / Calibration</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 200g - 350g or 45-60mm"
                      value={productForm.size}
                      onChange={e => setProductForm({ ...productForm, size: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Origin Sourcing</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nashik, Maharashtra, India"
                      value={productForm.origin}
                      onChange={e => setProductForm({ ...productForm, origin: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Availability Status</label>
                    <select
                      value={productForm.availability}
                      onChange={e => setProductForm({ ...productForm, availability: e.target.value as any })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white"
                    >
                      <option value="In Season">In Season</option>
                      <option value="Year-round">Year-round</option>
                      <option value="Limited Stock">Limited Stock</option>
                      <option value="Upcoming Harvest">Upcoming Harvest</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Min. Order Quantity (MOQ)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1 Metric Ton"
                      value={productForm.minOrderQuantity}
                      onChange={e => setProductForm({ ...productForm, minOrderQuantity: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={productForm.imageUrl}
                      onChange={e => setProductForm({ ...productForm, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Product Description</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Comprehensive description of flavor, texture, harvest method..."
                    value={productForm.description}
                    onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold block">Domestic Supply</span>
                      <span className="text-[11px] text-stone-500">Available across India Mandis & retail</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={productForm.domesticAvailability}
                      onChange={e => setProductForm({ ...productForm, domesticAvailability: e.target.checked })}
                      className="w-4 h-4 rounded accent-emerald-700"
                    />
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold block">Export Availability</span>
                      <span className="text-[11px] text-stone-500">Meets container export quality</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={productForm.exportAvailability}
                      onChange={e => setProductForm({ ...productForm, exportAvailability: e.target.checked })}
                      className="w-4 h-4 rounded accent-emerald-700"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingProduct(false);
                      setEditingProduct(null);
                    }}
                    className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Products List Table */}
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-4">Produce</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Variety & Grade</th>
                    <th className="p-4">Availability</th>
                    <th className="p-4">MOQ</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <strong className="text-stone-900 block">{p.name}</strong>
                          <span className="text-[10px] text-stone-500">{p.origin}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="capitalize font-medium">{p.category}</span>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-stone-800">{p.variety}</div>
                        <div className="text-[11px] text-stone-500">{p.grade}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[11px] font-semibold">
                          {p.availability}
                        </span>
                      </td>
                      <td className="p-4 text-stone-700 font-medium">
                        {p.minOrderQuantity}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleProductVisibility(p.id)}
                          className={`px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1 ${
                            p.isActive
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          {p.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{p.isActive ? 'Active' : 'Hidden'}</span>
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-1">
                        <button
                          onClick={() => startEditProduct(p)}
                          className="p-1.5 hover:bg-stone-100 text-stone-700 rounded-lg"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete ${p.name}?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PACKAGING OPTIONS */}
      {adminTab === 'packaging' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900">Manage Packaging Options</h3>
              <p className="text-xs text-stone-500">Update available carton, crate, and bag specifications</p>
            </div>
            <button
              onClick={() => {
                setEditingPackaging(null);
                setPackagingForm({
                  name: '',
                  description: '',
                  suitableFor: '',
                  capacity: '',
                  dimensions: '',
                });
                setIsAddingPackaging(true);
              }}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Packaging Type</span>
            </button>
          </div>

          {/* Add / Edit Packaging Form */}
          {(isAddingPackaging || editingPackaging) && (
            <div className="bg-white p-6 rounded-3xl border border-stone-300 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h4 className="font-bold text-sm text-stone-900">
                  {editingPackaging ? `Edit: ${editingPackaging.name}` : 'New Packaging Specification'}
                </h4>
                <button
                  onClick={() => {
                    setIsAddingPackaging(false);
                    setEditingPackaging(null);
                  }}
                  className="text-stone-400 hover:text-stone-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handlePackagingSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Packaging Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 5-ply CFB Export Cartons"
                      value={packagingForm.name}
                      onChange={e => setPackagingForm({ ...packagingForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Capacity / Sizing</label>
                    <input
                      type="text"
                      placeholder="e.g. 5 kg, 10 kg, 20 kg"
                      value={packagingForm.capacity}
                      onChange={e => setPackagingForm({ ...packagingForm, capacity: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Details about ventilation, food-grade materials, freight compatibility..."
                    value={packagingForm.description}
                    onChange={e => setPackagingForm({ ...packagingForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Recommended Produce</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mangoes, Pomegranates, Table Grapes"
                    value={packagingForm.suitableFor}
                    onChange={e => setPackagingForm({ ...packagingForm, suitableFor: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingPackaging(false);
                      setEditingPackaging(null);
                    }}
                    className="px-4 py-2 rounded-xl text-stone-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold"
                  >
                    Save Packaging
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Packaging Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {packagingOptions.map(pack => (
              <div key={pack.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-sm text-stone-900">{pack.name}</h4>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingPackaging(pack);
                        setPackagingForm({
                          name: pack.name,
                          description: pack.description,
                          suitableFor: pack.suitableFor,
                          capacity: pack.capacity || '',
                          dimensions: pack.dimensions || '',
                        });
                      }}
                      className="p-1 hover:bg-stone-100 rounded text-stone-600"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deletePackagingOption(pack.id)}
                      className="p-1 hover:bg-red-50 rounded text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-stone-600">{pack.description}</p>
                <div className="text-[11px] text-emerald-800 font-semibold pt-1 border-t border-stone-100">
                  Suitable For: {pack.suitableFor}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: COMPANY CONFIG & CONTACT INFO */}
      {adminTab === 'settings' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs max-w-3xl space-y-6">
          <div>
            <h3 className="text-lg font-bold text-stone-900">Company & Contact Configuration</h3>
            <p className="text-xs text-stone-500">Update live phone numbers, WhatsApp, Instagram, website, and announcements</p>
          </div>

          {configSaved && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>Company configuration updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleConfigSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Business Name</label>
                <input
                  type="text"
                  required
                  value={configForm.businessName}
                  onChange={e => setConfigForm({ ...configForm, businessName: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Website URL</label>
                <input
                  type="url"
                  required
                  value={configForm.website}
                  onChange={e => setConfigForm({ ...configForm, website: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Primary Tagline</label>
                <input
                  type="text"
                  required
                  value={configForm.tagline}
                  onChange={e => setConfigForm({ ...configForm, tagline: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Secondary Tagline</label>
                <input
                  type="text"
                  required
                  value={configForm.secondaryTagline}
                  onChange={e => setConfigForm({ ...configForm, secondaryTagline: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-stone-700 mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  required
                  value={configForm.whatsapp}
                  onChange={e => setConfigForm({ ...configForm, whatsapp: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Direct Phone</label>
                <input
                  type="text"
                  required
                  value={configForm.phone}
                  onChange={e => setConfigForm({ ...configForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Official Email</label>
                <input
                  type="email"
                  required
                  value={configForm.email}
                  onChange={e => setConfigForm({ ...configForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Instagram Handle</label>
                <input
                  type="text"
                  required
                  value={configForm.instagram}
                  onChange={e => setConfigForm({ ...configForm, instagram: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Headquarters / Hub Location</label>
                <input
                  type="text"
                  required
                  value={configForm.address}
                  onChange={e => setConfigForm({ ...configForm, address: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                />
              </div>
            </div>

            {/* UPI Settlement & Corporate Bank Account Configuration */}
            <div className="p-5 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-amber-200/60">
                <CreditCard className="w-4 h-4 text-amber-700" />
                <h4 className="font-bold text-xs text-stone-900 uppercase tracking-wider">
                  UPI Settlement & Banking Configuration (Bill Desk)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Merchant UPI ID (VPA) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9702123919@upi"
                    value={configForm.upiId || ''}
                    onChange={e => setConfigForm({ ...configForm, upiId: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white font-mono"
                  />
                  <p className="text-[10px] text-stone-500 mt-1">This UPI ID is embedded in dynamic Bharat QR codes.</p>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">UPI Merchant Display Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kalyan Fresh"
                    value={configForm.upiName || ''}
                    onChange={e => setConfigForm({ ...configForm, upiName: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-amber-200/40">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Corporate Bank Account Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Kalyan Fresh Agri Operations"
                    value={configForm.bankAccountName || ''}
                    onChange={e => setConfigForm({ ...configForm, bankAccountName: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Bank Account Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 50200089214432"
                    value={configForm.bankAccountNumber || ''}
                    onChange={e => setConfigForm({ ...configForm, bankAccountNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Bank IFSC Code</label>
                  <input
                    type="text"
                    placeholder="e.g. HDFC0001234"
                    value={configForm.bankIfsc || ''}
                    onChange={e => setConfigForm({ ...configForm, bankIfsc: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Bank Name & Branch</label>
                  <input
                    type="text"
                    placeholder="e.g. HDFC Bank Ltd, APMC Commercial Yard, Vashi"
                    value={configForm.bankBranch || ''}
                    onChange={e => setConfigForm({ ...configForm, bankBranch: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Banner Notice Configuration */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-800">Top Header Announcement Notice</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={configForm.showBanner}
                    onChange={e => setConfigForm({ ...configForm, showBanner: e.target.checked })}
                    className="w-4 h-4 rounded accent-emerald-700"
                  />
                  <span className="text-stone-600 font-medium">Enable Banner</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="e.g. Seasonal Mango & Nashik Onion Export Procurement Open"
                value={configForm.bannerNotice}
                onChange={e => setConfigForm({ ...configForm, bannerNotice: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white"
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-colors"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ADMIN DIGITAL RECEIPT VIEW MODAL */}
      {adminViewingReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-emerald-950 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-amber-400/20 border border-amber-400/40 rounded-xl">
                  <KalyanFreshLogo size={32} className="rounded-full" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white font-serif">Kalyan Fresh ® Payment Receipt</h3>
                  <p className="text-[11px] text-stone-300 font-mono">#{adminViewingReceipt.receiptNumber}</p>
                </div>
              </div>
              <button
                onClick={() => setAdminViewingReceipt(null)}
                className="text-stone-300 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">Settlement Status</span>
                  <span
                    className={`inline-block font-bold text-xs px-2.5 py-0.5 rounded-full ${
                      adminViewingReceipt.status === 'Verified' || adminViewingReceipt.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-900'
                        : adminViewingReceipt.status === 'Rejected'
                        ? 'bg-rose-100 text-rose-900'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {adminViewingReceipt.status}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">Amount</span>
                  <span className="text-xl font-black text-stone-950 font-mono">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(adminViewingReceipt.amount)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-100">
                <div>
                  <span className="text-[10px] text-stone-400 block font-semibold uppercase">Payer</span>
                  <span className="font-bold text-stone-900 block">{adminViewingReceipt.payerName}</span>
                  {adminViewingReceipt.payerCompany && (
                    <span className="text-stone-500 block text-[11px]">{adminViewingReceipt.payerCompany}</span>
                  )}
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block font-semibold uppercase">Contact</span>
                  <span className="font-mono text-stone-900 block">{adminViewingReceipt.payerPhone}</span>
                  {adminViewingReceipt.payerEmail && (
                    <span className="text-stone-500 block text-[11px] truncate">{adminViewingReceipt.payerEmail}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-stone-400 block font-semibold uppercase">Payment Purpose</span>
                  <span className="font-semibold text-stone-900">{adminViewingReceipt.purpose}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block font-semibold uppercase">Payment Mode</span>
                  <span className="font-semibold text-stone-900 uppercase">{adminViewingReceipt.paymentMode.replace('_', ' ')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block font-semibold uppercase">12-Digit UTR / UPI Ref</span>
                  <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {adminViewingReceipt.upiRefId}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block font-semibold uppercase">Timestamp</span>
                  <span className="font-mono text-stone-700">
                    {new Date(adminViewingReceipt.paymentDate).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {adminViewingReceipt.enquiryRef && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="text-[10px] text-amber-800 font-bold block uppercase">Linked Enquiry Reference</span>
                  <span className="font-mono font-bold text-stone-900">#{adminViewingReceipt.enquiryRef}</span>
                </div>
              )}

              {adminViewingReceipt.adminNotes && (
                <div className="p-3 bg-stone-100 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-500 font-bold block uppercase">Accounts Remarks</span>
                  <p className="text-stone-800">{adminViewingReceipt.adminNotes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-stone-600" />
                  <span>Print Receipt</span>
                </button>

                <div className="flex items-center gap-2">
                  {adminViewingReceipt.status === 'Pending Verification' && (
                    <button
                      type="button"
                      onClick={() => {
                        updatePaymentStatus(adminViewingReceipt.id, 'Verified', 'Verified via Bank UPI Settlement');
                        setAdminViewingReceipt({ ...adminViewingReceipt, status: 'Verified' });
                      }}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold transition-colors cursor-pointer"
                    >
                      Verify & Approve
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setAdminViewingReceipt(null)}
                    className="px-4 py-2 bg-stone-900 text-white rounded-xl font-semibold hover:bg-black transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
