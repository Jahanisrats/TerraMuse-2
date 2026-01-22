import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVideoOpen(false);
    };
    if (isVideoOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isVideoOpen]);

  return (
    <div className="flex-grow flex items-center justify-center relative px-6 lg:px-12 py-12 lg:py-0 min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Abstract Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-accent-sage/20 mix-blend-multiply filter blur-3xl rounded-full animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-accent-teal/20 mix-blend-multiply filter blur-3xl rounded-full animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] bg-primary/10 mix-blend-multiply filter blur-3xl rounded-full animate-pulse" style={{ animationDuration: '12s' }}></div>
        
        {/* SVG Line Art */}
        <svg className="absolute -right-20 top-1/4 h-[600px] w-auto opacity-10 text-text-main scroll-animate fade-in delay-500" fill="none" viewBox="0 0 200 400" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 400 C100 300 150 200 180 100 M100 400 C100 300 50 200 20 100" stroke="currentColor" strokeWidth="2"></path>
            <path d="M100 300 Q130 250 160 260 M100 250 Q130 200 150 210 M100 350 Q70 300 40 310" stroke="currentColor" strokeWidth="1.5"></path>
        </svg>
      </div>

      <div className="w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Content */}
        <div className="lg:col-span-5 flex flex-col gap-8 order-2 lg:order-1 text-center lg:text-left">
          <div className="space-y-4">
            <span className="inline-block text-primary font-medium tracking-[0.2em] text-xs uppercase scroll-animate fade-in">Spring Collection '24</span>
            <h1 className="text-text-main text-5xl sm:text-6xl xl:text-7xl font-serif font-light leading-[1.1] text-shadow-soft scroll-animate delay-100">
              Woven from <br/>
              <span className="italic font-normal text-primary">the Earth</span>
            </h1>
            <p className="text-text-main/80 text-lg leading-relaxed max-w-md mx-auto lg:mx-0 font-light scroll-animate delay-200">
              Curated fashion for the modern muse. Sustainable fabrics met with artistic soul, designed to move with you through every season of life.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center pt-4 scroll-animate delay-300">
            <Link to="/apparel" className="group relative px-8 py-4 bg-primary text-white text-base font-bold tracking-wide rounded-[30%_70%_70%_30%/30%_30%_70%_70%] hover:rounded-[50%_50%_30%_70%/50%_50%_70%_30%] transition-all duration-500 overflow-hidden shadow-lg shadow-primary/30">
              <span className="relative z-10 flex items-center gap-2">
                Shop Collection 
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            </Link>
            <button 
              onClick={() => setIsVideoOpen(true)}
              className="flex items-center gap-3 px-6 py-4 text-text-main font-medium hover:text-primary transition-colors group"
            >
              <span className="flex items-center justify-center size-10 rounded-full border border-current group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-[20px]">play_arrow</span>
              </span>
              <span>Watch the Film</span>
            </button>
          </div>

          <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 scroll-animate fade-in delay-500">
             <div className="h-6 w-20 bg-contain bg-no-repeat bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAp3MSEcOTy8D4eG1d19McwAkQDd6vgjC3M9MKwpJ6NV2Bxi7ganzO5gQw-57J5lJc2XLY1bBvoPMEs1KqJNVQL0Zu5KmivCCX-UzEMUUDQaYNp2tNg75w01oJRmbe0L8-ANBdGjp0o3ae3Mqr3eMw39q1mYYdXKJfZyagfMnIIkCNilB9L9PRqXJ-ucmTst2U7wWW16xnkA2aJUCCn10kpjXUuydYxLT4GU1NpqVmcn4c0DsMgFhf2LAzMUZx7DlF8nl41OEVjKS0')"}}></div>
             <div className="h-6 w-20 bg-contain bg-no-repeat bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAK4juLgWisacFY5p9qbzda9iW6vrwCNG-jVqEAc1D-0nppWu-8EI_AVV7EZdmKjQJrSYfmNPTG1eVIxaUBRVY0AGcCPwd_v3Iq865kfJDdjG7vDosfZLfBx4pW2pL6SIp1SMtZl-irB3pbxsRr5dJropxcmyLb_HZx_EKkL-NGiRjZi5TgiIO-4eXCu5KSmg9bkon5sQ4Yg0IFRHszzBuOWLHMIezH6CBnBuyDUXm-rty4h51XdPjhwjTE7UknEty6kPcgWwOmA48')"}}></div>
             <div className="h-6 w-20 bg-contain bg-no-repeat bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB4fli8gmSUoWWICUf0wt45r8xCbWtgspDU6vrmQuvq3OOieEy1-MUlrB_NbLkv3rirH9PVnceja4lZMVPsEhXJB4qeoGZgra-pYhWhoze5gRKkqAnhm3_XrTL3thFNJvYsGoJ5H52c7R63c1R4xZO5JFs4uX-7Csw50oDgWCHQ-CfeoS2vsNotpll6DvMbj8es4WgnM1-w6kdxDIvPPVqF7iRZNZPmm6m7EHNkN3ox9KBmvQcXocwrjeck-ISNtef2WVQbzuYG-ig')"}}></div>
          </div>
        </div>

        {/* Right Content - Image */}
        <div className="lg:col-span-7 relative order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="absolute top-10 right-10 w-[80%] h-[90%] border border-primary/20 rounded-t-full rounded-b-[200px] transform rotate-3 z-0 scroll-animate zoom-in delay-200"></div>
          
          <div className="relative w-full max-w-[600px] aspect-[3/4] rounded-t-full rounded-b-[10rem] overflow-hidden shadow-2xl shadow-[#6B3E2D]/20 z-10 group scroll-animate zoom-in delay-300">
             <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
             <img 
               alt="Artistic photograph of a model in earthy bohemian tones wearing linen clothing" 
               className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700 ease-out" 
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjigXpglYo4leeMTu45JnJkXx1nU7aJ7aUJaK5Vls2fysIVGtOYNRfMNV8VXiQ1ihTdUwvRZ5lDgtW8FvbPBX_vVJdvj7bbHDa7EZ5luhhWn04fvDCuFcGcyLUxT0fti3ZyV5hMgMiDJ6y-0b8iShRwhJLgaxudU9NJCTrxfIML9RAFHhh4993OmrPc_GTpk_UKfiRw_MfNTepMM3BhuURPqBPoEyY83NR6_AOCBLi_5BJ9WlBUBpLPyDwcb6GET8T2R6YZnaPSE4"
             />
             
             {/* Spinning Badge */}
             <div className="absolute top-12 -left-6 md:-left-10 z-20 scroll-animate fade-in delay-500">
               <div className="relative size-24 md:size-32 bg-background-light rounded-full flex items-center justify-center shadow-lg animate-spin-slow">
                 <svg className="w-full h-full absolute inset-0 text-text-main" height="100" viewBox="0 0 100 100" width="100">
                   <defs>
                     <path d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" id="circle"></path>
                   </defs>
                   <text fontSize="11" fontWeight="bold" letterSpacing="2">
                     <textPath fill="currentColor" xlinkHref="#circle">
                       NEW ARRIVAL • NEW ARRIVAL •
                     </textPath>
                   </text>
                 </svg>
                 <div className="size-16 md:size-20 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-inner">
                   NOW
                 </div>
               </div>
             </div>

             {/* Hover Card */}
             <div className="absolute bottom-8 right-8 z-20 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
               <p className="text-xs font-bold uppercase tracking-wider text-text-main mb-1">Featured Look</p>
               <p className="text-sm text-text-sub">Linen Tunic in Clay</p>
               <p className="text-sm font-serif italic text-primary mt-1">$128.00</p>
             </div>
          </div>
        </div>
      </div>

      {/* Video Modal Overlay */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fadeIn p-4 md:p-10">
          {/* Close Area (Click outside) */}
          <div className="absolute inset-0" onClick={() => setIsVideoOpen(false)}></div>
          
          <button 
            onClick={() => setIsVideoOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110] p-2"
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>
          
          <div className="w-full max-w-6xl aspect-video rounded-xl overflow-hidden shadow-2xl relative z-[105] bg-black">
             {/* Removed 'autoplay=1' sound and added 'mute=1' to avoid browser blocking unmuted autoplay. 
                 Using 'modestbranding' and 'rel=0' for cleaner look. */}
             <iframe 
               width="100%" 
               height="100%" 
               src="https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&showinfo=0" 
               title="TerraMuse Brand Film" 
               className="border-none w-full h-full"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
             ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;