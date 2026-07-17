// i18n setup for the site.
//
// Only two packages are used: i18next + react-i18next (no
// i18next-browser-languagedetector), so browser-language detection and
// persistence are implemented manually below to keep the dependency list
// minimal, as requested.
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ptBR from './locales/pt-BR.json';

export const DEFAULT_LANGUAGE = 'en';
export const SUPPORTED_LANGUAGES = ['en', 'pt-BR'];
const STORAGE_KEY = 'lds-labs-language';

function readStoredLanguage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return SUPPORTED_LANGUAGES.includes(stored) ? stored : null;
  } catch {
    // localStorage can throw in private browsing / restricted contexts.
    // Falling back to detection-only is safe and non-fatal.
    return null;
  }
}

function detectBrowserLanguage() {
  const candidates = window.navigator.languages?.length
    ? window.navigator.languages
    : [window.navigator.language];

  for (const candidate of candidates) {
    if (!candidate) continue;
    const normalized = candidate.toLowerCase();
    if (normalized.startsWith('pt')) return 'pt-BR';
    if (normalized.startsWith('en')) return 'en';
  }

  return DEFAULT_LANGUAGE;
}

function resolveInitialLanguage() {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  return readStoredLanguage() ?? detectBrowserLanguage();
}

const initialLanguage = resolveInitialLanguage();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    'pt-BR': { translation: ptBR },
  },
  lng: initialLanguage,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  interpolation: { escapeValue: false },
  returnObjects: true,
});

if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLanguage;
}

// Persist manual language switches and keep the <html lang> attribute in
// sync for assistive technologies.
i18n.on('languageChanged', (language) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Ignore storage failures — the language still applies for this session.
  }

  if (typeof document !== 'undefined') {
    document.documentElement.lang = language;
  }
});

export default i18n;
