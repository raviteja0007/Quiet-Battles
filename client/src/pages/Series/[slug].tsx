import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { api } from '../../services/api';

export const SeriesPage: React.FC = () => {
  const { seriesSlug } = useParams<{ seriesSlug: string }>();
  const [series, setSeries] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = seriesSlug || 'series-01';
    Promise.all([
      api.get(`/series/${slug}`),
      api.get('/chapters'),
    ])
      .then(([seriesRes, chaptersRes]) => {
        setSeries(seriesRes.data);
        const filtered = chaptersRes.data.filter(
          (c: any) => c.seriesId === seriesRes.data.id || !seriesRes.data.id
        );
        setChapters(filtered.length > 0 ? filtered : chaptersRes.data);
      })
      .catch((err) => console.error('Error fetching series details', err))
      .finally(() => setLoading(false));
  }, [seriesSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center text-[#B49A75] text-xs tracking-widest">
        OPENING ARCHIVAL FOLIO...
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0B] text-[#F5F2EC] min-h-screen">
      {/* Series Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden border-b border-[#292929]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${series?.coverImage}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/70 to-[#0B0B0B]/50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6 pt-20">
          <div className="inline-flex items-center space-x-2 text-xs tracking-[0.3em] text-[#B49A75] uppercase border border-[#B49A75]/30 px-3 py-1 bg-[#0B0B0B]/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COLLECTION MASTER ARCHIVE</span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl text-[#F5F2EC]">
            {series?.title || 'SERIES 01 – THE GENTLE ARMOR™'}
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-[#F5F2EC]/90 font-serif italic font-light leading-relaxed">
            "{series?.description || 'Strength does not always arrive with noise. Sometimes, it is found in softness, in patience, and in the courage to continue.'}"
          </p>
        </div>
      </section>

      {/* Chapters Grid Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#292929] pb-6 gap-4">
          <div>
            <span className="text-xs tracking-[0.3em] text-[#B49A75] uppercase block mb-1">
              THE CHRONOLOGICAL CHAPTERS
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#F5F2EC]">
              FIVE NARRATIVE MOVEMENTS
            </h2>
          </div>
          <p className="text-xs text-[#A5A5A5] tracking-wider max-w-xs">
            Curated visual essays documenting the emotional evolution behind each garment.
          </p>
        </div>

        {/* Chapters Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="border border-[#292929] bg-[#121212] flex flex-col justify-between group hover:border-[#B49A75]/60 transition-all duration-300"
            >
              <div className="relative overflow-hidden h-72">
                <img
                  src={chapter.coverImage}
                  alt={chapter.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
                <div className="absolute top-4 left-4 bg-[#0B0B0B]/80 px-3 py-1 border border-[#292929] text-[10px] tracking-widest text-[#B49A75]">
                  CH. 0{chapter.chapterNumber}
                </div>
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl text-[#F5F2EC] group-hover:text-[#B49A75] transition-colors">
                    {chapter.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#A5A5A5] font-light leading-relaxed line-clamp-3">
                    {chapter.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#292929]">
                  <Link
                    to={`/archive/${seriesSlug || 'series-01'}/${chapter.slug}`}
                    className="inline-flex items-center space-x-2 text-xs tracking-[0.25em] text-[#F5F2EC] group-hover:text-[#B49A75] transition-colors uppercase font-medium"
                  >
                    <span>EXPLORE CHAPTER</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SeriesPage;

