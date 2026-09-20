import React, { useState, useEffect, useId } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  Download, 
  Printer, 
  Clock, 
  FileText, 
  ShieldCheck, 
  HelpCircle, 
  Building2, 
  Search,
  MessageSquare,
  Sparkles,
  RefreshCw,
  Phone,
  Receipt,
  AlertCircle
} from 'lucide-react';
import QRCode from 'qrcode';
import { KalyanFreshLogo } from '../components/KalyanFreshLogo';
import { PaymentPurpose, BillPayment } from '../types';

export const BillDeskView: React.FC = () => {
  const { 
    companyConfig, 
    enquiries, 
    billPayments, 
    userPaymentIds, 
    addBillPayment, 
    billDeskPreset, 
    setActiveView 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'pay' | 'history' | 'bank'>('pay');
  const [selectedEnquiryRef, setSelectedEnquiryRef] = useState<string>(billDeskPreset?.enquiryRef || '');
  const [payerName, setPayerName] = useState<string>('');
  const [payerCompany, setPayerCompany] = useState<string>('');
  const [payerPhone, setPayerPhone] = useState<string>('');
  const [payerEmail, setPayerEmail] = useState<string>('');
  const [amount, setAmount] = useState<number>(billDeskPreset?.amount || 25000);
  const [purpose, setPurpose] = useState<PaymentPurpose>(billDeskPreset?.purpose || 'Advance Procurement');
  const [billNumber, setBillNumber] = useState<string>(billDeskPreset?.billNumber || '');
  
  // UPI details
  const [upiRefId, setUpiRefId] = useState<string>('');
  const [paymentMode, setPaymentMode] = useState<'UPI_QR' | 'UPI_APP' | 'UPI_ID' | 'BANK_TRANSFER'>('UPI_QR');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isGeneratingQr, setIsGeneratingQr] = useState<boolean>(false);
  
  // State for copied status
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Form submission & generated receipt
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [completedPayment, setCompletedPayment] = useState<BillPayment | null>(null);
  const [viewingReceipt, setViewingReceipt] = useState<BillPayment | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Auto-fill from preset or selected enquiry
  useEffect(() => {
    if (selectedEnquiryRef) {
      const match = enquiries.find(
        e => e.referenceNumber.toLowerCase() === selectedEnquiryRef.toLowerCase() || e.id === selectedEnquiryRef
      );
      if (match) {
        setPayerName(match.fullName);
        setPayerCompany(match.companyName || '');
        setPayerPhone(match.mobileNumber || match.whatsappNumber);
        setPayerEmail(match.email || '');
        if (match.quotedAmount) {
          const parsed = parseFloat(match.quotedAmount.replace(/[^0-9.]/g, ''));
          if (!isNaN(parsed) && parsed > 0) {
            setAmount(parsed);
          }
        }
      }
    }
  }, [selectedEnquiryRef, enquiries]);

  // Construct UPI URI according to NPCI specifications:
  // upi://pay?pa=<VPA>&pn=<MerchantName>&am=<Amount>&cu=INR&tn=<TransactionNote>
  const upiId = companyConfig.upiId || '9702123919@upi';
  const upiName = companyConfig.upiName || 'Kalyan Fresh';
  const transactionNote = `${billNumber ? `Bill-${billNumber}` : (selectedEnquiryRef || 'Produce-Supply')}`;
  
  const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(upiName)}&am=${amount > 0 ? amount.toFixed(2) : '1.00'}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

  // Generate dynamic QR Code when amount, note or upiId changes
  useEffect(() => {
    let isMounted = true;
    const generateQr = async () => {
      setIsGeneratingQr(true);
      try {
        const url = await QRCode.toDataURL(upiUri, {
          width: 320,
          margin: 2,
          color: {
            dark: '#064e3b', // deep emerald
            light: '#ffffff',
          },
          errorCorrectionLevel: 'M',
        });
        if (isMounted) {
          setQrCodeDataUrl(url);
          setIsGeneratingQr(false);
        }
      } catch (err) {
        console.error('Error generating UPI QR code:', err);
        if (isMounted) setIsGeneratingQr(false);
      }
    };

    generateQr();
    return () => {
      isMounted = false;
    };
  }, [upiUri]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleQuickAmount = (val: number) => {
    setAmount(val);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!payerName.trim()) {
      setFormError('Please enter your full name or registered company name.');
      return;
    }
    if (!payerPhone.trim()) {
      setFormError('Please enter your mobile phone number for receipt delivery.');
      return;
    }
    if (!amount || amount <= 0) {
      setFormError('Please enter a valid amount greater than ₹0.');
      return;
    }
    if (!upiRefId.trim()) {
      setFormError('Please enter the 12-digit UPI Reference Number / UTR from your payment app.');
      return;
    }
    if (upiRefId.trim().length < 6) {
      setFormError('The UTR / UPI Reference ID is typically 12 digits. Please double-check your bank or UPI transaction details.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const created = addBillPayment({
        enquiryRef: selectedEnquiryRef || undefined,
        billNumber: billNumber || undefined,
        payerName: payerName.trim(),
        payerCompany: payerCompany.trim() || undefined,
        payerPhone: payerPhone.trim(),
        payerEmail: payerEmail.trim() || undefined,
        amount: Number(amount),
        purpose,
        upiRefId: upiRefId.trim(),
        paymentMode,
      });

      setIsSubmitting(false);
      setCompletedPayment(created);
      setViewingReceipt(created);
    }, 600);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Filter client's payments
  const clientPayments = billPayments.filter(p => userPaymentIds.includes(p.id));

  const cleanWhatsApp = companyConfig.whatsapp.replace(/[^0-9]/g, '');

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Top Banner Header */}
      <section className="bg-emerald-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-amber-500 text-stone-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Instant UPI Settlement</span>
                </span>
                <span className="bg-emerald-800 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Merchant VPA</span>
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-serif">
                Kalyan Fresh Bill Desk
              </h1>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Pay invoice balances, advance procurement tokens, and wholesale consignment deposits directly via Bharat UPI, Google Pay, PhonePe, Paytm, or direct IMPS/RTGS.
              </p>
            </div>

            {/* Emblem badge */}
            <div className="flex items-center gap-4 bg-emerald-900/50 p-3.5 rounded-2xl border border-emerald-700/50 backdrop-blur-xs shrink-0">
              <div className="rounded-full p-1 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-md">
                <KalyanFreshLogo size={56} className="rounded-full" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                  Official Commercial Desk
                </span>
                <span className="block text-sm font-bold text-white font-serif">
                  Kalyan Fresh ®
                </span>
                <span className="block text-xs text-emerald-300 font-mono mt-0.5">
                  UPI: {upiId}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 mt-8 pt-4 border-t border-emerald-800/80 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('pay')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'pay'
                  ? 'bg-white text-emerald-950 shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-emerald-900/60'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>UPI & QR Payment</span>
            </button>

            <button
              onClick={() => setActiveTab('bank')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'bank'
                  ? 'bg-white text-emerald-950 shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-emerald-900/60'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Bank Transfer (RTGS / NEFT)</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer relative ${
                activeTab === 'history'
                  ? 'bg-white text-emerald-950 shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-emerald-900/60'
              }`}
            >
              <Receipt className="w-4 h-4" />
              <span>My Payment Receipts</span>
              {clientPayments.length > 0 && (
                <span className="bg-amber-400 text-stone-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                  {clientPayments.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* TAB 1: PAY VIA UPI */}
        {activeTab === 'pay' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form & Bill Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* Linked Quote Search / Selector */}
              <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                      1. Order / Quotation Link (Optional)
                    </h3>
                  </div>
                  <span className="text-xs text-stone-500">Auto-fill details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Link Enquiry Ref #
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={selectedEnquiryRef}
                        onChange={(e) => setSelectedEnquiryRef(e.target.value)}
                        placeholder="e.g. KF-2026-0841"
                        className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-emerald-700 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Invoice / Bill Number
                    </label>
                    <input
                      type="text"
                      value={billNumber}
                      onChange={(e) => setBillNumber(e.target.value)}
                      placeholder="e.g. INV-2026-092"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-emerald-700 font-mono"
                    />
                  </div>
                </div>

                {/* Quick select from current user's enquiries if available */}
                {enquiries.length > 0 && (
                  <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-stone-500 font-medium">Recent Enquiries:</span>
                    {enquiries.slice(0, 3).map((enq) => (
                      <button
                        key={enq.id}
                        type="button"
                        onClick={() => setSelectedEnquiryRef(enq.referenceNumber)}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition-colors ${
                          selectedEnquiryRef.toLowerCase() === enq.referenceNumber.toLowerCase()
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        #{enq.referenceNumber}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Payment Particulars Form */}
              <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                    2. Payment Details & Amount
                  </h3>
                </div>

                {formError && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Payer Name / Signatory *
                      </label>
                      <input
                        type="text"
                        required
                        value={payerName}
                        onChange={(e) => setPayerName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-emerald-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Company / Business Name
                      </label>
                      <input
                        type="text"
                        value={payerCompany}
                        onChange={(e) => setPayerCompany(e.target.value)}
                        placeholder="Company Name (if applicable)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-emerald-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={payerPhone}
                        onChange={(e) => setPayerPhone(e.target.value)}
                        placeholder="+91 98XXX XXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-emerald-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Email Address (for e-Receipt)
                      </label>
                      <input
                        type="email"
                        value={payerEmail}
                        onChange={(e) => setPayerEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-emerald-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Payment Purpose *
                    </label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value as PaymentPurpose)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-emerald-700 bg-white"
                    >
                      <option value="Advance Procurement">Advance Procurement (30% Booking Token)</option>
                      <option value="Invoice Settlement">Full Invoice Settlement</option>
                      <option value="Wholesale Order">Domestic Wholesale Consignment</option>
                      <option value="Export Consignment">International Export Container</option>
                      <option value="Sample Freight">Inspection / Sample Freight Charges</option>
                    </select>
                  </div>

                  {/* Amount with quick chips */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Payment Amount (INR ₹) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500 font-bold">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={amount || ''}
                        onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                        placeholder="25000"
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-stone-300 text-lg font-bold text-emerald-950 focus:outline-emerald-700 font-mono"
                      />
                    </div>

                    {/* Quick Amount Chips */}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-[11px] text-stone-500">Quick Select:</span>
                      {[10000, 25000, 50000, 100000, 250000].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleQuickAmount(val)}
                          className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                            amount === val
                              ? 'bg-emerald-700 text-white border-emerald-700'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {formatCurrency(val)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Transaction Ref / UTR submission */}
                  <div className="pt-4 border-t border-stone-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                          3. Enter UPI Transaction ID / 12-Digit UTR *
                        </h4>
                      </div>
                      <span className="text-[11px] text-stone-500">From GPay / PhonePe / Paytm</span>
                    </div>

                    <div>
                      <input
                        type="text"
                        maxLength={24}
                        value={upiRefId}
                        onChange={(e) => setUpiRefId(e.target.value.replace(/[^0-9a-zA-Z]/g, ''))}
                        placeholder="e.g. 625911048291 (12 digits)"
                        className="w-full px-4 py-3 rounded-xl border-2 border-emerald-700/30 focus:border-emerald-700 text-base font-mono font-bold tracking-wider text-stone-900 focus:outline-hidden"
                      />
                      <p className="text-[11px] text-stone-500 mt-1">
                        Look for "UPI Ref No.", "UTR", or "Transaction ID" on your payment confirmation screen.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleSubmitPayment}
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Recording & Generating Official Receipt...</span>
                        </>
                      ) : (
                        <>
                          <Receipt className="w-4 h-4 text-amber-300" />
                          <span>Submit Payment & Generate Official Receipt</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic UPI QR Code & 1-Click Apps */}
            <div className="lg:col-span-5 space-y-6">
              {/* Dynamic QR Code Card */}
              <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-lg space-y-5 text-center relative overflow-hidden">
                {/* Official seal header */}
                <div className="flex items-center justify-between border-b border-stone-100 pb-3 text-left">
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-xs">
                      <KalyanFreshLogo size={36} className="rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-stone-900 font-serif">
                        {companyConfig.businessName}
                      </h4>
                      <p className="text-[10px] text-emerald-800 font-semibold">
                        Official Bharat UPI Merchant
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] uppercase font-bold text-stone-400">
                      Amount
                    </span>
                    <span className="block text-base font-extrabold text-emerald-900 font-mono">
                      {formatCurrency(amount || 0)}
                    </span>
                  </div>
                </div>

                {/* QR Code Presentation */}
                <div className="relative inline-block mx-auto p-4 bg-emerald-50/50 rounded-3xl border border-emerald-100 shadow-inner">
                  {isGeneratingQr ? (
                    <div className="w-64 h-64 flex flex-col items-center justify-center text-stone-400 gap-2">
                      <RefreshCw className="w-6 h-6 animate-spin text-emerald-700" />
                      <span className="text-xs">Generating dynamic QR...</span>
                    </div>
                  ) : qrCodeDataUrl ? (
                    <div className="relative">
                      <img
                        src={qrCodeDataUrl}
                        alt={`Kalyan Fresh UPI QR for ${formatCurrency(amount)}`}
                        className="w-64 h-64 object-contain rounded-xl shadow-xs mx-auto"
                      />
                      {/* Center emblem on QR */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-white rounded-full p-1 shadow-md border border-amber-300">
                          <KalyanFreshLogo size={42} className="rounded-full" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-64 h-64 flex items-center justify-center text-stone-400">
                      QR unavailable
                    </div>
                  )}

                  <div className="mt-2 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full">
                      <span>Scan with Any UPI App</span>
                    </span>
                  </div>
                </div>

                {/* UPI ID / VPA with One-Click Copy */}
                <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200 text-left">
                  <span className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                    Official UPI ID / VPA
                  </span>
                  <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-stone-200">
                    <span className="font-mono text-xs sm:text-sm font-bold text-emerald-950 truncate">
                      {upiId}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(upiId, 'upi-id')}
                      className="ml-2 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                    >
                      {copiedKey === 'upi-id' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 1-Click Launch UPI Intent Apps (Mobile & Desktop) */}
                <div className="space-y-2 text-left">
                  <span className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider">
                    Or Pay Directly with Mobile App
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <a
                      href={upiUri}
                      className="p-2.5 rounded-xl border border-stone-200 bg-white hover:border-emerald-600 hover:bg-emerald-50/50 transition-all text-center flex flex-col items-center justify-center gap-1 group"
                    >
                      <span className="text-xs font-bold text-stone-800 group-hover:text-emerald-900">
                        Google Pay
                      </span>
                      <span className="text-[10px] text-stone-400">Direct App</span>
                    </a>

                    <a
                      href={upiUri}
                      className="p-2.5 rounded-xl border border-stone-200 bg-white hover:border-emerald-600 hover:bg-emerald-50/50 transition-all text-center flex flex-col items-center justify-center gap-1 group"
                    >
                      <span className="text-xs font-bold text-stone-800 group-hover:text-emerald-900">
                        PhonePe
                      </span>
                      <span className="text-[10px] text-stone-400">Direct App</span>
                    </a>

                    <a
                      href={upiUri}
                      className="p-2.5 rounded-xl border border-stone-200 bg-white hover:border-emerald-600 hover:bg-emerald-50/50 transition-all text-center flex flex-col items-center justify-center gap-1 group"
                    >
                      <span className="text-xs font-bold text-stone-800 group-hover:text-emerald-900">
                        Paytm
                      </span>
                      <span className="text-[10px] text-stone-400">Direct App</span>
                    </a>

                    <a
                      href={upiUri}
                      className="p-2.5 rounded-xl border border-stone-200 bg-white hover:border-emerald-600 hover:bg-emerald-50/50 transition-all text-center flex flex-col items-center justify-center gap-1 group"
                    >
                      <span className="text-xs font-bold text-stone-800 group-hover:text-emerald-900">
                        BHIM UPI
                      </span>
                      <span className="text-[10px] text-stone-400">NPCI Official</span>
                    </a>

                    <a
                      href={upiUri}
                      className="p-2.5 rounded-xl border border-stone-200 bg-white hover:border-emerald-600 hover:bg-emerald-50/50 transition-all text-center flex flex-col items-center justify-center gap-1 group"
                    >
                      <span className="text-xs font-bold text-stone-800 group-hover:text-emerald-900">
                        CRED Pay
                      </span>
                      <span className="text-[10px] text-stone-400">UPI / Cards</span>
                    </a>

                    <a
                      href={upiUri}
                      className="p-2.5 rounded-xl border border-stone-200 bg-white hover:border-emerald-600 hover:bg-emerald-50/50 transition-all text-center flex flex-col items-center justify-center gap-1 group"
                    >
                      <span className="text-xs font-bold text-stone-800 group-hover:text-emerald-900">
                        Any UPI App
                      </span>
                      <span className="text-[10px] text-stone-400">Auto Detect</span>
                    </a>
                  </div>
                </div>

                {/* WhatsApp Support Assistance */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500">Need billing assistance?</span>
                  <a
                    href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(`Hello Kalyan Fresh Accounts Desk, I am paying ₹${amount} for order ref: ${selectedEnquiryRef || 'New'}. Please assist.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp Accounts</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BANK TRANSFER (RTGS/NEFT/IMPS) */}
        {activeTab === 'bank' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-6">
              <div className="flex items-start gap-4 pb-6 border-b border-stone-200">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-stone-900 font-serif">
                    Official Corporate Bank Account Details
                  </h2>
                  <p className="text-stone-500 text-xs sm:text-sm mt-1">
                    For high-value wholesale procurement, institutional contracts, and international letters of credit (LC).
                  </p>
                </div>
              </div>

              {/* Bank Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                    Beneficiary Account Name
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-bold text-stone-900">
                      {companyConfig.bankAccountName || 'Kalyan Fresh Agri Operations'}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(companyConfig.bankAccountName || 'Kalyan Fresh Agri Operations', 'acc-name')}
                      className="text-emerald-800 hover:text-emerald-950 p-1"
                      title="Copy"
                    >
                      {copiedKey === 'acc-name' ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                    Account Number
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-base font-mono font-extrabold text-emerald-950">
                      {companyConfig.bankAccountNumber || '50200089214432'}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(companyConfig.bankAccountNumber || '50200089214432', 'acc-no')}
                      className="text-emerald-800 hover:text-emerald-950 p-1"
                      title="Copy"
                    >
                      {copiedKey === 'acc-no' ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                    IFSC Code
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-base font-mono font-bold text-stone-900">
                      {companyConfig.bankIfsc || 'HDFC0001234'}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(companyConfig.bankIfsc || 'HDFC0001234', 'ifsc')}
                      className="text-emerald-800 hover:text-emerald-950 p-1"
                      title="Copy"
                    >
                      {copiedKey === 'ifsc' ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                    Bank & Branch
                  </span>
                  <div className="mt-1">
                    <span className="text-sm font-bold text-stone-900 block">
                      {companyConfig.bankName || 'HDFC Bank Ltd'}
                    </span>
                    <span className="text-xs text-stone-500 block">
                      {companyConfig.bankBranch || 'APMC Commercial Yard, Vashi, Navi Mumbai'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 space-y-2">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Important Commercial Payment Notice</span>
                </div>
                <p>
                  Please send your Bank UTR or IMPS reference number via WhatsApp at <strong>{companyConfig.whatsapp}</strong> or enter it in the UPI / Bill Desk tab above to automatically generate your official Kalyan Fresh Payment Receipt.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab('pay')}
                  className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Enter UTR on Bill Desk</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PAYMENT RECEIPTS & HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-stone-900 font-serif">
                  My Payment History & Official Receipts
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Track verification status and download digital acknowledgement receipts.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('pay')}
                className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Make a New Payment</span>
              </button>
            </div>

            {clientPayments.length === 0 ? (
              <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4">
                <Receipt className="w-12 h-12 text-stone-300 mx-auto" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-stone-900">No payment records found yet</h3>
                  <p className="text-xs text-stone-500 max-w-md mx-auto">
                    When you submit a payment reference on this device, your official digital receipts will be securely stored here.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('pay')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors"
                >
                  Pay via UPI Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clientPayments.map((pay) => (
                  <div
                    key={pay.id}
                    className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full">
                          {pay.receiptNumber}
                        </span>
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                            pay.status === 'Verified' || pay.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : pay.status === 'Rejected'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {pay.status}
                        </span>
                      </div>

                      <div>
                        <span className="text-xs text-stone-500 block">Amount Paid</span>
                        <span className="text-2xl font-black text-emerald-950 font-mono">
                          {formatCurrency(pay.amount)}
                        </span>
                      </div>

                      <div className="text-xs space-y-1 text-stone-600 pt-2 border-t border-stone-100">
                        <div className="flex justify-between">
                          <span className="text-stone-400">Payer:</span>
                          <span className="font-semibold text-stone-900 truncate max-w-[160px]">
                            {pay.payerName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Purpose:</span>
                          <span className="font-medium text-stone-800">{pay.purpose}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">UPI Ref (UTR):</span>
                          <span className="font-mono font-bold text-stone-900">{pay.upiRefId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Date:</span>
                          <span>{new Date(pay.paymentDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setViewingReceipt(pay)}
                      className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-emerald-50 text-emerald-900 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Receipt className="w-3.5 h-3.5 text-emerald-700" />
                      <span>View Official Digital Receipt</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* OFFICIAL DIGITAL RECEIPT MODAL */}
      {viewingReceipt && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 my-auto text-stone-900">
            {/* Printable Receipt Card Body */}
            <div id="printable-receipt-area" className="p-6 sm:p-8 space-y-6">
              {/* Receipt Header with Logo & Brand Seal */}
              <div className="flex items-start justify-between border-b-2 border-stone-200 pb-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-full p-1 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-sm">
                    <KalyanFreshLogo size={52} className="rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-950 font-serif">
                      {companyConfig.businessName}
                    </h3>
                    <span className="block text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
                      Official Payment Acknowledgement Receipt
                    </span>
                    <span className="block text-[10px] text-stone-500">
                      Website: www.kalyanfresh.in | Ph: {companyConfig.phone}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="block text-[10px] font-bold text-stone-400 uppercase">
                    Receipt Number
                  </span>
                  <span className="block font-mono text-xs font-extrabold text-emerald-950">
                    {viewingReceipt.receiptNumber}
                  </span>
                  <span className="inline-block mt-1 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase bg-emerald-100 text-emerald-800">
                    {viewingReceipt.status}
                  </span>
                </div>
              </div>

              {/* Amount Highlight Banner */}
              <div className="bg-emerald-950 text-white rounded-2xl p-4 sm:p-5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">
                    Total Amount Received
                  </span>
                  <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                    {formatCurrency(viewingReceipt.amount)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-300 block">Payment Mode</span>
                  <span className="text-xs font-bold text-amber-300 uppercase">
                    {viewingReceipt.paymentMode.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Particulars Table */}
              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-3 py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">Payer Name:</span>
                  <span className="col-span-2 font-bold text-stone-900">{viewingReceipt.payerName}</span>
                </div>

                {viewingReceipt.payerCompany && (
                  <div className="grid grid-cols-3 py-1.5 border-b border-stone-100">
                    <span className="text-stone-500">Company Name:</span>
                    <span className="col-span-2 font-semibold text-stone-900">{viewingReceipt.payerCompany}</span>
                  </div>
                )}

                <div className="grid grid-cols-3 py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">Mobile / WhatsApp:</span>
                  <span className="col-span-2 font-mono text-stone-900">{viewingReceipt.payerPhone}</span>
                </div>

                <div className="grid grid-cols-3 py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">Payment Purpose:</span>
                  <span className="col-span-2 font-medium text-emerald-900">{viewingReceipt.purpose}</span>
                </div>

                {viewingReceipt.enquiryRef && (
                  <div className="grid grid-cols-3 py-1.5 border-b border-stone-100">
                    <span className="text-stone-500">Enquiry Ref #:</span>
                    <span className="col-span-2 font-mono font-bold text-stone-900">{viewingReceipt.enquiryRef}</span>
                  </div>
                )}

                {viewingReceipt.billNumber && (
                  <div className="grid grid-cols-3 py-1.5 border-b border-stone-100">
                    <span className="text-stone-500">Invoice / Bill #:</span>
                    <span className="col-span-2 font-mono font-bold text-stone-900">{viewingReceipt.billNumber}</span>
                  </div>
                )}

                <div className="grid grid-cols-3 py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">UPI Ref (UTR) ID:</span>
                  <span className="col-span-2 font-mono font-bold text-stone-950 bg-stone-100 px-2 py-0.5 rounded inline-block w-fit">
                    {viewingReceipt.upiRefId}
                  </span>
                </div>

                <div className="grid grid-cols-3 py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">Date & Timestamp:</span>
                  <span className="col-span-2 text-stone-700">
                    {new Date(viewingReceipt.paymentDate).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
              </div>

              {/* Bottom Verification Footer */}
              <div className="pt-4 border-t-2 border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Digitally generated commercial transaction voucher</span>
                </div>
                <span className="font-mono text-stone-400">
                  Kalyan Fresh Finance Cell
                </span>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="bg-stone-50 p-4 sm:p-5 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={printReceipt}
                  className="px-4 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>

                <a
                  href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
                    `Hello Kalyan Fresh, here is my payment receipt:\nReceipt No: ${viewingReceipt.receiptNumber}\nPayer: ${viewingReceipt.payerName}\nAmount: ${formatCurrency(viewingReceipt.amount)}\nUTR: ${viewingReceipt.upiRefId}\nPurpose: ${viewingReceipt.purpose}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Share on WhatsApp</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => setViewingReceipt(null)}
                className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
