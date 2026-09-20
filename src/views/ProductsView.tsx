import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { 
  Search, 
  Filter, 
  Layers, 
  Globe2, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Plus, 
  AlertCircle,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

export const ProductsView: React.FC = () => {
  const { 
    products, 
    categoryFilter, 
    setCategoryFilter, 
    searchQuery, 
    setSearchQuery, 
    openQuoteModal, 
    companyConfig,
    isAdminLoggedIn,
    setActiveView
  } = useApp();

  const [seasonFilter, setSeasonFilter] = useState<'all' | 'in_season' | 'export_only'>('all');

  const cleanWhatsAppNumber = companyConfig.whatsapp.replace(/[^0-9]/g, '');

  // Filtered list
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Must be active (unless admin view)
      if (!p.isActive && !isAdminLoggedIn) return false;

      // Category check
      if (categoryFilter !== 'all' && p.category !== categoryFilter) {
        return false;
      }

      // Season / Export filter
      if (seasonFilter === 'in_season' && p.availability !== 'In Season') {
        return false;
      }
      if (seasonFilter === 'export_only' && !p.exportAvailability) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesVariety = p.variety.toLowerCase().includes(q);
        const matchesOrigin = p.origin.toLowerCase().includes(q);
        const matchesGrade = p.grade.toLowerCase().includes(q);
        return matchesName || matchesVariety || matchesOrigin || matchesGrade;
      }

      return true;
    });
  }, [products, categoryFilter, seasonFilter, searchQuery, isAdminLoggedIn]);

  const fruitCount = products.filter(p => p.category === 'fruits' && p.isActive).length;
  const vegCount = products.filter(p => p.category === 'vegetables' && p.isActive).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold">
            <span>Wholesale & Export Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Fresh Produce Catalog
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Direct farm-corridor sourced fresh fruits and vegetables graded for Indian domestic distribution, institutional wholesale, and international export.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="bg-white/10 px-3 py-1 rounded-lg text-emerald-300">
              Fruits: {fruitCount} varieties
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-lg text-emerald-300">
              Vegetables: {vegCount} varieties
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Notice Card (Explicit Requirement) */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-xs text-amber-950">
            <span className="font-bold block text-sm">
              Pricing Transparency Note
            </span>
            <p className="text-amber-800 leading-relaxed max-w-3xl">
              Fresh-produce pricing can vary depending on market conditions, season, quantity, quality, destination and logistics. Please request a quote for competitive, real-time B2B procurement rates.
            </p>
          </div>
        </div>
        <button
          onClick={() => openQuoteModal(null, 'general_quote')}
          className="shrink-0 px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl transition-colors"
        >
          Request a Quote
        </button>
      </div>

      {/* Controls Bar: Search & Category Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by product name, variety, origin (e.g. Alphonso, Onion, Nashik, Apple)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl overflow-x-auto shrink-0">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                categoryFilter === 'all'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Produce ({products.filter(p => p.isActive).length})
            </button>
            <button
              onClick={() => setCategoryFilter('fruits')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                categoryFilter === 'fruits'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Fresh Fruits ({fruitCount})
            </button>
            <button
              onClick={() => setCategoryFilter('vegetables')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                categoryFilter === 'vegetables'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Fresh Vegetables ({vegCount})
            </button>
          </div>
        </div>

        {/* Secondary Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-stone-700 font-medium">Filter by:</span>
            <button
              onClick={() => setSeasonFilter('all')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                seasonFilter === 'all'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              All Harvests
            </button>
            <button
              onClick={() => setSeasonFilter('in_season')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                seasonFilter === 'in_season'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              In Season Now
            </button>
            <button
              onClick={() => setSeasonFilter('export_only')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors flex items-center gap-1 ${
                seasonFilter === 'export_only'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Globe2 className="w-3 h-3" />
              <span>Export Ready</span>
            </button>
          </div>

          <div className="text-stone-500 text-[11px]">
            Showing <strong className="text-stone-800">{filteredProducts.length}</strong> items
          </div>
        </div>
      </div>

      {/* Admin shortcut if logged in */}
      {isAdminLoggedIn && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span className="font-semibold">Admin Mode Active:</span>
            <span>You can add, edit, hide, or remove products directly.</span>
          </div>
          <button
            onClick={() => setActiveView('admin')}
            className="px-3 py-1.5 bg-amber-700 text-white rounded-lg font-bold text-xs hover:bg-amber-800"
          >
            Open Admin Product Manager
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 space-y-4">
          <Layers className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="text-base font-bold text-stone-800">No produce matching criteria</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try adjusting your search terms or filter selections to view available seasonal fruits and vegetables.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
              setSeasonFilter('all');
            }}
            className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Bottom Assistance Callout */}
      <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-stone-900">
            Looking for a specific fresh fruit or vegetable not listed above?
          </h4>
          <p className="text-xs text-stone-600 mt-0.5">
            We source custom farm harvest volumes through our producer corridors across Maharashtra, Gujarat, and South India.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent('Hello Kalyan Fresh, I am looking for custom produce sourcing.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 rounded-xl text-xs font-semibold flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp Custom Request</span>
          </a>
          <button
            onClick={() => openQuoteModal(null, 'bulk_order')}
            className="px-4 py-2 bg-emerald-800 text-white hover:bg-emerald-900 rounded-xl text-xs font-semibold"
          >
            Bulk Enquiry Form
          </button>
        </div>
      </div>
    </div>
  );
};
