export interface Ingredient {
  name: string;
  slug: string;
  category: 'protein' | 'grain' | 'vegetable' | 'dairy' | 'spice' | 'other';
  typicalPrice: number;
}

export interface Recipe {
  id: string;
  title: string;
  timeMinutes: number;
  costEstimate: number;
  method: 'Microwave' | 'No-Cook' | 'Stove';
  ingredients: string[]; // slug list
  missingCount?: number; // Runtime calculation
  imagePlaceHolder: string;
  steps: string[];
}

export interface User {
  email: string;
  displayName: string;
  isDemo: boolean;
  streakCount: number;
}

export interface QuickStartStore {
  pantryItems: Set<string>;
  constraints: {
    microwaveOnly: boolean;
    under7: boolean;
    quick: boolean;
  };
  togglePantryItem: (slug: string) => void;
  toggleConstraint: (key: 'microwaveOnly' | 'under7' | 'quick') => void;
  reset: () => void;
}
