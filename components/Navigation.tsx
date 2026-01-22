import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchOverlay from './SearchOverlay';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinkClass = (path: string) => `
    text-sm font-medium transition-colors relative 
    ${location.pathname === path ? 'text-primary font-bold' : 'text-text-main/80 hover:text-primary'}
    after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-primary after:transition-all 
    ${location.pathname === path ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
  `;

  return (
    <>
      <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-background-light/95 backdrop-blur-md border-b border-primary/10">
        <div className="w-full px-6 py-5 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="group flex items-center gap-2">
              <div className="relative size-8 flex items-center justify-center">
                <svg className="absolute text-primary w-full h-full transform transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 100 100">
                  <path d="M50 0 C20 0 0 20 0 50 C0 80 20 100 50 100 C80 100 100 80 100 50 C100 20 80 0 50 0 Z M50 90 C30 90 10 70 10 50 C10 30 30 10 50 10 C70 10 90 30 90 50 C90 70 70 90 50 90 Z" opacity="0.2"></path>
                  <path d="M50 20 Q65 20 75 35 T80 65 Q70 85 50 85 Q30 85 20 65 T25 35 Q35 20 50 20 Z"></path>
                </svg>
              </div>
              <h2 className="font-serif text-2xl font-bold tracking-tight text-text-main">TerraMuse</h2>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <Link to="/new-arrivals" className={navLinkClass('/new-arrivals')}>New Arrivals</Link>
            <Link to="/apparel" className={navLinkClass('/apparel')}>Apparel</Link>
            <Link to="/accessories" className={navLinkClass('/accessories')}>Accessories</Link>
            <Link to="/journal" className={navLinkClass('/journal')}>Journal</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 lg:gap-5">
            <button 
              aria-label="Search" 
              className="flex items-center justify-center p-2 rounded-full hover:bg-black/5 transition-colors text-text-main"
              onClick={() => setSearchOpen(true)}
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>
            <Link 
              to="/login" 
              aria-label="Account" 
              className="hidden sm:flex items-center justify-center p-2 rounded-full hover:bg-black/5 transition-colors text-text-main"
            >
              <span className="material-symbols-outlined text-[22px]">person</span>
            </Link>
            <Link to="/cart-drawer" aria-label="Shopping Bag" className="flex items-center justify-center p-2 rounded-full hover:bg-black/5 transition-colors text-text-main relative">
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              <span className="absolute top-1.5 right-1.5 size-2 bg-primary rounded-full"></span>
            </Link>
            <button 
              aria-label="Menu" 
              className="md:hidden flex items-center justify-center p-2 rounded-full hover:bg-black/5 transition-colors text-text-main"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[60] bg-background-light flex flex-col p-6 animate-fadeIn">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-2xl font-bold text-text-main">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>
            <nav className="flex flex-col gap-6 text-xl font-serif text-text-main">
              <button className="text-left" onClick={() => { setMobileMenuOpen(false); setSearchOpen(true); }}>Search</button>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Account</Link>
              <Link to="/new-arrivals" onClick={() => setMobileMenuOpen(false)}>New Arrivals</Link>
              <Link to="/apparel" onClick={() => setMobileMenuOpen(false)}>Apparel</Link>
              <Link to="/accessories" onClick={() => setMobileMenuOpen(false)}>Accessories</Link>
              <Link to="/journal" onClick={() => setMobileMenuOpen(false)}>Journal</Link>
              <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>Cart</Link>
            </nav>
          </div>
        )}
      </header>
      
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navigation;