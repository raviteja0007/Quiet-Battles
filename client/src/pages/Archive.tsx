import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export const Archive: React.FC = () => {
  const [seriesList, setSeriesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/series')
      .then((res) => setSeriesList(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#0B0B0B] text-[#F5F2EC] min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Editorial Heading */}
        <div className="border-b border-[#292929] pb-12 space-y-4">
          <span className="text-xs tracking-[0.35em] text-[#B49A75] uppercase block">
            CHRONICLES & RELEASES
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-[#F5F2EC]">
            THE ARCHIVE
          </h1>
          <p className="text-base md:text-lg text-[#A5A5A5] font-light italic font-serif max-w-xl">
            "Every collection is a chapter. Every chapter carries a story."
          </p>
        </div>

        {/* Series List */}
        {loading ? (
          <div className="py-24 text-center text-xs tracking-widest text-[#B49A75]">
            RETRIEVING ARCHIVAL RECORDS...
          </div>
        ) : (
          <div className="space-y-16">
            {seriesList.map((series) => (
              <div
                key={series.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border border-[#292929] bg-[#121212] p-6 md:p-10 group"
              >
                <div className="lg:col-span-7 overflow-hidden">
                  <img
                    src={series.coverImage}
                    alt={series.title}
                    className="w-full h-[400px] md:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                  />
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-center justify-between border-b border-[#292929] pb-3">
                    <span className="text-[11px] tracking-[0.25em] text-[#B49A75] uppercase font-semibold">
                      INAUGURAL SERIES
                    </span>
                    <span className="text-[11px] tracking-[0.2em] text-[#A5A5A5]">
                      5 CHAPTERS
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl md:text-4xl text-[#F5F2EC]">
                    {series.title}
                  </h2>

                  <p className="text-sm text-[#A5A5A5] leading-relaxed font-light">
                    {series.description}
                  </p>

                  <div className="pt-4">
                    <Link
                      to={`/archive/${series.slug}`}
                      className="inline-flex items-center space-x-3 px-6 py-3.5 bg-[#F5F2EC] text-[#0B0B0B] hover:bg-[#B49A75] text-xs tracking-[0.25em] font-semibold transition-colors uppercase"
                    >
                      <span>EXPLORE SERIES</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Archive;

