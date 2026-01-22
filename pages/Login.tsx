import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="flex-grow flex items-center justify-center relative px-6 py-20 min-h-[calc(100vh-200px)]">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-sage/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl shadow-[#6B3E2D]/5 relative z-10 border border-white animate-fadeIn">
            <div className="text-center mb-10">
                <h1 className="font-serif text-3xl md:text-4xl text-text-main mb-3">{isLogin ? 'Welcome Back' : 'Join the Collective'}</h1>
                <p className="text-text-sub text-sm">
                    {isLogin ? 'Sign in to access your curated collection.' : 'Create an account to track orders and save your favorites.'}
                </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {!isLogin && (
                    <div className="space-y-2 animate-fadeIn">
                        <label className="text-xs font-bold uppercase tracking-widest text-text-main" htmlFor="name">Full Name</label>
                        <input className="w-full bg-background-light border border-text-main/10 rounded-lg px-4 py-3 text-text-main focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" id="name" type="text" placeholder="Jane Doe" />
                    </div>
                )}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-main" htmlFor="email">Email Address</label>
                    <input className="w-full bg-background-light border border-text-main/10 rounded-lg px-4 py-3 text-text-main focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" id="email" type="email" placeholder="jane@example.com" />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-bold uppercase tracking-widest text-text-main" htmlFor="password">Password</label>
                        {isLogin && <a href="#" className="text-xs text-text-sub hover:text-primary transition-colors">Forgot?</a>}
                    </div>
                    <input className="w-full bg-background-light border border-text-main/10 rounded-lg px-4 py-3 text-text-main focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" id="password" type="password" placeholder="••••••••" />
                </div>

                <button className="w-full py-4 bg-primary text-white font-bold tracking-widest uppercase rounded-xl hover:bg-[#964a3a] transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 mt-4 transform active:scale-95">
                    {isLogin ? 'Sign In' : 'Create Account'}
                </button>
            </form>

            <div className="mt-8 text-center border-t border-text-main/10 pt-6">
                <p className="text-sm text-text-sub">
                    {isLogin ? "Don't have an account yet?" : "Already have an account?"}
                    <button 
                        onClick={() => setIsLogin(!isLogin)} 
                        className="ml-2 font-serif italic text-lg text-primary hover:text-text-main transition-colors underline decoration-1 underline-offset-4"
                    >
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </p>
            </div>
        </div>
    </main>
  );
};

export default Login;