import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Package, 
  Calendar, 
  Globe2, 
  ShieldCheck, 
  Thermometer, 
  Clock, 
  MessageSquare, 
  FileText, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductDetail, setSelectedProductDetail, openQuoteModal, companyConfig } = useApp();

  if (!selectedProductDetail) return null;

  const product = selectedProductDetail;
  const cleanWhatsAppNumber = companyConfig.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200 my-auto"
      >
        {/* Modal Header */}
        <div className="relative h-64 sm:h-80 w-full bg-stone-900">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={() => setSelectedProductDetail(null)}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Title Overlay */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                {product.category === 'fruits' ? 'Fresh Fruit' : 'Fresh Vegetable'}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-white/20">
                {product.availability}
              </span>
              {product.exportAvailability && (
                <span className="bg-emerald-950/80 text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-emerald-500/40 flex items-center gap-1">
                  <Globe2 className="w-3.5 h-3.5" />
                  Export Grade Available
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {product.name}
            </h2>
            <p className="text-emerald-300 text-sm font-medium">
              Variety: {product.variety}
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-20rem)] overflow-y-auto">
          {/* Description */}
          <div>
            <h4 className="text-xs uppercase font-bold text-stone-700 tracking-wider mb-2">
              Product Overview
            </h4>
            <p className="text-sm text-stone-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Technical Specifications Grid */}
          <div>
            <h4 className="text-xs uppercase font-bold text-stone-700 tracking-wider mb-3">
              Commercial & Quality Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80">
                <span className="text-[11px] font-bold text-stone-700 block uppercase">Grade & Sorting</span>
                <span className="text-xs font-semibold text-stone-900 mt-0.5 block">{product.grade}</span>
              </div>

              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80">
                <span className="text-[11px] font-bold text-stone-700 block uppercase">Size & Calibration</span>
                <span className="text-xs font-semibold text-stone-900 mt-0.5 block">{product.size}</span>
              </div>

              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80">
                <span className="text-[11px] font-bold text-stone-700 block uppercase">Origin Sourcing</span>
                <span className="text-xs font-semibold text-stone-900 mt-0.5 block">{product.origin}</span>
              </div>

              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80">
                <span className="text-[11px] font-bold text-stone-700 block uppercase">Minimum Order Quantity (MOQ)</span>
                <span className="text-xs font-semibold text-stone-900 mt-0.5 block">{product.minOrderQuantity}</span>
              </div>

              {product.storageTemp && (
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80">
                  <span className="text-[11px] font-bold text-stone-700 block uppercase">Optimal Storage Temp</span>
                  <span className="text-xs font-semibold text-stone-900 mt-0.5 block">{product.storageTemp}</span>
                </div>
              )}

              {product.shelfLife && (
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80">
                  <span className="text-[11px] font-bold text-stone-700 block uppercase">Estimated Shelf Life</span>
                  <span className="text-xs font-semibold text-stone-900 mt-0.5 block">{product.shelfLife}</span>
                </div>
              )}
            </div>
          </div>

          {/* Packaging Options */}
          <div>
            <h4 className="text-xs uppercase font-bold text-stone-700 tracking-wider mb-2 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-emerald-700" />
              <span>Available Packaging Options</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.packagingOptions.map((opt, i) => (
                <span
                  key={i}
                  className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium px-3 py-1.5 rounded-lg"
                >
                  {opt}
                </span>
              ))}
            </div>
          </div>

          {/* Supply Channel Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Domestic Supply Across India</span>
              </div>
              <p className="text-xs text-stone-600">
                {product.domesticDetails || 'Available for wholesale, supermarket chains, HORECA, and institutional bulk supply.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
                <Globe2 className="w-4 h-4 text-emerald-600" />
                <span>International Export Capabilities</span>
              </div>
              <p className="text-xs text-stone-600">
                {product.exportDetails || 'Compliant with overseas container packing, air shipment protocols, and destination customs requirements.'}
              </p>
            </div>
          </div>

          {/* B2B Pricing Explanation Banner (Explicit Requirement) */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-amber-900">
              <span className="font-bold block text-sm">
                Transparent Wholesale & Export Pricing Policy
              </span>
              <p className="text-amber-800 leading-relaxed">
                Fresh-produce pricing can vary depending on real-time market conditions, harvest season, order quantity, produce grade, packaging type, destination port, and cold-chain logistics. Submit a formal request below to receive an accurate, competitive quote.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(`Hello Kalyan Fresh, I would like to inquire about specifications and quotation for ${product.name} (${product.variety}).`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-emerald-300 text-emerald-900 bg-emerald-50 hover:bg-emerald-100 text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Chat on WhatsApp (+91 9702123919)</span>
          </a>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setSelectedProductDetail(null)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors w-1/2 sm:w-auto"
            >
              Close
            </button>

            <button
              onClick={() => {
                const p = product;
                setSelectedProductDetail(null);
                openQuoteModal(p, 'general_quote');
              }}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-900/10 w-1/2 sm:w-auto cursor-pointer"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
