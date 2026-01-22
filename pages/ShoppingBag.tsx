import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ShoppingBag: React.FC = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Canyon Silk Shirt',
      price: 185.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjigXpglYo4leeMTu45JnJkXx1nU7aJ7aUJaK5Vls2fysIVGtOYNRfMNV8VXiQ1ihTdUwvRZ5lDgtW8FvbPBX_vVJdvj7bbHDa7EZ5luhhWn04fvDCuFcGcyLUxT0fti3ZyV5hMgMiDJ6y-0b8iShRwhJLgaxudU9NJCTrxfIML9RAFHhh4993OmrPc_GTpk_UKfiRw_MfNTepMM3BhuURPqBPoEyY83NR6_AOCBLi_5BJ9WlBUBpLPyDwcb6GET8T2R6YZnaPSE4',
      variant: 'Terracotta / Medium',
      shipping: 'Ships in 2-3 business days',
      qty: 1
    },
    {
      id: 2,
      title: 'Woven Artisan Tote',
      price: 125.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWFa0qBMX5heg1scwaALKhXqJ9FmK7j9yB9L8roxwD1GjWuT73lWEcUAN5wTMqQzFseNnZ0NW4pjBr5l4hOHvSocpdBLEPC_RgCQM_kstUZq1UrBOlTgcVLqKkaAW6XMUlDok1ETFoUQPZfSGbBGLUQvsG-x-yQ5vZER9fGRDYfZv7PAFd0hwP7pn4IY469vkSnY5nwM4mOHHmvIOPlwYg4EOMDsrzfAPb0CVGrIYC6IWDwq2VpJxqIA9CkgcX8m3FioKGp4vlHuA',
      variant: 'Natural Straw / One Size',
      shipping: 'Handmade: Allow 5 days processing',
      qty: 1
    }
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return { ...item, qty: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <main className="flex-grow relative px-6 lg:px-12 py-10 lg:py-16">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-sage/10 mix-blend-multiply filter blur-3xl rounded-full opacity-50 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 mix-blend-multiply filter blur-3xl rounded-full opacity-60 translate-y-1/4"></div>
            <svg className="absolute top-20 -left-16 w-64 h-64 opacity-10 text-text-main rotate-180" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 200 Q120 150 100 50" stroke="currentColor" strokeWidth="1.5"></path>
                <path d="M100 120 Q140 100 160 80" stroke="currentColor" strokeWidth="1"></path>
                <circle cx="100" cy="50" fill="currentColor" r="3"></circle>
            </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-12 flex items-baseline gap-4 border-b border-text-main/10 pb-6">
                <h1 className="text-4xl lg:text-5xl font-serif font-light text-text-main">Shopping Bag</h1>
                <span className="text-xl text-text-sub font-light">({totalItems} items)</span>
            </div>

            {items.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Cart Items */}
                    <div className="lg:col-span-8 flex flex-col gap-0">
                        {items.map((item, index) => (
                            <div key={item.id} className="group py-8 first:pt-0 border-b border-text-main/10 relative animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
                                    <div className="w-full sm:w-40 lg:w-48 aspect-[3/4] bg-[#f0ece6] rounded-xl overflow-hidden relative shadow-sm">
                                        <img alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" src={item.image}/>
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-2xl font-serif text-text-main">{item.title}</h3>
                                                <span className="text-lg font-medium text-text-main">${item.price.toFixed(2)}</span>
                                            </div>
                                            <p className="text-text-sub text-sm tracking-wide">{item.variant}</p>
                                            <p className="text-text-sub/80 text-xs mt-1">{item.shipping}</p>
                                        </div>
                                        <div className="flex justify-between items-center mt-6 sm:mt-0">
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm text-text-sub mr-2">Qty</span>
                                                <div className="flex items-center border border-text-main/20 rounded-full h-10 px-1">
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className={`w-8 h-full flex items-center justify-center text-text-sub transition-colors hover:bg-black/5 rounded-full ${item.qty <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary'}`}
                                                        disabled={item.qty <= 1}
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">remove</span>
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-medium text-text-main">{item.qty}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-8 h-full flex items-center justify-center text-text-sub hover:text-primary transition-colors hover:bg-black/5 rounded-full"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">add</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => removeItem(item.id)}
                                                className="font-serif italic text-text-sub hover:text-primary transition-colors text-lg decoration-1 underline-offset-4 hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="pt-8">
                            <Link to="/apparel" className="inline-flex items-center gap-2 text-primary font-medium hover:text-text-main transition-colors group">
                                <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                                Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-4 mt-8 lg:mt-0">
                        <div className="bg-[#f4efe9] rounded-[2rem] p-8 lg:p-10 sticky top-28 shadow-xl shadow-[#6B3E2D]/5 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                            <h2 className="font-serif text-2xl mb-8 text-text-main">Order Summary</h2>
                            <div className="space-y-4 text-text-main/80 pb-6 border-b border-text-main/10">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Shipping</span>
                                    <span className="text-accent-sage font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Estimated Tax</span>
                                    <span className="font-medium">$0.00</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-6">
                                <span className="text-lg font-bold text-text-main">Total</span>
                                <span className="text-xl font-serif font-bold text-text-main">${subtotal.toFixed(2)}</span>
                            </div>
                            <button className="w-full py-4 bg-primary text-white text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#964a3a] transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-0.5 mb-4">
                                Checkout
                            </button>
                            <p className="text-center text-xs text-text-sub flex items-center justify-center gap-1 opacity-70">
                                <span className="material-symbols-outlined text-[14px]">lock</span>
                                Secure Checkout
                            </p>
                            
                            <div className="mt-8 pt-6 border-t border-text-main/10">
                                 <details className="group cursor-pointer">
                                    <summary className="flex items-center justify-between text-sm font-medium text-text-main list-none">
                                        Do you have a promo code?
                                        <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                                    </summary>
                                    <div className="mt-4 flex gap-2">
                                        <input type="text" placeholder="Enter code" className="w-full bg-white border border-text-main/20 rounded-lg px-4 py-2 text-sm focus:ring-primary focus:border-primary" />
                                        <button className="px-4 py-2 bg-text-main text-white text-xs font-bold uppercase rounded-lg">Apply</button>
                                    </div>
                                 </details>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-fadeIn">
                     <span className="material-symbols-outlined text-6xl text-text-main/20 mb-4">shopping_bag</span>
                     <h3 className="font-serif text-2xl text-text-main mb-2">Your shopping bag is empty</h3>
                     <p className="text-text-sub mb-8">Take a look at our new arrivals to find something you love.</p>
                     <Link to="/new-arrivals" className="px-8 py-3 bg-text-main text-white font-bold tracking-widest uppercase rounded-full hover:bg-primary transition-colors">
                        Shop New Arrivals
                     </Link>
                </div>
            )}
        </div>
    </main>
  );
};

export default ShoppingBag;