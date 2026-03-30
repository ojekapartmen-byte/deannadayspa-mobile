import React from "react";
import { useSiteContent } from "@/hooks/useSpaData";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  // Mengambil data site content dari hook CMS
  const { data: content, isLoading } = useSiteContent();

  // Menampilkan loading state jika data sedang dimuat
  if (isLoading) {
    return (
      <section className="relative h-[500px] w-full bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-300 border-t-primary rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-500 mt-4">Loading content...</p>
        </div>
      </section>
    );
  }

  // Menentukan data dari CMS atau fallback jika data tidak ada
  const heroTitle = content?.hero_title || "Deanna Day Spa";
  const heroSubtitle = content?.hero_subtitle || "Professional spa treatments in the comfort of your villa or visit our studio in Seminyak, Bali. Discover our premium rejuvenation packages.";
  const heroButtonText = content?.hero_button_text || "Contact Us";
  const heroImageUrl = content?.hero_image || 'https://images.unsplash.com/photo-1540555700371-41c1741f1a9a?q=80&w=2070&auto=format&fit=crop';
  const waNumber = content?.wa_number || "6281999231518";

  // Fungsi untuk menangani klik tombol Contact Us
  const handleContactUs = () => {
    const waUrl = `https://wa.me/${waNumber.replace(/[^0-9]/g, '')}`;
    window.open(waUrl, "_blank");
  };

  return (
    <section className="relative h-[500px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${heroImageUrl}')` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        {/* Tampilkan PREVIEW jika data CMS tersedia */}
        {content && (
          <span className="text-[11px] font-medium text-white/70 uppercase tracking-widest">
            PREVIEW
          </span>
        )}
        <h1 className="text-5xl font-extrabold tracking-tight mt-1">
          {heroTitle}
        </h1>
        <p className="text-lg text-white/90 font-medium italic mt-2 max-w-lg">
          Soothe the Soul. Relax the Body. Refresh the Mind
        </p>
        <p className="mt-4 max-w-lg text-sm text-white/80">
          {heroSubtitle}
        </p>
        <Button 
          onClick={handleContactUs}
          className="mt-8 bg-[#E6A23C] hover:bg-[#E6A23C]/90 text-white font-semibold text-base px-8 py-3 rounded-full"
        >
          {heroButtonText}
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
