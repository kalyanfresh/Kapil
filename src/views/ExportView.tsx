import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Globe2, 
  Ship, 
  Plane, 
  Package, 
  ShieldCheck, 
  FileCheck2, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  ArrowRight,
  Sparkles,
  Thermometer,
  Layers,
  MapPin,
  Building,
  User,
  Mail,
  Phone
} from 'lucide-react';
import { Enquiry } from '../types';

export const ExportView: React.FC = () => {
  const { addEnquiry, packagingOptions, companyConfig, setActiveView } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    phone: '',
    product: 'Nashik Red Onion & Indian Table Grapes',
    quantity: '1 x 40ft Reefer Container (28 MT)',
    packaging: 'Standard Export CFB Cartons',
    destination: '',
    requiredDate: '',
    additionalRequirements: '',
  });

  const [submittedEnquiry, setSubmittedEnquiry] = useState<Enquiry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cleanWhatsAppNumber = companyConfig.whatsapp.replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const created = addEnquiry({
        type: 'export_enquiry',
        fullName: formData.name,
        companyName: formData.company,
        mobileNumber: formData.phone,
        whatsappNumber: formData.phone,
        email: formData.email,
        country: formData.country,
        city: formData.destination,
        productRequired: formData.product,
        quantity: formData.quantity,
        packagingRequirement: formData.packaging,
        deliveryLocation: formData.destination,
        destinationPort: formData.destination,
        requiredDeliveryDate: formData.requiredDate,
        additionalRequirements: formData.additionalRequirements,
      });

      setSubmittedEnquiry(created);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsAppWithExport = () => {
    if (!submittedEnquiry) return;
    const msg = `*Kalyan Fresh International Export Enquiry Ref: #${submittedEnquiry.referenceNumber}*
Name: ${submittedEnquiry.fullName}
Company: ${submittedEnquiry.companyName}
Country/Destination: ${submittedEnquiry.country} (${submittedEnquiry.deliveryLocation})
Product: ${submittedEnquiry.productRequired}
Quantity: ${submittedEnquiry.quantity}
Packaging: ${submittedEnquiry.packagingRequirement}
Required Date: ${submittedEnquiry.requiredDeliveryDate}
Requirements: ${submittedEnquiry.additionalRequirements || 'Standard Export Protocol'}`;

    window.open(`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-950 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold">
              <Globe2 className="w-3.5 h-3.5" />
              <span>International Trade & Bulk Produce Division</span>
            </div>

            {/* Prompt mandatory exact heading */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Fresh Produce. Global Reach.
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Kalyan Fresh supplies fresh fruits and vegetables for international buyers and bulk requirements. Sourcing prime harvest directly from Indian agricultural heartlands and managing custom sorting, specialized packaging, and container logistics.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#export-form"
                className="px-6 py-3 rounded-xl bg-white text-emerald-950 font-bold text-xs hover:bg-stone-100 transition-colors shadow-sm"
              >
                Submit International Enquiry
              </a>
              <a
                href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent('Hello Kalyan Fresh Export Desk, I am an international buyer looking to source produce.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-2 border border-emerald-600"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                <span>Chat with Export Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Core Export Capabilities (Prompt Required Sections) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Export Infrastructure & Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            International Supply Protocols
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Built to provide reliable sourcing, professional export packaging, and transparent documentation for global buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Export-Quality Produce */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Export-Quality Produce</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Careful grading by caliber, weight, skin color uniformity, and brix sweetness. We curate lots specifically conditioned for extended transit integrity and supermarket shelf presentation.
            </p>
          </div>

          {/* Card 2: Bulk Supply Capabilities */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Ship className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Bulk & Container Supply</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Capable of handling full container loads (FCL 20ft / 40ft High Cube Reefer) as well as expedited air-freight consignments for delicate high-value fruits like mangoes and pomegranates.
            </p>
          </div>

          {/* Card 3: Packaging Options */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Export Packaging Options</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Vented corrugated cartons, individual foam netting, breathable leno mesh sacks, and punnet clamshells designed according to sea voyage humidity and container palletization standards.
            </p>
          </div>

          {/* Card 4: Destination-Country Requirements */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Destination-Country Requirements</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We align sizing, pesticide maximum residue limits (MRLs), labeling, and treatment specifications to match the statutory entry requirements of your target market.
            </p>
          </div>

          {/* Card 5: Shipping & Reefer Logistics */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Thermometer className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Cold-Chain & Logistics</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Seamless temperature management from packhouse pre-cooling through reefer container stuffed dispatch to major Indian departure ports (Nhava Sheva JNPT, Mundra, and Air Cargo hubs).
            </p>
          </div>

          {/* Card 6: Quality & Export Documentation */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Export Documentation Support</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Full facilitation of commercial invoice, packing list, certificate of origin, phytosanitary inspection filings, bill of lading / airway bill, and pre-shipment quality verification.
            </p>
          </div>
        </div>
      </section>

      {/* Verified Trust Statement (adhering strictly to prompt guideline) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 text-xs text-stone-600 space-y-2">
          <div className="flex items-center gap-2 font-bold text-stone-800 text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Kalyan Fresh Quality Commitment</span>
          </div>
          <p className="leading-relaxed">
            All export lots undergo batch-specific inspection, lot-by-lot sorting, and pre-cooling according to confirmed buyer purchase contracts. Certified laboratory testing reports and phytosanitary clearances are provided for each verified consignment.
          </p>
        </div>
      </section>

      {/* International Buyer Enquiry Form (Required by prompt) */}
      <section id="export-form" className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
          <div className="bg-emerald-950 text-white p-6 sm:p-8">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <span>Overseas Procurement Portal</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
              International Buyer Enquiry
            </h2>
            <p className="text-xs text-stone-300 mt-1">
              Please share your target produce, volume requirements, and destination port. Our export desk will review and provide a comprehensive CIF or FOB quotation.
            </p>
          </div>

          <div className="p-6 sm:p-10">
            {submittedEnquiry ? (
              <div className="text-center py-6 space-y-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-stone-900">
                    Export Enquiry Received
                  </h3>
                  {/* Exact prompt required text */}
                  <p className="text-sm font-semibold text-emerald-900 max-w-md mx-auto bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                    “Thank you for contacting Kalyan Fresh. Your enquiry has been received. Our team will contact you shortly.”
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 max-w-md mx-auto text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-500">Reference:</span>
                    <span className="font-mono font-bold text-emerald-800">#{submittedEnquiry.referenceNumber}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-500">Destination:</span>
                    <span className="font-medium text-stone-800">{submittedEnquiry.deliveryLocation}, {submittedEnquiry.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Status:</span>
                    <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[11px]">
                      {submittedEnquiry.status}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={openWhatsAppWithExport}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp (+91 9702123919)</span>
                  </button>

                  <button
                    onClick={() => setActiveView('history')}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>View In Tracking History</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Fields required by prompt: Name, Company, Country, Email, WhatsApp/Phone, Product, Quantity, Packaging, Destination, Required date, Additional requirements */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tariq Al-Hassan"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Al-Hassan Global Trading LLC"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Buyer Country <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Globe2 className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. UAE, Saudi Arabia, UK"
                        value={formData.country}
                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        placeholder="import@alhassan.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      WhatsApp / Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        required
                        placeholder="+971 50 123 4567"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Produce / Product Required <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Red Onion, Grapes, Alphonso Mango, Pomegranate"
                      value={formData.product}
                      onChange={e => setFormData({ ...formData, product: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Quantity Required <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1 x 40ft Container (28 MT) or 5 MT Air Freight"
                      value={formData.quantity}
                      onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Packaging Preference
                    </label>
                    <select
                      value={formData.packaging}
                      onChange={e => setFormData({ ...formData, packaging: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
                    >
                      {packagingOptions.map(p => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                      <option value="Custom Buyer Specification">Custom Specification</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Destination Port / Airport <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jebel Ali / Dammam / Heathrow"
                        value={formData.destination}
                        onChange={e => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Required Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.requiredDate}
                      onChange={e => setFormData({ ...formData, requiredDate: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Additional Export & Quality Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specific sizing (mm), Brix parameters, phytosanitary requirements, pre-cooling conditions, CIF/FOB quote preference..."
                    value={formData.additionalRequirements}
                    onChange={e => setFormData({ ...formData, additionalRequirements: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Export Enquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-stone-500 text-center mt-2">
                    Our international trade desk handles enquiries within 1 business day.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
