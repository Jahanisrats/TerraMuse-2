import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Mock Data Dictionary
  const articles: Record<string, any> = {
    'featured-story': {
      title: "The Art of Slow Living",
      subtitle: "In a world that demands speed, we choose rhythm.",
      date: "Oct 12, 2023",
      category: "Editorial",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjigXpglYo4leeMTu45JnJkXx1nU7aJ7aUJaK5Vls2fysIVGtOYNRfMNV8VXiQ1ihTdUwvRZ5lDgtW8FvbPBX_vVJdvj7bbHDa7EZ5luhhWn04fvDCuFcGcyLUxT0fti3ZyV5hMgMiDJ6y-0b8iShRwhJLgaxudU9NJCTrxfIML9RAFHhh4993OmrPc_GTpk_UKfiRw_MfNTepMM3BhuURPqBPoEyY83NR6_AOCBLi_5BJ9WlBUBpLPyDwcb6GET8T2R6YZnaPSE4",
      content: (
        <>
            <p className="first-letter:text-7xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px] first-letter:text-primary mb-6">
                S
            </p>
            <p className="mb-6">
                low living is not about doing everything at a snail's pace. It's about doing everything at the right speed. It's about savoring the hours and minutes rather than just counting them. Doing everything as well as possible, instead of as fast as possible. It's about quality over quantity in everything from work to food to parenting.
            </p>
            <p className="mb-6">
                In our atelier, we embrace this philosophy wholeheartedly. Every garment begins not with a sketch, but with a feeling. The texture of raw linen, the weight of organic cotton, the way a fabric drapes against the skin. We listen to the materials before we shape them.
            </p>
            <h3 className="font-serif text-2xl text-text-main mt-10 mb-6 italic">The Rhythm of Nature</h3>
            <p className="mb-6">
                Nature does not hurry, yet everything is accomplished. When we align ourselves with the seasons, we find a natural rhythm that sustains us. Our Spring collection draws inspiration from this awakening—the soft unfolding of petals, the warming earth, the return of light.
            </p>
            <blockquote className="border-l-4 border-accent-sage pl-6 my-10 italic text-xl text-text-main/90 bg-accent-sage/5 py-4 pr-4 rounded-r-lg">
                "Adopt the pace of nature: her secret is patience." — Ralph Waldo Emerson
            </blockquote>
            <p className="mb-6">
                We invite you to slow down with us. To wear clothes that breathe. To walk barefoot in the grass. To notice the changing light. This is not just fashion; it is a way of being in the world.
            </p>
        </>
      )
    },
    'dyeing-with-earth': {
        title: "Dyeing with Earth",
        subtitle: "A Guide to Natural Pigments",
        date: "Sep 28, 2023",
        category: "Craft",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeIod0vV17vUMpC7TkI79sNAxa6yB3-WWXfI-E3vWaFqHqVzduEbM2-p3OIp5ZaRs3p7kZbINwKpbAz8GF6HjF9catpYnPmJTzqhT7ofkDUnYPfhhur8CzAxasfyJyiBVQZj2qp3CiTm_JlrvQAGCzj9wDE_3YS2FcaMHClMAis3AW3vfxrhSkdI3EQ96iEkvdSFnV137Fh33KYSdwjppQv-t_qdKh-hdlZb_iyKvNF0WPmDMqmMueVGr0edkXoi2n-go9bUg7SOM",
        content: (
            <>
                 <p className="first-letter:text-7xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px] first-letter:text-accent-sage mb-6">
                    C
                </p>
                <p className="mb-6">
                    olor is a language. Before synthetic dyes flooded the market with uniform brilliance, artisans looked to the landscape for their palette. Roots, barks, leaves, and flowers offer a spectrum of hues that possess a depth and vibration no chemical can replicate.
                </p>
                <p className="mb-6">
                    Our latest workshop explored the magic of kitchen scraps and local flora. Avocado pits yield a dusty rose. Onion skins create a rich, warm gold. Black beans can produce startling blues. The process is alchemy—water, heat, time, and fiber coming together to create something entirely new.
                </p>
                <div className="my-10 p-8 bg-[#f0ebe5] rounded-xl border-l-4 border-primary shadow-inner">
                    <h4 className="font-serif text-xl mb-4 text-text-main font-bold">Simple Recipe: Avocado Pink</h4>
                    <ul className="list-disc list-inside text-base text-text-sub space-y-3 leading-relaxed">
                        <li>Save 5-10 avocado pits (clean them well to remove flesh).</li>
                        <li>Simmer gently in water for 1 hour until the water turns deep red.</li>
                        <li>Add pre-mordanted fabric (soaked in soy milk or alum) and let it soak overnight.</li>
                    </ul>
                </div>
                <p className="mb-6">
                    The beauty of natural dyeing lies in its unpredictability. The soil acidity, the time of harvest, the mineral content of the water—all play a role. It teaches us to release control and accept the gift that nature provides.
                </p>
            </>
        )
    },
    'sustainable-journey': {
        title: "Behind the Seams",
        subtitle: "Our Sustainable Journey",
        date: "Sep 15, 2023",
        category: "Transparency",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvug5DmWwLVYz3uIwMFPrYKSjKaN3iZUuxn9rIcoEX1vtZY_YUxyUtESLkQJ4peYEcK0HAUZ7F906u6-HTvEVkPhfNXjvQPeQkhAMJzkCVBiMj7CdjBOPck5wE6djRaQNv3CVzROifcu_VuGaFZ9IMH6ziH5e9MLvL88pxVfutBuwOPYEdFhv5iFTcNqaFu8LQXOUMJCkiGBxQGOMNlUHPoLhQC_qbr2JeE-F4vARZ7oOhB5p-rFSO6OVIwvpXAdQkG2vXw_0mOsA",
        content: (
            <>
                <p className="mb-6">
                    Sustainability is a journey, not a destination. At TerraMuse, we are constantly asking questions. Who made this? What is it made of? Where will it go when it is worn out?
                </p>
                <p className="mb-6">
                    We recently visited our partner workshop in Portugal. Meeting the women who stitch our garments is a privilege. We saw their hands at work, guiding fabric under the needle with practiced ease. We shared meals and stories. This connection is the thread that binds us.
                </p>
                <h3 className="font-serif text-2xl text-text-main mt-10 mb-6 italic">Material Matters</h3>
                <p className="mb-6">
                    We choose linen not just for its beauty, but for its resilience. Flax requires less water than cotton and no pesticides. It grows strong in poor soil. It is biodegradable. When you wear linen, you are wearing a piece of the earth that leaves no trace behind.
                </p>
                <p className="mb-6">
                    Our commitment is to transparency. We know we aren't perfect, but we are striving every day to be better. To reduce our footprint. To honor the hands that craft our clothes. To create beauty without destruction.
                </p>
            </>
        )
    },
    'language-of-flowers': {
        title: "The Language of Flowers",
        subtitle: "Deciphering nature's silent messages.",
        date: "Aug 10, 2023",
        category: "Botany",
        image: "https://images.unsplash.com/photo-1490750967868-58cb75069faf?q=80&w=2070&auto=format&fit=crop",
        content: (
            <>
                <p className="first-letter:text-7xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px] first-letter:text-primary mb-6">
                    E
                </p>
                <p className="mb-6">Every bloom tells a story. In the Victorian era, floriography allowed friends and lovers to send secret messages through bouquets. A red tulip for passion, a daisy for innocence.</p>
                <p className="mb-6">Today, we look to flowers not just for their meaning, but for their resilience. The way a poppy breaks through pavement. The way a sunflower follows the light.</p>
                <blockquote className="border-l-4 border-primary pl-6 my-10 italic text-xl text-text-main/90 bg-primary/5 py-4 pr-4 rounded-r-lg">
                    "Flowers are the music of the ground. From earth's lips spoken without sound." — Edwin Curran
                </blockquote>
            </>
        )
    },
    'rituals-of-morning': {
        title: "Rituals of Morning",
        subtitle: "Starting the day with intention.",
        date: "Jul 22, 2023",
        category: "Wellness",
        image: "https://images.unsplash.com/photo-1517866170656-702755e3e601?q=80&w=2070&auto=format&fit=crop",
        content: (
            <>
                <p className="first-letter:text-7xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px] first-letter:text-accent-sage mb-6">
                    T
                </p>
                <p className="mb-6">The way we begin our day sets the tone for everything that follows. A warm cup of tea. Five minutes of silence. The feel of linen against skin.</p>
                <p className="mb-6">We explore the morning routines of five creatives who have mastered the art of waking up slow. It isn't about productivity, but about presence.</p>
            </>
        )
    }
  };

  const article = slug ? articles[slug] : null;

  if (!article) {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
            <span className="material-symbols-outlined text-6xl text-text-main/20 mb-4">menu_book</span>
            <h2 className="font-serif text-3xl text-text-main mb-4">Story Not Found</h2>
            <Link to="/journal" className="text-primary hover:underline font-display tracking-widest text-sm uppercase">Return to Journal</Link>
        </div>
    );
  }

  return (
    <main className="w-full pb-24 animate-fadeIn bg-background-light">
        {/* Hero */}
        <div className="w-full h-[50vh] lg:h-[70vh] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20 z-10"></div>
            <img src={article.image} alt={article.title} className="w-full h-full object-cover animate-fadeIn" />
            <div className="absolute bottom-0 left-0 w-full z-20 p-6 lg:p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-32">
                <div className="container mx-auto max-w-4xl text-white">
                    <div className="flex items-center gap-3 mb-4 text-xs font-bold tracking-widest uppercase opacity-90 text-accent-sage">
                        <span>{article.date}</span>
                        <span className="w-1 h-1 bg-current rounded-full"></span>
                        <span>{article.category}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight mb-4 text-shadow-soft">
                        {article.title}
                    </h1>
                    <p className="text-lg md:text-xl font-light opacity-90 max-w-2xl text-cream font-display">
                        {article.subtitle}
                    </p>
                </div>
            </div>
        </div>

        {/* Content */}
        <article className="container mx-auto max-w-[800px] px-6 py-16 lg:py-24 relative">
             <div className="absolute top-20 left-[-50px] text-9xl font-serif text-primary/5 -z-10 select-none hidden lg:block">“</div>
             
            <div className="prose prose-lg prose-stone mx-auto text-text-main/80 font-serif leading-loose text-lg">
                {article.content}
            </div>
            
            <div className="mt-20 pt-12 border-t border-text-main/10 flex justify-center md:justify-start">
                <Link to="/journal" className="flex items-center gap-2 text-text-sub hover:text-primary transition-colors group text-sm uppercase tracking-widest font-bold">
                    <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    Back to Journal
                </Link>
            </div>
        </article>
    </main>
  );
};

export default ArticleDetail;