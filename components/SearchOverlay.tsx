import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { allProducts } from '../data';
import { Product } from '../types';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Filter products
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }
        const lowerQuery = query.toLowerCase();
        const filtered = allProducts.filter(p => 
            p.title.toLowerCase().includes(lowerQuery) || 
            p.category.toLowerCase().includes(lowerQuery) ||
            p.color?.toLowerCase().includes(lowerQuery)
        );
        setResults(filtered);
    }, [query]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-background-light animate-fadeIn flex flex-col bg-paper-texture overflow-hidden">
            {/* Artistic Header */}
            <div className="w-full px-6 py-6 lg:px-12 flex items-center justify-between absolute top-0 left-0 z-20">
                 <div className="flex items-center gap-2 opacity-50">
                    <span className="font-serif italic text-lg text-text-main">TerraMuse Search</span>
                 </div>
                 <button 
                    onClick={onClose} 
                    className="p-3 rounded-full hover:bg-black/5 transition-all duration-300 text-text-main group"
                 >
                    <span className="material-symbols-outlined text-[32px] group-hover:rotate-90 transition-transform duration-500">close</span>
                 </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-y-auto w-full pt-24 px-6 relative">
                
                {/* Huge Input Section */}
                <div className="max-w-4xl mx-auto w-full mb-12 relative z-10 text-center">
                    <label htmlFor="unique-search" className="block text-primary font-bold tracking-[0.3em] text-xs uppercase mb-6 animate-fadeIn">
                        Discover Something New
                    </label>
                    <div className="relative inline-block w-full">
                        <input
                            id="unique-search"
                            ref={inputRef}
                            type="text"
                            placeholder="What do you seek?"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full bg-transparent border-0 border-b-2 border-text-main/10 text-4xl md:text-6xl lg:text-7xl font-serif text-text-main placeholder-text-main/10 focus:border-primary focus:ring-0 py-4 transition-all text-center leading-tight outline-none"
                            autoComplete="off"
                        />
                        {/* Decorative Underline Animation */}
                        <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 ease-out mx-auto right-0 ${query ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
                    </div>
                </div>

                {/* Results Area */}
                <div className="flex-1 w-full max-w-7xl mx-auto pb-20">
                    {!query ? (
                        <div className="flex flex-col items-center justify-center opacity-60 mt-12 animate-fadeIn delay-100">
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl w-full">
                                {['Linen', 'Ceramics', 'Dresses', 'Gold'].map((term, idx) => (
                                    <button 
                                        key={term}
                                        onClick={() => setQuery(term)}
                                        className="aspect-square rounded-full border border-text-main/10 flex items-center justify-center hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 group"
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        <span className="font-serif italic text-lg group-hover:scale-110 transition-transform">{term}</span>
                                    </button>
                                ))}
                             </div>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
                            {results.map((product, idx) => (
                                <Link 
                                    to={`/product/${product.id}`}
                                    key={product.id} 
                                    onClick={onClose}
                                    className="group block bg-white p-4 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500 transform rotate-1 hover:rotate-0"
                                    style={{ animation: `fadeIn 0.5s ease-out forwards ${idx * 0.1}s`, opacity: 0 }}
                                >
                                    <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4 filter sepia-[0.2] group-hover:sepia-0 transition-all duration-500">
                                        <img 
                                            src={product.image} 
                                            alt={product.title} 
                                            className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000"
                                        />
                                    </div>
                                    <div className="text-center pb-2">
                                        <h4 className="font-serif text-xl text-text-main group-hover:text-primary transition-colors">{product.title}</h4>
                                        <p className="text-sm text-text-sub font-display mt-1">${product.price}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center mt-12 animate-fadeIn">
                            <span className="material-symbols-outlined text-4xl text-text-sub/30 mb-4">spa</span>
                            <p className="font-serif text-2xl text-text-main/60 italic">We couldn't unearth anything for "{query}"</p>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Background Decorations */}
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent-sage/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply"></div>
            <div className="absolute top-40 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none mix-blend-multiply"></div>
        </div>
    );
};

export default SearchOverlay;