import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../../i18n.js';
import styles from './LanguageSwitcher.module.css';

const LANGUAGE_LABEL_KEYS = {
  en: 'languageSwitcher.en',
  'pt-BR': 'languageSwitcher.ptBR',
};

// Short codes shown in the switcher itself (e.g. "EN", "PT-BR"), kept
// separate from the full language names used for aria-labels so the
// control stays compact without sacrificing screen-reader clarity.
const LANGUAGE_CODES = {
  en: 'EN',
  'pt-BR': 'PT-BR',
};

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const currentLanguage = SUPPORTED_LANGUAGES.includes(i18n.resolvedLanguage)
    ? i18n.resolvedLanguage
    : 'en';

  return (
    <nav className={styles.switcher} aria-label={t('languageSwitcher.label')}>
      {SUPPORTED_LANGUAGES.map((language, index) => {
        const isActive = language === currentLanguage;
        return (
          <span key={language} className={styles.item}>
            {index > 0 && (
              <span className={styles.separator} aria-hidden="true">
                |
              </span>
            )}
            <button
              type="button"
              className={styles.button}
              aria-current={isActive ? 'true' : undefined}
              aria-label={t(LANGUAGE_LABEL_KEYS[language])}
              disabled={isActive}
              onClick={() => i18n.changeLanguage(language)}
            >
              {LANGUAGE_CODES[language]}
            </button>
          </span>
        );
      })}
    </nav>
  );
}

export default LanguageSwitcher;
