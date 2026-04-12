import { motion } from "framer-motion";
import { getBookingUrl, type DbService } from "@/hooks/useSpaData";
import { Loader2 } from "lucide-react";

type Props = {
  title: string;
  highlight?: string;
  services: DbService[] | undefined;
  isLoading?: boolean;
  waNumber?: string;
};

const ServiceSection = ({ title, highlight, services, isLoading, waNumber = "6281999231518" }: Props) => {
  if (isLoading) {
    return (
      <section className="py-10 px-4 flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </section>
    );
  }

  if (!services?.length) return null;

  return (
    <section className="py-10 px-4">
      <h2 className="font-display text-2xl text-foreground mb-6 px-1">
        {title}{" "}
        {highlight && <span className="italic text-primary">{highlight}</span>}
      </h2>

      <div className="space-y-5">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl overflow-hidden shadow-elevated"
          >
            {/* Image section with gradient */}
            <div className="relative h-48 sm:h-52">
              <img src={service.image_url || ""} alt={service.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(15,30%,12%)] via-[hsl(15,30%,12%/0.6)] to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-display text-lg text-white font-bold leading-tight">{service.title}</h3>
                <p className="text-[11px] text-white/70 font-body italic mt-0.5">{service.description}</p>
              </div>
            </div>

            {/* Options list with warm dark bg */}
            <div className="bg-gradient-to-b from-[hsl(15,30%,12%)] to-[hsl(15,20%,16%)] px-4 py-3 space-y-1">
              {service.service_options.map((opt) => (
                <div key={opt.id} className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0">
                  <div>
                    <p className="text-sm font-body font-semibold text-white">{opt.name}</p>
                    <p className="text-xs font-body text-white/50 mt-0.5">{opt.price}</p>
                  </div>
                  <a
                    href={getBookingUrl(opt.booking_text, waNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-[hsl(195,50%,30%)] hover:bg-[hsl(195,50%,35%)] text-white text-[10px] font-body font-bold tracking-wider uppercase px-4 py-2 rounded-full transition-all active:scale-95 shadow-lg"
                  >
                    Booking
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
