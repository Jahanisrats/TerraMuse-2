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
        <div className="fixed inset-0 z-[100] bg-background-light/95 backdrop-blur-xl animate-fadeIn flex flex-col">
            {/* Header */}
            <div className="w-full px-6 py-6 lg:px-12 flex items-center justify-between border-b border-text-main/10">
                 <div className="flex items-center gap-2 text-primary opacity-80">
                    <span className="material-symbols-outlined">search</span>
                    <span className="text-xs font-bold tracking-widest uppercase">Search</span>
                 </div>
                 <button 
                    onClick={onClose} 
                    className="p-2 rounded-full hover:bg-black/5 transition-colors text-text-main"
                 >
                    <span className="material-symbols-outlined text-[28px]">close</span>
                 </button>
            </div>

            {/* Input Area */}
            <div className="w-full max-w-4xl mx-auto px-6 mt-12 md:mt-20">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type to search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-text-main/20 text-3xl md:text-5xl lg:text-6xl font-serif text-text-main placeholder-text-main/20 focus:border-primary focus:outline-none py-4 transition-colors text-center md:text-left"
                />
            </div>

            {/* Results / Suggestions */}
            <div className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto px-6 py-12">
                {!query ? (
                    <div className="text-center md:text-left">
                        <p className="text-text-sub uppercase tracking-widest text-xs font-bold mb-6">Popular Searches</p>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            {['Sienna Linen Jumpsuit', 'Silk Earth-Tone Scarf', 'Terracotta Clay Earrings', 'Woven Artisan Tote', 'Terra Midi Dress'].map(term => (
                                <button 
                                    key={term}
                                    onClick={() => setQuery(term)}
                                    className="px-6 py-3 rounded-full border border-text-main/10 hover:border-primary hover:text-primary transition-colors text-text-main text-sm md:text-base"
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : results.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {results.map(product => (
                            <Link 
                                to={`/product/${product.id}`}
                                key={product.id} 
                                onClick={onClose}
                                className="group flex flex-col gap-3"
                            >
                                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-paper">
                                    <img 
                                        src={product.image} 
                                        alt={product.title} 
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-serif text-lg text-text-main group-hover:text-primary transition-colors">{product.title}</h4>
                                    <p className="text-sm text-text-sub">${product.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="font-serif text-2xl text-text-main/60 italic">No results found for "{query}"</p>
                        <p className="text-text-sub mt-2">Try checking for typos or using different keywords.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchOverlay;