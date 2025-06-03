import { useTheme } from "@/hooks/use-theme";
import relevanceAiLight from "@assets/relevance_ai_lt.png";
import relevanceAiDark from "@assets/relevance_ai_dk.png";
import makeLight from "@assets/make_lt.png";
import makeDark from "@assets/make_dk.png";
import perplexityLight from "@assets/perplexity_lt.png";
import perplexityDark from "@assets/perplexity_dk.png";
import anthropicLight from "@assets/anthropic_lt.png";
import anthropicDark from "@assets/anthropic_dk.png";
import awsLight from "@assets/aws_lt.png";
import awsDark from "@assets/aws_dk.png";
import crewaiLight from "@assets/crewai_lt.png";
import crewaiDark from "@assets/crewai_dk.png";
import factoryLight from "@assets/factory_lt.png";
import factoryDark from "@assets/factory_dk.png";
import googleaiLight from "@assets/googleai_lt.png";
import googleaiDark from "@assets/googleai_dk.png";
import metaaiLight from "@assets/metaai_lt.png";
import metaaiDark from "@assets/metaai_dk.png";

const partners = [
  {
    name: "Relevance AI",
    lightLogo: relevanceAiLight,
    darkLogo: relevanceAiDark,
  },
  {
    name: "Make",
    lightLogo: makeLight,
    darkLogo: makeDark,
  },
  {
    name: "Perplexity",
    lightLogo: perplexityLight,
    darkLogo: perplexityDark,
  },
  {
    name: "Anthropic",
    lightLogo: anthropicLight,
    darkLogo: anthropicDark,
  },
  {
    name: "AWS",
    lightLogo: awsLight,
    darkLogo: awsDark,
  },
  {
    name: "CrewAI",
    lightLogo: crewaiLight,
    darkLogo: crewaiDark,
  },
  {
    name: "Factory",
    lightLogo: factoryLight,
    darkLogo: factoryDark,
  },
  {
    name: "Google AI",
    lightLogo: googleaiLight,
    darkLogo: googleaiDark,
  },
  {
    name: "Meta AI",
    lightLogo: metaaiLight,
    darkLogo: metaaiDark,
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
                  className="mx-8 flex items-center justify-center h-16 w-40"
                >
                  {partner.lightLogo && partner.darkLogo ? (
                    <img
                      src={theme === 'dark' ? partner.darkLogo : partner.lightLogo}
                      alt={partner.name}
                      className={`${
                        partner.name === 'Relevance AI' || partner.name === 'Perplexity' || partner.name === 'Google AI' || partner.name === 'Meta AI' ? 'h-8' : 
                        partner.name === 'AWS' || partner.name === 'Anthropic' || partner.name === 'Factory' ? 'h-6' : 
                        'h-5'
                      } w-auto object-contain transition-all duration-300`}
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
                  className="mx-8 flex items-center justify-center h-16 w-40"
                >
                  {partner.lightLogo && partner.darkLogo ? (
                    <img
                      src={theme === 'dark' ? partner.darkLogo : partner.lightLogo}
                      alt={partner.name}
                      className={`${
                        partner.name === 'Relevance AI' || partner.name === 'Perplexity' || partner.name === 'Google AI' || partner.name === 'Meta AI' ? 'h-8' : 
                        partner.name === 'AWS' || partner.name === 'Anthropic' || partner.name === 'Factory' ? 'h-6' : 
                        'h-5'
                      } w-auto object-contain transition-all duration-300`}
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