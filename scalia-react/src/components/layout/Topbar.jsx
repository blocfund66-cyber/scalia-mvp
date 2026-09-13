import React, { useState } from 'react';
import { useScalia } from '../../context/ScaliaContext';

export const Topbar = () => {
  const { screen, setScreen, balance, formatCurrency, theme, toggleTheme, lang, changeLanguage, user } = useScalia();
  const [langOpen, setLangOpen] = useState(false);

  const getTitle = () => {
    if (screen === 'dashboard') return 'Console Entraîneur IA';
    if (screen === 'wallet') return 'Portefeuille Scalia';
    if (screen === 'referral') return 'Programme de Parrainage';
    return 'Console Entraîneur';
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2 id="topbar-title-text">{getTitle()}</h2>
      </div>

      <div className="topbar-right">
        {/* Language Selector */}
        <div className="lang-selector-container">
          <button
            type="button"
            className="lang-selector-btn topbar-lang"
            onClick={() => setLangOpen(prev => !prev)}
            title="Changer de langue"
          >
            <i className="ri-global-line"></i>
            <span>{lang.toUpperCase()}</span>
            <i className="ri-arrow-down-s-line" style={{ fontSize: '0.8rem' }}></i>
          </button>

          {langOpen && (
            <div className="lang-dropdown-menu down" style={{ display: 'block' }}>
              <div className={`lang-option ${lang === 'fr' ? 'active' : ''}`} onClick={() => { changeLanguage('fr'); setLangOpen(false); }}>
                <span className="lang-flag">🇫🇷</span>
                <span className="lang-name">Français</span>
                {lang === 'fr' && <i className="ri-check-line lang-check"></i>}
              </div>
              <div className={`lang-option ${lang === 'en' ? 'active' : ''}`} onClick={() => { changeLanguage('en'); setLangOpen(false); }}>
                <span className="lang-flag">🇬🇧</span>
                <span className="lang-name">English</span>
                {lang === 'en' && <i className="ri-check-line lang-check"></i>}
              </div>
              <div className={`lang-option ${lang === 'es' ? 'active' : ''}`} onClick={() => { changeLanguage('es'); setLangOpen(false); }}>
                <span className="lang-flag">🇪🇸</span>
                <span className="lang-name">Español</span>
                {lang === 'es' && <i className="ri-check-line lang-check"></i>}
              </div>
              <div className={`lang-option ${lang === 'ar' ? 'active' : ''}`} onClick={() => { changeLanguage('ar'); setLangOpen(false); }}>
                <span className="lang-flag">🇸🇦</span>
                <span className="lang-name">العربية</span>
                {lang === 'ar' && <i className="ri-check-line lang-check"></i>}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button className="theme-toggle-btn" onClick={toggleTheme} title="Changer de thème">
          <i className={theme === 'light' ? 'ri-sun-line' : 'ri-moon-line'}></i>
        </button>

        {/* Balance Badge (Direct Access to Portefeuille) */}
        <button
          type="button"
          className={`topbar-balance ${screen === 'wallet' ? 'active' : ''}`}
          onClick={() => setScreen('wallet')}
          title="Portefeuille Scalia & Retraits (Cliquer pour ouvrir)"
          style={{ font: 'inherit', border: 'none' }}
        >
          <i className="ri-wallet-3-line" style={{ color: 'var(--accent-emerald)' }}></i>
          <span>Solde :</span>
          <span className="topbar-balance-val">{formatCurrency(balance)}</span>
          <i className="ri-arrow-right-s-line" style={{ fontSize: '0.82rem', opacity: 0.6, marginLeft: '2px' }}></i>
        </button>

        {/* User Initials Avatar */}
        <div
          className="user-avatar"
          id="user-avatar-initials"
          onClick={() => setScreen('dashboard')}
          title={user ? `${user.firstname} ${user.lastname}` : 'Mon Profil'}
        >
          {user?.initials || 'JB'}
        </div>
      </div>
    </header>
  );
};
