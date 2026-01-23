import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { allProducts } from '../data';
import { Product } from '../types';

const Accessories: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [sortOption, setSortOption] = useState<string>('Featured');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Base list
    let products = allProducts.filter(p => p.category === 'Accessories');

    // 1. Filter by Category (Inferred from Title)
    if (activeCategory !== 'All') {
        if (activeCategory === 'Jewelry') {
            products = products.filter(p => {
                const t = p.title.toLowerCase();
                return t.includes('pendant') || t.includes('earring') || t.includes('cuff') || t.includes('ring') || t.includes('necklace');
            });
        } else if (activeCategory === 'Bags & Totes') {
             products = products.filter(p => {
                const t = p.title.toLowerCase();
                return t.includes('tote') || t.includes('bag') || t.includes('purse');
             });
        } else if (activeCategory === 'Scarves') {
             products = products.filter(p => {
                const t = p.title.toLowerCase();
                return t.includes('scarf') || t.includes('shawl');
             });
        }
    }

    // 2. Sort
    products.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);

        if (sortOption === 'Price: Low to High') return priceA - priceB;
        if (sortOption === 'Price: High to Low') return priceB - priceA;
        // 'Featured' - default order
        if (sortOption === 'Featured') {
             // Sort by newness first, then by ID for stability
             const newA = a.isNew ? 1 : 0;
             const newB = b.isNew ? 1 : 0;
             if (newA !== newB) return newB - newA;
             return a.id - b.id;
        }
        return 0;
    });

    const handleSortSelect = (option: string) => {
        setSortOption(option);
        setIsSortOpen(false);
    };

    const displayedProducts = products;

  return (
    <main className="w-full px-6 lg:px-12 pb-20 pt-8 relative">
        <section className="relative w-full mb-16 lg:mb-24">
            <div className="w-full max-w-4xl mx-auto text-center">
                <div className="scroll-animate slide-right">
                    <div className="flex items-center justify-center gap-3 mb-4 text-text-sub text-sm tracking-wider uppercase">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <span className="w-4 h-px bg-primary/40"></span>
                        <span className="text-primary font-semibold">Accessories</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-serif text-text-main mb-6 leading-tight">
                        Curated <br/>
                        <span className="italic text-primary">Artifacts</span>
                    </h1>
                    <p className="text-lg text-text-main/70 max-w-md mx-auto font-light leading-relaxed">
                        Discover our hand-selected collection of artisan jewelry, woven textures, and earth-inspired accents designed to ground your spirit.
                    </p>
                </div>
            </div>
        </section>

        <section className="relative flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Spinning Decoration */}
            <div className="absolute -top-20 -left-20 w-96 h-96 pointer-events-none opacity-20 text-accent-sage z-0 hidden lg:block scroll-animate fade-in">
                <svg className="w-full h-full animate-spin-slow" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <path d="M100 100 L100 20" id="ray" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"></path>
                    </defs>
                    {[...Array(18)].map((_, i) => (
                        <use key={i} href="#ray" transform={`rotate(${i * 20} 100 100)`}></use>
                    ))}
                    <circle cx="100" cy="100" fill="none" r="15" stroke="currentColor" strokeWidth="1.5"></circle>
                </svg>
            </div>

            <aside className="w-full lg:w-64 flex-shrink-0 relative z-10">
                <div className="lg:sticky lg:top-32 space-y-8 lg:pr-8 border-b lg:border-b-0 lg:border-r border-primary/20 pb-8 lg:pb-0 scroll-animate fade-in delay-200">
                    <button 
                        className="w-full flex items-center justify-between lg:hidden mb-4 cursor-pointer focus:outline-none" 
                        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                    >
                        <span className="font-serif text-xl italic text-text-main">Filters</span>
                        <span className="material-symbols-outlined text-primary transition-transform duration-300" style={{ transform: mobileFiltersOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                    </button>
                    
                    {/* Filters Container */}
                    <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block space-y-8 animate-fadeIn`}>
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-serif text-lg font-medium text-text-main">Category</h3>
                                {activeCategory !== 'All' && (
                                    <button onClick={() => setActiveCategory('All')} className="text-xs text-text-sub hover:text-primary">Clear</button>
                                )}
                            </div>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <button 
                                        onClick={() => setActiveCategory('All')}
                                        className={`flex items-center gap-2 transition-colors w-full text-left py-1 ${activeCategory === 'All' ? 'text-primary font-bold' : 'text-text-sub hover:text-primary'}`}
                                        type="button"
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${activeCategory === 'All' ? 'bg-primary' : 'bg-transparent border border-text-sub'}`}></span>
                                        All Accessories
                                    </button>
                                </li>
                                {['Jewelry', 'Bags & Totes', 'Scarves'].map(cat => (
                                    <li key={cat}>
                                        <button 
                                            onClick={() => setActiveCategory(cat)}
                                            className={`transition-colors w-full text-left py-1 pl-3.5 ${activeCategory === cat ? 'text-primary font-bold border-l-2 border-primary -ml-[2px]' : 'text-text-sub hover:text-primary border-l-2 border-transparent -ml-[2px]'}`}
                                            type="button"
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="font-serif text-lg font-medium mb-4 text-text-main">Price Range</h3>
                            <div className="flex items-center gap-4 text-sm text-text-sub">
                                <span className="border-b border-text-sub/30 pb-1">$0</span>
                                <span>-</span>
                                <span className="border-b border-text-sub/30 pb-1">$300+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <div className="flex-grow relative z-10">
                <div className="flex justify-between items-center mb-8 scroll-animate fade-in delay-300">
                    <span className="text-sm text-text-sub font-display">Showing {displayedProducts.length} of {products.length} results</span>
                    <div className="relative">
                        <button 
                            className="flex items-center gap-2 cursor-pointer group text-sm font-medium text-text-main hover:text-primary transition-colors"
                            onClick={() => setIsSortOpen(!isSortOpen)}
                        >
                            Sort by: {sortOption}
                            <span className={`material-symbols-outlined text-[18px] text-text-sub group-hover:text-primary transition-transform ${isSortOpen ? 'rotate-180' : ''}`}>expand_more</span>
                        </button>
                        
                        {/* Sort Dropdown */}
                        {isSortOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)}></div>
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-text-main/10 py-2 z-50 animate-fadeIn">
                                    {['Featured', 'Price: Low to High', 'Price: High to Low'].map(option => (
                                        <button
                                            key={option}
                                            onClick={() => handleSortSelect(option)}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-black/5 transition-colors ${sortOption === option ? 'font-bold text-primary' : 'text-text-sub'}`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-8 gap-y-8 lg:gap-y-16">
                        {displayedProducts.map((item, idx) => (
                            <Link 
                                to={`/product/${item.id}`} 
                                key={item.id} 
                                className="group flex flex-col gap-4 cursor-pointer scroll-animate fade-in"
                                style={{ transitionDelay: `${(idx % 3) * 100}ms` }}
                            >
                                <div className="relative aspect-[4/5] overflow-hidden rounded-t-[2rem] rounded-b-lg bg-[#f0ebe5]">
                                    <img alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={item.image}/>
                                    <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <button className="bg-white text-text-main p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-[20px] block">add_shopping_cart</span>
                                        </button>
                                    </div>
                                    {item.isNew && <span className="absolute top-4 left-4 bg-primary/90 text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">New</span>}
                                </div>
                                <div className="text-center md:text-left">
                                    <h3 className="font-serif text-xl text-text-main group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-sm text-text-sub mt-1">{item.category}</p>
                                    <p className="font-medium text-text-main mt-2">${item.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-text-main/20 rounded-2xl scroll-animate fade-in">
                        <span className="material-symbols-outlined text-4xl text-text-sub mb-2 opacity-50">search_off</span>
                        <p className="text-text-main font-serif text-xl">No artifacts found.</p>
                        <button 
                            onClick={() => {setActiveCategory('All');}}
                            className="mt-4 text-sm text-primary underline hover:text-text-main"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
            {/* Bottom Decoration */}
            <div className="absolute -bottom-20 -right-20 w-96 h-96 pointer-events-none opacity-20 text-accent-sage/50 z-0 hidden lg:block rotate-180 scroll-animate fade-in">
                <svg className="w-full h-full animate-spin-slow" style={{animationDuration: '80s'}} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <path d="M100 100 L100 20" id="ray2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"></path>
                    </defs>
                    {[...Array(18)].map((_, i) => (
                        <use key={i} href="#ray2" transform={`rotate(${i * 20} 100 100)`}></use>
                    ))}
                    <circle cx="100" cy="100" fill="none" r="15" stroke="currentColor" strokeWidth="1.5"></circle>
                </svg>
            </div>
        </section>
    </main>
  );
};

export default Accessories;