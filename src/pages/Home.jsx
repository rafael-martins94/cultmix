import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import Aurora from '../components/Aurora/Aurora';
import { people } from '../data/people';
import './Home.css';

export default function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="home">
      <section className="hero">
        <div className="aurora-bg">
          <Aurora
            colorStops={['#00D4FF', '#7B2FBE', '#FF006E']}
            amplitude={1.2}
            blend={0.6}
            speed={1.5}
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <img src="/logo.png" alt="CultMix Live" className="hero-logo" />
          <p className="hero-motto">BREAKING PARADIGMS WITH<br />ART IS OUR CORE BUSINESS</p>
        </div>
      </section>

      <section className="team-section">
        <h2 className="section-title">{t('home.title')}</h2>
        <div className="team-list">
          {people.map((person) => (
            <Link to={`/${person.id}`} key={person.id} className="team-card">
              <div className="team-card-avatar">
                {person.photo ? (
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="avatar-photo"
                    style={
                      person.photoObjectPosition
                        ? { objectPosition: person.photoObjectPosition }
                        : undefined
                    }
                  />
                ) : (
                  <span className="avatar-initials">
                    {person.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                )}
              </div>
              <div className="team-card-info">
                <h3 className="team-card-name">{person.name}</h3>
                <p className="team-card-role">{person.role[lang] || person.role.en}</p>
              </div>
              <ChevronRight size={20} className="team-card-arrow" />
            </Link>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} CultMix Live. {t('footer.rights')}</p>
      </footer>
    </div>
  );
}
