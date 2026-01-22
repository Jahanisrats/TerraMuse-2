import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Home from './Home'; // We render home in background to simulate overlay

const CartDrawer: React.FC = () => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [isRemoved, setIsRemoved] = useState(false);
    const price = 128.00;

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleRemove = () => {
        setIsRemoved(true);
    };

    const subtotal = (price * quantity).toFixed(2);

    return (
        <div className="relative min-h-screen w-full">
            {/* Background simulates Home Screen for overlay effect */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50 overflow-hidden">
                <Home /> 
            </div>
            
            {/* Overlay */}
            <div aria-modal="true" className="fixed inset-0 z-[60] flex justify-end" role="dialog">
                <div className="absolute inset-0 bg-background-dark/30 backdrop-blur-[2px] transition-opacity" onClick={() => navigate(-1)}></div>
                <aside className="relative w-full max-w-[500px] h-full bg-background-light shadow-2xl flex flex-col transform transition-transform border-l border-[#eaddcf] bg-paper-texture animate-fadeIn">
                    <div className="px-8 py-6 border-b border-text-main/10 flex items-center justify-between bg-white/40 backdrop-blur-md sticky top-0 z-10">
                        <h2 className="font-serif text-2xl font-light text-text-main">Your Cart <span className="text-base text-text-sub font-display ml-2">({isRemoved ? 0 : quantity})</span></h2>
                        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-black/5 transition-colors text-text-main">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    
                    {!isRemoved ? (
                        <>
                            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10">
                                <div className="space-y-6">
                                    <div className="flex gap-5 md:gap-6 py-2 group">
                                        <div className="w-24 h-32 md:w-28 md:h-36 flex-shrink-0 relative overflow-hidden rounded-t-[3rem] rounded-b-lg shadow-md border border-white/50">
                                            <img alt="Desert Moon Tunic" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjigXpglYo4leeMTu45JnJkXx1nU7aJ7aUJaK5Vls2fysIVGtOYNRfMNV8VXiQ1ihTdUwvRZ5lDgtW8FvbPBX_vVJdvj7bbHDa7EZ5luhhWn04fvDCuFcGcyLUxT0fti3ZyV5hMgMiDJ6y-0b8iShRwhJLgaxudU9NJCTrxfIML9RAFHhh4993OmrPc_GTpk_UKfiRw_MfNTepMM3BhuURPqBPoEyY83NR6_AOCBLi_5BJ9WlBUBpLPyDwcb6GET8T2R6YZnaPSE4"/>
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start gap-4">
                                                    <h3 className="font-serif text-lg md:text-xl text-text-main leading-snug">Desert Moon Tunic</h3>
                                                    <span className="font-medium text-text-main font-serif italic">${price.toFixed(2)}</span>
                                                </div>
                                                <p className="text-sm text-text-sub mt-1 font-light tracking-wide">Clay / Medium</p>
                                            </div>
                                            <div className="flex items-end justify-between mt-4">
                                                <div className="flex items-center border border-text-main/20 rounded-full px-1 py-1 gap-1 bg-white/40">
                                                    <button 
                                                        onClick={handleDecrement}
                                                        disabled={quantity <= 1}
                                                        className={`size-7 flex items-center justify-center text-text-main transition-colors rounded-full hover:bg-white/50 ${quantity <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary'}`}
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">remove</span>
                                                    </button>
                                                    <span className="w-6 text-center text-sm font-medium">{quantity}</span>
                                                    <button 
                                                        onClick={handleIncrement}
                                                        className="size-7 flex items-center justify-center text-text-main hover:text-primary transition-colors rounded-full hover:bg-white/50"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">add</span>
                                                    </button>
                                                </div>
                                                <button 
                                                    onClick={handleRemove}
                                                    className="text-xs uppercase tracking-widest text-text-sub/70 hover:text-primary border-b border-transparent hover:border-primary transition-colors pb-0.5"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recommendations */}
                                <div className="pt-8 border-t border-text-main/10">
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="h-px flex-1 bg-text-main/10"></span>
                                        <h4 className="font-serif text-lg text-text-main italic px-2">You May Also Like</h4>
                                        <span className="h-px flex-1 bg-text-main/10"></span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/40 transition-colors group cursor-pointer border border-transparent hover:border-text-main/5">
                                            <div className="size-16 flex-shrink-0 overflow-hidden rounded-[30%_70%_70%_30%/30%_30%_70%_70%] shadow-sm bg-accent-sage/10 relative">
                                                <div className="absolute inset-0 bg-accent-sage/20 mix-blend-overlay"></div>
                                                <div className="w-full h-full flex items-center justify-center text-accent-sage">
                                                    <span className="material-symbols-outlined text-[24px]">wb_twilight</span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h5 className="font-medium text-text-main group-hover:text-primary transition-colors font-display text-sm">Lunar Phase Pendant</h5>
                                                <p className="text-xs text-text-sub font-serif italic mt-0.5">$45.00</p>
                                            </div>
                                            <button className="size-9 rounded-full border border-text-main/20 flex items-center justify-center text-text-main hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm hover:shadow-md">
                                                <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 md:p-8 bg-white/60 backdrop-blur-md border-t border-text-main/10 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)]">
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center text-xl font-serif text-text-main">
                                        <span>Subtotal</span>
                                        <span>${subtotal}</span>
                                    </div>
                                    <p className="text-xs text-text-sub flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                                        Shipping & taxes calculated at checkout
                                    </p>
                                </div>
                                <Link to="/cart" className="w-full py-4 bg-primary text-white text-base font-bold tracking-wide rounded-[30%_70%_70%_30%/30%_30%_70%_70%] hover:rounded-[50%_50%_30%_70%/50%_50%_70%_30%] transition-all duration-500 shadow-lg shadow-primary/20 hover:shadow-primary/40 relative overflow-hidden group flex items-center justify-center">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Proceed to Checkout
                                        <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </span>
                                    <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                                </Link>
                                <div className="mt-4 text-center">
                                    <button onClick={() => navigate(-1)} className="text-xs text-text-main/60 hover:text-primary underline decoration-transparent hover:decoration-primary transition-all">Continue Shopping</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
                             <span className="material-symbols-outlined text-6xl text-text-main/20 mb-4">shopping_bag</span>
                             <h3 className="font-serif text-2xl text-text-main mb-2">Your cart is empty</h3>
                             <p className="text-text-sub mb-8">Looks like you haven't added anything to your bag yet.</p>
                             <button onClick={() => navigate('/new-arrivals')} className="px-8 py-3 bg-text-main text-white font-bold tracking-widest uppercase rounded-full hover:bg-primary transition-colors">
                                Start Shopping
                             </button>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
};

export default CartDrawer;