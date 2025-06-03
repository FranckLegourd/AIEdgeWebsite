import { useTheme } from "@/hooks/use-theme";
import relevanceAiLight from "@assets/relevance_ai_lt.png";
import relevanceAiDark from "@assets/relevance_ai_dk.png";

const partners = [
  {
    name: "Relevance AI",
    lightLogo: relevanceAiLight,
    darkLogo: relevanceAiDark,
  },
  {
    name: "Blossom",
    lightLogo: null,
    darkLogo: null,
  },
  {
    name: "Hues",
    lightLogo: null,
    darkLogo: null,
  },
  {
    name: "Volume",
    lightLogo: null,
    darkLogo: null,
  },
  {
    name: "Cactus",
    lightLogo: null,
    darkLogo: null,
  },
  {
    name: "SnapShot",
    lightLogo: null,
    darkLogo: null,
  },
];

export function PartnerTicker() {
  const { theme } = useTheme();

  return (
    <div className="bg-muted/30 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground font-medium">
            We proudly showcase our trusted partners, providing excellence accross the AI technology stack
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          {/* Enhanced gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-muted/30 via-muted/30 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-muted/30 via-muted/30 to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrolling container with seamless loop */}
          <div className="flex animate-scroll-seamless">
            {/* First set */}
            <div className="flex items-center justify-center min-w-max">
              {partners.map((partner, index) => (
                <div
                  key={`first-${index}`}
                  className="mx-8 flex items-center justify-center h-16 w-40 transition-all duration-300 opacity-80 hover:opacity-100"
                >
                  {partner.lightLogo && partner.darkLogo ? (
                    <img
                      src={theme === 'dark' ? partner.darkLogo : partner.lightLogo}
                      alt={partner.name}
                      className="h-8 w-auto object-contain transition-all duration-300"
                    />
                  ) : (
                    <div className="text-lg font-bold text-foreground/70 hover:text-foreground transition-colors">
                      {partner.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Second set for seamless loop */}
            <div className="flex items-center justify-center min-w-max">
              {partners.map((partner, index) => (
                <div
                  key={`second-${index}`}
                  className="mx-8 flex items-center justify-center h-16 w-40 transition-all duration-300 opacity-80 hover:opacity-100"
                >
                  {partner.lightLogo && partner.darkLogo ? (
                    <img
                      src={theme === 'dark' ? partner.darkLogo : partner.lightLogo}
                      alt={partner.name}
                      className="h-8 w-auto object-contain transition-all duration-300"
                    />
                  ) : (
                    <div className="text-lg font-bold text-foreground/70 hover:text-foreground transition-colors">
                      {partner.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}