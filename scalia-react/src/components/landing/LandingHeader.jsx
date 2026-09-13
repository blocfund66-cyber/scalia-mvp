import React from 'react';
import { useScalia } from '../../context/ScaliaContext';

export default function LandingHeader() {
  const { setScreen, theme, toggleTheme, user } = useScalia();

  return (
    <header className="landing-header" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div
        className="logo-container"
        onClick={() => setScreen('landing')}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <div className="logo-icon"><i className="ri-instance-line"></i></div>
        <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>SCALIA</span>
      </div>

      <nav className="landing-nav">
        <a href="#tiers-section">Paliers</a>
        <a href="#tiers-section" onClick={(e) => { e.preventDefault(); setScreen('onboarding'); }}>Missions</a>
        <a href="#tiers-section" onClick={(e) => { e.preventDefault(); setScreen('onboarding'); }}>Simulateur</a>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          style={{
            border: 'none',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.2rem',
            background: 'var(--bg-tertiary)',
            color: 'var(--text-primary)'
          }}
          title="Changer de thème"
        >
          <i className={theme === 'light' ? 'ri-sun-line' : 'ri-moon-line'}></i>
        </button>

        {user ? (
          <button
            className="btn btn-primary-trainer"
            style={{ padding: '8px 18px', fontSize: '0.88rem' }}
            onClick={() => setScreen('dashboard')}
          >
            <i className="ri-terminal-box-line"></i> Ma Console
          </button>
        ) : (
          <button
            className="btn btn-secondary"
            style={{ padding: '8px 18px', fontSize: '0.88rem' }}
            onClick={() => setScreen('onboarding')}
          >
            <i className="ri-login-box-line"></i> Se Connecter
          </button>
        )}
      </div>
    </header>
  );
}
