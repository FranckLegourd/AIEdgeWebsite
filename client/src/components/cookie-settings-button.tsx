import { useTranslation } from "@/hooks/use-translation";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Cookie } from "lucide-react";

export function CookieSettingsButton() {
  const { t } = useTranslation();
  const { hasConsented, showBanner, resetConsent } = useCookieConsent();

  // Only show if user has consented and banner is not visible
  if (!hasConsented || showBanner) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[90]">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={resetConsent}
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 bg-background shadow-lg hover:shadow-xl transition-shadow"
            aria-label={t("cookieConsent.manageSettings")}
          >
            <Cookie className="w-5 h-5" aria-hidden="true" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{t("cookieConsent.manageSettings")}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
