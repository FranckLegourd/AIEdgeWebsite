import { ThemeProvider as BaseThemeProvider } from "@/hooks/use-theme";
import { TranslationProvider } from "@/hooks/use-translation";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseThemeProvider>
      <TranslationProvider>
        {children}
      </TranslationProvider>
    </BaseThemeProvider>
  );
}
