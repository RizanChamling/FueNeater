import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = !isLogin ? document.getElementById('name')?.value : email.split('@')[0];
    
    try {
      if (isLogin) {
        // Real Backend Login
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        let data;
        try {
          data = await res.json();
        } catch(e) {
          throw new Error('not registered user');
        }
        
        if (!res.ok) throw new Error(data.message || 'not registered user');
        
        login({
          id: data.user.id,
          email: data.user.email,
          name: data.user.username,
          role: data.user.role
        }, data.token);

        if (data.user.role === 'admin') navigate('/admin');
        else navigate(location.state?.from || '/');

      } else {
        // Real Backend Registration
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: name, email, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Registration failed');
        
        // Auto login after successful register or prompt to login
        setIsLogin(true);
        setError('Registration successful! Please sign in.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 md:p-10 border border-gray-100 shadow-sm">
        
        <div className="text-center mb-10">
          <Link to="/">
            <img src="/logo.png" alt="FurNeater Logo" className="h-28 w-auto mx-auto object-contain drop-shadow-md mb-6 hover:opacity-80 transition-opacity cursor-pointer" />
          </Link>
          <h2 className="text-3xl font-serif font-bold mb-2 text-black drop-shadow-sm">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-500 text-sm">
            {isLogin 
              ? 'Sign in to track your custom orders and save designs.' 
              : 'Join FurNeater to save your customizations and enjoy exclusive offers.'}
          </p>
          {error && (
            <div className={`mt-4 p-3 text-sm rounded-lg backdrop-blur-md border ${error.includes('successful') ? 'bg-green-50/50 text-green-700 border-green-200' : 'bg-red-50/50 text-red-700 border-red-200'} shadow-inner`}>
              <strong>{error}</strong>
            </div>
          )}
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm transition-colors"
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              {isLogin && (
                <a href="#" className="text-xs font-medium text-gray-600 hover:text-black">
                  Forgot password?
                </a>
              )}
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent shadow shadow-gray-400/50 text-sm font-bold text-white bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-800 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all transform hover:-translate-y-[1px]"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)} 
              className="font-medium text-black hover:underline"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
