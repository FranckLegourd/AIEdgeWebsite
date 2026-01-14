import { ThemeProvider as BaseThemeProvider } from "@/hooks/use-theme";
import { TranslationProvider } from "@/hooks/use-translation";
import { CookieConsentProvider } from "@/hooks/use-cookie-consent";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseThemeProvider>
      <TranslationProvider>
        <CookieConsentProvider>
          {children}
        </CookieConsentProvider>
      </TranslationProvider>
    </BaseThemeProvider>
  );
}
