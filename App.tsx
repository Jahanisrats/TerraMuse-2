import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Apparel from './pages/Apparel';
import Accessories from './pages/Accessories';
import Journal from './pages/Journal';
import ArticleDetail from './pages/ArticleDetail';
import NewArrivals from './pages/NewArrivals';
import CartDrawer from './pages/CartDrawer';
import ShoppingBag from './pages/ShoppingBag';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import MuseChat from './components/MuseChat';

// Hook to handle scroll animations
const useScrollObserver = () => {
    const location = useLocation();

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: Unobserve after animating once
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const observeElements = () => {
            const elements = document.querySelectorAll('.scroll-animate:not(.is-visible)');
            elements.forEach(el => observer.observe(el));
        };

        // Observe initial elements
        observeElements();

        // Use MutationObserver to watch for new elements (e.g., loaded via React)
        const mutationObserver = new MutationObserver(() => {
            observeElements();
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, [location.pathname]); // Re-init on route change
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    useScrollObserver(); // Activate scroll animations
    const [isMuseOpen, setIsMuseOpen] = useState(false);
    
    // Don't show nav/footer on cart drawer route since it handles its own background/overlay
    const isOverlay = location.pathname === '/cart-drawer';
    
    if (isOverlay) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navigation onOpenMuse={() => setIsMuseOpen(!isMuseOpen)} />
            {children}
            <MuseChat isOpen={isMuseOpen} onClose={() => setIsMuseOpen(false)} />
            <Footer />
        </div>
    );
};

const App: React.FC = () => {
  return (
    <Router>
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/apparel" element={<Apparel />} />
                <Route path="/accessories" element={<Accessories />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/journal/:slug" element={<ArticleDetail />} />
                <Route path="/new-arrivals" element={<NewArrivals />} />
                <Route path="/cart-drawer" element={<CartDrawer />} />
                <Route path="/cart" element={<ShoppingBag />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                {/* Redirect any unknown routes to Home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Layout>
    </Router>
  );
};

export default App;