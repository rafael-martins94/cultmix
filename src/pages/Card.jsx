import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  UserPlus,
  FileText,
} from 'lucide-react';
import Aurora from '../components/Aurora/Aurora';
import { people } from '../data/people';
import './Card.css';

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function generateVCard(person, lang) {
  const role = person.role[lang] || person.role.en;

  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${person.name}`,
    `ORG:CultMix Live`,
    `TITLE:${role}`,
    `TEL;TYPE=CELL:${person.phone}`,
    ...(person.email ? [`EMAIL;TYPE=INTERNET:${person.email}`] : []),
    ...(person.instagram
      ? [
          `URL;TYPE=Instagram:https://www.instagram.com/${person.instagram.replace(/^@/, '')}/`,
        ]
      : []),
    `URL:${person.website}`,
    ...(person.location
      ? [
          `NOTE:${(person.location[lang] || person.location.en).replace(/\n/g, ' ')}`,
        ]
      : []),
    'END:VCARD',
  ].join('\n');
}

function openVCard(person, lang) {
  const vcard = generateVCard(person, lang);
  const encoded = encodeURIComponent(vcard);
  const uri = `data:text/vcard;charset=utf-8,${encoded}`;
  window.open(uri, '_self');
}

export default function Card() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const person = people.find((p) => p.id === id);

  if (!person) {
    return (
      <div className="card-page">
        <div className="card-not-found">
          <p>Card not found.</p>
          <Link to="/">{t('card.back')}</Link>
        </div>
      </div>
    );
  }

  const role = person.role[lang] || person.role.en;

  return (
    <div className="card-page">
      <div className="card-hero">
        <div className="aurora-bg">
          <Aurora
            colorStops={['#00D4FF', '#7B2FBE', '#FF006E']}
            amplitude={1.0}
            blend={0.5}
            speed={1.5}
          />
        </div>
        <div className="card-hero-overlay" />

        <div className="card-hero-content">
          <img src="/logo.png" alt="CultMix Live" className="card-logo" />
          <div className="card-avatar">
            {person.photo ? (
              <img
                src={person.photo}
                alt={person.name}
                className="card-avatar-photo"
                style={
                  person.photoObjectPosition
                    ? { objectPosition: person.photoObjectPosition }
                    : undefined
                }
              />
            ) : (
              <span className="card-avatar-initials">
                {person.name.split(' ').map((n) => n[0]).join('')}
              </span>
            )}
          </div>
          <h1 className="card-name">{person.name}</h1>
          <p className="card-role">{role}</p>
        </div>
      </div>

      <div className="card-body">
        <div className="card-actions">
          <a
            href={`https://wa.me/${person.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-action-btn whatsapp-btn"
          >
            <WhatsAppIcon />
            <span>{t('card.whatsapp')}</span>
          </a>
          <button
            className="card-action-btn save-btn"
            onClick={() => openVCard(person, lang)}
          >
            <UserPlus size={20} />
            <span>{t('card.saveContact')}</span>
          </button>
        </div>

        <a
          href="/CultMix-Live-Deck.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="deck-highlight"
        >
          <FileText size={22} />
          <div className="deck-highlight-text">
            <span className="deck-highlight-title">{t('card.deck')}</span>
            <span className="deck-highlight-desc">{t('card.deckDesc')}</span>
          </div>
        </a>

        <div className="card-info-list">
          <a href={`tel:${person.phone}`} className="card-info-item">
            <div className="card-info-icon">
              <Phone size={18} />
            </div>
            <div className="card-info-text">
              <span className="card-info-label">{t('card.phone')}</span>
              <span className="card-info-value">{person.phone}</span>
            </div>
          </a>

          {person.email ? (
            <a href={`mailto:${person.email}`} className="card-info-item">
              <div className="card-info-icon">
                <Mail size={18} />
              </div>
              <div className="card-info-text">
                <span className="card-info-label">{t('card.email')}</span>
                <span className="card-info-value">{person.email}</span>
              </div>
            </a>
          ) : null}

          <a
            href={`https://www.instagram.com/${person.instagram.replace(/^@/, '')}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-info-item"
          >
            <div className="card-info-icon">
              <InstagramIcon size={18} />
            </div>
            <div className="card-info-text">
              <span className="card-info-label">{t('card.instagram')}</span>
              <span className="card-info-value">{person.instagram}</span>
            </div>
          </a>

          <a
            href={person.website}
            target="_blank"
            rel="noopener noreferrer"
            className="card-info-item"
          >
            <div className="card-info-icon">
              <Globe size={18} />
            </div>
            <div className="card-info-text">
              <span className="card-info-label">{t('card.website')}</span>
              <span className="card-info-value">{person.website}</span>
            </div>
          </a>

          <div className="card-info-item card-info-item--static">
            <div className="card-info-icon">
              <MapPin size={18} />
            </div>
            <div className="card-info-text">
              <span className="card-info-label">{t('card.location')}</span>
              <span className="card-info-value">
                {person.location[lang] || person.location.en}
              </span>
            </div>
          </div>
        </div>
      </div>

      <footer className="card-footer">
        <p>&copy; {new Date().getFullYear()} CultMix Live. {t('footer.rights')}</p>
      </footer>
    </div>
  );
}
