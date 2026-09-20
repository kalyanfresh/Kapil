import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Globe, 
  Instagram, 
  ExternalLink, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { KalyanFreshLogo } from '../components/KalyanFreshLogo';

export const ContactView: React.FC = () => {
  const { companyConfig, addEnquiry, setActiveView } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    city: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const cleanWhatsAppNumber = companyConfig.whatsapp.replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry({
      type: 'general_quote',
      fullName: formData.name,
      companyName: formData.company,
      mobileNumber: formData.phone,
      whatsappNumber: formData.phone,
      email: formData.email,
      country: 'India',
      city: formData.city || 'Domestic / International',
      productRequired: 'General Produce Supply Inquiry',
      quantity: 'As per discussion',
      packagingRequirement: 'Standard Commercial',
      deliveryLocation: formData.city || 'Buyer Location',
      requiredDeliveryDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      additionalRequirements: formData.message,
    });
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="bg-emerald-800 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Direct Communication
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Contact Kalyan Fresh
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Reach out to our produce trading and logistics desk for wholesale orders, institutional contracts, and international export enquiries.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Contact Information & Interactive Action Buttons (Prompt Required) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full p-1 bg-gradient-to-tr from-amber-400/40 via-amber-200 to-amber-500/40 shadow-xs shrink-0">
                <KalyanFreshLogo size={56} className="rounded-full" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                  Official Business Information
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <h2 className="text-2xl font-bold text-stone-900 font-serif">
                    {companyConfig.businessName}
                  </h2>
                  <span className="text-amber-600 font-bold text-xs">®</span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Fresh Produce Procurement & Export Operations
                </p>
              </div>
            </div>

            {/* Direct Info List */}
            <div className="space-y-4 text-xs border-y border-stone-100 py-5">
              {/* WhatsApp / Phone */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-stone-400 font-medium block">
                    WhatsApp / Phone
                  </span>
                  <a
                    href={`tel:${companyConfig.phone}`}
                    className="text-sm font-bold text-stone-900 hover:text-emerald-700"
                  >
                    {companyConfig.whatsapp}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-stone-400 font-medium block">
                    Official Email
                  </span>
                  <a
                    href={`mailto:${companyConfig.email}`}
                    className="text-sm font-bold text-stone-900 hover:text-emerald-700 break-all"
                  >
                    {companyConfig.email}
                  </a>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-stone-400 font-medium block">
                    Website
                  </span>
                  <a
                    href={companyConfig.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-stone-900 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <span>{companyConfig.website}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-stone-400 font-medium block">
                    Instagram Profile
                  </span>
                  <a
                    href="https://instagram.com/kalyanfresh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-stone-900 hover:text-pink-700 flex items-center gap-1"
                  >
                    <span>{companyConfig.instagram}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Clickable Action Buttons (Exact Prompt Requirement) */}
            <div className="space-y-2.5 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                Instant Action Buttons
              </span>

              {/* 1. WhatsApp Us */}
              <a
                href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent('Hello Kalyan Fresh, I would like to get in touch regarding produce supply.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>

              {/* 2. Call Us */}
              <a
                href={`tel:${companyConfig.phone}`}
                className="w-full py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-stone-200"
              >
                <Phone className="w-4 h-4 text-stone-600" />
                <span>Call Us</span>
              </a>

              {/* 3. Email Us */}
              <a
                href={`mailto:${companyConfig.email}`}
                className="w-full py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-stone-200"
              >
                <Mail className="w-4 h-4 text-stone-600" />
                <span>Email Us</span>
              </a>

              {/* 4. Visit Website */}
              <a
                href={companyConfig.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-stone-200"
              >
                <Globe className="w-4 h-4 text-stone-600" />
                <span>Visit Website</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 ml-auto" />
              </a>

              {/* 5. Follow on Instagram */}
              <a
                href="https://instagram.com/kalyanfresh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-stone-100 hover:bg-pink-50 hover:text-pink-900 text-stone-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-stone-200"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>Follow on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 ml-auto" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Direct Message Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xs">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold text-stone-900">
                Message Sent Successfully
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                “Thank you for contacting Kalyan Fresh. Your enquiry has been received. Our team will contact you shortly.”
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold"
                >
                  Send Another Message
                </button>
                <button
                  onClick={() => setActiveView('history')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold"
                >
                  Track In Enquiries
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Quick Inquiry
                </span>
                <h3 className="text-xl font-bold text-stone-900 mt-0.5">
                  Send a Message to Kalyan Fresh
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Fill in your details below and our team will get in touch with you promptly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suresh Patel"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Reliance Retail / Hotel Oberoi"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 12345"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  City / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai, Pune, Ahmedabad, Delhi, Dubai"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  How Can We Help You? (Products, volume, recurring supply) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Please describe the fresh fruits or vegetables you are seeking, approximate quantity, delivery frequency, or export destination..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Send Message to Kalyan Fresh</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
