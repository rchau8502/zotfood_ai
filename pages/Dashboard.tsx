import React from 'react';
import { useQuickStart } from '../store';
import { Link, Navigate } from 'react-router-dom';
import { LogOut, Flame, Award, Settings } from 'lucide-react';

export const Dashboard = () => {
  const { isAuthenticated, logout } = useQuickStart();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white text-neutral-900 rounded-xl flex items-center justify-center font-bold text-xl">Z</div>
                <span className="font-bold text-xl">My Dashboard</span>
            </div>
            <button onClick={logout} className="p-2 hover:bg-white/10 rounded-full transition-colors text-neutral-400 hover:text-white">
                <LogOut size={20} />
            </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Welcome */}
            <div className="md:col-span-2 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-3xl p-8 border border-neutral-700 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome back, Anteater.</h1>
                    <p className="text-neutral-400 text-lg mb-8">You've cooked 3 meals this week and saved approx. $21.00.</p>
                    <div className="flex gap-4">
                        <Link to="/recipes" className="px-6 py-3 bg-white text-neutral-900 rounded-full font-bold hover:bg-neutral-200 transition-colors">
                            Find Dinner
                        </Link>
                        <Link to="/pantry" className="px-6 py-3 border border-white/20 rounded-full font-bold hover:bg-white/10 transition-colors">
                            Update Pantry
                        </Link>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            </div>

            {/* Streak Card */}
            <div className="bg-neutral-800 rounded-3xl p-8 border border-neutral-700 flex flex-col items-center justify-center text-center">
                <Flame size={48} className="text-orange-500 mb-4 animate-pulse" />
                <div className="text-4xl font-bold mb-1">12</div>
                <div className="text-neutral-400 text-sm uppercase tracking-wider">Day Streak</div>
                <p className="text-neutral-500 text-xs mt-4">Cook one more to beat your record.</p>
            </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-3xl border border-neutral-800 hover:bg-neutral-800 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                    <Award className="text-yellow-500" size={32} />
                    <span className="text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-400 group-hover:bg-neutral-700">Level 3</span>
                </div>
                <h3 className="font-bold text-xl mb-1">Microwave Master</h3>
                <p className="text-neutral-400 text-sm">Unlocked for cooking 5 microwave-only recipes.</p>
            </div>
            
             <div className="p-6 rounded-3xl border border-neutral-800 hover:bg-neutral-800 transition-colors cursor-pointer flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-neutral-700 flex items-center justify-center">
                    <Settings size={20} />
                </div>
                <div>
                    <h3 className="font-bold">Preferences</h3>
                    <p className="text-neutral-400 text-sm">Dietary restrictions, allergies</p>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};
