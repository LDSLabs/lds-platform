import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { site } from '../../content/site.js';
import { siteConfig } from '../../config/siteConfig.js';
import styles from './PrivacyPolicy.module.css';

// Section keys rendered in order below. Each maps to a
// `privacy.sections.<key>` entry in src/locales/*.json — `intro`, `body`,
// `items` and `note` are all optional per section and simply skipped when
// not present for a given key.
const SECTION_KEYS = [
  'whoWeAre',
  'dataCollected',
  'howCollected',
  'purposes',
  'legalBasis',
  'sharing',
  'internationalTransfers',
  'retention',
  'rights',
  'exerciseRights',
  'security',
  'children',
  'cookies',
  'communications',
  'changes',
  'contact',
];

// Sections that additionally render the brand's real domain/email as
// functional links, instead of plain translated text.
const SECTIONS_WITH_CONTACT_LINKS = new Set(['whoWeAre', 'contact']);

function PrivacyPolicy() {
  const { t } = useTranslation();
  const brand = site.brandName;

  // index.html ships a single, static <head> for the whole app (no
  // SSR/prerendering). Updating title/description/canonical here only
  // affects clients that execute JavaScript — search engine crawlers that
  // read the raw HTML response before running JS will still see the
  // landing page's metadata for this route. This is a known limitation;
  // fully solving it would require SSR, prerendering, or per-route static
  // HTML, which is out of scope for this change.
  useEffect(() => {
    const previousTitle = document.title;
    document.title = t('privacy.metaTitle', { brand });

    const descriptionTag = document.querySelector('meta[name="description"]');
    const previousDescription = descriptionTag?.getAttribute('content');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', t('privacy.metaDescription', { brand }));
    }

    const canonicalTag = document.querySelector('link[rel="canonical"]');
    const previousCanonical = canonicalTag?.getAttribute('href');
    if (canonicalTag) {
      canonicalTag.setAttribute('href', `${site.domain.replace(/\/$/, '')}/privacy`);
    }

    return () => {
      document.title = previousTitle;
      if (descriptionTag && previousDescription) {
        descriptionTag.setAttribute('content', previousDescription);
      }
      if (canonicalTag && previousCanonical) {
        canonicalTag.setAttribute('href', previousCanonical);
      }
    };
  }, [t, brand]);

  return (
    <section className={styles.section} aria-labelledby="privacy-title">
      <div className={`container ${styles.wrapper}`}>
        <a href="/" className={styles.backLink}>
          {t('privacy.backToHome')}
        </a>

        <h1 id="privacy-title" className={styles.title}>
          {t('privacy.title')}
        </h1>

        <p className={styles.effectiveDate}>
          {t('privacy.effectiveDateLabel')}: {t('privacy.effectiveDate')}
        </p>

        <p className={styles.intro}>{t('privacy.intro', { brand })}</p>

        {SECTION_KEYS.map((key) => {
          const base = `privacy.sections.${key}`;
          const intro = t(`${base}.intro`, { defaultValue: '' });
          const body = t(`${base}.body`, {
            brand,
            email: siteConfig.contactEmail,
            defaultValue: '',
          });
          const note = t(`${base}.note`, { defaultValue: '' });
          const items = t(`${base}.items`, { returnObjects: true, defaultValue: null });

          return (
            <div key={key} className={styles.block}>
              <h2 className={styles.heading}>{t(`${base}.title`)}</h2>

              {intro && <p className={styles.paragraph}>{intro}</p>}
              {body && <p className={styles.paragraph}>{body}</p>}

              {Array.isArray(items) && items.length > 0 && (
                <ul className={styles.list}>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}

              {SECTIONS_WITH_CONTACT_LINKS.has(key) && (
                <ul className={styles.list}>
                  <li>
                    <a href={site.domain} className={styles.inlineLink}>
                      {site.displayDomain}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${siteConfig.contactEmail}`} className={styles.inlineLink}>
                      {siteConfig.contactEmail}
                    </a>
                  </li>
                </ul>
              )}

              {note && <p className={styles.note}>{note}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PrivacyPolicy;
