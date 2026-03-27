import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((title, message = '', type = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000); // Auto-dismiss after 4s
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      
      {/* Absolute Toast Container over everything */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`pointer-events-auto flex items-start gap-3 min-w-[320px] max-w-sm p-4 rounded-xl shadow-2xl border transform transition-all duration-300 translate-y-0 opacity-100 ${
              toast.type === 'success' ? 'bg-white border-green-200 shadow-green-900/5' :
              toast.type === 'error' ? 'bg-white border-red-200 shadow-red-900/5' :
              'bg-white border-blue-200 shadow-blue-900/5'
            }`}
          >
             <div className="shrink-0 mt-0.5">
               {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
               {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
               {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
             </div>
             <div className="flex-1">
               <h4 className="text-sm font-bold text-gray-900">{toast.title}</h4>
               {toast.message && <p className="text-xs text-gray-500 mt-1 leading-snug">{toast.message}</p>}
             </div>
             <button onClick={() => removeToast(toast.id)} className="shrink-0 text-gray-400 hover:text-gray-900 transition-colors">
               <X className="w-4 h-4" />
             </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
