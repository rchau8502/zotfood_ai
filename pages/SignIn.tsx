import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuickStart } from '../store';
import { Mail, Lock } from 'lucide-react';

export const SignIn = () => {
  const { login } = useQuickStart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        login();
        navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
       <div className="w-full max-w-md">
           <div className="text-center mb-10">
               <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
               <p className="text-neutral-500">Sign in to sync your pantry and recipes.</p>
           </div>
           
           <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                 <label className="text-sm font-medium ml-1">UCI Email</label>
                 <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-neutral-400" size={20} />
                    <input type="email" placeholder="peter@uci.edu" className="w-full pl-12 pr-4 py-3 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white" required />
                 </div>
              </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium ml-1">Password</label>
                 <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-neutral-400" size={20} />
                    <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-3 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white" required />
                 </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-neutral-900 text-white font-bold py-4 rounded-2xl hover:bg-neutral-800 transition-colors disabled:opacity-50 mt-4"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
           </form>

           <p className="text-center mt-8 text-sm text-neutral-500">
             New here? <a href="#" className="text-neutral-900 font-bold hover:underline">Create an account</a>
           </p>
       </div>
    </div>
  );
};
