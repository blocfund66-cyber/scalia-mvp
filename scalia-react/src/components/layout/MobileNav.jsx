import React from 'react';
import { useScalia } from '../../context/ScaliaContext';

export const MobileNav = () => {
  const { screen, setScreen, unreadNotifCount } = useScalia();

  const scrollToNotifs = () => {
    setScreen('dashboard');
    setTimeout(() => {
      const el = document.getElementById('trainer-notifications-container');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  return (
    <nav className="bottom-mobile-nav">
      <a
        href="#home"
        className={`mobile-nav-link ${screen === 'landing' ? 'active' : ''}`}
        onClick={(e) => { e.preventDefault(); setScreen('landing'); }}
      >
        <i className="ri-home-5-line"></i>
        <span>Accueil</span>
      </a>

      <a
        href="#dashboard"
        className={`mobile-nav-link ${screen === 'dashboard' ? 'active' : ''}`}
        onClick={(e) => { e.preventDefault(); setScreen('dashboard'); }}
      >
        <i className="ri-terminal-box-line"></i>
        <span>Entraîneur</span>
      </a>

      <a
        href="#referral"
        className={`mobile-nav-link ${screen === 'referral' ? 'active' : ''}`}
        onClick={(e) => { e.preventDefault(); setScreen('referral'); }}
      >
        <i className="ri-share-line"></i>
        <span>Parrainage</span>
      </a>

      <a
        href="#notifications"
        className={`mobile-nav-link ${screen === 'notifications' ? 'active' : ''}`}
        onClick={(e) => { e.preventDefault(); setScreen('notifications'); }}
      >
        <i className="ri-notification-3-line" style={{ position: 'relative' }}>
          {unreadNotifCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-5px',
                right: '-8px',
                background: 'var(--accent-emerald)',
                color: 'white',
                borderRadius: '9999px',
                fontSize: '0.62rem',
                padding: '1px 5px',
                fontWeight: 700
              }}
            >
              {unreadNotifCount}
            </span>
          )}
        </i>
        <span>Notifications</span>
      </a>

      <a
        href="#profile"
        className={`mobile-nav-link ${screen === 'profile' ? 'active' : ''}`}
        onClick={(e) => { e.preventDefault(); setScreen('profile'); }}
      >
        <i className="ri-user-settings-line"></i>
        <span>Profil</span>
      </a>
    </nav>
  );
};
