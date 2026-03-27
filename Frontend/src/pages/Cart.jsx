import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShieldCheck, Heart, Info, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, favorites, removeFromCart, updateQuantity, toggleFavorite, isFavorite } = useCart();
  const { user, token } = useAuth();
  const { addToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  // Subtotal calculated from the global state cart with safety guards
  const subtotal = Array.isArray(cartItems) ? cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;
    return sum + (price * qty);
  }, 0) : 0;
  
  const totalItems = Array.isArray(cartItems) ? cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0) : 0;
  
  // Dynamic Shipping logic (e.g. Free shipping over $1000)
  const shipping = subtotal > 1000 ? 0 : 50; 
  const total = subtotal + shipping;

  // eSewa test logic modified to require auth
  const handleProceedToCheckout = () => {
    if (!user) {
      addToast('Authentication Required', 'Please login or register to securely checkout your custom order.', 'info');
      // Pass the return route in state so Login can send us back here
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    setIsProcessing(true);
    
    // eSewa Payment Execution (V2 Standard)
    const merchantCode = 'EPAYTEST';
    const transactionUuid = `ORDER-${Date.now()}`;
    const totalAmount = total;
    
    // In production, these should be environment variables matching the frontend domain
    const successUrl = 'http://localhost:5173/success';
    const failureUrl = 'http://localhost:5173/cart';
    
    const signedFieldNames = 'total_amount,transaction_uuid,product_code';

    // Generate signature via Backend for reliability across browsers/devices
    const startPayment = async () => {
      try {
        const response = await fetch('/api/orders/esewa-signature', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            total_amount: totalAmount,
            transaction_uuid: transactionUuid,
            product_code: merchantCode
          })
        });
        
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.message || `HTTP ${response.status}`);
        }
        const data = await response.json();
        const signatureBase64 = data.signature;

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

        const fields = {
          amount: subtotal,
          tax_amount: 0,
          total_amount: totalAmount,
          transaction_uuid: transactionUuid,
          product_code: merchantCode,
          product_service_charge: 0,
          product_delivery_charge: shipping,
          success_url: successUrl,
          failure_url: failureUrl,
          signed_field_names: signedFieldNames,
          signature: signatureBase64,
        };

        for (const key in fields) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = fields[key];
          form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
      } catch (err) {
        setIsProcessing(false);
        addToast('Payment Error', `Failed: ${err.message}`, 'error');
        console.error("Payment init error:", err);
      }
    };
    
    startPayment();
  };

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <ShieldCheck className="w-20 h-20 text-gray-300 mb-6 drop-shadow-sm" />
        <h2 className="text-3xl font-serif mb-4 text-black drop-shadow-sm">Account Required</h2>
        <p className="text-gray-500 mb-8 max-w-md">Please sign in to access your custom cart and exclusive payment features.</p>
        <Link to="/login" state={{ from: '/cart' }} className="px-8 py-3 bg-gradient-to-r from-gray-900 to-black text-white font-bold hover:from-black hover:to-gray-800 transition-all rounded-xl shadow shadow-gray-400/50 transform hover:-translate-y-0.5">
          Sign In / Register
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4 text-center">
        <ShoppingCart className="w-20 h-20 text-gray-200 mb-6 drop-shadow" />
        <h2 className="text-3xl font-serif mb-4 text-black drop-shadow-sm">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">Browse our collection of readymade pieces or jump into the customizer to build your unique furniture.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/shop" className="px-8 py-3 bg-white text-black border border-gray-200 shadow-sm font-bold hover:bg-gray-50 hover:shadow transition-all rounded-xl">
            Shop Readymade
          </Link>
          <Link to="/" className="px-8 py-3 bg-gradient-to-r from-gray-900 to-black text-white font-bold hover:from-black hover:to-gray-800 transition-all rounded-xl shadow shadow-gray-400/50 transform hover:-translate-y-0.5">
            Start Customizer
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-baseline border-b border-gray-300/50 pb-6 mb-8 mt-5">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-black drop-shadow-sm">Shopping Cart</h1>
          <p className="text-gray-500 font-medium">{totalItems} {totalItems === 1 ? 'Item' : 'Items'}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="flex-1">
            {/* Main Cart Items container */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden mb-12">
              {cartItems.map((item, index) => (
                <div key={item.cartItemId || index} className={`p-6 flex flex-col sm:flex-row gap-6 ${index !== (cartItems?.length || 0) - 1 ? 'border-b border-gray-100' : ''} hover:bg-white/90 transition-colors`}>
                  
                  {/* Visualizer Thumbnail */}
                  <div className="w-full sm:w-48 h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border border-gray-200 shadow-inner relative group">
                     <span className="text-xs font-bold text-gray-400 rotate-[-45deg] absolute opacity-5 uppercase">Bespoke</span>
                     <div 
                        className="w-24 h-24 rounded-md shadow-sm transition-transform group-hover:scale-105"
                        style={{
                          backgroundColor: item?.customizations?.color === 'matte-black' ? '#222' : 
                                           (item?.customizations?.material?.id === 'walnut' || item?.customizations?.material === 'walnut') ? '#5B3E31' : '#D4A373'
                        }}
                     />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold font-serif text-gray-900 mb-1 leading-tight">{item?.name || "Custom Piece"}</h3>
                        <p className="text-green-600 text-xs font-bold uppercase tracking-wide">In Stock • Artisan Crafted</p>
                      </div>
                      <div className="text-xl font-bold font-serif text-gray-900">${(Number(item?.price) || 0) * (Number(item?.quantity) || 1)}</div>
                    </div>

                    {item?.customizations && (
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] text-gray-500 mb-6 bg-gray-50/50 p-3 rounded-lg border border-gray-100/50">
                        <div><span className="font-semibold text-gray-700">Size:</span> {item.customizations?.dimensions?.width}×{item.customizations?.dimensions?.height}cm</div>
                        <div><span className="font-semibold text-gray-700">Finish:</span> <span className="capitalize">{typeof item.customizations?.material === 'object' ? item.customizations.material.name : (item.customizations?.material || 'Natural')}</span></div>
                      </div>
                    )}

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200">
                        <button onClick={() => updateQuantity(item.cartItemId, -1)} className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-white rounded hover:shadow-sm">-</button>
                        <span className="w-10 text-center font-bold font-mono text-sm">{item?.quantity || 1}</span>
                        <button onClick={() => updateQuantity(item.cartItemId, 1)} className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-white rounded hover:shadow-sm">+</button>
                      </div>

                      <div className="flex space-x-4">
                        <button onClick={() => toggleFavorite(item)} className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1">
                          <Heart className={`w-4 h-4 ${isFavorite(item?.id) ? 'fill-red-500 text-red-500' : ''}`} />
                          <span className="hidden sm:inline">Save</span>
                        </button>
                        <button onClick={() => removeFromCart(item.cartItemId)} className="text-sm font-medium text-gray-500 hover:text-black transition-colors flex items-center gap-1">
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Saved for Later Section - Only for logged in users */}
            {user && Array.isArray(favorites) && favorites.length > 0 && (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-4">
                  <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center border border-red-100 shadow-sm">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-gray-900">Saved for Later</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {favorites.map((fav, fIdx) => (
                    <div key={fav?.id || fIdx} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-lg transition-all flex gap-4 ring-1 ring-gray-100/50 group">
                      <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 relative overflow-hidden">
                         <div className="w-16 h-16 rounded shadow-sm group-hover:scale-110 transition-transform" style={{ backgroundColor: fav?.customizations?.color || '#D4A373' }}></div>
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{fav?.name || 'Saved Piece'}</h4>
                          <p className="text-gray-500 text-xs mt-1 font-bold">${fav?.price || 0}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <button onClick={() => { addToCart({...fav, quantity: 1}); toggleFavorite(fav); }} className="text-[10px] flex-1 font-bold uppercase tracking-wider bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">Move to Cart</button>
                          <button onClick={() => toggleFavorite(fav)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-[400px]">
             <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-28">
               <h2 className="text-xl font-bold font-serif mb-6 text-gray-900">Order Summary</h2>
               
               <div className="space-y-4 mb-6">
                 <div className="flex justify-between text-sm text-gray-600">
                   <span>Items ({totalItems}):</span>
                   <span className="font-medium text-gray-900">${subtotal}</span>
                 </div>
                 <div className="flex justify-between text-sm text-gray-600">
                   <span>Shipping:</span>
                   <span className="font-medium text-gray-900">{shipping === 0 ? <span className="text-green-600 font-bold">FREE</span> : `$${shipping}`}</span>
                 </div>
               </div>

               <div className="border-t border-gray-100 pt-6 mb-8 mt-2">
                 <div className="flex justify-between items-end">
                   <span className="text-lg font-bold text-gray-900">Total:</span>
                   <div className="text-right">
                     <span className="text-3xl font-serif font-bold text-black">${total}</span>
                     <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-wider">NPR {(total * 133) || 0}</p>
                   </div>
                 </div>
               </div>

               <button 
                 onClick={handleProceedToCheckout}
                 disabled={isProcessing}
                 className="w-full py-4 bg-gradient-to-r from-gray-900 to-black text-white font-bold rounded-xl flex justify-center items-center gap-2 hover:from-black hover:to-gray-800 hover:shadow-lg hover:shadow-gray-400/50 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
               >
                 {isProcessing ? 'Processing...' : 'Checkout with eSewa'}
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

class CartErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 m-10 bg-red-50 border border-red-200 rounded-xl">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Cart Rendering Error</h2>
          <p className="font-mono text-sm mb-4 text-red-800">{this.state.error?.toString()}</p>
          <pre className="text-xs text-gray-700 whitespace-pre-wrap bg-white p-4 rounded border border-gray-200">{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function CartWithSafety() {
  return (
    <CartErrorBoundary>
      <Cart />
    </CartErrorBoundary>
  );
}
