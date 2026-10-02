import React, { useEffect, useState } from 'react';
import { Advertisement, AdPlacement } from '../../types';
import { MockAdService } from '../../services/mockAdService';
import { ExternalLink } from 'lucide-react';

interface AdBannerProps {
  placement: AdPlacement;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ placement, className = '' }) => {
  const [ad, setAd] = useState<Advertisement | undefined>(() => MockAdService.getActiveByPlacement(placement));

  useEffect(() => {
    const active = MockAdService.getActiveByPlacement(placement);
    setAd(active);
    if (active) {
      MockAdService.trackImpression(active.id);
    }

    const handler = () => {
      setAd(MockAdService.getActiveByPlacement(placement));
    };
    window.addEventListener('ads-updated', handler);
    return () => window.removeEventListener('ads-updated', handler);
  }, [placement]);

  if (!ad) {
    // If no sponsor ad is assigned to this slot, show a sleek "Advertise With Us" placeholder
    return (
      <div className={`w-full bg-gradient-to-r from-slate-100 to-amber-50/50 border border-dashed border-slate-300 rounded-lg p-3 text-center ${className}`}>
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1">
          <span>ప్రకటన స్థలం (AD SPACE)</span>
          <span className="uppercase">{placement}</span>
        </div>
        <p className="text-xs text-slate-600 font-medium">
          పబ్లిక్ మూడ్ లో మీ వ్యాపార ప్రకటనల కోసం సంప్రదించండి: <span className="text-red-600 font-bold">ads@publicmood.com</span>
        </p>
      </div>
    );
  }

  const handleClick = () => {
    MockAdService.trackClick(ad.id);
  };

  return (
    <div className={`relative overflow-hidden rounded-lg shadow-sm border border-slate-200/80 bg-white group ${className}`}>
      {/* Sponsored Pill */}
      <div className="absolute top-1.5 left-2 z-10 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider flex items-center gap-1">
        <span>SPONSORED</span>
        <span className="text-slate-300">|</span>
        <span>{ad.sponsorName}</span>
      </div>

      <a
        href={ad.targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="block relative overflow-hidden"
      >
        {/* Responsive banners */}
        <picture>
          <source media="(max-width: 640px)" srcSet={ad.mobileBanner} />
          <img
            src={ad.desktopBanner}
            alt={ad.adTitle}
            className="w-full object-cover max-h-36 sm:max-h-48 group-hover:scale-[1.01] transition-transform duration-300"
            loading="lazy"
          />
        </picture>

        <div className="p-2 sm:p-2.5 bg-white/95 flex items-center justify-between border-t border-slate-100">
          <p className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-1 group-hover:text-red-600 transition-colors">
            {ad.adTitle}
          </p>
          <span className="text-[11px] font-bold text-red-600 flex items-center gap-0.5 shrink-0 ml-2">
            వివరాలు <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </a>
    </div>
  );
};
