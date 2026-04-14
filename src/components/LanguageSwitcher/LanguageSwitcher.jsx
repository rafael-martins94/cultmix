import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import './LanguageSwitcher.css';

const languages = [
  { code: 'en', flag: '🇺🇸' },
  { code: 'es', flag: '🇪🇸' },
  { code: 'fr', flag: '🇫🇷' },
  { code: 'pt', flag: '🇧🇷' },
];

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <div className="lang-switcher" ref={ref}>
      <button className="lang-trigger" onClick={() => setOpen(!open)}>
        <Globe size={16} />
        <span>{current.flag}</span>
      </button>
      {open && (
        <div className="lang-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`lang-option ${i18n.language === lang.code ? 'active' : ''}`}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setOpen(false);
              }}
            >
              <span className="lang-flag">{lang.flag}</span>
              <span>{t(`lang.${lang.code}`)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
