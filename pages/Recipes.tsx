import React from 'react';
import { useQuickStart } from '../store';
import { RECIPES } from '../constants';
import { Clock, DollarSign, AlertCircle, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Recipes = () => {
  const { pantryItems, constraints } = useQuickStart();

  const filteredRecipes = RECIPES.map(r => {
    // Calculate missing ingredients
    const missing = r.ingredients.filter(i => !pantryItems.has(i));
    return { ...r, missingCount: missing.length, missingIngredients: missing };
  }).filter(r => {
    if (constraints.microwaveOnly && r.method !== 'Microwave' && r.method !== 'No-Cook') return false;
    if (constraints.under7 && r.costEstimate + (r.missingCount * 1.5) > 7) return false;
    return true;
  }).sort((a, b) => a.missingCount - b.missingCount);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
       <div className="mb-12">
         <h1 className="text-4xl font-bold mb-4">Tonight's Picks</h1>
         <p className="text-neutral-500 text-lg">Based on your pantry and preferences.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="group bg-white rounded-3xl border border-neutral-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
               <div className="h-48 overflow-hidden relative">
                  <img src={recipe.imagePlaceHolder} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    {recipe.method}
                  </div>
               </div>
               <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{recipe.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-neutral-600 mb-6">
                    <span className="flex items-center gap-1"><Clock size={14} /> {recipe.timeMinutes}m</span>
                    <span className="flex items-center gap-1"><DollarSign size={14} /> ~${recipe.costEstimate.toFixed(2)}</span>
                  </div>
                  
                  {recipe.missingCount > 0 ? (
                    <div className="mb-6 p-3 bg-orange-50 rounded-xl border border-orange-100">
                        <div className="flex items-start gap-2 text-orange-700 text-sm">
                           <AlertCircle size={16} className="shrink-0 mt-0.5" />
                           <span>Missing {recipe.missingCount} items: <span className="font-medium">{recipe.missingIngredients.join(', ')}</span></span>
                        </div>
                    </div>
                  ) : (
                    <div className="mb-6 p-3 bg-green-50 rounded-xl border border-green-100 text-green-700 text-sm font-medium flex items-center gap-2">
                        <Clock size={16} /> Ready to cook now!
                    </div>
                  )}

                  <div className="flex gap-3">
                     <button className="flex-1 bg-neutral-900 text-white py-3 rounded-xl font-medium text-sm hover:bg-neutral-800 transition-colors">
                        View Recipe
                     </button>
                     {recipe.missingCount > 0 && (
                        <Link to="/shopping-list" className="p-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 text-neutral-600">
                           <ShoppingCart size={20} />
                        </Link>
                     )}
                  </div>
               </div>
            </div>
          ))}
       </div>

       {filteredRecipes.length === 0 && (
         <div className="text-center py-20">
           <p className="text-xl text-neutral-500">No recipes found matching your strict criteria. Try adding more items or loosening the filters!</p>
         </div>
       )}
    </div>
  );
};
