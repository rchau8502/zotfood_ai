import React, { useState } from 'react';
import { useQuickStart } from '../store';
import { PANTRY_SEEDS } from '../constants';
import { Check, Sparkles, Loader2, Plus } from 'lucide-react';
import { generateRecipeSuggestion } from '../services/geminiService';

export const Pantry = () => {
  const { pantryItems, togglePantryItem } = useQuickStart();
  const [suggestion, setSuggestion] = useState<{title: string, content: string} | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const handleAiSuggest = async () => {
    setLoadingAI(true);
    try {
      const activeItems = PANTRY_SEEDS.filter(i => pantryItems.has(i.slug)).map(i => i.name);
      if (activeItems.length === 0) {
        setSuggestion({title: "Empty Pantry", content: "Add some items first!"});
        return;
      }
      const result = await generateRecipeSuggestion(activeItems);
      setSuggestion(result);
    } catch (e) {
      setSuggestion({ title: "Error", content: "Could not reach the chef. Try again later." });
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
           <h1 className="text-4xl font-bold mb-2">My Pantry</h1>
           <p className="text-neutral-500">Track what you have to get better recommendations.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 border border-neutral-200 rounded-full text-sm font-medium hover:bg-neutral-50">
             UCI Fresh Box
           </button>
           <button className="px-4 py-2 border border-neutral-200 rounded-full text-sm font-medium hover:bg-neutral-50">
             Rice Cooker Kit
           </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
         {PANTRY_SEEDS.map((item) => {
            const active = pantryItems.has(item.slug);
            return (
                <div 
                   key={item.slug}
                   onClick={() => togglePantryItem(item.slug)}
                   className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                       active ? 'bg-white border-neutral-900 ring-1 ring-neutral-900 shadow-md' : 'bg-white border-neutral-100 hover:border-neutral-300'
                   }`}
                >
                   <div className="flex justify-between items-start mb-2">
                       <span className="text-2xl">{item.category === 'protein' ? '🥚' : item.category === 'grain' ? '🍚' : '🥬'}</span>
                       {active && <div className="bg-neutral-900 text-white p-1 rounded-full"><Check size={10} /></div>}
                   </div>
                   <div className="font-medium text-neutral-900">{item.name}</div>
                   <div className="text-xs text-neutral-500 mt-1">${item.typicalPrice.toFixed(2)}</div>
                </div>
            )
         })}
          <div className="p-4 rounded-2xl border border-dashed border-neutral-300 flex flex-col items-center justify-center text-neutral-400 hover:border-neutral-400 hover:text-neutral-600 cursor-pointer h-full min-h-[120px]">
             <Plus size={24} />
             <span className="text-sm mt-2">Add Custom</span>
          </div>
      </div>

      {/* AI Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100">
         <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-600 text-white rounded-lg">
                <Sparkles size={20} />
            </div>
            <h2 className="text-xl font-bold text-indigo-900">Chef AI Suggestion</h2>
         </div>

         {!suggestion && !loadingAI && (
            <div className="text-center py-8">
               <p className="text-indigo-800/70 mb-6">Stuck? Let our AI chef invent a recipe with your selected items.</p>
               <button 
                onClick={handleAiSuggest}
                className="bg-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
               >
                 Generate Recipe
               </button>
            </div>
         )}

         {loadingAI && (
            <div className="flex flex-col items-center justify-center py-10 text-indigo-600">
                <Loader2 size={32} className="animate-spin mb-3" />
                <p>Thinking up something delicious...</p>
            </div>
         )}

         {suggestion && (
            <div className="bg-white rounded-2xl p-6 shadow-sm animate-in fade-in zoom-in duration-300">
               <h3 className="text-lg font-bold text-gray-900 mb-2">{suggestion.title}</h3>
               <p className="text-gray-600 leading-relaxed mb-4">{suggestion.content}</p>
               <div className="flex gap-2">
                 <button onClick={() => setSuggestion(null)} className="text-xs text-indigo-600 font-medium hover:underline">Reset</button>
               </div>
            </div>
         )}
      </div>
    </div>
  );
};
