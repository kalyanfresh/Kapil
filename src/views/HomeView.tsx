import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { 
  ArrowRight, 
  MessageSquare, 
  Globe2, 
  ShieldCheck, 
  Truck, 
  Package, 
  CheckCircle2, 
  Award, 
  ExternalLink,
  Sparkles,
  Phone,
  Layers,
  ChevronRight,
  TrendingUp,
  Boxes,
  Compass
} from 'lucide-react';
import { KalyanFreshLogo } from '../components/KalyanFreshLogo';

export const HomeView: React.FC = () => {
  const { 
    products, 
    companyConfig, 
    setActiveView, 
    setCategoryFilter, 
    openQuoteModal 
  } = useApp();

  const cleanWhatsAppNumber = companyConfig.whatsapp.replace(/[^0-9]/g, '');

  const featuredFruits = products
    .filter(p => p.category === 'fruits' && p.isActive)
    .slice(0, 4);

  const featuredVegetables = products
    .filter(p => p.category === 'vegetables' && p.isActive)
    .slice(0, 4);

  const highlights = [
    {
      title: 'Fresh Quality',
      description: 'Carefully sourced fresh fruits and vegetables.',
      icon: Sparkles,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      title: 'Wholesale & Bulk Supply',
      description: 'Solutions for businesses requiring bulk quantities.',
      icon: Boxes,
      color: 'text-emerald-800 bg-stone-50 border-stone-200',
    },
    {
      title: 'Pan-India Supply',
      description: 'Supply and distribution for customers across India.',
      icon: Truck,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      title: 'International Export',
      description: 'Fresh produce supply for international buyers.',
      icon: Globe2,
      color: 'text-emerald-800 bg-stone-50 border-stone-200',
    },
    {
      title: 'Reliable Service',
      description: 'Professional handling of customer enquiries and orders.',
      icon: ShieldCheck,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      title: 'Flexible Packaging',
      description: 'Packaging options based on product and customer requirements.',
      icon: Package,
      color: 'text-emerald-800 bg-stone-50 border-stone-200',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-stone-900 text-white pt-12 pb-20 sm:py-24 lg:py-32">
        {/* Subtle Background Pattern & Ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-700/80 text-emerald-200 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Wholesale & Export Fresh Produce Partner</span>
              </div>

              {/* Exact Hero Heading from prompt */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {companyConfig.businessName}
              </h1>

              {/* Exact Hero Text from prompt */}
              <p className="text-xl sm:text-2xl font-semibold text-emerald-300">
                {companyConfig.tagline}
              </p>

              {/* Exact Supporting Text from prompt */}
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Fresh fruits and vegetables supplied across India and to international markets with a focus on quality, reliability and professional service.
              </p>

              {/* Exact Main Buttons from prompt */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                {/* Button 1: View Products */}
                <button
                  id="hero-view-products-btn"
                  onClick={() => {
                    setActiveView('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-stone-100 text-emerald-950 font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <span>View Products</span>
                  <ArrowRight className="w-4 h-4 text-emerald-700" />
                </button>

                {/* Button 2: Request a Quote */}
                <button
                  id="hero-request-quote-btn"
                  onClick={() => openQuoteModal(null, 'general_quote')}
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <span>Request a Quote</span>
                </button>

                {/* Button 3: Export Enquiry */}
                <button
                  id="hero-export-enquiry-btn"
                  onClick={() => {
                    setActiveView('export');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-950 text-emerald-200 hover:text-white border border-emerald-700/80 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Globe2 className="w-4 h-4 text-emerald-400" />
                  <span>Export Enquiry</span>
                </button>

                {/* Button 4: WhatsApp Us */}
                <a
                  href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent('Hello Kalyan Fresh, I would like to inquire about fresh produce supply.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 text-emerald-100 font-bold text-xs sm:text-sm transition-all border border-emerald-600 flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                  <span>WhatsApp Us</span>
                </a>
              </div>

              {/* Fast Trust Indicators */}
              <div className="pt-6 border-t border-emerald-800/80 grid grid-cols-3 gap-4 text-center lg:text-left text-xs text-stone-400">
                <div>
                  <span className="block font-bold text-white text-sm">Pan-India</span>
                  <span className="text-[11px] text-stone-400">Domestic Wholesale</span>
                </div>
                <div>
                  <span className="block font-bold text-white text-sm">Global Reach</span>
                  <span className="text-[11px] text-stone-400">Ocean & Air Reefer</span>
                </div>
                <div>
                  <span className="block font-bold text-white text-sm">B2B Custom</span>
                  <span className="text-[11px] text-stone-400">Grading & Packaging</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-stone-900">
                  <img
                    src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=80"
                    alt="Kalyan Fresh Fresh Produce Sourcing"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>

                  {/* Official Brand Seal Overlay */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border border-amber-200 flex items-center gap-2.5">
                    <div className="rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-xs">
                      <KalyanFreshLogo size={42} className="rounded-full" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                        Official Registered Brand
                      </span>
                      <span className="block text-xs font-bold text-stone-900 font-serif">
                        Kalyan Fresh ®
                      </span>
                    </div>
                  </div>

                  {/* Floating Produce Card */}
                  <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 text-stone-900 shadow-xl border border-white/40">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-0.5 bg-gradient-to-tr from-amber-400/40 via-amber-200 to-amber-500/40 shrink-0">
                          <KalyanFreshLogo size={40} className="rounded-full" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-stone-900">Premium Export & Bulk Produce</h4>
                          <p className="text-[11px] text-stone-500">Nashik Onions • Ratnagiri Mangoes • Shimla Apples</p>
                        </div>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Website Banner Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Official Web Presence
              </span>
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                Visit our website: <span className="text-emerald-700">Kalyan Fresh</span>
              </h3>
              <p className="text-xs text-stone-600">
                Discover our digital corporate identity and latest procurement catalogues online.
              </p>
            </div>
          </div>
          <a
            href={companyConfig.website}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-xs"
          >
            <span>https://www.kalyanfresh.in</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Business Highlights (Mandatory prompt cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Why Partner With Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Business Highlights
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm">
            Connecting quality fresh agricultural produce with verified domestic and global distribution channels.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all space-y-3 group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${h.color} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                  {h.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {h.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Product Categories Spotlight */}
      <section className="bg-stone-50/80 py-16 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/60 px-3 py-1 rounded-full">
                Core Supply Lines
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-2">
                Fresh Produce Categories
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Carefully graded fruits and vegetables for B2B procurement, wholesale, and export.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCategoryFilter('fruits');
                  setActiveView('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-stone-700 bg-white border border-stone-200 hover:bg-emerald-50 hover:text-emerald-800 transition-colors cursor-pointer"
              >
                View Fruits
              </button>
              <button
                onClick={() => {
                  setCategoryFilter('vegetables');
                  setActiveView('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-stone-700 bg-white border border-stone-200 hover:bg-emerald-50 hover:text-emerald-800 transition-colors cursor-pointer"
              >
                View Vegetables
              </button>
            </div>
          </div>

          {/* Category 1: FRUITS */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                  <span>Fresh Fruits</span>
                  <span className="text-xs font-normal text-stone-500">
                    (Mango, Apple, Banana, Pomegranate, Grapes, Citrus & More)
                  </span>
                </h3>
              </div>
              <button
                onClick={() => {
                  setCategoryFilter('fruits');
                  setActiveView('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                <span>Browse All Fruits</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredFruits.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Category 2: VEGETABLES */}
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                  <span>Fresh Vegetables</span>
                  <span className="text-xs font-normal text-stone-500">
                    (Onion, Potato, Tomato, Garlic, Ginger, Green Chilli & More)
                  </span>
                </h3>
              </div>
              <button
                onClick={() => {
                  setCategoryFilter('vegetables');
                  setActiveView('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                <span>Browse All Vegetables</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredVegetables.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Catalog CTA */}
          <div className="text-center pt-6">
            <button
              onClick={() => {
                setCategoryFilter('all');
                setActiveView('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Complete Produce Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* International Export Feature Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-emerald-900 to-stone-900 rounded-3xl p-8 sm:p-12 text-white overflow-hidden relative shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-5">
            <span className="bg-emerald-800 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              International Trade
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Fresh Produce. Global Reach.
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Kalyan Fresh supplies fresh fruits and vegetables for international buyers and bulk requirements. From export-grade packaging to reefer container logistics and documentation handling.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <span className="font-bold block text-white">Export Quality</span>
                <span className="text-[11px] text-stone-300">Strict caliber sorting</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <span className="font-bold block text-white">Bulk Sea/Air</span>
                <span className="text-[11px] text-stone-300">20ft / 40ft Reefer</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10 col-span-2 sm:col-span-1">
                <span className="font-bold block text-white">Custom Packing</span>
                <span className="text-[11px] text-stone-300">CFB cartons & mesh</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setActiveView('export');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-white text-emerald-950 font-bold text-xs hover:bg-stone-100 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>International Buyer Desk</span>
                <ArrowRight className="w-4 h-4 text-emerald-700" />
              </button>
              <button
                onClick={() => openQuoteModal(null, 'export_enquiry')}
                className="px-6 py-3 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                Submit Export Enquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quotation Policy & Direct B2B Help */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-stone-50 rounded-2xl border border-stone-200 p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Procurement Guidance
            </span>
            <h3 className="text-2xl font-bold text-stone-900">
              Need Pricing For Wholesale or Recurring Supply?
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Because fresh-produce rates respond to seasonal harvest volumes, quality grades, destination transport, and container logistics, we provide real-time customized quotations rather than fixed retail price lists.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-stone-700 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Transparent Rates
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Prompt Response
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Customized Logistics
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => openQuoteModal(null, 'general_quote')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request a Quote Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent('Hello Kalyan Fresh, I would like to enquire about wholesale rates.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-50 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
