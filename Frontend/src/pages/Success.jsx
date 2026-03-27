import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowRight, ShoppingBag, XCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Success = () => {
  const { cartItems, clearCart } = useCart();
  const { token } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const processingRef = useRef(false);
  
  const [status, setStatus] = useState('processing');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const processOrder = async () => {
      // Prevent double firing inside React Strict Mode
      if (processingRef.current) return;
      
      const queryParams = new URLSearchParams(location.search);
      const dataParam = queryParams.get('data');
      
      // If there's no data param, just assume they visited /success directly
      if (!dataParam) {
        setStatus('success');
        return;
      }

      processingRef.current = true;
      
      try {
        const decodedStr = atob(dataParam);
        const eSewaData = JSON.parse(decodedStr);
        
        if (eSewaData.status !== 'COMPLETE') {
          throw new Error('Payment was not reported as complete by eSewa.');
        }

        // If the cart is already empty (reloaded success page), assume order was logged previously
        if (cartItems.length === 0) {
          setStatus('success');
          return;
        }
        
        // Map cart items into the shape our Backend expects
        const items = cartItems.map(item => {
          // Identify if it's a bespoke/custom item (ID 100) or a readymade one (String or Number ID)
          const isBespoke = item.id === 100 || item.id === '100' || item.id.toString().startsWith('bespoke_');
          
          return {
            product_id: isBespoke ? 100 : (parseInt(item.id.toString().replace('ready_', '')) || item.id),
            quantity: item.quantity,
            custom_dimensions: isBespoke && item.customizations?.dimensions 
              ? `${item.customizations.dimensions.height}x${item.customizations.dimensions.width}x${item.customizations.dimensions.depth}` 
              : null,
            selected_material: item.customizations?.material?.name || item.customizations?.material || null,
            selected_color: item.customizations?.color || item.customizations?.frameColor || null,
            subtotal: item.price * item.quantity
          };
        });
        
        // eSewa total_amount format: "1000.0". Parse string and remove commas if any.
        const totalAmount = eSewaData.total_amount 
          ? parseFloat(eSewaData.total_amount.replace(/,/g, '')) 
          : cartItems.reduce((acc, current) => acc + current.price * current.quantity, 0);

        const orderPayload = {
          items,
          total_amount: totalAmount,
          status: 'paid'
        };

        const res = await fetch('/api/orders/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Provide our user token
          },
          body: JSON.stringify(orderPayload)
        });

        const resultData = await res.json();
        if (!res.ok) {
           throw new Error(resultData.message || 'Failed to save order to the database');
        }
        
        // If the backend returned a 201/200, the order is safe on database. Then we clear local cache!
        clearCart();
        addToast('Payment Successful', 'Your cart has been securely cleared and the order placed.', 'success');
        setStatus('success');
      } catch (err) {
        console.error('Error processing order:', err);
        setErrorMsg(err.message);
        setStatus('error');
      }
    };

    processOrder();
  }, [location.search, cartItems, token, clearCart]);

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center transform transition-all">
        
        {status === 'processing' ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            <p className="text-gray-500 animate-pulse font-medium">Verifying payment and securing your order...</p>
          </div>
        ) : status === 'error' ? (
           <>
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-gray-900 mb-4 tracking-tight">Order Log Failed</h1>
            <p className="text-red-600 font-medium mb-1">Your payment may have succeeded, but we couldn't log the invoice.</p>
            <p className="text-gray-400 text-sm mb-6 max-w-[250px]">{errorMsg}</p>
            <p className="text-gray-500 mb-8 border border-red-100 bg-red-50 p-3 rounded-lg text-sm">
               Please contact support and quote your account details if your balance was deducted.
            </p>
           </>
        ) : (
          <>
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4 tracking-tight">Payment Successful!</h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Thank you for your order with FurNeater. Your custom furniture request has been securely processed via eSewa. 
              We'll start working on your masterpiece right away.
            </p>
            
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 w-full mb-8 flex justify-between items-center text-sm">
               <span className="text-gray-500 font-medium">Order Status:</span>
               <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">Confirmed & Paid</span>
            </div>
          </>
        )}

        {(status === 'success' || status === 'error') && (
            <div className="flex flex-col gap-4 w-full">
              <Link 
                to="/shop" 
                className="w-full flex justify-center items-center gap-2 py-4 px-6 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl font-bold hover:shadow-lg hover:shadow-gray-400/50 transition-all transform hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-5 h-5" />
                Continue Shopping
              </Link>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 px-6 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 hover:text-black transition-colors"
              >
                Return to Home
              </button>
            </div>
        )}
        
      </div>
    </div>
  );
};

export default Success;
