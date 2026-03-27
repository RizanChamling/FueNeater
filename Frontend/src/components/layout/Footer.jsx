import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowUpRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-8">
              <img src="/logo.png" alt="Logo" className="h-24 w-auto object-contain invert brightness-200 hover:opacity-80 transition-opacity" />
            </Link>
            <p className="text-sm text-gray-500 mb-4">
              Customize your space exactly how you want it. Premium furniture tailored to your dimensions.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/shop?category=seating" className="text-sm text-gray-600 hover:text-black">Seating</Link></li>
              <li><Link to="/shop?category=tables" className="text-sm text-gray-600 hover:text-black">Tables</Link></li>
              <li><Link to="/shop?category=storage" className="text-sm text-gray-600 hover:text-black">Storage</Link></li>
              <li><Link to="/offers" className="text-sm text-red-600 hover:text-red-700 font-bold uppercase tracking-widest text-[10px]">Special Offers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/info/about" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/info/wood-study" className="text-sm text-gray-400 hover:text-white transition-colors">Wood Study</Link></li>
              <li><Link to="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">Journal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/info/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} FurNeater. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
