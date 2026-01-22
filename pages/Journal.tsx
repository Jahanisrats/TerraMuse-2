import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Journal: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setEmail('');
    }, 1500);
  };

  return (
    <main className="w-full relative z-10 pb-24">
        {/* Header */}
        <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-16 text-center px-6 flex flex-col items-center justify-center animate-fadeIn">
            <div className="w-16 h-16 text-primary mb-6 opacity-90 transform -rotate-12 scroll-animate fade-in">
                <svg fill="currentColor" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 85 C50 85 48 60 30 40 C20 28 10 30 5 40 C0 30 5 15 25 10 C40 5 48 30 50 40 C52 30 60 5 75 10 C95 15 100 30 95 40 C90 30 80 28 70 40 C52 60 50 85 50 85 Z" opacity="0.6"></path>
                    <path d="M50 95 L50 40" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"></path>
                </svg>
            </div>
            <span className="font-display uppercase tracking-[0.3em] text-xs font-semibold text-text-sub mb-3 scroll-animate fade-in delay-100">Stories & Musings</span>
            <h1 className="text-6xl md:text-8xl font-serif font-medium text-text-main tracking-tight scroll-animate fade-in delay-200">
                The Journal
            </h1>
        </section>

        {/* Featured Article */}
        <section className="px-4 md:px-6 lg:px-12 max-w-[1400px] mx-auto mb-24 relative">
            <div className="group relative w-full scroll-animate zoom-in">
                <Link to="/journal/featured-story" className="block relative w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-[2rem] shadow-xl shadow-text-main/5">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
                    <img alt="Model in a natural setting for a cinematic slow living article" className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjigXpglYo4leeMTu45JnJkXx1nU7aJ7aUJaK5Vls2fysIVGtOYNRfMNV8VXiQ1ihTdUwvRZ5lDgtW8FvbPBX_vVJdvj7bbHDa7EZ5luhhWn04fvDCuFcGcyLUxT0fti3ZyV5hMgMiDJ6y-0b8iShRwhJLgaxudU9NJCTrxfIML9RAFHhh4993OmrPc_GTpk_UKfiRw_MfNTepMM3BhuURPqBPoEyY83NR6_AOCBLi_5BJ9WlBUBpLPyDwcb6GET8T2R6YZnaPSE4"/>
                </Link>
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 lg:p-16 z-20 flex flex-col items-start justify-end pointer-events-none">
                    <div className="bg-background-light/95 backdrop-blur-md p-6 md:p-10 rounded-tr-[3rem] rounded-bl-[1.5rem] rounded-br-lg rounded-tl-lg shadow-lg border border-white/20 max-w-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 pointer-events-auto">
                        <div className="flex items-center gap-3 mb-3 text-xs font-bold tracking-widest uppercase text-accent-sage">
                            <span>Oct 12, 2023</span>
                            <span className="w-1 h-1 bg-current rounded-full"></span>
                            <span>Editorial</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.1] text-text-main mb-4">
                            <Link to="/journal/featured-story" className="hover:text-primary transition-colors">
                                The Art of <br/><span className="italic font-light text-primary">Slow Living</span>
                            </Link>
                        </h2>
                        <p className="text-text-main/80 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3 mb-6 font-light">
                            In a world that demands speed, we choose rhythm. Discover how reconnecting with nature's pace can transform your wardrobe and your spirit.
                        </p>
                        <Link to="/journal/featured-story" className="inline-flex items-center gap-2 font-script text-2xl text-primary hover:text-text-main transition-colors group-hover:translate-x-2 duration-300 relative z-30">
                            Read Full Story <span className="material-symbols-outlined text-[20px] pt-1">arrow_right_alt</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        {/* Article Grid */}
        <section className="px-6 lg:px-12 max-w-[1280px] mx-auto relative">
            <div className="absolute top-[20%] left-[-5%] w-[300px] h-[300px] bg-accent-teal/10 organic-blob-1 mix-blend-multiply blur-3xl z-0 pointer-events-none"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-primary/5 organic-blob-2 mix-blend-multiply blur-3xl z-0 pointer-events-none"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start relative z-10">
                <article className="flex flex-col gap-6 group scroll-animate fade-in">
                    <Link to="/journal/dyeing-with-earth" className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-[#f0ebe5] block cursor-pointer">
                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10"></div>
                        <img alt="Natural pigments and dyeing materials" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeIod0vV17vUMpC7TkI79sNAxa6yB3-WWXfI-E3vWaFqHqVzduEbM2-p3OIp5ZaRs3p7kZbINwKpbAz8GF6HjF9catpYnPmJTzqhT7ofkDUnYPfhhur8CzAxasfyJyiBVQZj2qp3CiTm_JlrvQAGCzj9wDE_3YS2FcaMHClMAis3AW3vfxrhSkdI3EQ96iEkvdSFnV137Fh33KYSdwjppQv-t_qdKh-hdlZb_iyKvNF0WPmDMqmMueVGr0edkXoi2n-go9bUg7SOM"/>
                        <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-sm z-20">
                            Sep 28
                        </div>
                    </Link>
                    <div className="space-y-3 px-2">
                        <Link to="/journal/dyeing-with-earth" className="block cursor-pointer">
                            <h3 className="text-2xl md:text-3xl font-serif leading-tight text-text-main group-hover:text-primary transition-colors">
                                Dyeing with Earth: <br/>
                                <span className="italic text-text-sub font-light">A Guide to Natural Pigments</span>
                            </h3>
                        </Link>
                        <p className="text-text-main/70 text-sm leading-relaxed border-l-2 border-primary/30 pl-4 italic">
                            "From onion skins to avocado pits, discover the vibrant colors hiding in your kitchen compost and local flora."
                        </p>
                        <div className="pt-2">
                            <Link to="/journal/dyeing-with-earth" className="font-script text-xl text-accent-sage group-hover:text-primary transition-colors flex items-center gap-2 inline-flex">
                                Read More
                            </Link>
                        </div>
                    </div>
                </article>

                <article className="flex flex-col gap-6 group md:mt-32 scroll-animate fade-in delay-200">
                    <Link to="/journal/sustainable-journey" className="relative w-full aspect-[4/5] overflow-hidden rounded-tr-[5rem] rounded-bl-[3rem] rounded-tl-lg rounded-br-lg bg-[#f0ebe5] block cursor-pointer">
                        <div className="absolute inset-0 bg-accent-sage/10 group-hover:bg-transparent transition-colors z-10"></div>
                        <img alt="Artisan working on sustainable fabric" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvug5DmWwLVYz3uIwMFPrYKSjKaN3iZUuxn9rIcoEX1vtZY_YUxyUtESLkQJ4peYEcK0HAUZ7F906u6-HTvEVkPhfNXjvQPeQkhAMJzkCVBiMj7CdjBOPck5wE6djRaQNv3CVzROifcu_VuGaFZ9IMH6ziH5e9MLvL88pxVfutBuwOPYEdFhv5iFTcNqaFu8LQXOUMJCkiGBxQGOMNlUHPoLhQC_qbr2JeE-F4vARZ7oOhB5p-rFSO6OVIwvpXAdQkG2vXw_0mOsA"/>
                        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-sm z-20">
                            Sep 15
                        </div>
                    </Link>
                    <div className="space-y-3 px-2">
                        <Link to="/journal/sustainable-journey" className="block cursor-pointer">
                            <h3 className="text-2xl md:text-3xl font-serif leading-tight text-text-main group-hover:text-primary transition-colors">
                                Behind the Seams: <br/>
                                <span className="italic text-text-sub font-light">Our Sustainable Journey</span>
                            </h3>
                        </Link>
                        <p className="text-text-main/70 text-sm leading-relaxed border-l-2 border-accent-sage/30 pl-4 italic">
                            "Trace the thread back to its source. Meeting the artisans who weave magic, history, and soul into every garment."
                        </p>
                        <div className="pt-2">
                            <Link to="/journal/sustainable-journey" className="font-script text-xl text-accent-sage group-hover:text-primary transition-colors flex items-center gap-2 inline-flex">
                                Read More
                            </Link>
                        </div>
                    </div>
                </article>
            </div>

            {/* Newsletter Minimal */}
             <section className="relative w-full py-24 lg:py-40 mt-20 border-t border-text-main/5 scroll-animate fade-in">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-10">
                        <div className="space-y-4">
                            <span className="material-symbols-outlined text-4xl text-primary animate-pulse">filter_vintage</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-medium text-text-main italic">Join the Tribe</h2>
                            <p className="text-text-main/70 text-base md:text-lg max-w-md mx-auto leading-relaxed">
                                Receive weekly musings, first access to artisanal drops, and exclusive gallery invites directly to your inbox.
                            </p>
                        </div>
                        <form onSubmit={handleSignup} className="w-full max-w-md flex flex-col gap-8 items-center mt-4 group">
                            <div className="relative w-full">
                                <input 
                                    className="w-full bg-transparent border-0 border-b border-primary/40 px-0 py-4 text-center text-text-main text-lg placeholder-text-main/30 focus:ring-0 focus:border-primary transition-colors duration-300 peer disabled:opacity-50" 
                                    placeholder="Enter your email address" 
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isSubmitting || submitted}
                                    required
                                />
                                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-500 ease-out peer-focus:w-full"></div>
                            </div>
                            
                            {submitted ? (
                                <div className="animate-fadeIn py-4 px-8 rounded-full bg-accent-sage/10 text-accent-sage font-serif italic text-lg border border-accent-sage/20">
                                    Thank you for joining our tribe.
                                </div>
                            ) : (
                                <button 
                                    className="relative overflow-hidden rounded-full bg-accent-sage text-white px-10 py-3.5 font-bold tracking-wider text-sm hover:bg-primary transition-colors duration-300 shadow-md hover:shadow-lg shadow-accent-sage/20 disabled:opacity-70 disabled:cursor-wait" 
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {isSubmitting ? 'SIGNING UP...' : 'SIGN UP'}
                                        {!isSubmitting && <span className="material-symbols-outlined text-sm">mail</span>}
                                    </span>
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </section>
    </main>
  );
};

export default Journal;