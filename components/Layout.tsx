import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Utensils, ShoppingBag, LayoutDashboard, LogIn, ChevronRight } from 'lucide-react';
import { useQuickStart } from '../store';

export const BackgroundGrid = () => (
  <div className="fixed inset-0 z-[-1] pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-yellow-200 opacity-20 blur-[100px]"></div>
  </div>
);

const NavLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
  <Link to={to} className="text-neutral-600 hover:text-neutral-900 font-medium transition-colors text-sm uppercase tracking-wide">
    {children}
  </Link>
);

export const Header = () => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, logout } = useQuickStart();
  
  if (pathname.startsWith('/dashboard')) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-neutral-900 rounded-lg flex items-center justify-center text-white font-bold text-lg">Z</div>
          <span className="font-bold text-xl tracking-tight text-neutral-900">ZotFood</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/pantry">Pantry</NavLink>
          <NavLink to="/recipes">Recipes</NavLink>
          <NavLink to="/shopping-list">List</NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/demo" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
            Demo
          </Link>
          {isAuthenticated ? (
             <Link to="/dashboard" className="bg-neutral-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors">
             Dashboard
           </Link>
          ) : (
            <Link to="/signin" className="bg-neutral-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2">
              Sign In <ChevronRight size={14} />
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-neutral-200 p-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-2">
          <Link to="/" onClick={() => setMobileOpen(false)} className="text-lg font-medium">Home</Link>
          <Link to="/pantry" onClick={() => setMobileOpen(false)} className="text-lg font-medium">Pantry</Link>
          <Link to="/recipes" onClick={() => setMobileOpen(false)} className="text-lg font-medium">Recipes</Link>
           <Link to="/shopping-list" onClick={() => setMobileOpen(false)} className="text-lg font-medium">Shopping List</Link>
           <div className="h-px bg-neutral-100 my-2"></div>
           <Link to="/signin" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-lg font-medium text-neutral-600">
            <LogIn size={20} /> Sign In
           </Link>
        </div>
      )}
    </header>
  );
};

export const Footer = () => (
  <footer className="border-t border-neutral-200 bg-white py-12 mt-auto">
    <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-neutral-900 rounded flex items-center justify-center text-white font-bold text-xs">Z</div>
          <span className="font-bold text-lg">ZotFood</span>
        </div>
        <p className="text-neutral-500 text-sm">
          A student-run nonprofit helping UCI students eat better for less.
        </p>
      </div>
      <div>
        <h3 className="font-bold mb-4">Explore</h3>
        <ul className="space-y-2 text-sm text-neutral-600">
          <li><Link to="/recipes">Recipes</Link></li>
          <li><Link to="/pantry">Pantry Manager</Link></li>
          <li><Link to="/demo">Try Demo</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-4">Resources</h3>
        <ul className="space-y-2 text-sm text-neutral-600">
          <li><a href="#">UCI Fresh Hub</a></li>
          <li><a href="#">Budget Tips</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-4">Contribute</h3>
        <p className="text-sm text-neutral-600 mb-4">Open source and built by students.</p>
        <button className="text-sm border border-neutral-300 rounded-full px-4 py-2 hover:bg-neutral-50">
          View on GitHub
        </button>
      </div>
    </div>
  </footer>
);