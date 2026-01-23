import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { allProducts } from '../data';
import { Product } from '../types';

interface Review {
    id: number;
    author: string;
    location: string;
    date: string;
    rating: number;
    title: string;
    content: string;
    verified: boolean;
}

const MOCK_REVIEWS: Review[] = [
    {
        id: 1,
        author: "Sarah Jenkins",
        location: "Portland, OR",
        date: "October 14, 2023",
        rating: 5,
        title: "Absolutely beautiful",
        content: "The fabric is even softer than I imagined. It drapes perfectly and feels so breathable. I've already received so many compliments! Definitely a staple piece for my wardrobe.",
        verified: true
    },
    {
        id: 2,
        author: "Michelle K.",
        location: "Austin, TX",
        date: "September 28, 2023",
        rating: 5,
        title: "Worth every penny",
        content: "I appreciate the sustainable aspect of this brand. You can really feel the quality in the craftsmanship. The color is exactly as pictured.",
        verified: true
    },
    {
        id: 3,
        author: "Elena R.",
        location: "Santa Fe, NM",
        date: "August 5, 2023",
        rating: 4,
        title: "Lovely color",
        content: "The color is slightly deeper than it appeared on my screen, but it's actually more versatile this way. Very happy with my purchase, though I wish shipping was a bit faster.",
        verified: true
    }
];

const StarRating: React.FC<{ rating: number; size?: string; interactive?: boolean; onRate?: (r: number) => void }> = ({ rating, size = "text-base", interactive = false, onRate }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className={`flex items-center gap-0.5 text-primary ${size}`} onMouseLeave={() => interactive && setHoverRating(0)}>
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => interactive && onRate && onRate(star)}
                    onMouseEnter={() => interactive && setHoverRating(star)}
                    className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
                    disabled={!interactive}
                >
                    <span 
                        className="material-symbols-outlined block" 
                        style={{ 
                            fontVariationSettings: `'FILL' ${star <= (hoverRating || rating) ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24` 
                        }}
                    >
                        star
                    </span>
                </button>
            ))}
        </div>
    );
};

const ReviewsSection: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
    const [isWriting, setIsWriting] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, title: '', content: '', author: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const review: Review = {
            id: reviews.length + 1,
            author: newReview.author || "Anonymous",
            location: "Unknown",
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            rating: newReview.rating,
            title: newReview.title,
            content: newReview.content,
            verified: false
        };
        setReviews([review, ...reviews]);
        setIsWriting(false);
        setNewReview({ rating: 5, title: '', content: '', author: '' });
    };

    const average = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

    return (
        <section id="reviews" className="mb-24 pt-16 border-t border-text-main/10 scroll-animate fade-in">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h2 className="font-serif text-3xl text-text-main mb-4">Customer Reviews</h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-serif text-text-main">{average}</span>
                            <span className="text-text-sub font-light">out of 5</span>
                        </div>
                        <div className="h-8 w-px bg-text-main/20"></div>
                        <div className="flex flex-col justify-center">
                            <StarRating rating={Math.round(parseFloat(average))} />
                            <span className="text-sm text-text-sub mt-1">{reviews.length} Reviews</span>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={() => setIsWriting(!isWriting)}
                    className="px-8 py-3 bg-white border border-text-main/20 text-text-main font-bold uppercase tracking-widest text-sm rounded-full hover:bg-text-main hover:text-white transition-all shadow-sm hover:shadow-md"
                >
                    {isWriting ? 'Cancel Review' : 'Write a Review'}
                </button>
            </div>

            {/* Write Review Form */}
            {isWriting && (
                <div className="bg-[#f8f6f3] p-8 rounded-2xl mb-12 animate-fadeIn border border-text-main/5">
                    <h3 className="font-serif text-xl mb-6 text-text-main">Share your experience</h3>
                    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-text-sub mb-2">Rating</label>
                            <StarRating 
                                rating={newReview.rating} 
                                interactive={true} 
                                onRate={(r) => setNewReview({...newReview, rating: r})} 
                                size="text-2xl"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-text-sub mb-2">Name</label>
                                <input 
                                    required
                                    className="w-full bg-white border border-text-main/10 rounded-lg px-4 py-3 text-text-main focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                                    placeholder="Your name"
                                    value={newReview.author}
                                    onChange={e => setNewReview({...newReview, author: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-text-sub mb-2">Review Title</label>
                                <input 
                                    required
                                    className="w-full bg-white border border-text-main/10 rounded-lg px-4 py-3 text-text-main focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                                    placeholder="Summary of your experience"
                                    value={newReview.title}
                                    onChange={e => setNewReview({...newReview, title: e.target.value})}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-text-sub mb-2">Review</label>
                            <textarea 
                                required
                                rows={4}
                                className="w-full bg-white border border-text-main/10 rounded-lg px-4 py-3 text-text-main focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-none"
                                placeholder="Tell us what you liked or didn't like..."
                                value={newReview.content}
                                onChange={e => setNewReview({...newReview, content: e.target.value})}
                            />
                        </div>
                        <button type="submit" className="px-8 py-3 bg-primary text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-[#d65a2e] transition-colors shadow-lg shadow-primary/20">
                            Submit Review
                        </button>
                    </form>
                </div>
            )}

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map((review) => (
                    <div key={review.id} className="p-8 bg-white rounded-2xl border border-text-main/5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-accent-sage/20 text-accent-sage flex items-center justify-center font-serif font-bold text-lg">
                                    {review.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-text-main text-sm">{review.author}</h4>
                                        {review.verified && (
                                            <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                                <span className="material-symbols-outlined text-[10px]">check</span> Verified
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-text-sub">{review.location}</p>
                                </div>
                            </div>
                            <span className="text-xs text-text-sub/60">{review.date}</span>
                        </div>
                        <div className="mb-3">
                            <StarRating rating={review.rating} />
                        </div>
                        <h5 className="font-serif text-lg text-text-main mb-2">{review.title}</h5>
                        <p className="text-text-main/70 text-sm leading-relaxed">{review.content}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

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
                        <a href="#reviews" className="flex items-center gap-1 group">
                           <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                           <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                           <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                           <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                           <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                           <span className="text-xs text-text-sub ml-2 underline decoration-text-sub/30 decoration-1 underline-offset-2 group-hover:text-primary transition-colors">(3 Reviews)</span>
                       </a>
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

       {/* Reviews Section */}
       <ReviewsSection />

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