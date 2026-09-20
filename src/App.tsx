import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { NotificationToast } from './components/NotificationToast';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuoteModal } from './components/QuoteModal';

// Views
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ProductsView } from './views/ProductsView';
import { ExportView } from './views/ExportView';
import { ContactView } from './views/ContactView';
import { EnquiryHistoryView } from './views/EnquiryHistoryView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { BillDeskView } from './views/BillDeskView';
import { Sparkles, X } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { activeView, companyConfig, updateCompanyConfig } = useApp();
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-stone-100/60 text-stone-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Optional Top Announcement Bar */}
      {companyConfig.showBanner && companyConfig.bannerNotice && (
        <aside aria-label="Announcement" className="bg-emerald-900 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 mx-auto sm:mx-0">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-medium tracking-wide">
                {companyConfig.bannerNotice}
              </span>
            </div>
            <button
              onClick={() => updateCompanyConfig({ showBanner: false })}
              className="text-emerald-300 hover:text-white shrink-0 hidden sm:block"
              title="Dismiss announcement"
              aria-label="Dismiss announcement"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Main Corporate Header */}
      <Header onOpenNotifications={() => setIsNotificationOpen(true)} />

      {/* Dynamic View Container */}
      <main className="flex-1">
        {activeView === 'home' && <HomeView />}
        {activeView === 'about' && <AboutView />}
        {activeView === 'products' && <ProductsView />}
        {activeView === 'export' && <ExportView />}
        {activeView === 'contact' && <ContactView />}
        {activeView === 'history' && <EnquiryHistoryView />}
        {activeView === 'billdesk' && <BillDeskView />}
        {activeView === 'admin' && <AdminDashboardView />}
      </main>

      {/* Corporate Footer */}
      <Footer />

      {/* Interactive Global Modals & Overlays */}
      <ProductDetailModal />
      <QuoteModal />
      <NotificationToast isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />

      {/* Floating Action CTA */}
      <WhatsAppButton />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
