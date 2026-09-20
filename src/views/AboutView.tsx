import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Package, 
  Truck, 
  Sprout, 
  Globe2, 
  CheckCircle2, 
  ExternalLink,
  MessageSquare,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { KalyanFreshLogo } from '../components/KalyanFreshLogo';

export const AboutView: React.FC = () => {
  const { packagingOptions, companyConfig, openQuoteModal, setActiveView } = useApp();

  const cleanWhatsAppNumber = companyConfig.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-800 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Corporate Profile
                </span>
                <span className="bg-amber-900/60 text-amber-200 border border-amber-700/60 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Registered Brand ®
                </span>
              </div>
              {/* Prompt exact heading */}
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-serif">
                About Kalyan Fresh
              </h1>
              {/* Prompt exact suggested content */}
              <p className="text-stone-200 text-sm sm:text-base leading-relaxed bg-emerald-900/40 p-5 rounded-2xl border border-emerald-800/80">
                Kalyan Fresh is a fresh fruits and vegetables supply business focused on connecting customers with quality fresh produce. We serve domestic and international requirements, including wholesale, bulk and business supply. Our goal is to provide reliable sourcing, professional service and fresh produce solutions for customers across markets.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={companyConfig.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white text-emerald-950 font-bold text-xs hover:bg-stone-100 transition-colors flex items-center gap-2"
                >
                  <span>Visit Official Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`https://wa.me/${cleanWhatsAppNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-2 border border-emerald-600"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Connect via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Official Logo Emblem Showcase */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-emerald-900/30 rounded-3xl border border-emerald-700/40 backdrop-blur-xs">
              <div className="rounded-full p-2 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-2xl">
                <KalyanFreshLogo size={140} className="rounded-full" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white font-serif">
                Kalyan Fresh ®
              </h3>
              <p className="text-xs text-emerald-300 font-medium mt-1">
                Quality Produce. Reliable Supply. Global Reach.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-amber-200 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-full">
                <span>Official Trademark Seal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">Our Mission</h3>
            {/* Prompt exact text */}
            <p className="text-stone-700 text-sm leading-relaxed font-medium">
              “To provide quality fresh produce with reliable and professional supply services.”
            </p>
            <p className="text-stone-600 text-xs leading-relaxed">
              We focus on building dependable supply linkages between farm gate harvests and commercial bulk buyers, ensuring freshness preservation, fair trading, and consistent grading throughout domestic and international routes.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">Our Vision</h3>
            {/* Prompt exact text */}
            <p className="text-stone-700 text-sm leading-relaxed font-medium">
              “To build a trusted fresh-produce supply network connecting India with markets around the world.”
            </p>
            <p className="text-stone-600 text-xs leading-relaxed">
              Our long-term objective is to champion India’s premier agricultural produce—from the sweet mangoes of Maharashtra to the crisp apples of Himachal and world-class Nashik onions—by maintaining global standards of commercial excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Quality Commitment & Sourcing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Quality Commitment */}
          <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Core Operating Principle</span>
              </div>
              <h3 className="text-2xl font-bold text-stone-900">Quality Commitment</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                At Kalyan Fresh, quality is managed at every stage. We focus on freshness, physical grading, careful sourcing, and professional handling. Every batch is evaluated for skin integrity, uniformity, firmness, and shelf suitability before dispatch.
              </p>
              <ul className="space-y-2 text-xs text-stone-700 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Calibrated sizing and mechanical defect elimination</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Harvest timing aligned with transit duration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Hygienic sorting surfaces and clean transport loading</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-stone-200">
              <span className="text-[11px] text-stone-500 italic">
                Quality criteria can be customized for specific buyer contracts.
              </span>
            </div>
          </div>

          {/* Sourcing */}
          <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <Sprout className="w-4 h-4" />
                <span>Origin & Procurement</span>
              </div>
              <h3 className="text-2xl font-bold text-stone-900">Strategic Produce Sourcing</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Our sourcing network taps directly into India's most reputed crop-specific agricultural belts. By sourcing close to harvest origins, we shorten transit turnaround times and protect the natural flavor, moisture, and nutritional value of fresh produce.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-stone-700 pt-2">
                <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                  <strong className="block text-stone-900 text-[11px]">Maharashtra Belts:</strong>
                  <span className="text-stone-500 text-[11px]">Nashik Red Onions, Ratnagiri Mangoes, Solapur Pomegranates, Table Grapes.</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                  <strong className="block text-stone-900 text-[11px]">North & South Corridors:</strong>
                  <span className="text-stone-500 text-[11px]">Himachal / Kashmir Apples, G9 Cavendish Bananas, Gujarat Potatoes.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-800">
                Direct procurement corridors
              </span>
              <button
                onClick={() => setActiveView('products')}
                className="text-xs font-bold text-stone-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>View Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Packaging Section (Prompt required) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Transit Protection
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-2">
              Flexible Packaging Options
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
              Packaging engineered to preserve produce respiration, prevent vibration damage, and comply with buyer retail handling specifications.
            </p>
          </div>

          <button
            onClick={() => openQuoteModal(null, 'general_quote')}
            className="shrink-0 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Custom Packaging Quote
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packagingOptions.map(pack => (
            <div
              key={pack.id}
              className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-stone-900">
                  {pack.name}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {pack.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 space-y-1 text-xs">
                <div className="text-[11px] text-stone-500">
                  <strong>Recommended for:</strong> {pack.suitableFor}
                </div>
                {pack.capacity && (
                  <div className="text-[11px] text-emerald-800 font-semibold">
                    Capacity: {pack.capacity}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Distribution (Prompt Required) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 space-y-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Logistics Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Domestic & International Distribution
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              We manage structured supply chains based on actual business operations:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-400" />
                <span>Domestic Supply Chain Across India</span>
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Scheduled dispatches serving wholesale Mandis, supermarket distribution hubs, corporate caterers, hotels, and restaurant chains with flexible lot sizes and regular replenishment cycles.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-emerald-400" />
                <span>International Export Capabilities</span>
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Consignments prepared for sea reefer container shipment and air freight cargo, coordinated through Western and Southern Indian gateway ports with full phytosanitary clearance support.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
