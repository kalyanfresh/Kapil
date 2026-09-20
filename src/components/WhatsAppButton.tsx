import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const { companyConfig } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState('');

  const cleanWhatsAppNumber = companyConfig.whatsapp.replace(/[^0-9]/g, '');

  const handleSend = (textToSend?: string) => {
    const text = textToSend || quickMsg || 'Hello Kalyan Fresh, I am interested in sourcing fresh produce (wholesale / export).';
    const url = `https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setQuickMsg('');
  };

  const quickPrompts = [
    'Export mangoes & pomegranate availability',
    'Bulk Nashik red onion price quote',
    'Domestic supply for supermarket chain',
    'Packaging options and container freight inquiry'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Quick Chat Box */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center border-2 border-emerald-400">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold flex items-center gap-1.5">
                  <span>Kalyan Fresh WhatsApp</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                </div>
                <p className="text-[11px] text-emerald-200">
                  {companyConfig.whatsapp} • Online for Inquiries
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-emerald-200 hover:text-white p-1 rounded-md"
              aria-label="Close chat helper"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-stone-50 space-y-3 text-xs">
            <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-xs border border-stone-200 text-stone-700 space-y-1">
              <p className="font-semibold text-emerald-900">
                Welcome to Kalyan Fresh!
              </p>
              <p className="text-stone-600">
                How can we assist your business today? Choose a quick inquiry or type your message to chat directly on WhatsApp.
              </p>
            </div>

            {/* Quick Suggestions */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                Quick Inquiries:
              </span>
              <div className="flex flex-col gap-1.5">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(`Hello Kalyan Fresh, I would like to inquire regarding: ${prompt}`)}
                    className="text-left bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 px-3 py-2 rounded-lg border border-stone-200 text-xs transition-colors flex items-center justify-between group"
                  >
                    <span>{prompt}</span>
                    <Send className="w-3 h-3 text-stone-400 group-hover:text-emerald-600" />
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Textarea */}
            <div className="pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your produce inquiry..."
                  value={quickMsg}
                  onChange={(e) => setQuickMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="flex-1 bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                />
                <button
                  onClick={() => handleSend()}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center shrink-0"
                  title="Open WhatsApp"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        id="floating-whatsapp-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl shadow-emerald-900/20 transition-all duration-200 hover:scale-105 cursor-pointer focus:outline-hidden"
        aria-label="Chat with Kalyan Fresh on WhatsApp"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 fill-white text-emerald-600" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 border-2 border-emerald-600 rounded-full"></span>
        </div>
        <span className="text-xs font-bold tracking-tight hidden sm:inline">
          Chat with Kalyan Fresh on WhatsApp
        </span>
        <span className="text-xs font-bold sm:hidden">
          WhatsApp
        </span>
      </button>
    </div>
  );
};
