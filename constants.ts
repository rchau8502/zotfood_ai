import { Ingredient, Recipe } from './types';

export const PANTRY_SEEDS: Ingredient[] = [
  { name: 'Rice (Instant)', slug: 'rice', category: 'grain', typicalPrice: 1.5 },
  { name: 'Eggs', slug: 'eggs', category: 'protein', typicalPrice: 3.5 },
  { name: 'Oats', slug: 'oats', category: 'grain', typicalPrice: 2.0 },
  { name: 'Peanut Butter', slug: 'peanut-butter', category: 'protein', typicalPrice: 2.5 },
  { name: 'Banana', slug: 'banana', category: 'vegetable', typicalPrice: 0.3 },
  { name: 'Spinach', slug: 'spinach', category: 'vegetable', typicalPrice: 2.0 },
  { name: 'Soy Sauce', slug: 'soy-sauce', category: 'spice', typicalPrice: 3.0 },
  { name: 'Ramen', slug: 'ramen', category: 'grain', typicalPrice: 0.5 },
  { name: 'Tortillas', slug: 'tortillas', category: 'grain', typicalPrice: 2.5 },
  { name: 'Black Beans', slug: 'black-beans', category: 'protein', typicalPrice: 1.0 },
  { name: 'Cheese', slug: 'cheese', category: 'dairy', typicalPrice: 4.0 },
  { name: 'Garlic', slug: 'garlic', category: 'spice', typicalPrice: 0.5 },
];

export const RECIPES: Recipe[] = [
  {
    id: 'zot-rice-bowl',
    title: 'Zot Rice Bowl',
    timeMinutes: 10,
    costEstimate: 2.50,
    method: 'Microwave',
    ingredients: ['rice', 'eggs', 'soy-sauce', 'spinach', 'garlic'],
    imagePlaceHolder: 'https://picsum.photos/400/300?random=1',
    steps: [
      'Microwave instant rice for 90 seconds.',
      'Whisk 2 eggs in a mug with a splash of water. Microwave for 1 min.',
      'Mix rice, fluffy eggs, and spinach (it will wilt from heat).',
      'Top with soy sauce and garlic powder.'
    ]
  },
  {
    id: 'aldrich-oats',
    title: 'Aldrich Overnight Oats',
    timeMinutes: 5,
    costEstimate: 1.50,
    method: 'No-Cook',
    ingredients: ['oats', 'peanut-butter', 'banana'],
    imagePlaceHolder: 'https://picsum.photos/400/300?random=2',
    steps: [
      'Add 1/2 cup oats to a jar or bowl.',
      'Cover with water or milk (if available).',
      'Stir in a tablespoon of peanut butter.',
      'Let sit for 10 mins or overnight. Top with banana slices.'
    ]
  },
  {
    id: 'ring-road-noodles',
    title: 'Ring Road Garlic Noodles',
    timeMinutes: 14,
    costEstimate: 3.50,
    method: 'Microwave',
    ingredients: ['ramen', 'garlic', 'soy-sauce', 'eggs'],
    imagePlaceHolder: 'https://picsum.photos/400/300?random=3',
    steps: [
      'Cook ramen noodles in water for 3 mins, drain water.',
      'Microwave minced garlic with a bit of oil or butter for 30s.',
      'Toss noodles with garlic, soy sauce, and the seasoning packet (half).',
      'Top with a fried or microwaved egg.'
    ]
  },
  {
    id: 'student-center-bean-bowl',
    title: 'Student Center Bean Bowl',
    timeMinutes: 12,
    costEstimate: 2.80,
    method: 'Microwave',
    ingredients: ['black-beans', 'tortillas', 'cheese', 'spinach'],
    imagePlaceHolder: 'https://picsum.photos/400/300?random=4',
    steps: [
      'Rinse black beans. Place in bowl with cheese on top.',
      'Microwave for 2 minutes until cheese melts.',
      'Serve with warm tortillas and fresh spinach.',
      'Optional: Add hot sauce from the dining hall.'
    ]
  }
];
