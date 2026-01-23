import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { allProducts } from '../data';
import { Product } from '../types';

const Apparel: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  
  // Mapping UI color buttons to product color data
  // Updated filters to include 'Orange' which groups earthy tones
  const colorFilters = [
    { hex: '#E86C3F', name: 'Orange', matches: ['Terracotta', 'Rust Clay', 'Orange'] },
    { hex: '#5d6b58', name: 'Sage', matches: ['Sage Green'] },
    { hex: '#e3d8c8', name: 'Neutrals', matches: ['Sand', 'Ivory', 'Natural'] },
    { hex: '#1a1714', name: 'Dark', matches: ['Charon Charcoal', 'Black'] },
  ];

  // Helper to check if a product matches a category
  const matchesCategory = (p: Product, category: string) => {
    const title = p.title.toLowerCase();
    if (category === 'Dresses') {
        return title.includes('dress') || title.includes('jumpsuit') || title.includes('maxi');
    } else if (category === 'Tops') {
        // Removed 'coat' and 'cardigan' from tops
        return title.includes('blouse') || title.includes('tunic') || title.includes('shirt') || title.includes('top');
    } else if (category === 'Bottoms') {
        return title.includes('pant') || title.includes('skirt') || title.includes('trouser');
    } else if (category === 'Outerwear') {
        // New category for coats and knits
        return title.includes('coat') || title.includes('jacket') || title.includes('cardigan');
    }
    return true;
  };

  // Base list of all apparel
  const allApparel = allProducts.filter(p => p.category === 'Apparel');

  // Dynamic Counts
  const getCount = (cat: string | null) => {
    if (!cat) return allApparel.length;
    return allApparel.filter(p => matchesCategory(p, cat)).length;
  };

  const dressesCount = getCount('Dresses');
  const topsCount = getCount('Tops');
  const bottomsCount = getCount('Bottoms');
  const outerwearCount = getCount('Outerwear');

  // Active Filtering
  let products = [...allApparel];

  // 1. Filter by Category
  if (selectedCategory) {
      products = products.filter(p => matchesCategory(p, selectedCategory));
  }

  // 2. Filter by Color
  if (selectedColor) {
    const filterDef = colorFilters.find(c => c.name === selectedColor);
    if (filterDef) {
        products = products.filter(p => p.color && filterDef.matches.some(m => p.color!.includes(m)));
    }
  }

  // 3. Filter by Size (Simulation)
  if (selectedSize) {
      // Logic would go here in a real app
  }

  // Handle toggles
  const toggleSize = (size: string) => {
    setSelectedSize(prev => prev === size ? null : size);
  };

  const toggleColor = (colorName: string) => {
    setSelectedColor(prev => prev === colorName ? null : colorName);
  };
  
  const toggleCategory = (cat: string) => {
      setSelectedCategory(prev => prev === cat ? null : cat);
  };

  const displayedProducts = products;

  return (
    <main className="px-6 lg:px-12 pb-20 w-full max-w-[1600px] mx-auto relative z-10 pt-8">
      {/* Decorative background SVG */}
      <div className="absolute top-0 right-0 -mr-20 -mt-10 pointer-events-none opacity-10 text-primary hidden lg:block scroll-animate fade-in">
        <svg height="300" viewBox="0 0 200 200" width="300">
           <path d="M100 200 C120 150 180 100 150 50 Q140 30 120 40" fill="none" stroke="currentColor" strokeWidth="1"></path>
           <path d="M100 200 C80 160 40 120 60 60 Q70 40 90 50" fill="none" stroke="currentColor" strokeWidth="1"></path>
           <path d="M100 150 Q130 120 150 130" fill="none" stroke="currentColor" strokeWidth="1"></path>
        </svg>
      </div>

      <div className="pt-8 pb-12">
         <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm mb-6 font-display scroll-animate fade-in">
            <Link to="/" className="text-text-sub hover:text-primary transition-colors">Home</Link>
            <span className="text-text-sub/40">/</span>
            <span className="text-primary font-medium">Apparel</span>
         </nav>
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="scroll-animate slide-right">
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-main font-light mb-4">
                 The Collection
               </h1>
               <p className="text-text-sub max-w-lg text-lg font-light leading-relaxed">
                 Pieces woven from the earth, designed for the wandering soul. Discover our latest curation of sustainable linen and gauze.
               </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-sub font-medium pb-1 scroll-animate fade-in delay-200">
               <span>Showing {displayedProducts.length} of {products.length} Products</span>
            </div>
         </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 relative">
         {/* Sidebar */}
         <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-32 space-y-8 pr-4 scroll-animate fade-in delay-100">
               {/* Categories */}
               <div className="border-b border-text-main/10 pb-6">
                  <div className="flex items-center justify-between mb-4 group cursor-pointer">
                     <h3 className="font-serif text-lg text-text-main flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-base">diamond</span>
                        Category
                     </h3>
                     {(selectedCategory || selectedColor || selectedSize) && (
                        <button onClick={() => {setSelectedCategory(null); setSelectedColor(null); setSelectedSize(null);}} className="text-xs text-text-sub hover:text-primary">Clear All</button>
                     )}
                  </div>
                  <ul className="space-y-3 text-sm font-medium text-text-sub">
                     <li>
                        <button onClick={() => setSelectedCategory(null)} className={`flex items-center justify-between w-full text-left hover:text-primary transition-colors ${!selectedCategory ? 'text-primary font-bold' : ''}`}>
                             All Apparel <span className="opacity-40 font-light text-xs">{allApparel.length}</span>
                        </button>
                     </li>
                     <li>
                        <button onClick={() => toggleCategory('Dresses')} className={`flex items-center justify-between w-full text-left hover:text-primary transition-colors ${selectedCategory === 'Dresses' ? 'text-primary font-bold' : ''}`}>
                            Dresses & Jumpsuits <span className="opacity-40 font-light text-xs">{dressesCount}</span>
                        </button>
                     </li>
                     <li>
                        <button onClick={() => toggleCategory('Tops')} className={`flex items-center justify-between w-full text-left hover:text-primary transition-colors ${selectedCategory === 'Tops' ? 'text-primary font-bold' : ''}`}>
                            Tops & Blouses <span className="opacity-40 font-light text-xs">{topsCount}</span>
                        </button>
                     </li>
                     <li>
                        <button onClick={() => toggleCategory('Outerwear')} className={`flex items-center justify-between w-full text-left hover:text-primary transition-colors ${selectedCategory === 'Outerwear' ? 'text-primary font-bold' : ''}`}>
                            Outerwear & Knitwear <span className="opacity-40 font-light text-xs">{outerwearCount}</span>
                        </button>
                     </li>
                     <li>
                        <button onClick={() => toggleCategory('Bottoms')} className={`flex items-center justify-between w-full text-left hover:text-primary transition-colors ${selectedCategory === 'Bottoms' ? 'text-primary font-bold' : ''}`}>
                            Bottoms <span className="opacity-40 font-light text-xs">{bottomsCount}</span>
                        </button>
                     </li>
                  </ul>
               </div>

               {/* Size */}
               <div className="border-b border-text-main/10 pb-6">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="font-serif text-lg text-text-main flex items-center gap-2">
                         <span className="material-symbols-outlined text-accent-sage text-base">favorite</span>
                         Size
                     </h3>
                     <button 
                        onClick={() => setSelectedSize(null)} 
                        className={`text-xs text-text-sub hover:text-primary transition-opacity ${selectedSize ? 'opacity-100' : 'opacity-0'}`}
                     >
                        Clear
                     </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                     {sizes.map(size => (
                        <button 
                            key={size}
                            onClick={() => toggleSize(size)}
                            className={`h-10 text-xs rounded-full transition-all border ${
                                selectedSize === size 
                                ? 'bg-primary border-primary text-white font-bold shadow-md shadow-primary/20' 
                                : 'border-text-main/20 text-text-sub hover:border-primary hover:text-primary'
                            }`}
                        >
                            {size}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Color */}
               <div className="pb-6">
                   <div className="flex items-center justify-between mb-4">
                      <h3 className="font-serif text-lg text-text-main flex items-center gap-2">
                         <span className="material-symbols-outlined text-accent-teal text-base">palette</span>
                         Color
                      </h3>
                      <button 
                        onClick={() => setSelectedColor(null)} 
                        className={`text-xs text-text-sub hover:text-primary transition-opacity ${selectedColor ? 'opacity-100' : 'opacity-0'}`}
                      >
                        Clear
                     </button>
                   </div>
                   <div className="flex flex-wrap gap-3">
                      {colorFilters.map(color => (
                          <button 
                            key={color.name}
                            aria-label={color.name} 
                            onClick={() => toggleColor(color.name)}
                            style={{ backgroundColor: color.hex }}
                            className={`w-6 h-6 rounded-full ring-offset-2 transition-all ${
                                selectedColor === color.name 
                                ? 'ring-2 ring-primary scale-110' 
                                : 'ring-2 ring-transparent hover:ring-text-main/20 hover:scale-110'
                            } ${color.name === 'Neutrals' ? 'border border-black/10' : ''}`}
                          ></button>
                      ))}
                   </div>
               </div>
            </div>
         </aside>

         {/* Product Grid */}
         <div className="flex-grow min-w-0">
             {products.length > 0 ? (
                 <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
                     {displayedProducts.map((product, idx) => (
                        <Link 
                            to={`/product/${product.id}`} 
                            key={product.id} 
                            className="break-inside-avoid group cursor-pointer mb-8 block scroll-animate fade-in"
                            style={{ transitionDelay: `${(idx % 3) * 100}ms` }}
                        >
                           <div className="relative overflow-hidden rounded-xl bg-[#eaddcf] mb-4">
                              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                              <img 
                                src={product.image} 
                                alt={product.title} 
                                className={`w-full h-auto object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-in-out ${product.id === 5 ? 'aspect-[1/2]' : 'aspect-[3/4]'}`}
                              />
                              {product.isNew && (
                                  <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm z-20">New</div>
                              )}
                               {product.isLowStock && (
                                  <div className="absolute top-4 right-4 bg-text-main text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm z-20">Low Stock</div>
                              )}
                              <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-sm z-20 hover:bg-primary hover:text-white">
                                 <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                              </div>
                           </div>
                           <div className="flex justify-between items-start">
                              <div>
                                 <h3 className="font-serif text-lg text-text-main group-hover:text-primary transition-colors">{product.title}</h3>
                                 <p className="text-xs text-text-sub uppercase tracking-wider mt-1">{product.color}</p>
                              </div>
                              <span className="font-display font-medium text-text-main">${product.price}</span>
                           </div>
                        </Link>
                     ))}
                 </div>
             ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-fadeIn">
                    <span className="material-symbols-outlined text-6xl text-text-main/20 mb-4">filter_alt_off</span>
                    <h3 className="font-serif text-2xl text-text-main mb-2">No products found</h3>
                    <p className="text-text-sub max-w-sm">Try adjusting your filters to see more of our collection.</p>
                    <button 
                        onClick={() => { setSelectedColor(null); setSelectedSize(null); setSelectedCategory(null); }}
                        className="mt-6 px-6 py-2 bg-text-main text-white text-sm font-bold tracking-wider uppercase rounded-full hover:bg-primary transition-colors"
                    >
                        Clear All Filters
                    </button>
                </div>
             )}
             
         </div>
      </div>
    </main>
  );
};

export default Apparel;