import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-light border-t border-primary/10 py-16 px-6 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
           {/* Brand - Spans 4 columns */}
           <div className="md:col-span-4 flex flex-col items-start gap-6">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="relative size-8 flex items-center justify-center">
                    <svg className="absolute text-primary w-full h-full transform transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 100 100">
                        <path d="M50 0 C20 0 0 20 0 50 C0 80 20 100 50 100 C80 100 100 80 100 50 C100 20 80 0 50 0 Z M50 90 C30 90 10 70 10 50 C10 30 30 10 50 10 C70 10 90 30 90 50 C90 70 70 90 50 90 Z" opacity="0.2"></path>
                        <path d="M50 20 Q65 20 75 35 T80 65 Q70 85 50 85 Q30 85 20 65 T25 35 Q35 20 50 20 Z"></path>
                    </svg>
                </div>
                <span className="font-serif font-bold text-2xl text-text-main">TerraMuse</span>
              </Link>
              <p className="text-text-sub text-base leading-relaxed max-w-xs font-light">
                An artistic sanctuary for the free-spirited. Curating sustainable fashion that speaks to the soul.
              </p>
           </div>
           
           {/* Spacer */}
           <div className="hidden md:block md:col-span-2"></div>

           {/* Shop */}
           <div className="md:col-span-2">
              <h4 className="font-serif italic text-text-main text-xl mb-6">Shop</h4>
              <ul className="space-y-4 text-base text-text-sub font-light">
                 <li><Link to="/new-arrivals" className="hover:text-primary transition-colors hover-underline-animation">New Arrivals</Link></li>
                 <li><Link to="/apparel" className="hover:text-primary transition-colors hover-underline-animation">Apparel</Link></li>
                 <li><Link to="/accessories" className="hover:text-primary transition-colors hover-underline-animation">Accessories</Link></li>
              </ul>
           </div>

           {/* Company */}
           <div className="md:col-span-2">
              <h4 className="font-serif italic text-text-main text-xl mb-6">Company</h4>
              <ul className="space-y-4 text-base text-text-sub font-light">
                 <li><Link to="/journal/featured-story" className="hover:text-primary transition-colors hover-underline-animation">Our Story</Link></li>
                 <li><Link to="/journal/sustainable-journey" className="hover:text-primary transition-colors hover-underline-animation">Sustainability</Link></li>
                 <li><Link to="/journal" className="hover:text-primary transition-colors hover-underline-animation">Journal</Link></li>
              </ul>
           </div>

           {/* Connect */}
           <div className="md:col-span-2">
              <h4 className="font-serif italic text-text-main text-xl mb-6">Connect</h4>
              <div className="flex gap-4">
                <button className="w-12 h-12 rounded-full border border-text-main/20 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group bg-white/50">
                   <span className="text-xs font-bold tracking-widest group-hover:scale-110 transition-transform">IG</span>
                </button>
                <button className="w-12 h-12 rounded-full border border-text-main/20 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group bg-white/50">
                   <span className="text-xs font-bold tracking-widest group-hover:scale-110 transition-transform">PT</span>
                </button>
              </div>
           </div>
        </div>

        <div className="border-t border-text-main/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-text-sub/60 uppercase tracking-widest">
            <p>© 2024 TerraMuse. All rights reserved.</p>
            <div className="flex gap-8">
                <Link to="/" className="hover:text-text-main transition-colors">Privacy Policy</Link>
                <Link to="/" className="hover:text-text-main transition-colors">Terms of Use</Link>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;