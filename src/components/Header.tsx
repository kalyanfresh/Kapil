import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Phone, 
  Mail, 
  Globe, 
  MessageSquare, 
  Menu, 
  X, 
  ShieldCheck, 
  Bell, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Sprout,
  CreditCard
} from 'lucide-react';
import { KalyanFreshLogo } from './KalyanFreshLogo';

export const Header: React.FC<{ onOpenNotifications: () => void }> = ({ onOpenNotifications }) => {
  const { 
    activeView, 
    setActiveView, 
    companyConfig, 
    notifications, 
    userEnquiryIds, 
    openQuoteModal,
    isAdminLoggedIn,
    setCategoryFilter
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read).length;

  const navigateTo = (view: string, filter?: 'all' | 'fruits' | 'vegetables') => {
    setActiveView(view);
    if (filter) {
      setCategoryFilter(filter);
    }
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanWhatsAppNumber = companyConfig.whatsapp.replace(/[^0-9]/g, '');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs">
      {/* Top Banner Notice if enabled */}
      {companyConfig.showBanner && companyConfig.bannerNotice && (
        <aside aria-label="Announcement" className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="bg-emerald-700/80 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase">
                Notice
              </span>
              <span className="font-medium text-emerald-200 text-xs">
                {companyConfig.bannerNotice}
              </span>
            </div>
            <a 
              href={companyConfig.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-emerald-300 hover:text-white transition-colors text-xs shrink-0 font-medium"
            >
              <span>Visit kalyanfresh.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </aside>
      )}

      {/* Corporate Secondary Bar */}
      <div className="bg-emerald-900 text-white text-xs border-b border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <a 
              href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent('Hello Kalyan Fresh, I would like to enquire about fresh fruits and vegetables supply.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors font-medium"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: {companyConfig.whatsapp}</span>
            </a>
            <span className="text-emerald-700 hidden md:inline">|</span>
            <a 
              href={`mailto:${companyConfig.email}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{companyConfig.email}</span>
            </a>
            <span className="text-emerald-700 hidden lg:inline">|</span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-emerald-300">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Domestic Wholesale & International Export</span>
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Direct Official Website Link */}
            <a
              href={companyConfig.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-emerald-800/80 hover:bg-emerald-800 text-emerald-100 hover:text-white px-2.5 py-1 rounded text-xs transition-colors border border-emerald-700"
              title="Open Official Website"
            >
              <Globe className="w-3 h-3 text-emerald-400" />
              <span className="font-medium">kalyanfresh.in</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>

            {/* Notifications Button */}
            <button
              id="header-notifications-btn"
              onClick={onOpenNotifications}
              className="relative p-1 text-emerald-200 hover:text-white transition-colors"
              title="Notifications"
            >
              <Bell className="w-3.5 h-3.5" />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {/* Admin toggle link */}
            <button
              id="header-admin-nav-btn"
              onClick={() => navigateTo('admin')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] transition-colors ${
                isAdminLoggedIn 
                  ? 'bg-amber-600 text-white font-semibold' 
                  : 'text-emerald-300 hover:text-white hover:bg-emerald-800'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>{isAdminLoggedIn ? 'Admin Portal (Active)' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <button 
            id="header-logo-btn"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3.5 text-left group cursor-pointer focus:outline-hidden py-1"
          >
            <div className="relative rounded-full p-0.5 bg-gradient-to-tr from-amber-400/40 via-amber-200/60 to-amber-500/40 shadow-sm shadow-amber-900/10 group-hover:shadow-md transition-all duration-200">
              <KalyanFreshLogo size={50} className="rounded-full group-hover:scale-105 transition-transform duration-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-emerald-950 font-serif">
                  {companyConfig.businessName}
                </span>
                <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-1.5 py-0.2 rounded tracking-wider uppercase">
                  ®
                </span>
                <span className="bg-emerald-100 text-emerald-850 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                  India
                </span>
              </div>
              <p className="text-xs text-stone-700 font-medium tracking-normal hidden sm:block">
                Fresh Fruits & Vegetables • Wholesale • Export
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-stone-700">
            <button
              id="nav-home-btn"
              onClick={() => navigateTo('home')}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeView === 'home' 
                  ? 'text-emerald-800 bg-emerald-50 font-semibold' 
                  : 'hover:text-emerald-700 hover:bg-stone-50'
              }`}
            >
              Home
            </button>
            <button
              id="nav-about-btn"
              onClick={() => navigateTo('about')}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeView === 'about' 
                  ? 'text-emerald-800 bg-emerald-50 font-semibold' 
                  : 'hover:text-emerald-700 hover:bg-stone-50'
              }`}
            >
              About Us
            </button>
            
            {/* Products with quick category access */}
            <div className="relative group">
              <button
                id="nav-products-btn"
                onClick={() => navigateTo('products', 'all')}
                className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  activeView === 'products' 
                    ? 'text-emerald-800 bg-emerald-50 font-semibold' 
                    : 'hover:text-emerald-700 hover:bg-stone-50'
                }`}
              >
                <span>Products</span>
              </button>
              <div className="absolute left-0 top-full pt-1.5 hidden group-hover:block z-50 w-48 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="bg-white rounded-xl shadow-xl border border-stone-200 py-2">
                  <button
                    onClick={() => navigateTo('products', 'all')}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center justify-between"
                  >
                    <span>All Fresh Produce</span>
                    <ChevronRight className="w-3 h-3 text-stone-400" />
                  </button>
                  <button
                    onClick={() => navigateTo('products', 'fruits')}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center justify-between"
                  >
                    <span>Fresh Fruits (Mango, Apple, etc.)</span>
                    <ChevronRight className="w-3 h-3 text-stone-400" />
                  </button>
                  <button
                    onClick={() => navigateTo('products', 'vegetables')}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center justify-between"
                  >
                    <span>Fresh Vegetables (Onion, etc.)</span>
                    <ChevronRight className="w-3 h-3 text-stone-400" />
                  </button>
                </div>
              </div>
            </div>

            <button
              id="nav-export-btn"
              onClick={() => navigateTo('export')}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeView === 'export' 
                  ? 'text-emerald-800 bg-emerald-50 font-semibold' 
                  : 'hover:text-emerald-700 hover:bg-stone-50'
              }`}
            >
              <span>International Export</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded uppercase">
                Global
              </span>
            </button>

            <button
              id="nav-contact-btn"
              onClick={() => navigateTo('contact')}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeView === 'contact' 
                  ? 'text-emerald-800 bg-emerald-50 font-semibold' 
                  : 'hover:text-emerald-700 hover:bg-stone-50'
              }`}
            >
              Contact Us
            </button>

            <button
              id="nav-billdesk-btn"
              onClick={() => navigateTo('billdesk')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeView === 'billdesk' 
                  ? 'text-emerald-950 bg-amber-50 font-bold border border-amber-300' 
                  : 'hover:text-emerald-700 hover:bg-stone-50 text-stone-800'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5 text-amber-600" />
              <span>Bill Desk</span>
              <span className="bg-amber-400 text-stone-950 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                UPI
              </span>
            </button>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Customer Tracking Button */}
            <button
              id="header-track-enquiry-btn"
              onClick={() => navigateTo('history')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                activeView === 'history'
                  ? 'bg-stone-100 border-stone-300 text-stone-900 font-semibold'
                  : 'border-stone-200 text-stone-700 hover:bg-stone-50 hover:text-stone-900'
              }`}
              title="Track My Enquiries"
            >
              <FileText className="w-3.5 h-3.5 text-stone-500" />
              <span>Track Enquiry</span>
              {userEnquiryIds.length > 0 && (
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {userEnquiryIds.length}
                </span>
              )}
            </button>

            {/* Direct WhatsApp CTA */}
            <a
              href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent('Hello Kalyan Fresh, I want to discuss a bulk fresh produce supply order.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
              <span>WhatsApp Us</span>
            </a>

            {/* Request a Quote CTA */}
            <button
              id="header-request-quote-btn"
              onClick={() => openQuoteModal(null, 'general_quote')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm shadow-emerald-700/20 transition-all cursor-pointer"
            >
              <span>Request a Quote</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-emerald-800 hover:bg-stone-100 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => navigateTo('home')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeView === 'home' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-stone-700'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigateTo('about')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeView === 'about' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-stone-700'
            }`}
          >
            About Kalyan Fresh
          </button>
          <button
            onClick={() => navigateTo('products', 'all')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeView === 'products' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-stone-700'
            }`}
          >
            All Products
          </button>
          <div className="pl-4 space-y-1">
            <button
              onClick={() => navigateTo('products', 'fruits')}
              className="w-full text-left px-3 py-1.5 rounded-md text-xs font-medium text-stone-600 hover:text-emerald-700"
            >
              • Fresh Fruits (Mango, Apple, Banana, Pomegranate, etc.)
            </button>
            <button
              onClick={() => navigateTo('products', 'vegetables')}
              className="w-full text-left px-3 py-1.5 rounded-md text-xs font-medium text-stone-600 hover:text-emerald-700"
            >
              • Fresh Vegetables (Red Onion, Potato, Tomato, Garlic, etc.)
            </button>
          </div>
          <button
            onClick={() => navigateTo('export')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeView === 'export' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-stone-700'
            }`}
          >
            International Export (Global Reach)
          </button>
          <button
            onClick={() => navigateTo('contact')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeView === 'contact' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-stone-700'
            }`}
          >
            Contact Us
          </button>
          <button
            onClick={() => navigateTo('billdesk')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
              activeView === 'billdesk' ? 'bg-amber-100 text-emerald-950 font-bold' : 'text-stone-700 bg-amber-50/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-600" />
              <span>Bill Desk (UPI & Bank Pay)</span>
            </div>
            <span className="bg-amber-400 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
              Pay Online
            </span>
          </button>
          <button
            onClick={() => navigateTo('history')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
              activeView === 'history' ? 'bg-stone-100 text-stone-900 font-semibold' : 'text-stone-700'
            }`}
          >
            <span>Track My Enquiries</span>
            <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold">
              {userEnquiryIds.length}
            </span>
          </button>
          <button
            onClick={() => navigateTo('admin')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
              activeView === 'admin' ? 'bg-amber-50 text-amber-900 font-semibold' : 'text-stone-600'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Admin Management Portal</span>
          </button>

          <div className="pt-3 border-t border-stone-200 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openQuoteModal(null, 'general_quote');
              }}
              className="w-full text-center py-2.5 bg-emerald-700 text-white rounded-lg text-xs font-semibold"
            >
              Request a Quote
            </button>
            <a
              href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent('Hello Kalyan Fresh, I would like to enquire about wholesale supply.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
