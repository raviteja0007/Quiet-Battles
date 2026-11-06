import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export const Home: React.FC = () => {
  const [featuredProduct, setFeaturedProduct] = useState<any>(null);
  const [featuredSeries, setFeaturedSeries] = useState<any>(null);

  useEffect(() => {
    // Fetch live series and product from backend
    api.get('/series')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setFeaturedSeries(res.data[0]);
        }
      })
      .catch((err) => console.error('Error fetching series', err));

    api.get('/products')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setFeaturedProduct(res.data[0]);
        }
      })
      .catch((err) => console.error('Error fetching products', err));
  }, []);

  return (
    <div className="bg-[#0B0B0B] text-[#F5F2EC]">
      {/* SECTION 2: CINEMATIC HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Editorial Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transform duration-1000 transition-transform"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-[#0B0B0B]/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-flex items-center space-x-2 text-xs tracking-[0.35em] text-[#B49A75] uppercase border border-[#B49A75]/30 px-4 py-1.5 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B49A75]" />
            <span>EDITORIAL AUTUMN / WINTER 2026</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="font-serif text-5xl md:text-8xl tracking-tight leading-none text-[#F5F2EC]">
              QUIET BATTLES<span className="text-[#B49A75] text-3xl md:text-5xl align-top">™</span>
            </h1>
            <p className="text-xl md:text-3xl font-light tracking-[0.25em] text-[#F5F2EC]/90 font-serif italic">
              WEAR YOUR BATTLES.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.7 }}
            className="max-w-xl mx-auto text-sm md:text-base text-[#A5A5A5] leading-relaxed font-light tracking-wide"
          >
            "Every scar carries a story. Every silence holds strength. Wear what made you."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs tracking-[0.25em] font-medium"
          >
            <Link
              to="/archive"
              className="w-full sm:w-auto px-8 py-4 bg-[#F5F2EC] text-[#0B0B0B] hover:bg-[#B49A75] hover:text-[#0B0B0B] transition-all duration-300 uppercase shadow-lg"
            >
              EXPLORE THE ARCHIVE
            </Link>
            <Link
              to="/product/gentle-armor"
              className="w-full sm:w-auto px-8 py-4 border border-[#F5F2EC]/30 text-[#F5F2EC] hover:border-[#B49A75] hover:text-[#B49A75] transition-all duration-300 uppercase backdrop-blur-sm"
            >
              DISCOVER THE COLLECTION
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 opacity-60">
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#A5A5A5]">SCROLL</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#B49A75] to-transparent animate-pulse" />
        </div>
      </section>

      {/* SECTION 3: BRAND INTRODUCTION */}
      <section className="py-28 md:py-40 border-b border-[#292929] px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="text-xs tracking-[0.3em] text-[#B49A75] uppercase block">
            THE MANIFESTO
          </span>
          <h2 className="font-serif text-3xl md:text-6xl text-[#F5F2EC] leading-tight">
            "NOT EVERY BATTLE MAKES A SOUND."
          </h2>
          <div className="w-16 h-[1px] bg-[#B49A75] mx-auto" />
          <p className="text-base md:text-lg text-[#A5A5A5] leading-relaxed font-light text-justify md:text-center">
            QUIET BATTLES was established on a single undeniable truth: the deepest personal evolutions unfold in silence. We do not design for empty validation or fleeting runway trends. We tailor structured garments that serve as tactile armor for thinkers, survivors, and creators navigating their own quiet odysseys.
          </p>
        </div>
      </section>

      {/* SECTION 4: FEATURED COLLECTION */}
      <section className="py-28 md:py-36 px-6 md:px-12 border-b border-[#292929] bg-[#0E0E0E]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Collection Visual */}
          <div className="lg:col-span-7 relative group overflow-hidden border border-[#292929]">
            <img
              src={
                featuredSeries?.coverImage ||
                'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop'
              }
              alt="Series 01 – The Gentle Armor"
              className="w-full h-[520px] md:h-[680px] object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
            />
            <div className="absolute top-6 left-6 bg-[#0B0B0B]/80 backdrop-blur-md px-4 py-2 border border-[#292929]">
              <span className="text-[10px] tracking-[0.25em] text-[#B49A75] uppercase">
                FIRST INAUGURAL RELEASE
              </span>
            </div>
          </div>

          {/* Collection Info */}
          <div className="lg:col-span-5 space-y-6 lg:pl-6">
            <span className="text-xs tracking-[0.3em] text-[#B49A75] uppercase block">
              SERIES 01
            </span>
            <h3 className="font-serif text-4xl md:text-5xl text-[#F5F2EC] leading-tight">
              THE GENTLE ARMOR™
            </h3>
            <p className="text-sm md:text-base text-[#A5A5A5] leading-relaxed font-light">
              {featuredSeries?.description ||
                'Strength does not always arrive with noise. Sometimes, it is found in softness, in patience, and in the courage to continue.'}
            </p>
            <div className="pt-4 flex flex-col space-y-3">
              <Link
                to="/archive/series-01"
                className="inline-flex items-center space-x-3 text-xs tracking-[0.25em] text-[#F5F2EC] hover:text-[#B49A75] transition-colors py-2 uppercase"
              >
                <span>EXPLORE SERIES CHRONICLES</span>
                <ArrowRight className="w-4 h-4 text-[#B49A75]" />
              </Link>
              <Link
                to="/archive/series-01/chapter-01"
                className="text-xs tracking-[0.2em] text-[#A5A5A5] hover:text-[#F5F2EC] transition-colors"
              >
                → Read Chapter 01: The First Scar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: BRAND PHILOSOPHY (THREE EDITORIAL BLOCKS) */}
      <section className="py-28 md:py-36 px-6 md:px-12 border-b border-[#292929]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs tracking-[0.3em] text-[#B49A75] uppercase">
              PILLARS OF THE DISCIPLINE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#F5F2EC]">
              FOUNDATIONAL TRUTHS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Block 01 */}
            <div className="border border-[#292929] bg-[#121212] p-8 md:p-10 space-y-4 hover:border-[#B49A75]/50 transition-colors">
              <span className="font-serif text-4xl text-[#B49A75] block">01</span>
              <h4 className="text-sm tracking-[0.25em] text-[#F5F2EC] uppercase font-semibold">
                RESILIENCE
              </h4>
              <p className="text-xs md:text-sm text-[#A5A5A5] leading-relaxed">
                Resilience is not the absence of difficulty, but the stubborn persistence to endure through the quietest fractures.
              </p>
            </div>

            {/* Block 02 */}
            <div className="border border-[#292929] bg-[#121212] p-8 md:p-10 space-y-4 hover:border-[#B49A75]/50 transition-colors">
              <span className="font-serif text-4xl text-[#B49A75] block">02</span>
              <h4 className="text-sm tracking-[0.25em] text-[#F5F2EC] uppercase font-semibold">
                IDENTITY
              </h4>
              <p className="text-xs md:text-sm text-[#A5A5A5] leading-relaxed">
                Garments that speak without needing to shout. Designed to reflect internal integrity rather than external conformity.
              </p>
            </div>

            {/* Block 03 */}
            <div className="border border-[#292929] bg-[#121212] p-8 md:p-10 space-y-4 hover:border-[#B49A75]/50 transition-colors">
              <span className="font-serif text-4xl text-[#B49A75] block">03</span>
              <h4 className="text-sm tracking-[0.25em] text-[#F5F2EC] uppercase font-semibold">
                SILENT STRENGTH
              </h4>
              <p className="text-xs md:text-sm text-[#A5A5A5] leading-relaxed">
                True authority rests in stillness. Our heavyweight textiles grant a tactile calm amidst modern chaos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FEATURED PRODUCT */}
      <section className="py-28 md:py-36 px-6 md:px-12 bg-[#0E0E0E]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#292929] pb-6 gap-4">
            <div>
              <span className="text-xs tracking-[0.3em] text-[#B49A75] uppercase block mb-1">
                KEY GARMENT
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#F5F2EC]">
                THE GENTLE ARMOR™
              </h2>
            </div>
            <Link
              to="/product/gentle-armor"
              className="text-xs tracking-[0.25em] text-[#B49A75] hover:text-[#F5F2EC] transition-colors uppercase flex items-center space-x-2"
            >
              <span>VIEW FULL SPECIFICATION</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative border border-[#292929] overflow-hidden group">
              <img
                src={
                  featuredProduct?.images?.[0] ||
                  'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop'
                }
                alt="The Gentle Armor Product"
                className="w-full h-[480px] md:h-[580px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="space-y-6">
              <span className="text-xs tracking-[0.25em] text-[#A5A5A5] uppercase">
                {featuredProduct?.category || 'PREMIUM STREETWEAR'}
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-[#F5F2EC]">
                {featuredProduct?.name || 'THE GENTLE ARMOR™'}
              </h3>
              <p className="text-2xl font-serif text-[#B49A75]">
                ${featuredProduct?.price || 380} USD
              </p>
              <p className="text-sm text-[#A5A5A5] leading-relaxed font-light">
                {featuredProduct?.description ||
                  'Designed for those who carry their stories quietly. Handcrafted from structured 540 GSM Japanese virgin wool with raw edge finishes and subtle tonal embroidery.'}
              </p>

              <div className="pt-6">
                <Link
                  to="/product/gentle-armor"
                  className="inline-block px-10 py-4 bg-[#B49A75] text-[#0B0B0B] text-xs tracking-[0.25em] font-semibold uppercase hover:bg-[#F5F2EC] transition-colors"
                >
                  VIEW PRODUCT & SIZING
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

