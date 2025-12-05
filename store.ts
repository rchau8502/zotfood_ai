import React, { createContext, useContext, useEffect, useState } from 'react';

interface QuickStartContextType {
  pantryItems: Set<string>;
  constraints: {
    microwaveOnly: boolean;
    under7: boolean;
    quick: boolean;
  };
  togglePantryItem: (slug: string) => void;
  toggleConstraint: (key: 'microwaveOnly' | 'under7' | 'quick') => void;
  reset: () => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const QuickStartContext = createContext<QuickStartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'zotfood_quick_v1';

export const QuickStartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pantryItems, setPantryItems] = useState<Set<string>>(new Set());
  const [constraints, setConstraints] = useState({
    microwaveOnly: true,
    under7: true,
    quick: true,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.pantryItems) setPantryItems(new Set(parsed.pantryItems));
        if (parsed.constraints) setConstraints(parsed.constraints);
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    } else {
        // Default seeds
        setPantryItems(new Set(['rice', 'eggs', 'soy-sauce']));
    }
  }, []);

  // Persist updates
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
      pantryItems: Array.from(pantryItems),
      constraints
    }));
  }, [pantryItems, constraints]);

  const togglePantryItem = (slug: string) => {
    const next = new Set(pantryItems);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    setPantryItems(next);
  };

  const toggleConstraint = (key: 'microwaveOnly' | 'under7' | 'quick') => {
    setConstraints(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const reset = () => {
    setPantryItems(new Set());
    setConstraints({ microwaveOnly: true, under7: true, quick: true });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const value = {
    pantryItems,
    constraints,
    togglePantryItem,
    toggleConstraint,
    reset,
    isAuthenticated,
    login,
    logout
  };

  return React.createElement(
    QuickStartContext.Provider,
    { value },
    children
  );
};

export const useQuickStart = () => {
  const context = useContext(QuickStartContext);
  if (!context) {
    throw new Error('useQuickStart must be used within a QuickStartProvider');
  }
  return context;
};