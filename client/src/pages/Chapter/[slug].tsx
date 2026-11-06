import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Quote, Shield } from 'lucide-react';
import { api } from '../../services/api';

export const ChapterPage: React.FC = () => {
  const { seriesSlug, chapterSlug } = useParams<{ seriesSlug: string; chapterSlug: string }>();
  const [chapter, setChapter] = useState<any>(null);
  const [allChapters, setAllChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = chapterSlug || 'chapter-01';
    Promise.all([
      api.get(`/chapters/${slug}`),
      api.get('/chapters'),
    ])
      .then(([chapRes, allRes]) => {
        setChapter(chapRes.data);
        setAllChapters(allRes.data);
      })
      .catch((err) => console.error('Error fetching chapter data', err))
      .finally(() => setLoading(false));
  }, [chapterSlug]);

  if (loading || !chapter) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center text-[#B49A75] text-xs tracking-widest">
        UNFOLDING CHRONICLE...
      </div>
    );
  }

  // Find next chapter index
  const currentIndex = allChapters.findIndex((c) => c.id === chapter.id || c.slug === chapter.slug);
  const nextChapter = currentIndex > -1 && currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : allChapters[0];

  return (
    <div className="bg-[#0B0B0B] text-[#F5F2EC]">
      {/* SECTION 1: FULL-SCREEN CHAPTER COVER IMAGE */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${chapter.coverImage}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/70 to-[#0B0B0B]/40" />
        </div>

        {/* SECTION 2: CHAPTER NUMBER AND TITLE */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block text-xs tracking-[0.35em] text-[#B49A75] uppercase border border-[#B49A75]/40 px-4 py-1.5 backdrop-blur-md"
          >
            SERIES 01 · CHAPTER 0{chapter.chapterNumber}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-4xl md:text-7xl text-[#F5F2EC] leading-tight"
          >
            {chapter.title}
          </motion.h1>

          {/* SECTION 3: EMOTIONAL INTRODUCTION */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-base md:text-xl text-[#A5A5A5] font-serif italic max-w-2xl mx-auto leading-relaxed"
          >
            "{chapter.description}"
          </motion.p>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-60">
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#B49A75] to-transparent animate-pulse" />
        </div>
      </section>

      {/* SECTION 4: EDITORIAL PHOTOGRAPHY SECTION */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 border border-[#292929] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
              alt="Editorial study 01"
              className="w-full h-[520px] object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
            />
          </div>
          <div className="md:col-span-5 border border-[#292929] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop"
              alt="Editorial study 02"
              className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
            />
          </div>
        </div>
      </section>

      {/* SECTION 5: LONG-FORM STORYTELLING CONTENT */}
      <section className="py-20 px-6 md:px-12 max-w-3xl mx-auto">
        <div className="space-y-8 text-base md:text-lg text-[#F5F2EC]/90 font-light leading-relaxed tracking-wide">
          <span className="text-xs tracking-[0.3em] text-[#B49A75] uppercase block font-semibold">
            ESSAY & ESSENCE
          </span>
          {chapter.storyContent.split('\n\n').map((paragraph: string, idx: number) => (
            <p key={idx} className="first-letter:text-5xl first-letter:font-serif first-letter:text-[#B49A75] first-letter:mr-3 first-letter:float-left text-justify">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* SECTION 6: QUOTE SECTION */}
      <section className="py-28 px-6 md:px-12 bg-[#121212] border-y border-[#292929] my-16 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <Quote className="w-10 h-10 text-[#B49A75] mx-auto opacity-70" />
          <blockquote className="font-serif text-2xl md:text-4xl text-[#F5F2EC] leading-relaxed italic">
            "Some battles begin before the world notices. They leave marks that cannot always be seen, but they shape who we become. The first scar is not a sign of weakness. It is proof that we continued."
          </blockquote>
          <span className="text-xs tracking-[0.25em] text-[#B49A75] uppercase block">
            — QUIET BATTLES ATELIER NOTEBOOK
          </span>
        </div>
      </section>

      {/* SECTION 7 & 8: CONNECTION TO PRODUCT & RECOMMENDATION */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto border border-[#292929] bg-[#0E0E0E] my-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center p-6 md:p-8">
          <div className="md:col-span-5 overflow-hidden border border-[#292929]">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop"
              alt="The Gentle Armor connection"
              className="w-full h-80 object-cover"
            />
          </div>

          <div className="md:col-span-7 space-y-5">
            <div className="flex items-center space-x-2 text-xs tracking-[0.25em] text-[#B49A75] uppercase">
              <Shield className="w-4 h-4" />
              <span>THE TACTILE EMBODIMENT</span>
            </div>

            <h3 className="font-serif text-3xl text-[#F5F2EC]">
              THE GENTLE ARMOR™
            </h3>

            <p className="text-sm text-[#A5A5A5] leading-relaxed font-light">
              This chapter culminates in the creation of our signature piece. Crafted with raw selvage wool and subtle stitch reinforcements, The Gentle Armor translates the endurance of the first scar into physical form.
            </p>

            <div className="pt-2">
              <Link
                to="/product/gentle-armor"
                className="inline-flex items-center space-x-3 px-8 py-3.5 bg-[#B49A75] text-[#0B0B0B] text-xs tracking-[0.25em] font-semibold hover:bg-[#F5F2EC] transition-colors uppercase"
              >
                <span>DISCOVER THE GENTLE ARMOR</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: NEXT CHAPTER NAVIGATION */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#292929]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            to={`/archive/${seriesSlug || 'series-01'}`}
            className="flex items-center space-x-2 text-xs tracking-[0.25em] text-[#A5A5A5] hover:text-[#B49A75] transition-colors uppercase"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>RETURN TO SERIES 01</span>
          </Link>

          {nextChapter && (
            <Link
              to={`/archive/${seriesSlug || 'series-01'}/${nextChapter.slug}`}
              className="flex items-center space-x-3 text-xs tracking-[0.25em] text-[#F5F2EC] hover:text-[#B49A75] transition-colors uppercase font-medium"
            >
              <span>NEXT: CH. 0{nextChapter.chapterNumber} – {nextChapter.title}</span>
              <ChevronRight className="w-4 h-4 text-[#B49A75]" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default ChapterPage;

