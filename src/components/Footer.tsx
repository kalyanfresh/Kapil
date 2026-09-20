import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Phone, 
  Mail, 
  Globe, 
  MessageSquare, 
  Instagram, 
  ExternalLink, 
  ArrowRight, 
  Sprout,
  ShieldCheck,
  Truck,
  CheckCircle2
} from 'lucide-react';
import { KalyanFreshLogo } from './KalyanFreshLogo';

export const Footer: React.FC = () => {
  const { companyConfig, setActiveView, setCategoryFilter, openQuoteModal } = useApp();

  const navigateTo = (view: string, category?: 'all' | 'fruits' | 'vegetables') => {
    setActiveView(view);
    if (category) {
      setCategoryFilter(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanWhatsAppNumber = companyConfig.whatsapp.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      {/* Official Website Banner Callout */}
      <div className="bg-emerald-900 text-emerald-100 py-4 px-4 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-300" />
            <span className="text-sm font-medium">
              Visit our official website: <strong className="text-white">Kalyan Fresh</strong>
            </span>
          </div>
          <a
            href={companyConfig.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white text-emerald-950 hover:bg-emerald-50 px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs"
          >
            <span>www.kalyanfresh.in</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative rounded-full p-0.5 bg-gradient-to-tr from-amber-400/40 via-amber-200/60 to-amber-500/40 shadow-sm">
                <KalyanFreshLogo size={46} className="rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-bold text-white tracking-tight font-serif">
                    {companyConfig.businessName}
                  </span>
                  <span className="text-amber-400 font-bold text-xs">®</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">
                  Fresh Produce Supply • India & Global
                </span>
              </div>
            </div>

            <p className="text-emerald-400 font-semibold text-sm">
              “{companyConfig.tagline}”
            </p>
            <p className="text-stone-400 text-xs italic">
              “{companyConfig.secondaryTagline}”
            </p>

            <p className="text-stone-400 text-xs leading-relaxed max-w-md">
              Fresh fruits and vegetables supplied across India and to international markets with a focus on quality, reliability and professional service. Catering to wholesalers, retailers, modern supermarkets, hospitality groups, and global procurement buyers.
            </p>

            {/* Social & Direct Contact Badges */}
            <div className="flex items-center gap-3 pt-2">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent('Hello Kalyan Fresh team, I would like to inquire about fresh produce.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors border border-emerald-700"
                title="WhatsApp Us"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/kalyanfresh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-pink-900/60 text-stone-300 hover:text-pink-300 flex items-center justify-center transition-colors border border-stone-700"
                title="Follow on Instagram @kalyanfresh"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* Website */}
              <a
                href={companyConfig.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-emerald-900/60 text-stone-300 hover:text-emerald-300 flex items-center justify-center transition-colors border border-stone-700"
                title="Visit Website"
              >
                <Globe className="w-4 h-4" />
              </a>

              {/* Email */}
              <a
                href={`mailto:${companyConfig.email}`}
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors border border-stone-700"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>

              {/* Phone */}
              <a
                href={`tel:${companyConfig.phone}`}
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors border border-stone-700"
                title="Call Us"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => navigateTo('home')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('about')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('products', 'all')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Products Catalog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('export')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  International Export
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openQuoteModal(null, 'general_quote')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-emerald-400 font-semibold"
                >
                  Request a Quote
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('contact')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('billdesk')}
                  className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-bold flex items-center gap-1.5"
                >
                  <span>Bill Desk (UPI Settlement)</span>
                  <span className="bg-amber-400 text-stone-950 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
                    UPI
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Produce Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => navigateTo('products', 'fruits')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Fresh Fruits
                </button>
                <span className="block text-[11px] text-stone-300">Mango, Apple, Banana, Grapes, Pomegranate</span>
              </li>
              <li className="pt-1">
                <button 
                  onClick={() => navigateTo('products', 'vegetables')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Fresh Vegetables
                </button>
                <span className="block text-[11px] text-stone-300">Onion, Potato, Tomato, Garlic, Ginger, Chilli</span>
              </li>
              <li className="pt-2">
                <button 
                  onClick={() => openQuoteModal(null, 'bulk_order')}
                  className="text-stone-300 hover:text-white flex items-center gap-1 transition-colors text-[11px]"
                >
                  <span>Bulk & Institutional Orders</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Business Contact */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Business Contact
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-stone-400 text-[10px]">WhatsApp / Direct Phone:</span>
                  <a 
                    href={`https://wa.me/${cleanWhatsAppNumber}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-400 font-medium"
                  >
                    {companyConfig.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-stone-400 text-[10px]">Email Enquiries:</span>
                  <a 
                    href={`mailto:${companyConfig.email}`} 
                    className="text-white hover:text-emerald-400 font-medium break-all"
                  >
                    {companyConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-stone-400 text-[10px]">Official Website:</span>
                  <a 
                    href={companyConfig.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-400 font-medium"
                  >
                    www.kalyanfresh.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Instagram className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-stone-400 text-[10px]">Instagram Profile:</span>
                  <a 
                    href="https://instagram.com/kalyanfresh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-400 font-medium"
                  >
                    {companyConfig.instagram}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-300">
          <div className="flex items-center gap-2 flex-wrap">
            <span>© {new Date().getFullYear()} {companyConfig.businessName}. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>Commercial B2B Fresh Produce Trading & Export</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => navigateTo('history')}
              className="hover:text-stone-300 transition-colors"
            >
              Customer Enquiry Tracker
            </button>
            <span>•</span>
            <button
              onClick={() => navigateTo('admin')}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Admin Access</span>
            </button>
            <span>•</span>
            <a
              href={companyConfig.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-300 transition-colors"
            >
              kalyanfresh.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
