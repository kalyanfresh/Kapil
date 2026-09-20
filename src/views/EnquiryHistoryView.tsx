import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  ArrowRight, 
  Package, 
  MapPin, 
  Calendar, 
  Building, 
  Search,
  ExternalLink,
  ShieldAlert,
  CreditCard
} from 'lucide-react';
import { EnquiryStatus } from '../types';

export const EnquiryHistoryView: React.FC = () => {
  const { enquiries, userEnquiryIds, companyConfig, openQuoteModal, setActiveView, openBillDesk } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const cleanWhatsAppNumber = companyConfig.whatsapp.replace(/[^0-9]/g, '');

  // Filter enquiries that belong to the user or match search
  const userEnquiries = enquiries.filter(enq => {
    const isUserEnquiry = userEnquiryIds.includes(enq.id);
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        enq.referenceNumber.toLowerCase().includes(q) ||
        enq.productRequired.toLowerCase().includes(q) ||
        enq.fullName.toLowerCase().includes(q)
      );
    }
    return isUserEnquiry;
  });

  const getStatusColor = (status: EnquiryStatus) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contacted':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Quotation Sent':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Completed':
        return 'bg-stone-100 text-stone-800 border-stone-300';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  const statusSteps: EnquiryStatus[] = ['New', 'Contacted', 'Quotation Sent', 'Confirmed', 'Completed'];

  const getStepIndex = (status: EnquiryStatus) => {
    return statusSteps.indexOf(status);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="bg-emerald-800 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Customer Self-Service
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Track My Enquiries & Orders
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Monitor real-time status progression for your wholesale quotation requests, bulk supplies, and international export enquiries.
          </p>
        </div>
      </div>

      {/* Search Filter */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by Ref # (e.g. KF-2026-0841)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
          />
        </div>

        <button
          onClick={() => openQuoteModal(null, 'general_quote')}
          className="w-full sm:w-auto px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors shrink-0"
        >
          Submit New Enquiry
        </button>
      </div>

      {/* List of Enquiries */}
      <div className="space-y-6">
        {userEnquiries.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
            <FileText className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="text-base font-bold text-stone-800">
              No Enquiries Found
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              You haven't submitted any enquiries yet or the reference number did not match.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => openQuoteModal(null, 'general_quote')}
                className="px-5 py-2.5 bg-emerald-700 text-white font-semibold text-xs rounded-xl hover:bg-emerald-800"
              >
                Request a Quote Now
              </button>
              <button
                onClick={() => setActiveView('products')}
                className="px-5 py-2.5 bg-stone-100 text-stone-700 font-semibold text-xs rounded-xl hover:bg-stone-200"
              >
                Browse Produce Catalog
              </button>
            </div>
          </div>
        ) : (
          userEnquiries.map(enq => {
            const currentStepIdx = getStepIndex(enq.status);
            return (
              <div
                key={enq.id}
                className="bg-white rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-all p-6 sm:p-8 space-y-6"
              >
                {/* Top Row: Ref, Date, and Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm sm:text-base text-stone-900">
                          Ref: #{enq.referenceNumber}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                          {enq.type === 'export_enquiry'
                            ? 'Export Enquiry'
                            : enq.type === 'bulk_order'
                            ? 'Bulk Order'
                            : 'Quote Request'}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-400">
                        Submitted on {new Date(enq.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(enq.status)}`}>
                      Status: {enq.status}
                    </span>
                  </div>
                </div>

                {/* Progress Visual Tracker (New → Contacted → Quotation Sent → Confirmed → Completed) */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                    Pipeline Progression
                  </span>
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {statusSteps.map((step, idx) => {
                      const isCompleted = idx <= currentStepIdx;
                      const isCurrent = idx === currentStepIdx;
                      return (
                        <div key={step} className="space-y-1 text-center">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              isCurrent
                                ? 'bg-emerald-600 ring-2 ring-emerald-200'
                                : isCompleted
                                ? 'bg-emerald-500'
                                : 'bg-stone-200'
                            }`}
                          />
                          <span
                            className={`block text-[10px] truncate ${
                              isCurrent
                                ? 'font-bold text-emerald-900'
                                : isCompleted
                                ? 'font-medium text-stone-700'
                                : 'text-stone-400'
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs bg-stone-50/80 p-4 rounded-2xl border border-stone-200/80">
                  <div>
                    <span className="text-stone-400 block text-[11px]">Product Requested:</span>
                    <strong className="text-stone-900 font-semibold">{enq.productRequired}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">Volume / Quantity:</span>
                    <strong className="text-stone-900 font-semibold">{enq.quantity}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">Packaging:</span>
                    <strong className="text-stone-900 font-semibold">{enq.packagingRequirement || 'Standard'}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">Destination:</span>
                    <strong className="text-stone-900 font-semibold">{enq.deliveryLocation}, {enq.city}</strong>
                  </div>
                </div>

                {/* Additional Notes or Admin Quoted Amount if available */}
                {(enq.quotedAmount || enq.adminNotes) && (
                  <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 text-xs space-y-1.5">
                    {enq.quotedAmount && (
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-900 font-bold">Kalyan Fresh Formal Quotation:</span>
                        <span className="font-bold text-emerald-800 text-sm">{enq.quotedAmount}</span>
                      </div>
                    )}
                    {enq.adminNotes && (
                      <p className="text-emerald-800 text-[11px]">
                        <strong>Trade Desk Note:</strong> {enq.adminNotes}
                      </p>
                    )}
                  </div>
                )}

                {/* Actions Bottom Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] text-stone-500">
                    Contact person: <strong>{enq.fullName}</strong> {enq.companyName ? `(${enq.companyName})` : ''}
                  </span>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        let parsedAmount: number | undefined;
                        if (enq.quotedAmount) {
                          const num = parseFloat(enq.quotedAmount.replace(/[^0-9.]/g, ''));
                          if (!isNaN(num) && num > 0) parsedAmount = num;
                        }
                        openBillDesk({
                          enquiryRef: enq.referenceNumber,
                          amount: parsedAmount,
                          purpose: enq.status === 'Quotation Sent' ? 'Advance Procurement' : 'Wholesale Order',
                        });
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-stone-950 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-stone-950" />
                      <span>Pay via UPI (Bill Desk)</span>
                    </button>

                    <a
                      href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(`Hello Kalyan Fresh, I am following up on enquiry ref #${enq.referenceNumber} for ${enq.productRequired}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Follow up on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
