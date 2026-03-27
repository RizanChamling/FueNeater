import React from 'react';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinkClass = (path) =>
    `text-sm font-bold transition-colors pb-1 border-b-2 ${isActive(path)
      ? 'border-black text-black'
      : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300'
    }`;

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="inline-block">
            <img src="/logo.png" alt="Logo" className="h-20 w-auto object-contain hover:opacity-80 transition-opacity" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            <Link to="/custom-models" className={`${navLinkClass('/custom-models')} nav-item-enter`} style={{ animationDelay: '0.1s' }}>Configurator</Link>
            <Link to="/shop" className={`${navLinkClass('/shop')} nav-item-enter`} style={{ animationDelay: '0.2s' }}>Collections</Link>
            <Link to="/blog" className={`${navLinkClass('/blog')} nav-item-enter`} style={{ animationDelay: '0.3s' }}>Journal</Link>
            <Link to="/offers" className={`${navLinkClass('/offers').replace('text-gray-500', 'text-accent').replace('text-black', 'text-accent/80').replace('border-black', 'gold-accents')} nav-item-enter`} style={{ animationDelay: '0.4s' }}>Offers</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Contextual Global Search */}
            <div className="relative hidden md:flex items-center h-10">
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-100 rounded-full pl-4 pr-1 h-full shadow-inner border border-gray-200 w-64 transition-all">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search furniture..."
                    className="bg-transparent border-none outline-none text-sm w-full text-gray-800 placeholder-gray-400"
                    autoFocus
                  />
                  <button type="button" onClick={() => setIsSearchOpen(false)} className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                  <button type="submit" className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shrink-0 ml-1">
                    <Search className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button onClick={() => setIsSearchOpen(true)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Search className="w-5 h-5 text-gray-800" />
                </button>
              )}
            </div>

            {user ? (
              <div className="relative group hidden md:block">
                <button className="w-10 h-10 bg-gray-100 text-gray-900 font-bold rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors uppercase">
                  {user.name.charAt(0)}
                </button>
                {/* Structural gap bridge to prevent hover loss */}
                <div className="absolute top-full right-0 pt-2 w-48 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-50">
                  <div className="bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-gray-50 flex flex-col">
                      <span className="text-sm font-bold text-gray-900 truncate">{user.name}</span>
                      <span className="text-xs text-gray-500 truncate">{user.email}</span>
                    </div>
                    {user.role === 'admin' && (
                      <Link to="/admin" className="block px-4 py-3 text-sm text-blue-600 hover:bg-gray-50 font-medium">
                        Admin Dashboard
                      </Link>
                    )}
                    <Link to="/orders" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-medium">
                      My Orders
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-50 font-medium flex items-center justify-between">
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block" title="Login / Account">
                <User className="w-5 h-5 text-gray-800" />
              </Link>
            )}

            <Link to="/cart" className="relative w-10 h-10 bg-gradient-to-br from-gray-800 to-black shadow shadow-gray-400/50 flex items-center justify-center rounded-xl hover:from-black hover:to-gray-900 transition-all border border-gray-700">
              <ShoppingCart className="w-5 h-5 text-white drop-shadow" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-4">
          <Link to="/custom-models" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Configurator</Link>
          <Link to="/shop" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Collections</Link>
          <Link to="/login" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Login / Register</Link>
          <Link to="/blog" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Journal</Link>
          <Link to="/orders" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
          <Link to="/offers" className="block text-sm font-medium text-red-600" onClick={() => setIsMenuOpen(false)}>Offers</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
