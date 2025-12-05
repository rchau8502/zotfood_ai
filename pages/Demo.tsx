import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle, Play } from 'lucide-react';
import { RECIPES } from '../constants';

export const Demo = () => {
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const recipe = RECIPES[0]; // Zot Rice Bowl

  const toggleStep = (idx: number) => {
    if (completedSteps.includes(idx)) {
        setCompletedSteps(completedSteps.filter(i => i !== idx));
    } else {
        setCompletedSteps([...completedSteps, idx]);
    }
  };

  const progress = (completedSteps.length / recipe.steps.length) * 100;

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
       {/* Demo Header */}
       <div className="bg-neutral-900 text-white p-4 sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto max-w-4xl flex justify-between items-center">
             <div className="flex items-center gap-4">
                <Link to="/" className="text-neutral-400 hover:text-white"><ArrowLeft size={20} /></Link>
                <span className="font-bold text-sm uppercase tracking-wider bg-yellow-500 text-black px-2 py-0.5 rounded">Demo Mode</span>
             </div>
             <button onClick={() => setCompletedSteps([])} className="text-xs text-neutral-400 hover:text-white">Reset Demo</button>
          </div>
       </div>

       <div className="container mx-auto max-w-4xl p-4 md:p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Main Recipe Card */}
             <div className="md:col-span-2 space-y-6">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-200">
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-3xl font-bold">{recipe.title}</h1>
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">{recipe.method}</span>
                    </div>
                    
                    <div className="w-full h-2 bg-neutral-100 rounded-full mb-8 overflow-hidden">
                        <div className="h-full bg-green-500 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                    </div>

                    <div className="space-y-6">
                        {recipe.steps.map((text, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => toggleStep(idx)}
                                className={`flex gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                                    completedSteps.includes(idx) ? 'bg-green-50 border border-green-100 opacity-50' : 'bg-neutral-50 hover:bg-neutral-100'
                                }`}
                            >
                                <div className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                    completedSteps.includes(idx) ? 'border-green-600 bg-green-600 text-white' : 'border-neutral-300 text-transparent'
                                }`}>
                                    <CheckCircle size={14} />
                                </div>
                                <p className={`text-lg ${completedSteps.includes(idx) ? 'line-through text-neutral-500' : 'text-neutral-900'}`}>{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
             </div>

             {/* Sidebar Stats */}
             <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200">
                    <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-neutral-500">Session Stats</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span>Time Spent</span>
                            <span className="font-mono font-bold">04:20</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Cost Saved</span>
                            <span className="font-mono font-bold text-green-600">$4.50</span>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-100 rounded-3xl p-6 border border-yellow-200">
                    <h3 className="font-bold mb-2">Quest: First Cook</h3>
                    <p className="text-sm text-yellow-800 mb-4">Complete your first recipe to unlock the "Ramen Warrior" badge.</p>
                    <div className="h-2 bg-yellow-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-600" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};
