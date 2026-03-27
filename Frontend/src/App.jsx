import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Chatbox from './components/layout/Chatbox';
import ScrollToTop from './components/common/ScrollToTop';

import Home from './pages/Home';
import Offers from './pages/Offers';
import Shop from './pages/Shop';
import CustomModels from './pages/CustomModels';
import Customize from './pages/Customize';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminCustomers from './pages/admin/Customers';
import AdminSettings from './pages/admin/Settings';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import InfoPage from './pages/InfoPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-white selection:bg-black selection:text-white">
        <Routes>
          {/* Admin Protected Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="*" element={<div className="p-8">Section under construction</div>} />
          </Route>

          {/* Public Customer Routes */}
          <Route path="/*" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/custom-models" element={<CustomModels />} />
                  <Route path="/customize" element={<Customize />} />
                  <Route path="/customize/:id" element={<Customize />} />
                  <Route path="/offers" element={<Offers />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/success" element={<Success />} />
                  <Route path="/orders" element={<OrderHistory />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogDetail />} />
                  <Route path="/info/:slug" element={<InfoPage />} />
                  <Route path="/about" element={<InfoPage />} />
                  <Route path="/wood-study" element={<InfoPage />} />
                  <Route path="/faq" element={<InfoPage />} />
                  <Route path="/contact" element={<InfoPage />} />
                </Routes>
              </main>
              <Chatbox />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
