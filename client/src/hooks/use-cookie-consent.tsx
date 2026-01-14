import { createContext, ReactNode, useContext, useState, useCallback, useEffect } from "react";

type ConsentStatus = 'accepted' | 'denied' | null;

interface CookiePreference {
  consent: ConsentStatus;
  timestamp: number;
}

interface CookieConsentContextType {
  preference: CookiePreference;
  hasConsented: boolean;
  isAccepted: boolean;
  acceptCookies: () => void;
  denyCookies: () => void;
  resetConsent: () => void;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
}

const STORAGE_KEY = 'cookie-consent';
const CONSENT_EXPIRY_DAYS = 365;

const CookieConsentContext = createContext<CookieConsentContextType | null>(null);

function isConsentExpired(timestamp: number): boolean {
  const expiryMs = CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  return Date.now() - timestamp > expiryMs;
}

function getStoredPreference(): CookiePreference {
  if (typeof window === "undefined") {
    return { consent: null, timestamp: 0 };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as CookiePreference;
      if (parsed.consent && !isConsentExpired(parsed.timestamp)) {
        return parsed;
      }
    }
  } catch {
    // Invalid JSON, return default
  }

  return { consent: null, timestamp: 0 };
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<CookiePreference>(getStoredPreference);
  const [showBanner, setShowBanner] = useState(false);

  // Show banner on mount if no valid consent
  useEffect(() => {
    if (preference.consent === null) {
      // Small delay for better UX - let page load first
      const timer = setTimeout(() => setShowBanner(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreference = useCallback((consent: ConsentStatus) => {
    const newPreference: CookiePreference = {
      consent,
      timestamp: Date.now(),
    };
    setPreference(newPreference);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPreference));
    setShowBanner(false);
  }, []);

  const acceptCookies = useCallback(() => savePreference('accepted'), [savePreference]);
  const denyCookies = useCallback(() => savePreference('denied'), [savePreference]);

  const resetConsent = useCallback(() => {
    setShowBanner(true);
  }, []);

  const value: CookieConsentContextType = {
    preference,
    hasConsented: preference.consent !== null,
    isAccepted: preference.consent === 'accepted',
    acceptCookies,
    denyCookies,
    resetConsent,
    showBanner,
    setShowBanner,
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
}
