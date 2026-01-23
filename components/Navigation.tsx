import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import SearchOverlay from './SearchOverlay';

interface NavigationProps {
    onOpenMuse: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onOpenMuse }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navLinkClass = (path: string) => `
    text-sm font-medium transition-colors relative 
    ${location.pathname === path ? 'text-primary font-bold' : 'text-text-main/80 hover:text-primary'}
    after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-primary after:transition-all 
    ${location.pathname === path ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
  `;

  return (
    <>
      <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-background-light/95 backdrop-blur-md border-b border-primary/10">
        <div className="w-full px-6 py-4 lg:px-12 flex items-center justify-between">
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
          <div className="flex items-center gap-3 lg:gap-6">
            
            {/* Journal Style Search Trigger */}
            <button 
                aria-label="Search" 
                className="hidden md:flex items-center gap-3 group"
                onClick={() => setSearchOpen(true)}
            >
                <span className="font-serif italic text-lg text-text-main group-hover:text-primary transition-colors">Search</span>
                <div className="size-9 rounded-full border border-text-main/20 group-hover:border-primary group-hover:bg-primary group-hover:text-white text-text-main flex items-center justify-center transition-all duration-500 group-hover:rotate-90">
                    <span className="material-symbols-outlined text-[18px]">search</span>
                </div>
            </button>

            {/* Mobile Search Icon */}
            <button 
              aria-label="Search" 
              className="md:hidden flex items-center justify-center p-2 rounded-full hover:bg-black/5 transition-colors text-text-main"
              onClick={() => setSearchOpen(true)}
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>

            <button
                aria-label="Ask Muse"
                className="flex items-center justify-center p-2 rounded-full hover:bg-black/5 transition-colors text-primary group"
                onClick={onOpenMuse}
                title="Ask Muse AI Stylist"
            >
                <span className="material-symbols-outlined text-[22px] group-hover:animate-pulse">auto_awesome</span>
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
              className="md:hidden flex items-center justify-center p-3 rounded-full hover:bg-primary/10 transition-colors text-text-main active:bg-primary/20"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="material-symbols-outlined text-[28px] text-primary">menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Backdrop & Drawer - Portaled to body to avoid stacking context issues */}
        {createPortal(
          <>
            {/* Backdrop */}
            <div
              className={`fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <div
              className={`fixed top-0 right-0 h-full w-[85%] max-w-sm z-[10000] bg-[#fdf8f2] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
              inert={!mobileMenuOpen ? "true" : undefined}
              aria-hidden={!mobileMenuOpen}
            >
                {/* Header inside mobile menu */}
                <div className="flex items-center justify-between p-6 border-b border-text-main/10 bg-[#fdf8f2]">
                    <div className="flex items-center gap-2">
                      <div className="relative size-8 flex items-center justify-center">
                          <svg className="absolute text-primary w-full h-full" fill="currentColor" viewBox="0 0 100 100">
                            <path d="M50 0 C20 0 0 20 0 50 C0 80 20 100 50 100 C80 100 100 80 100 50 C100 20 80 0 50 0 Z M50 90 C30 90 10 70 10 50 C10 30 30 10 50 10 C70 10 90 30 90 50 C90 70 70 90 50 90 Z" opacity="0.2"></path>
                            <path d="M50 20 Q65 20 75 35 T80 65 Q70 85 50 85 Q30 85 20 65 T25 35 Q35 20 50 20 Z"></path>
                          </svg>
                      </div>
                      <h2 className="font-serif text-2xl font-bold text-text-main">TerraMuse</h2>
                    </div>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 rounded-full hover:bg-black/5 transition-colors text-text-main"
                      aria-label="Close menu"
                    >
                      <span className="material-symbols-outlined text-[32px]">close</span>
                    </button>
                </div>

                <div className="p-6 flex flex-col gap-6 bg-[#fdf8f2] overflow-y-auto flex-1">
                    {/* Search */}
                    <div
                      onClick={() => { setMobileMenuOpen(false); setSearchOpen(true); }}
                      className="w-full bg-white border border-text-main/10 rounded-full py-3 px-5 text-text-main flex items-center gap-3 shadow-sm cursor-text active:scale-[0.98] transition-transform"
                    >
                      <span className="material-symbols-outlined text-text-sub">search</span>
                      <span className="text-text-sub">Search products...</span>
                    </div>

                    {/* Main Links */}
                    <nav className="flex flex-col text-xl font-serif text-text-main space-y-1">
                      <Link to="/" onClick={() => setMobileMenuOpen(false)} className="py-3 px-2 rounded-lg hover:bg-primary/5 flex justify-between items-center group transition-colors">
                          <span>Home</span>
                      </Link>
                      <Link to="/new-arrivals" onClick={() => setMobileMenuOpen(false)} className="py-3 px-2 rounded-lg hover:bg-primary/5 flex justify-between items-center group transition-colors">
                          <span>New Arrivals</span>
                          <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 text-primary transition-opacity">arrow_forward</span>
                      </Link>
                      <Link to="/apparel" onClick={() => setMobileMenuOpen(false)} className="py-3 px-2 rounded-lg hover:bg-primary/5 flex justify-between items-center group transition-colors">
                          <span>Apparel</span>
                          <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 text-primary transition-opacity">arrow_forward</span>
                      </Link>
                      <Link to="/accessories" onClick={() => setMobileMenuOpen(false)} className="py-3 px-2 rounded-lg hover:bg-primary/5 flex justify-between items-center group transition-colors">
                          <span>Accessories</span>
                          <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 text-primary transition-opacity">arrow_forward</span>
                      </Link>
                      <Link to="/journal" onClick={() => setMobileMenuOpen(false)} className="py-3 px-2 rounded-lg hover:bg-primary/5 flex justify-between items-center group transition-colors">
                          <span>Journal</span>
                          <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 text-primary transition-opacity">arrow_forward</span>
                      </Link>
                    </nav>

                    <div className="mt-auto space-y-4">
                        {/* Secondary Actions */}
                        <div className="grid grid-cols-2 gap-4">
                          <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-text-main/5 rounded-xl hover:border-primary/30 active:bg-primary/5 transition-colors">
                              <span className="material-symbols-outlined text-2xl text-text-sub">person</span>
                              <span className="text-sm font-medium text-text-main">Account</span>
                          </Link>
                          <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-text-main/5 rounded-xl hover:border-primary/30 active:bg-primary/5 transition-colors">
                              <span className="material-symbols-outlined text-2xl text-text-sub">shopping_bag</span>
                              <span className="text-sm font-medium text-text-main">Cart</span>
                          </Link>
                        </div>

                        {/* Muse Banner */}
                        <button
                          onClick={() => { setMobileMenuOpen(false); onOpenMuse(); }}
                          className="w-full p-4 bg-gradient-to-r from-primary/10 to-accent-orange/10 rounded-xl border border-primary/20 flex items-center justify-between group active:scale-[0.98] transition-all"
                        >
                          <div className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-primary">auto_awesome</span>
                              <div className="text-left">
                                <p className="font-bold text-text-main text-sm">Ask Muse</p>
                                <p className="text-xs text-text-sub">Your Personal AI Stylist</p>
                              </div>
                          </div>
                          <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
          </>,
          document.body
        )}
      </header>
      
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navigation;