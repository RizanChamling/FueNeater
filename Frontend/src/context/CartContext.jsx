import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  
  const getCartKey = (u) => u ? `furneater_cart_${u.id}` : 'furneater_cart_guest';
  const getFavKey = (u) => u ? `furneater_favs_${u.id}` : 'furneater_favs_guest';

  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load contextual cart EXCLUSIVELY when user changes
  useEffect(() => {
    const cartKey = getCartKey(user);
    const favKey = getFavKey(user);
    
    let loadedCart = [];
    let loadedFavs = [];

    try {
      const cartData = localStorage.getItem(cartKey);
      const favData = localStorage.getItem(favKey);
      loadedCart = cartData ? JSON.parse(cartData) : [];
      loadedFavs = favData ? JSON.parse(favData) : [];
      if (!Array.isArray(loadedCart)) loadedCart = [];
      if (!Array.isArray(loadedFavs)) loadedFavs = [];
    } catch (e) {
      console.error("Local storage corruption detected:", e);
      loadedCart = [];
      loadedFavs = [];
    }

    // Guest cart merging logic when a user logs in
    if (user) {
      let guestCart = [];
      let guestFavs = [];
      try {
        const gc = localStorage.getItem('furneater_cart_guest');
        const gf = localStorage.getItem('furneater_favs_guest');
        guestCart = gc ? JSON.parse(gc) : [];
        guestFavs = gf ? JSON.parse(gf) : [];
        if (!Array.isArray(guestCart)) guestCart = [];
        if (!Array.isArray(guestFavs)) guestFavs = [];
      } catch (e) {
        guestCart = [];
        guestFavs = [];
      }
      
      if (guestCart.length > 0) {
        loadedCart = [...loadedCart, ...guestCart];
        localStorage.removeItem('furneater_cart_guest');
        localStorage.setItem(cartKey, JSON.stringify(loadedCart));
      }
      if (guestFavs.length > 0) {
        loadedFavs = [...loadedFavs, ...guestFavs];
        localStorage.removeItem('furneater_favs_guest');
        localStorage.setItem(favKey, JSON.stringify(loadedFavs));
      }
    }

    setCartItems(loadedCart);
    setFavorites(loadedFavs);
  }, [user]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && JSON.stringify(item.customizations) === JSON.stringify(product.customizations));
      let newCart;
      if (existing) {
        newCart = prev.map(item => item === existing ? { ...item, quantity: item.quantity + product.quantity } : item);
      } else {
        newCart = [...prev, { ...product, cartItemId: Date.now() }];
      }
      localStorage.setItem(getCartKey(user), JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => {
      const newCart = prev.filter(item => item.cartItemId !== cartItemId);
      localStorage.setItem(getCartKey(user), JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateQuantity = (cartItemId, amount) => {
    setCartItems(prev => {
      const newCart = prev.map(item => {
        if (item.cartItemId === cartItemId) {
          return { ...item, quantity: Math.max(1, item.quantity + amount) };
        }
        return item;
      });
      localStorage.setItem(getCartKey(user), JSON.stringify(newCart));
      return newCart;
    });
  };

  const toggleFavorite = (product) => {
    setFavorites(prev => {
      const isFav = prev.find(item => item.id === product.id);
      const newFavs = isFav ? prev.filter(item => item.id !== product.id) : [...prev, product];
      localStorage.setItem(getFavKey(user), JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem(getCartKey(user), JSON.stringify([]));
  };

  const isFavorite = (productId) => favorites.some(item => item?.id === productId);

  return (
    <CartContext.Provider value={{ 
      cartItems, favorites, addToCart, removeFromCart, updateQuantity, toggleFavorite, isFavorite, clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
