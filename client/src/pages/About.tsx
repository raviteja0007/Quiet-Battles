import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-[#0B0B0B] text-[#F5F2EC] min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto space-y-24">
        {/* Header */}
        <div className="space-y-4 border-b border-[#292929] pb-12">
          <span className="text-xs tracking-[0.35em] text-[#B49A75] uppercase block">
            GENESIS & DISCIPLINE
          </span>
          <h1 className="font-serif text-4xl md:text-7xl text-[#F5F2EC]">
            THE STORY OF QUIET BATTLES™
          </h1>
          <p className="text-xl md:text-2xl font-serif italic text-[#A5A5A5] max-w-2xl font-light">
            "WEAR YOUR BATTLES."
          </p>
        </div>

        {/* Hero Editorial Image */}
        <div className="border border-[#292929] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop"
            alt="Quiet Battles Atelier"
            className="w-full h-[450px] md:h-[600px] object-cover brightness-90"
          />
        </div>

        {/* Narrative Essay */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-sm md:text-base text-[#A5A5A5] font-light leading-relaxed">
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs tracking-[0.25em] text-[#B49A75] uppercase block font-semibold">
              ORIGIN PHILOSOPHY
            </span>
            <h3 className="font-serif text-2xl text-[#F5F2EC]">
              THE UNSPOKEN TRUTH OF ENDURANCE
            </h3>
          </div>

          <div className="md:col-span-8 space-y-6 text-justify">
            <p>
              In a culture that constantly rewards high volume, rapid consumption, and aggressive self-promotion, QUIET BATTLES was conceived as an intentional sanctuary. We believe that human strength is rarely found in loud declarations; it resides in the quiet commitment to wake up each morning, carry invisible burdens, and continue moving forward.
            </p>
            <p>
              Founded in 2026, the label approaches garments not merely as aesthetic adornment, but as structured, physical armor for the emotional self. Every silhouette is engineered with substantial Japanese virgin wool, custom-milled loopback terry, and hand-finished seam bindings that provide weight, containment, and grounded posture.
            </p>
          </div>
        </div>

        {/* Pillars / Craftsmanship */}
        <div className="border-t border-[#292929] pt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-[#292929] bg-[#121212] p-8 space-y-3">
            <span className="font-serif text-3xl text-[#B49A75]">I</span>
            <h4 className="text-xs tracking-[0.25em] text-[#F5F2EC] uppercase font-semibold">
              INTENTIONAL WEIGHT
            </h4>
            <p className="text-xs text-[#A5A5A5] leading-relaxed">
              We exclusively utilize high-density textiles between 480 to 650 GSM to create garments with calming physical presence.
            </p>
          </div>

          <div className="border border-[#292929] bg-[#121212] p-8 space-y-3">
            <span className="font-serif text-3xl text-[#B49A75]">II</span>
            <h4 className="text-xs tracking-[0.25em] text-[#F5F2EC] uppercase font-semibold">
              EPISODIC ARCHIVES
            </h4>
            <p className="text-xs text-[#A5A5A5] leading-relaxed">
              Rather than seasonal trends, we release sequential series divided into five narrative chapters that document emotional metamorphosis.
            </p>
          </div>

          <div className="border border-[#292929] bg-[#121212] p-8 space-y-3">
            <span className="font-serif text-3xl text-[#B49A75]">III</span>
            <h4 className="text-xs tracking-[0.25em] text-[#F5F2EC] uppercase font-semibold">
              PERPETUAL INTEGRITY
            </h4>
            <p className="text-xs text-[#A5A5A5] leading-relaxed">
              Manufactured in limited editions with individual numbered archival tags to ensure absolute provenance and zero overproduction.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="border border-[#292929] bg-[#121212] p-10 md:p-14 text-center space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl text-[#F5F2EC]">
            EXPERIENCE THE ARCHIVE
          </h2>
          <p className="text-xs md:text-sm text-[#A5A5A5] max-w-md mx-auto">
            Explore Series 01 – The Gentle Armor and uncover the narrative behind the garments.
          </p>
          <Link
            to="/archive"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-[#B49A75] hover:bg-[#F5F2EC] text-[#0B0B0B] text-xs tracking-[0.25em] font-semibold uppercase transition-colors"
          >
            <span>ENTER THE ARCHIVE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;

