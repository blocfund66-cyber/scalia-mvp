import React from 'react';
import { useScalia } from '../../context/ScaliaContext';

export const Sidebar = () => {
  const { screen, setScreen, logoutUser, unreadNotifCount } = useScalia();

  const scrollToNotifs = () => {
    setScreen('dashboard');
    setTimeout(() => {
      const el = document.getElementById('trainer-notifications-container');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  return (
    <aside className="sidebar">
      <div className="logo-container sidebar-logo" onClick={() => setScreen('landing')}>
        <img src="/assets/scalia_icon.svg" alt="Scalia" className="logo-icon" />
        <span>SCALIA</span>
      </div>

      <nav className="sidebar-nav">
        <a
          href="#home"
          className="sidebar-link"
          onClick={(e) => { e.preventDefault(); setScreen('landing'); }}
          style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '8px' }}
        >
          <i className="ri-home-5-line"></i>
          <span>Retour à l'accueil</span>
        </a>

        <a
          href="#dashboard"
          className={`sidebar-link ${screen === 'dashboard' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); setScreen('dashboard'); }}
        >
          <i className="ri-terminal-box-line"></i>
          <span>Console Entraîneur</span>
        </a>

        <a
          href="#referral"
          className={`sidebar-link ${screen === 'referral' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); setScreen('referral'); }}
        >
          <i className="ri-share-line"></i>
          <span>Parrainage</span>
        </a>

        <a
          href="#profile"
          className={`sidebar-link ${screen === 'profile' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); setScreen('profile'); }}
        >
          <i className="ri-user-settings-line"></i>
          <span>Mon Profil</span>
        </a>
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <a
          href="#notifications"
          className={`sidebar-link ${screen === 'notifications' ? 'active' : ''}`}
          id="sidebar-notifications-btn"
          onClick={(e) => { e.preventDefault(); setScreen('notifications'); }}
          style={{
            color: 'var(--accent-emerald)',
            background: screen === 'notifications' ? 'rgba(16, 185, 129, 0.16)' : 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            marginBottom: '2px'
          }}
        >
          <i className="ri-notification-3-line"></i>
          <span>Notifications</span>
          {unreadNotifCount > 0 && (
            <span className="badge badge-emerald" style={{ marginLeft: 'auto', fontSize: '0.72rem', padding: '2px 7px' }}>
              {unreadNotifCount}
            </span>
          )}
        </a>

        <a
          href="#logout"
          className="sidebar-link"
          onClick={(e) => { e.preventDefault(); logoutUser(); }}
        >
          <i className="ri-logout-box-r-line"></i>
          <span>Déconnexion</span>
        </a>
      </div>
    </aside>
  );
};
