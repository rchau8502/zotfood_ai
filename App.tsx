import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QuickStartProvider } from './store';
import { Header, Footer, BackgroundGrid } from './components/Layout';
import { Home } from './pages/Home';
import { Recipes } from './pages/Recipes';
import { Pantry } from './pages/Pantry';
import { ShoppingList } from './pages/ShoppingList';
import { Demo } from './pages/Demo';
import { Dashboard } from './pages/Dashboard';
import { SignIn } from './pages/SignIn';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  return (
    <>
        <ScrollToTop />
        <BackgroundGrid />
        <Header />
        <main className="flex-1 w-full">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/pantry" element={<Pantry />} />
                <Route path="/shopping-list" element={<ShoppingList />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signin" element={<SignIn />} />
            </Routes>
        </main>
        <Footer />
    </>
  );
};

export default function App() {
  return (
    <Router>
        <QuickStartProvider>
            <div className="flex flex-col min-h-screen">
                <AppContent />
            </div>
        </QuickStartProvider>
    </Router>
  );
}
