import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { allProducts } from '../data';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [imageStyle, setImageStyle] = useState<React.CSSProperties>({});
  const [isAdding, setIsAdding] = useState(false);

  // Define available color options for the UI
  const baseColorOptions = [
    { name: 'Terracotta', hex: '#8c3a28' },
    { name: 'Sage Green', hex: '#5d6b58' },
    { name: 'Sand', hex: '#e3d8c8' },
    { name: 'Charon Charcoal', hex: '#2f2f2f' },
    { name: 'Rust Clay', hex: '#b87a6d' },
    { name: 'Ivory', hex: '#f2efde' },
    { name: 'Natural', hex: '#dcc9b6' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      const found = allProducts.find(p => p.id === parseInt(id));
      if (found) {
        setProduct(found);
        setSelectedColor(found.color || '');
      } else {
        navigate('/new-arrivals');
      }
    }
  }, [id, navigate]);

  // Update image filter when color changes to simulate different product variants
  useEffect(() => {
    if (!product) return;
    
    // Reset if it's the original color
    if (selectedColor === product.color) {
        setImageStyle({ transition: 'filter 0.5s ease' });
        return;
    }

    // Apply simulation filters for other colors
    let filter = '';
    switch(selectedColor) {
        case 'Sage Green': filter = 'sepia(0.3) hue-rotate(60deg) saturate(0.8)'; break;
        case 'Charon Charcoal': filter = 'grayscale(1) brightness(0.6)'; break;
        case 'Terracotta': filter = 'sepia(0.4) saturate(1.6) hue-rotate(-25deg)'; break;
        case 'Sand': filter = 'brightness(1.1) sepia(0.2) saturate(0.5)'; break;
        case 'Rust Clay': filter = 'sepia(0.5) saturate(1.8) hue-rotate(-35deg)'; break;
        case 'Ivory': filter = 'brightness(1.2) saturate(0)'; break;
        case 'Natural': filter = 'sepia(0.3) saturate(0.6)'; break;
        default: filter = 'none';
    }
    setImageStyle({ filter, transition: 'filter 0.5s ease' });
  }, [selectedColor, product]);

  if (!product) return null;

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
        setIsAdding(false);
        navigate('/cart-drawer');
    }, 800);
  };

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const productColors = baseColorOptions.filter(c => 
      c.name === product.color || 
      ['Terracotta', 'Sage Green', 'Sand', 'Charon Charcoal'].includes(c.name)
  ).slice(0, 4);

  return (
    <main className="pt-10 pb-20 px-6 lg:px-12 animate-fadeIn">
       <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm mb-8 font-display scroll-animate fade-in">
            <Link to="/" className="text-text-sub hover:text-primary transition-colors">Home</Link>
            <span className="text-text-sub/40">/</span>
            <Link to={product.category === 'Accessories' ? '/accessories' : '/apparel'} className="text-text-sub hover:text-primary transition-colors">{product.category}</Link>
            <span className="text-text-sub/40">/</span>
            <span className="text-primary font-medium">{product.title}</span>
       </nav>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
           {/* Image Section */}
           <div className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#f0ebe5] shadow-xl group scroll-animate zoom-in">
               <img 
                 src={product.image} 
                 alt={product.title} 
                 style={imageStyle}
                 className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]"
               />
               {product.isNew && (
                  <div className="absolute top-6 left-6 bg-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full z-20">
                      New Arrival
                  </div>
               )}
           </div>

           {/* Details Section */}
           <div className="flex flex-col justify-center lg:pr-10 scroll-animate fade-in delay-200">
               <h1 className="text-4xl lg:text-5xl font-serif text-text-main mb-4 leading-tight">
                   {product.title}
               </h1>
               <div className="flex items-center justify-between mb-8 border-b border-text-main/10 pb-6">
                   <span className="text-2xl font-medium text-text-main">${product.price}</span>
                   <div className="flex items-center gap-1 text-primary">
                       <span className="material-symbols-outlined text-sm">star</span>
                       <span className="material-symbols-outlined text-sm">star</span>
                       <span className="material-symbols-outlined text-sm">star</span>
                       <span className="material-symbols-outlined text-sm">star</span>
                       <span className="material-symbols-outlined text-sm">star_half</span>
                       <span className="text-xs text-text-sub ml-2 underline decoration-text-sub/30 decoration-1 underline-offset-2">(12 Reviews)</span>
                   </div>
               </div>

               <p className="text-text-main/80 leading-relaxed mb-8 font-light text-lg">
                   {product.description || "Crafted with intention and care. This piece embodies the rhythm of nature, featuring sustainable materials and artisanal details designed to last a lifetime."}
               </p>
               
               <div className="space-y-6 mb-10">
                   {/* Color */}
                   <div>
                       <span className="text-xs font-bold uppercase tracking-widest text-text-sub block mb-3">Color: {selectedColor}</span>
                       <div className="flex gap-3">
                           {productColors.map((color) => (
                               <button 
                                key={color.name}
                                onClick={() => setSelectedColor(color.name)}
                                className={`w-8 h-8 rounded-full transition-all ring-offset-2 border border-black/5 ${
                                    selectedColor === color.name 
                                    ? 'ring-2 ring-primary scale-110' 
                                    : 'ring-2 ring-transparent opacity-60 hover:opacity-100 hover:ring-text-main/20 hover:scale-105'
                                }`}
                                style={{ backgroundColor: color.hex }}
                                aria-label={`Select color ${color.name}`}
                               ></button>
                           ))}
                       </div>
                   </div>

                   {/* Size */}
                   {product.category !== 'Accessories' && (
                       <div>
                           <div className="flex justify-between items-center mb-3">
                               <span className="text-xs font-bold uppercase tracking-widest text-text-sub">Size: {selectedSize}</span>
                               <button className="text-xs underline text-text-sub hover:text-primary transition-colors">Size Guide</button>
                           </div>
                           <div className="flex flex-wrap gap-2">
                               {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                   <button 
                                     key={size}
                                     onClick={() => setSelectedSize(size)}
                                     className={`w-12 h-12 rounded-full border transition-all flex items-center justify-center text-sm ${selectedSize === size ? 'border-primary bg-primary text-white font-bold shadow-md shadow-primary/20' : 'border-text-main/20 text-text-sub hover:border-primary hover:text-primary'}`}
                                   >
                                       {size}
                                   </button>
                               ))}
                           </div>
                       </div>
                   )}
               </div>

               <div className="flex gap-4">
                   <button 
                     onClick={handleAddToCart}
                     disabled={isAdding}
                     className="flex-1 py-4 bg-text-main text-white font-bold tracking-widest uppercase rounded-full hover:bg-primary transition-all shadow-lg shadow-text-main/20 hover:shadow-primary/30 flex items-center justify-center gap-2 group"
                   >
                       {isAdding ? 'Adding...' : 'Add to Bag'}
                       {!isAdding && <span className="material-symbols-outlined text-[20px] group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform">shopping_bag</span>}
                   </button>
                   <button className="w-14 h-14 rounded-full border border-text-main/20 flex items-center justify-center text-text-main hover:border-primary hover:text-primary transition-colors hover:bg-primary/5">
                       <span className="material-symbols-outlined">favorite</span>
                   </button>
               </div>
               
               <div className="mt-8 grid grid-cols-2 gap-4 text-xs text-text-sub/80 border-t border-text-main/10 pt-6">
                   <div className="flex items-center gap-2">
                       <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                       Free shipping over $200
                   </div>
                   <div className="flex items-center gap-2">
                       <span className="material-symbols-outlined text-[18px]">eco</span>
                       Sustainably Sourced
                   </div>
                   <div className="flex items-center gap-2">
                       <span className="material-symbols-outlined text-[18px]">cached</span>
                       30-Day Returns
                   </div>
                   <div className="flex items-center gap-2">
                       <span className="material-symbols-outlined text-[18px]">check_circle</span>
                       Secure Checkout
                   </div>
               </div>
           </div>
       </div>

       {/* Related Products */}
       {relatedProducts.length > 0 && (
           <section className="pt-16 border-t border-text-main/10 scroll-animate fade-in">
               <h3 className="font-serif text-3xl text-text-main mb-10">You May Also Like</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                   {relatedProducts.map((p, idx) => (
                       <Link 
                            to={`/product/${p.id}`} 
                            key={p.id} 
                            className="group cursor-pointer scroll-animate fade-in"
                            style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                           <div className="aspect-[3/4] overflow-hidden rounded-xl bg-[#f0ebe5] mb-4 relative">
                               <img src={p.image} alt={p.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"/>
                               {p.isNew && <div className="absolute top-3 left-3 bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm">New</div>}
                           </div>
                           <h4 className="font-serif text-lg text-text-main group-hover:text-primary transition-colors">{p.title}</h4>
                           <span className="text-sm font-medium text-text-sub">${p.price}</span>
                       </Link>
                   ))}
               </div>
           </section>
       )}
    </main>
  );
};

export default ProductDetail;