import { createContext, ReactNode, useContext, useState } from "react";
import { translations } from "@/lib/translations";

type Language = "en" | "fr" | "es";

type TranslationContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: Array<{ code: Language; name: string }>;
};

const TranslationContext = createContext<TranslationContextType | null>(null);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("language") as Language;
      if (stored && ["en", "fr", "es"].includes(stored)) return stored;
      const browserLang = navigator.language.split("-")[0] as Language;
      if (["en", "fr", "es"].includes(browserLang)) return browserLang;
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const languages = [
    { code: "en" as Language, name: "English" },
    { code: "fr" as Language, name: "Français" },
    { code: "es" as Language, name: "Español" },
  ];

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
