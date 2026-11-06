import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B0B0B] border-t border-[#292929] pt-20 pb-12 text-[#A5A5A5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#292929]">
          {/* Brand Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-2xl tracking-[0.2em] text-[#F5F2EC] block">
              QUIET BATTLES<span className="text-[#B49A75]">™</span>
            </span>
            <p className="text-xs uppercase tracking-[0.25em] text-[#B49A75]">
              WEAR YOUR BATTLES.
            </p>
            <p className="text-sm text-[#A5A5A5] leading-relaxed max-w-sm pt-2">
              Every scar carries a story. Every silence holds strength. We craft high-concept garments that honor human endurance, emotional depth, and silent resilience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs tracking-[0.25em] text-[#F5F2EC] uppercase block mb-4">
              COLLECTIONS
            </span>
            <ul className="space-y-2.5 text-xs tracking-wider">
              <li>
                <Link to="/archive/series-01" className="hover:text-[#B49A75] transition-colors">
                  Series 01: The Gentle Armor™
                </Link>
              </li>
              <li>
                <Link to="/archive/series-01/chapter-01" className="hover:text-[#B49A75] transition-colors">
                  Chapter 01: The First Scar
                </Link>
              </li>
              <li>
                <Link to="/archive" className="hover:text-[#B49A75] transition-colors">
                  The Complete Archive
                </Link>
              </li>
              <li>
                <Link to="/product/gentle-armor" className="hover:text-[#B49A75] transition-colors">
                  Flagship Garment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Inquiries */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs tracking-[0.25em] text-[#F5F2EC] uppercase block mb-4">
              STUDIO & INQUIRIES
            </span>
            <div className="space-y-2 text-xs leading-relaxed">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#B49A75]" />
                <span className="text-[#F5F2EC]">atelier@quietbattles.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#B49A75]" />
                <span>Tokyo · New York · Paris</span>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Instagram className="w-3.5 h-3.5 text-[#B49A75]" />
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#B49A75] flex items-center space-x-1"
                >
                  <span>@quietbattles.archive</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs tracking-wider text-[#A5A5A5]/60 gap-4">
          <p>© {new Date().getFullYear()} QUIET BATTLES™ ENTERPRISE. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 text-[11px]">
            <span className="hover:text-[#F5F2EC] cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-[#F5F2EC] cursor-pointer">TERMS & CONDITIONS</span>
            <Link to="/admin/login" className="hover:text-[#B49A75] transition-colors">
              ADMIN CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

