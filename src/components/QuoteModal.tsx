import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  Send, 
  MessageSquare, 
  Calendar, 
  Package, 
  MapPin, 
  Globe, 
  Building, 
  User, 
  Mail, 
  Phone, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Enquiry } from '../types';
import { KalyanFreshLogo } from './KalyanFreshLogo';

export const QuoteModal: React.FC = () => {
  const { 
    isQuoteModalOpen, 
    closeQuoteModal, 
    selectedProductForQuote, 
    quoteModalDefaultType, 
    addEnquiry, 
    packagingOptions,
    companyConfig,
    setActiveView 
  } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    mobileNumber: '',
    whatsappNumber: '',
    email: '',
    country: 'India',
    city: '',
    productRequired: '',
    quantity: '',
    packagingRequirement: '',
    deliveryLocation: '',
    requiredDeliveryDate: '',
    additionalRequirements: '',
    destinationPort: '',
  });

  const [submittedEnquiry, setSubmittedEnquiry] = useState<Enquiry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync default values when modal opens
  useEffect(() => {
    if (isQuoteModalOpen) {
      setSubmittedEnquiry(null);
      if (selectedProductForQuote) {
        setFormData(prev => ({
          ...prev,
          productRequired: `${selectedProductForQuote.name} (${selectedProductForQuote.variety})`,
          packagingRequirement: selectedProductForQuote.packagingOptions[0] || '',
          quantity: selectedProductForQuote.minOrderQuantity || '',
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          productRequired: '',
          packagingRequirement: packagingOptions[0]?.name || 'Standard Export CFB Cartons',
        }));
      }

      if (quoteModalDefaultType === 'export_enquiry') {
        setFormData(prev => ({ ...prev, country: prev.country === 'India' ? 'United Arab Emirates' : prev.country }));
      }
    }
  }, [isQuoteModalOpen, selectedProductForQuote, quoteModalDefaultType, packagingOptions]);

  if (!isQuoteModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const created = addEnquiry({
        type: quoteModalDefaultType,
        fullName: formData.fullName,
        companyName: formData.companyName,
        mobileNumber: formData.mobileNumber,
        whatsappNumber: formData.whatsappNumber || formData.mobileNumber,
        email: formData.email,
        country: formData.country,
        city: formData.city,
        productRequired: formData.productRequired,
        quantity: formData.quantity,
        packagingRequirement: formData.packagingRequirement,
        deliveryLocation: formData.deliveryLocation,
        requiredDeliveryDate: formData.requiredDeliveryDate,
        additionalRequirements: formData.additionalRequirements,
        destinationPort: formData.destinationPort,
      });

      setSubmittedEnquiry(created);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cleanWhatsAppNumber = companyConfig.whatsapp.replace(/[^0-9]/g, '');

  const openWhatsAppWithEnquiry = () => {
    if (!submittedEnquiry) return;
    const msg = `*Kalyan Fresh Produce Enquiry Ref: #${submittedEnquiry.referenceNumber}*
Name: ${submittedEnquiry.fullName}
Company: ${submittedEnquiry.companyName || 'N/A'}
Product: ${submittedEnquiry.productRequired}
Quantity: ${submittedEnquiry.quantity}
Packaging: ${submittedEnquiry.packagingRequirement}
Destination: ${submittedEnquiry.deliveryLocation}, ${submittedEnquiry.city}, ${submittedEnquiry.country}
Required Date: ${submittedEnquiry.requiredDeliveryDate}
Notes: ${submittedEnquiry.additionalRequirements || 'None'}`;

    window.open(`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200 my-auto">
        {/* Header */}
        <div className="bg-emerald-950 text-white p-6 sm:p-7 flex items-start justify-between relative">
          <div className="flex items-start gap-3.5">
            <div className="rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-xs shrink-0 mt-0.5">
              <KalyanFreshLogo size={46} className="rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                  {quoteModalDefaultType === 'export_enquiry'
                    ? 'International Export Desk'
                    : quoteModalDefaultType === 'bulk_order'
                    ? 'Wholesale Bulk Supply'
                    : 'B2B Quotation Desk'}
                </span>
                <span className="text-emerald-300 text-xs">Direct Commercial Enquiry</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1 font-serif">
                Request a Formal Quote
              </h2>
              <p className="text-xs text-emerald-200 mt-0.5">
                Connect directly with Kalyan Fresh ® for competitive domestic and export pricing.
              </p>
            </div>
          </div>
          <button
            onClick={closeQuoteModal}
            className="text-stone-400 hover:text-white p-1 rounded-lg transition-colors"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body OR Success State */}
        <div className="p-6 sm:p-8 max-h-[calc(85vh-8rem)] overflow-y-auto">
          {submittedEnquiry ? (
            /* Mandatory exact wording from prompt */
            <div className="text-center py-6 space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col items-center justify-center">
                <div className="rounded-full p-1 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-md">
                  <KalyanFreshLogo size={70} className="rounded-full" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Official Submission Verified</span>
                </div>
                <h3 className="text-xl font-bold text-stone-900 font-serif">
                  Enquiry Submitted Successfully
                </h3>
                {/* Prompt mandatory exact text */}
                <p className="text-sm font-semibold text-emerald-900 max-w-md mx-auto bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                  “Thank you for contacting Kalyan Fresh. Your enquiry has been received. Our team will contact you shortly.”
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Enquiry Reference:</span>
                  <span className="font-mono font-bold text-emerald-800">#{submittedEnquiry.referenceNumber}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Product Required:</span>
                  <span className="font-medium text-stone-800">{submittedEnquiry.productRequired}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Quantity:</span>
                  <span className="font-medium text-stone-800">{submittedEnquiry.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Initial Status:</span>
                  <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[11px]">
                    {submittedEnquiry.status}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={openWhatsAppWithEnquiry}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Copy to WhatsApp (+91 9702123919)</span>
                </button>

                <button
                  onClick={() => {
                    closeQuoteModal();
                    setActiveView('history');
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <span>Track Status</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Pre-fill notice if any */}
              {selectedProductForQuote && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-900">
                  <div>
                    <span className="font-bold">Quoting for: </span>
                    <span>{selectedProductForQuote.name} ({selectedProductForQuote.variety})</span>
                  </div>
                  <span className="text-emerald-700 text-[11px]">MOQ: {selectedProductForQuote.minOrderQuantity}</span>
                </div>
              )}

              {/* Personal & Company Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="e.g. Fresh Supermarkets Ltd."
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98200 12345"
                      value={formData.mobileNumber}
                      onChange={e => setFormData({ ...formData, mobileNumber: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    WhatsApp Number
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      placeholder="Leave blank if same as mobile"
                      value={formData.whatsappNumber}
                      onChange={e => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="procurement@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Country & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. India / UAE / UK"
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai, Bengaluru, Dubai"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Product Required & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Product Required <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nashik Red Onion, Alphonso Mango"
                    value={formData.productRequired}
                    onChange={e => setFormData({ ...formData, productRequired: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Quantity (with units) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5 Metric Tons / 500 Boxes / 2 Containers"
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Packaging Requirement */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Packaging Requirement
                </label>
                <select
                  value={formData.packagingRequirement}
                  onChange={e => setFormData({ ...formData, packagingRequirement: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
                >
                  <option value="">Select preferred packaging...</option>
                  {packagingOptions.map(p => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.capacity})
                    </option>
                  ))}
                  <option value="Custom Buyer Requirement">Custom Buyer Specification (Specify in notes)</option>
                </select>
              </div>

              {/* Delivery Location & Required Delivery Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Delivery Location / Port <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Warehouse location or Destination Port"
                    value={formData.deliveryLocation}
                    onChange={e => setFormData({ ...formData, deliveryLocation: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Required Delivery Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.requiredDeliveryDate}
                    onChange={e => setFormData({ ...formData, requiredDeliveryDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
                  />
                </div>
              </div>

              {/* Additional Requirements */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Additional Requirements
                </label>
                <textarea
                  rows={2}
                  placeholder="Grade preference, inspection requirements, cold-chain specifications, recurring order schedule..."
                  value={formData.additionalRequirements}
                  onChange={e => setFormData({ ...formData, additionalRequirements: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Processing Enquiry...</span>
                  ) : (
                    <>
                      <span>Submit Enquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-[11px] text-stone-500 text-center mt-2">
                  Direct commercial enquiry handled with strict business confidentiality.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
