import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Globe2, 
  MapPin, 
  Package, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { openQuoteModal, setSelectedProductDetail, companyConfig } = useApp();

  const cleanWhatsAppNumber = companyConfig.whatsapp.replace(/[^0-9]/g, '');

  const getAvailabilityBadge = (status: Product['availability']) => {
    switch (status) {
      case 'In Season':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Year-round':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Limited Stock':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-300';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Product Image Stage */}
      <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="bg-emerald-950/85 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wide uppercase shadow-xs">
            {product.category === 'fruits' ? 'Fresh Fruit' : 'Fresh Vegetable'}
          </span>

          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border backdrop-blur-xs shadow-xs ${getAvailabilityBadge(product.availability)}`}>
            {product.availability}
          </span>
        </div>

        {/* Bottom Image Overlay Badges */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 font-medium text-emerald-100 drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span className="truncate max-w-[200px] text-[11px]">{product.origin}</span>
          </div>

          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded text-[10px]">
            {product.exportAvailability && (
              <span className="text-emerald-300 font-bold flex items-center gap-0.5">
                <Globe2 className="w-3 h-3" /> Export
              </span>
            )}
            {product.domesticAvailability && product.exportAvailability && <span>•</span>}
            {product.domesticAvailability && (
              <span className="text-stone-200">Domestic</span>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Title and Variety */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                {product.name}
              </h3>
              <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                {product.variety}
              </p>
            </div>
            {product.isFeatured && (
              <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                Featured
              </span>
            )}
          </div>

          <p className="text-xs text-stone-600 mt-2.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Key Specifications Grid */}
          <div className="mt-3.5 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-stone-50 p-2 rounded-lg border border-stone-100">
              <span className="text-[10px] text-stone-700 block uppercase font-bold tracking-wider">
                Grade & Quality
              </span>
              <span className="font-semibold text-stone-800 text-[11px] truncate block">
                {product.grade}
              </span>
            </div>

            <div className="bg-stone-50 p-2 rounded-lg border border-stone-100">
              <span className="text-[10px] text-stone-700 block uppercase font-bold tracking-wider">
                Min. Order (MOQ)
              </span>
              <span className="font-semibold text-stone-800 text-[11px] truncate block">
                {product.minOrderQuantity}
              </span>
            </div>
          </div>

          {/* Packaging summary tag */}
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-stone-700">
            <Package className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">
              Packaging: {product.packagingOptions.join(', ')}
            </span>
          </div>
        </div>

        {/* Pricing Notice & Action Buttons */}
        <div className="space-y-3 pt-2">
          <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-xl p-2.5 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-emerald-800 font-bold block uppercase tracking-wider">
                B2B Pricing Model
              </span>
              <span className="font-semibold text-emerald-950 text-xs">
                Custom Quotation
              </span>
            </div>
            <span className="text-[11px] text-emerald-700 italic">
              Seasonal rates apply
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => setSelectedProductDetail(product)}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              title="View full product specifications"
            >
              <FileText className="w-3.5 h-3.5 text-stone-500" />
              <span>Full Specs</span>
            </button>

            <button
              onClick={() => openQuoteModal(product, 'general_quote')}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors flex items-center justify-center gap-1 shadow-sm cursor-pointer"
              title="Request formal price quotation"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Direct WhatsApp Action */}
          <a
            href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(`Hello Kalyan Fresh, I would like to inquire about pricing and supply for ${product.name} (${product.variety}).`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-1.5 rounded-lg text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5 border border-emerald-200"
          >
            <MessageSquare className="w-3 h-3 text-emerald-600" />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
