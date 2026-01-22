import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary/5 border-t border-primary/10 py-12 px-6 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
           <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-text-main">spa</span>
                <span className="font-serif font-bold text-xl text-text-main">TerraMuse</span>
              </div>
              <p className="text-text-sub text-sm leading-relaxed">
                An artistic sanctuary for the free-spirited. Curating sustainable fashion that speaks to the soul.
              </p>
           </div>
           
           <div>
              <h4 className="font-serif italic text-text-main text-lg mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-text-sub">
                 <li><a href="#" className="hover:text-primary transition-colors">New Arrivals</a></li>
                 <li><a href="#" className="hover:text-primary transition-colors">Apparel</a></li>
                 <li><a href="#" className="hover:text-primary transition-colors">Accessories</a></li>
              </ul>
           </div>

           <div>
              <h4 className="font-serif italic text-text-main text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-text-sub">
                 <li><a href="#" className="hover:text-primary transition-colors">Our Story</a></li>
                 <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
                 <li><a href="#" className="hover:text-primary transition-colors">Journal</a></li>
              </ul>
           </div>

           <div>
              <h4 className="font-serif italic text-text-main text-lg mb-4">Connect</h4>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full border border-text-main/20 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors">
                   <span className="text-xs font-bold">IG</span>
                </button>
                <button className="w-10 h-10 rounded-full border border-text-main/20 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors">
                   <span className="text-xs font-bold">PT</span>
                </button>
              </div>
           </div>
        </div>

        <div className="border-t border-text-main/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-text-main/50 uppercase tracking-widest">
            <p>© 2024 TerraMuse. All rights reserved.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-text-main transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-text-main transition-colors">Terms of Use</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;