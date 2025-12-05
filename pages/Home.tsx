import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuickStart } from '../store';
import { PANTRY_SEEDS } from '../constants';
import { ArrowRight, Microwave, DollarSign, Clock, Check, Plus } from 'lucide-react';

export const Home = () => {
  const { pantryItems, togglePantryItem, constraints, toggleConstraint } = useQuickStart();
  const [stats, setStats] = useState<{cooked: number, savings: number} | null>(null);

  // Mock fetching live stats
  useEffect(() => {
    const fetchStats = async () => {
        // Simulate API delay
        await new Promise(r => setTimeout(r, 800));
        setStats({ cooked: 1240, savings: 4500 });
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
            Free for UCI Students
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 mb-6">
            Cook cheap in dorms. <br className="hidden md:block"/>
            <span className="text-neutral-500">Pantry to plate in 15m.</span>
          </h1>
          <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Don't starve during finals. ZotFood turns your random pantry leftovers into real meals. 
            Microwave-friendly recipes under $7.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/demo" className="w-full sm:w-auto px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 group">
              Start Interactive Demo <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
            <Link to="/recipes" className="w-full sm:w-auto px-8 py-4 bg-white border border-neutral-200 text-neutral-900 rounded-full font-medium hover:bg-neutral-50 transition-all">
              Browse Recipes
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start Module */}
      <section className="max-w-5xl mx-auto px-4 -mt-10">
        <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Microwave size={120} />
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">What's in your pantry?</h2>
            <p className="text-neutral-500">Select what you have to see instant matches.</p>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {PANTRY_SEEDS.map((item) => {
              const active = pantryItems.has(item.slug);
              return (
                <button
                  key={item.slug}
                  onClick={() => togglePantryItem(item.slug)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-2 ${
                    active 
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-md transform scale-105' 
                    : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-400'
                  }`}
                >
                  {active && <Check size={14} />}
                  {item.name}
                </button>
              );
            })}
          </div>

          <div className="border-t border-neutral-100 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex gap-4">
               <button 
                onClick={() => toggleConstraint('microwaveOnly')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${constraints.microwaveOnly ? 'bg-blue-50 text-blue-700' : 'text-neutral-500 hover:bg-neutral-50'}`}
               >
                 <Microwave size={16} /> Microwave Only
               </button>
               <button 
                onClick={() => toggleConstraint('under7')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${constraints.under7 ? 'bg-green-50 text-green-700' : 'text-neutral-500 hover:bg-neutral-50'}`}
               >
                 <DollarSign size={16} /> Under $7
               </button>
               <button 
                onClick={() => toggleConstraint('quick')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${constraints.quick ? 'bg-purple-50 text-purple-700' : 'text-neutral-500 hover:bg-neutral-50'}`}
               >
                 <Clock size={16} /> 10-15m
               </button>
            </div>
            
            <Link to="/shopping-list" className="inline-flex items-center gap-2 text-neutral-900 font-bold hover:underline decoration-2 underline-offset-4">
              Generate Shopping List <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="max-w-6xl mx-auto px-4 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Most Cooked Card */}
           <div className="bg-neutral-900 text-white rounded-3xl p-8 flex flex-col justify-between min-h-[200px]">
             <div>
               <div className="text-neutral-400 text-sm font-medium uppercase tracking-wider mb-1">Most Cooked This Week</div>
               <h3 className="text-3xl font-bold">Zot Rice Bowl</h3>
             </div>
             <div className="flex items-center gap-4 mt-4">
                <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                   <span className="block text-2xl font-bold">{stats ? stats.cooked : '...'}</span>
                   <span className="text-xs text-neutral-400">Students fed</span>
                </div>
                <div className="text-sm text-neutral-400 max-w-[150px]">
                   Trending in Middle Earth & Mesa Court
                </div>
             </div>
           </div>

           {/* Price Snapshot */}
           <div className="bg-white border border-neutral-200 rounded-3xl p-8 flex flex-col justify-between min-h-[200px]">
              <div>
                <div className="text-neutral-500 text-sm font-medium uppercase tracking-wider mb-1">Community Impact</div>
                <h3 className="text-3xl font-bold text-neutral-900">Saving Money</h3>
              </div>
              <div className="mt-4">
                 {stats ? (
                    <div className="flex items-baseline gap-2">
                       <span className="text-5xl font-bold tracking-tighter text-green-600">${stats.savings.toLocaleString()}</span>
                       <span className="text-neutral-500 font-medium">saved collectively</span>
                    </div>
                 ) : (
                    <div className="h-12 w-48 bg-neutral-100 animate-pulse rounded-lg"></div>
                 )}
                 <p className="text-sm text-neutral-500 mt-2">vs. eating out at UTC ($15/meal avg)</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};
