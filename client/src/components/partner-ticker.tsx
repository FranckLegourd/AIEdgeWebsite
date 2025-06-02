import { useTheme } from "@/hooks/use-theme";

const partners = [
  {
    name: "Blossom",
    logo: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=120&h=40&fit=crop&crop=center",
    darkLogo: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=120&h=40&fit=crop&crop=center",
  },
  {
    name: "Hues",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=40&fit=crop&crop=center",
    darkLogo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=40&fit=crop&crop=center",
  },
  {
    name: "Volume",
    logo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=120&h=40&fit=crop&crop=center",
    darkLogo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=120&h=40&fit=crop&crop=center",
  },
  {
    name: "Cactus",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&h=40&fit=crop&crop=center",
    darkLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&h=40&fit=crop&crop=center",
  },
  {
    name: "SnapShot",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=40&fit=crop&crop=center",
    darkLogo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=40&fit=crop&crop=center",
  },
  {
    name: "Site",
    logo: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=120&h=40&fit=crop&crop=center",
    darkLogo: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=120&h=40&fit=crop&crop=center",
  },
];

export function PartnerTicker() {
  const { theme } = useTheme();

  return (
    <div className="bg-muted/30 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground font-medium">
            We proudly showcase our trusted partners, providing excellence across industries.
          </p>
        </div>
        
        <div className="relative">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-muted/30 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-muted/30 to-transparent z-10"></div>
          
          {/* Scrolling container */}
          <div className="flex animate-scroll">
            {/* First set of logos */}
            <div className="flex items-center justify-center min-w-max">
              {partners.map((partner, index) => (
                <div
                  key={`first-${index}`}
                  className="mx-8 flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <div className="text-lg font-bold text-foreground/70 hover:text-foreground transition-colors">
                    {partner.name}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Duplicate set for seamless loop */}
            <div className="flex items-center justify-center min-w-max">
              {partners.map((partner, index) => (
                <div
                  key={`second-${index}`}
                  className="mx-8 flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <div className="text-lg font-bold text-foreground/70 hover:text-foreground transition-colors">
                    {partner.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}