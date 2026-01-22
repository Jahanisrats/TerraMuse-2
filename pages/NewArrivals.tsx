import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { allProducts } from '../data';
import { Product } from '../types';

const NewArrivals: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [sortOption, setSortOption] = useState('Featured');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  // Define the curated pool of "New Arrival" products
  // Reduced list to show only the newest items
  const curatedIds = [1, 14, 15, 16, 17, 2, 8, 4]; 
  const pool = allProducts.filter(p => curatedIds.includes(p.id) || p.isNew);
  // Ensure uniqueness
  const products = Array.from(new Set(pool.map(p => p.id))).map(id => pool.find(p => p.id === id)!);

  // Filter Logic
  const matchesCategory = (p: Product, category: string) => {
    if (category === 'All Categories') return true;
    const title = p.title.toLowerCase();
    
    if (category === 'Dresses') {
        return title.includes('dress') || title.includes('jumpsuit') || title.includes('maxi');
    } else if (category === 'Tops') {
        return title.includes('blouse') || title.includes('tunic') || title.includes('shirt') || title.includes('top') || title.includes('cardigan') || title.includes('coat');
    } else if (category === 'Bottoms') {
        return title.includes('pant') || title.includes('skirt') || title.includes('trouser');
    }
    return true;
  };

  // Apply Filter and Sort
  const getProcessedProducts = () => {
      // 1. Filter
      let result = products.filter(p => matchesCategory(p, activeCategory));
      
      // 2. Sort
      if (sortOption === 'Price: Low to High') {
          result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      } else if (sortOption === 'Price: High to Low') {
          result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      }
      // 'Featured' keeps original order (as defined in data/curated logic)
      
      return result;
  };

  const filteredProducts = getProcessedProducts();

  // Curated items for the "All" view layout (Featured only)
  const heroProduct = allProducts.find(p => p.id === 1); // Sienna Linen Jumpsuit
  const subHero = allProducts.find(p => p.id === 14); // Ethereal Gauze Maxi
  
  // Filter out heroes to get the grid items
  const gridPool = products.filter(p => p.id !== 1 && p.id !== 14);
  const curatedGrid = gridPool.slice(0, visibleCount);

  const getButtonClass = (cat: string) => `
    px-4 py-1.5 rounded-full border transition-all duration-300
    ${activeCategory === cat 
        ? 'bg-primary text-white border-primary shadow-md' 
        : 'bg-white/50 border-text-main/20 text-text-sub hover:border-primary hover:text-primary'}
  `;

  const handleSortSelect = (option: string) => {
      setSortOption(option);
      setIsSortOpen(false);
  };

  const handleLoadMore = () => {
      setVisibleCount(prev => prev + 3);
  };

  return (
    <>
    <section className="relative w-full pt-16 pb-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 flex justify-center items-start pt-10 opacity-30 pointer-events-none">
            <div className="w-[800px] h-[800px] rounded-full bg-sand/40 blur-3xl mix-blend-multiply"></div>
            <div className="absolute top-20 right-20 w-[400px] h-[400px] rounded-full bg-accent-orange/20 blur-3xl mix-blend-multiply"></div>
        </div>
        <svg className="absolute -right-20 top-0 h-[300px] w-auto opacity-20 text-text-main z-0 scroll-animate fade-in delay-200" fill="none" viewBox="0 0 200 400" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 400 C100 300 150 200 180 100 M100 400 C100 300 50 200 20 100" stroke="currentColor" strokeWidth="2"></path>
            <path d="M100 300 Q130 250 160 260 M100 250 Q130 200 150 210 M100 350 Q70 300 40 310" stroke="currentColor" strokeWidth="1.5"></path>
        </svg>

        <div className="relative z-10 container mx-auto px-6 text-center">
            <div className="inline-block relative scroll-animate zoom-in">
                <span className="text-xs uppercase tracking-[0.3em] text-accent-sage font-bold mb-3 block">Spring Collection 2024</span>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-text-main leading-tight relative">
                    Fresh From <br/>
                    <span className="font-script text-6xl md:text-8xl lg:text-9xl text-primary -mt-4 block transform -rotate-2">the Earth</span>
                </h1>
                <div className="absolute -top-10 -left-10 w-20 h-20 border border-primary/20 rounded-full opacity-60"></div>
                <div className="absolute bottom-4 -right-8 w-12 h-12 bg-accent-teal/10 rounded-full blur-xl"></div>
            </div>
            <p className="mt-8 max-w-lg mx-auto text-text-sub text-lg leading-relaxed scroll-animate fade-in delay-200">
                Pieces inspired by the raw beauty of nature. Breathable linens, hand-dyed cottons, and silhouettes that flow with the wind.
            </p>
        </div>
    </section>

    {/* Sticky Filter Bar */}
    <div className="sticky top-[81px] z-40 bg-background-light/95 backdrop-blur-sm border-y border-text-main/10 py-4 mb-12 transition-all duration-300 shadow-sm scroll-animate fade-in">
        <div className="container mx-auto px-6 lg:px-12 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-text-sub overflow-x-auto no-scrollbar pb-1 md:pb-0">
                <span className="font-serif text-text-main mr-2 flex-shrink-0">Filter by:</span>
                <button onClick={() => setActiveCategory('All Categories')} className={getButtonClass('All Categories')}>All Categories</button>
                <button onClick={() => setActiveCategory('Dresses')} className={getButtonClass('Dresses')}>Dresses</button>
                <button onClick={() => setActiveCategory('Tops')} className={getButtonClass('Tops')}>Tops</button>
                <button onClick={() => setActiveCategory('Bottoms')} className={getButtonClass('Bottoms')}>Bottoms</button>
            </div>
            <div className="flex items-center gap-6 ml-auto">
                <div className="hidden sm:flex items-center gap-2 text-sm text-text-sub">
                    <span className="font-serif text-text-main">Size:</span>
                    <div className="flex gap-1">
                        {['XS', 'S', 'M', 'L'].map(size => (
                            <button key={size} className="w-8 h-8 rounded-full border border-text-main/10 hover:bg-primary hover:text-white hover:border-primary transition-colors flex items-center justify-center text-xs">
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="h-6 w-px bg-text-main/20 hidden sm:block"></div>
                
                {/* Sort Dropdown */}
                <div className="relative">
                    <button 
                        className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors group"
                        onClick={() => setIsSortOpen(!isSortOpen)}
                    >
                        Sort <span className="hidden sm:inline-block font-normal text-text-sub">by: {sortOption === 'Featured' ? 'Featured' : sortOption.replace('Price: ', '')}</span>
                        <span className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>
                    
                    {isSortOpen && (
                        <>
                            <div className="fixed inset-0 z-30 cursor-default" onClick={() => setIsSortOpen(false)}></div>
                            <div className="absolute right-0 top-full mt-4 w-56 bg-white rounded-lg shadow-xl border border-text-main/10 py-2 z-40 animate-fadeIn">
                                {['Featured', 'Price: Low to High', 'Price: High to Low'].map(option => (
                                    <button
                                        key={option}
                                        onClick={() => handleSortSelect(option)}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-black/5 transition-colors ${sortOption === option ? 'font-bold text-primary bg-primary/5' : 'text-text-sub'}`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>

    <main className="flex-grow px-6 lg:px-12 pb-24 container mx-auto relative min-h-[500px]">
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-accent-sage/10 mix-blend-multiply filter blur-3xl rounded-full z-0 pointer-events-none"></div>

        {/* 
            CONDITIONAL RENDERING: 
            If "All Categories" is selected AND Sort is "Featured" -> Show the Curated Layout 
            Else -> Show the Standard Grid with filtered/sorted items
        */}
        
        {activeCategory === 'All Categories' && sortOption === 'Featured' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-16 relative z-10">
                {/* Hero Product 1 */}
                {heroProduct && (
                    <Link to={`/product/${heroProduct.id}`} className="lg:col-span-8 group cursor-pointer block scroll-animate fade-in">
                        <div className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-[2rem] shadow-xl">
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                            <img alt={heroProduct.title} className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700 ease-out" src={heroProduct.image}/>
                            <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full">Best Seller</div>
                            <div className="absolute bottom-6 right-6 z-20 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 hover:bg-primary hover:text-white">
                                <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-serif text-text-main group-hover:text-primary transition-colors">{heroProduct.title}</h3>
                                <p className="text-text-sub mt-1 text-sm">100% Organic Linen • {heroProduct.color}</p>
                            </div>
                            <span className="text-xl font-medium text-text-main">${heroProduct.price}</span>
                        </div>
                    </Link>
                )}

                {/* Hero Product 2 */}
                {subHero && (
                    <Link to={`/product/${subHero.id}`} className="lg:col-span-4 group cursor-pointer mt-12 lg:mt-0 block scroll-animate fade-in delay-200">
                        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[2rem] shadow-lg">
                            <img alt={subHero.title} className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700 ease-out" src={subHero.image}/>
                            <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 hover:bg-primary hover:text-white">
                                <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-xl font-serif text-text-main group-hover:text-primary transition-colors">{subHero.title}</h3>
                                <span className="text-lg font-medium text-text-main">${subHero.price}</span>
                            </div>
                            <p className="text-text-sub mt-1 text-sm">Cotton Gauze • Sage Green</p>
                        </div>
                    </Link>
                )}

                {/* Quote / Divider */}
                <div className="lg:col-span-12 py-16 flex justify-center relative scroll-animate zoom-in delay-100">
                    <svg className="absolute left-10 top-1/2 -translate-y-1/2 h-32 w-auto opacity-30 text-primary hidden lg:block" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 0 C20 0 0 20 0 50 C0 80 20 100 50 100" fill="none" stroke="currentColor" strokeWidth="1"></path>
                    </svg>
                    <p className="font-serif italic text-2xl md:text-3xl text-center max-w-2xl text-text-main/80 leading-relaxed">
                        "Clothing that feels like a second skin, embracing the natural rhythms of your body."
                    </p>
                    <svg className="absolute right-10 top-1/2 -translate-y-1/2 h-32 w-auto opacity-30 text-primary hidden lg:block transform rotate-180" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 0 C20 0 0 20 0 50 C0 80 20 100 50 100" fill="none" stroke="currentColor" strokeWidth="1"></path>
                    </svg>
                </div>

                {/* Standard Curated Grid */}
                {curatedGrid.map((p, idx) => (
                    <Link to={`/product/${p?.id}`} key={p?.id || idx} className={`md:col-span-1 lg:col-span-4 group cursor-pointer block scroll-animate fade-in ${idx === 1 ? 'lg:translate-y-16' : ''}`} style={{ transitionDelay: `${idx * 150}ms` }}>
                        <div className={`relative w-full aspect-[4/5] overflow-hidden shadow-lg ${idx === 1 ? 'rounded-t-[10rem] rounded-b-[2rem]' : idx === 2 ? 'rounded-[2rem] rounded-br-[8rem]' : 'rounded-[2rem]'}`}>
                            <img alt={p?.title} className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700 ease-out" src={p?.image}/>
                            {p.isNew && <div className="absolute top-4 right-4 z-20 bg-accent-sage/90 text-white backdrop-blur px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full">New</div>}
                            <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 hover:bg-primary hover:text-white">
                                <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-lg font-serif text-text-main group-hover:text-primary transition-colors">{p?.title}</h3>
                                <span className="text-lg font-medium text-text-main">${p?.price}</span>
                            </div>
                            <p className="text-text-sub mt-1 text-sm">{p?.category} • {p?.color}</p>
                        </div>
                    </Link>
                ))}

                {visibleCount < gridPool.length && (
                    <div className="col-span-1 lg:col-span-12 flex justify-center mt-12 lg:mt-24 scroll-animate fade-in">
                        <button 
                            onClick={handleLoadMore}
                            className="group relative px-10 py-4 bg-transparent border border-primary text-primary hover:text-white hover:bg-primary text-sm font-bold tracking-widest uppercase transition-all duration-500 overflow-hidden rounded-full"
                        >
                            <span className="relative z-10">Load More</span>
                        </button>
                    </div>
                )}
            </div>
        ) : (
            /* STANDARD GRID VIEW (Used for specific categories OR when sorting is active) */
            <div className="relative z-10 animate-fadeIn">
                 {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((p, idx) => (
                            <Link to={`/product/${p.id}`} key={p.id} className="group cursor-pointer scroll-animate fade-in" style={{ transitionDelay: `${(idx % 4) * 100}ms` }}>
                                <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-[#f0ebe5] mb-4 relative">
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"/>
                                    {p.isNew && <div className="absolute top-3 left-3 bg-primary text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm z-20">New</div>}
                                    <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-sm z-20 hover:bg-primary hover:text-white">
                                        <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                                    </div>
                                </div>
                                <h3 className="font-serif text-lg text-text-main group-hover:text-primary transition-colors">{p.title}</h3>
                                <p className="text-sm text-text-sub">${p.price}</p>
                            </Link>
                        ))}
                    </div>
                 ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <span className="material-symbols-outlined text-6xl text-text-main/20 mb-4">checkroom</span>
                        <h3 className="font-serif text-2xl text-text-main mb-2">No items found</h3>
                        <p className="text-text-sub mb-6">We couldn't find any {activeCategory.toLowerCase()} in our new arrivals.</p>
                        <button 
                            onClick={() => setActiveCategory('All Categories')}
                            className="px-6 py-2 bg-text-main text-white text-sm font-bold tracking-wider uppercase rounded-full hover:bg-primary transition-colors"
                        >
                            View All Categories
                        </button>
                    </div>
                 )}
            </div>
        )}
    </main>
    </>
  );
};

export default NewArrivals;