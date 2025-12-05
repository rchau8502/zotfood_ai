import React from 'react';
import { useQuickStart } from '../store';
import { RECIPES, PANTRY_SEEDS } from '../constants';
import { Trash2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ShoppingList = () => {
  const { pantryItems } = useQuickStart();

  // Find ingredients missing from 'Tonight's Picks' (Top 3 filtered recipes)
  // Simplified logic: Just check recipe #1 (Zot Rice Bowl) and #3 (Noodles) to simulate a plan
  const targetRecipes = [RECIPES[0], RECIPES[2]];
  
  const missingMap = new Map<string, number>();
  
  targetRecipes.forEach(recipe => {
      recipe.ingredients.forEach(slug => {
          if (!pantryItems.has(slug)) {
              missingMap.set(slug, (missingMap.get(slug) || 0) + 1);
          }
      });
  });

  const missingItems = Array.from(missingMap.keys()).map(slug => {
      return PANTRY_SEEDS.find(s => s.slug === slug) || { name: slug, typicalPrice: 2.00 };
  });

  const estimatedTotal = missingItems.reduce((acc, item) => acc + item.typicalPrice, 0);

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Shopping List</h1>
      
      {missingItems.length > 0 ? (
        <>
            <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm mb-8">
                <div className="p-6 border-b border-neutral-100 bg-neutral-50 flex justify-between items-center">
                    <span className="font-bold text-neutral-500 uppercase text-xs tracking-wider">For 2 Recipes</span>
                    <span className="font-bold text-xl">${estimatedTotal.toFixed(2)} est.</span>
                </div>
                <div className="divide-y divide-neutral-100">
                    {missingItems.map((item, idx) => (
                        <div key={idx} className="p-4 flex items-center justify-between hover:bg-neutral-50">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" className="w-5 h-5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900" />
                                <span className="font-medium">{item.name}</span>
                            </div>
                            <span className="text-neutral-400 text-sm">${item.typicalPrice.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>

            {estimatedTotal > 7 && (
                <div className="bg-orange-50 text-orange-800 p-4 rounded-xl flex items-start gap-3 text-sm mb-8">
                    <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                    <p>Total is over $7. Try removing "Cheese" or swapping "Olive Oil" for butter packets from the cafeteria.</p>
                </div>
            )}
        </>
      ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-neutral-300">
              <p className="text-neutral-500 mb-4">You have everything needed for the top recipes!</p>
              <Link to="/recipes" className="inline-flex items-center gap-2 text-neutral-900 font-bold hover:underline">
                Start Cooking <ArrowRight size={16} />
              </Link>
          </div>
      )}

      <div className="mt-12">
         <h2 className="font-bold text-lg mb-4">Nearby Stores</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-neutral-200">
                <div className="font-bold mb-1">Trader Joe's (UTC)</div>
                <div className="text-xs text-neutral-500">Best for: Eggs, Bananas, Spinach</div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-neutral-200">
                <div className="font-bold mb-1">Target (UTC)</div>
                <div className="text-xs text-neutral-500">Best for: Milk, Cereal, Spices</div>
            </div>
         </div>
      </div>
    </div>
  );
};
