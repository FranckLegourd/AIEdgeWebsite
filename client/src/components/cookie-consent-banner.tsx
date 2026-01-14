import { useTranslation } from "@/hooks/use-translation";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

export function CookieConsentBanner() {
  const { t } = useTranslation();
  const { showBanner, acceptCookies, denyCookies } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[90]",
        "bg-background border-t border-border shadow-lg",
        "animate-slide-up-from-bottom"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Cookie Icon */}
          <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
            <Cookie className="w-6 h-6 text-primary" aria-hidden="true" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h2
              id="cookie-consent-title"
              className="text-base font-semibold text-foreground"
            >
              {t("cookieConsent.title")}
            </h2>
            <p
              id="cookie-consent-description"
              className="text-sm text-muted-foreground mt-1"
            >
              {t("cookieConsent.description")}{" "}
              <Link
                href="/privacy"
                className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                {t("cookieConsent.learnMore")}
              </Link>
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              onClick={denyCookies}
              variant="outline"
              className="w-full sm:w-auto order-2 sm:order-1"
              aria-label={t("cookieConsent.denyAriaLabel")}
            >
              {t("cookieConsent.deny")}
            </Button>
            <Button
              onClick={acceptCookies}
              variant="default"
              className="w-full sm:w-auto order-1 sm:order-2"
              aria-label={t("cookieConsent.acceptAriaLabel")}
            >
              {t("cookieConsent.accept")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
