import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, X, Check, Clock, AlertCircle } from 'lucide-react';

export const NotificationDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, clearAllNotifications, setActiveView } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-800" />
            <h3 className="font-bold text-stone-900 text-sm">
              Notifications & Activity
            </h3>
            <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold">
              {notifications.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="text-xs text-stone-500 hover:text-stone-700 underline"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-200"
              aria-label="Close notifications"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-stone-400">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-40 text-stone-400" />
              <p className="text-xs font-medium">No new notifications</p>
              <p className="text-[11px] text-stone-400 mt-1">
                Updates regarding your quotations and export enquiries will appear here.
              </p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  notif.read
                    ? 'bg-stone-50 border-stone-200 opacity-80'
                    : 'bg-emerald-50/70 border-emerald-200 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    {notif.type === 'status_update' ? (
                      <Check className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">
                        {notif.title}
                      </h4>
                      <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                        {notif.message}
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-stone-400">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1"></span>
                  )}
                </div>

                {notif.enquiryId && (
                  <div className="mt-2 pt-2 border-t border-stone-200/60 flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markNotificationAsRead(notif.id);
                        onClose();
                        setActiveView('history');
                      }}
                      className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 underline"
                    >
                      Track this enquiry →
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 text-center">
          <button
            onClick={() => {
              onClose();
              setActiveView('history');
            }}
            className="w-full py-2 bg-white border border-stone-300 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors"
          >
            View Customer Enquiry History
          </button>
        </div>
      </div>
    </div>
  );
};

export const NotificationToast = NotificationDrawer;

