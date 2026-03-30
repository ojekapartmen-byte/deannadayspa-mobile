import React from "react";
import { useSiteContent } from "@/hooks/useSpaData";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const { data: content, isLoading } = useSiteContent();

  if (isLoading) {
    return <div className="h-[500px] w-full bg-slate-100 animate-pulse" />;
  }

  const heroTitle = content?.hero_title || "Deanna Day Spa";
  const heroSubtitle = content?.hero_subtitle || "Professional spa treatments in the comfort of your villa or visit our studio in Seminyak, Bali.";
  const heroButtonText = content?.hero_button_text || "Contact Us";
  const heroImageUrl = content?.hero_image || 'https://images.unsplash.com/photo-1540555700371-41c1741f1a9a?q=80&w=2070&auto=format&fit=crop';
  const waNumber = content?.wa_number || "6281999231518";

  const handleContactUs = () => {
    const waUrl = `https://wa.me/${waNumber.replace(/[^0-9]/g, '')}`;
    window.open(waUrl, "_blank");
  };

  return (
    <section className="relative h-[500px] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${heroImageUrl}')` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        <span className="text-[11px] font-medium text-white/70 uppercase tracking-[0.2em] mb-2">
          PREVIEW
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {heroTitle}
        </h1>
        <p className="text-lg text-white/90 font-medium italic mt-3 max-w-lg">
          Soothe the Soul. Relax the Body. Refresh the Mind
        </p>
        <p className="mt-4 max-w-md text-sm text-white/80 leading-relaxed">
          {heroSubtitle}
        </p>
        
        {/* Tombol dengan warna baru #40a3da */}
        <Button 
          onClick={handleContactUs}
          className="mt-8 bg-[#40a3da] hover:bg-[#358bb8] text-white font-semibold text-base px-10 py-6 rounded-full shadow-xl transition-all active:scale-95"
        >
          {heroButtonText}
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
