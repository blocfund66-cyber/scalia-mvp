import React, { useState } from 'react';
import { useScalia } from '../../context/ScaliaContext';
import { tierParams } from '../../data/constants';

export default function OnboardingScreen() {
  const { loginUser, setScreen, showToast, fomoSeats } = useScalia();

  const [activeTab, setActiveTab] = useState('signup'); // 'signup' | 'login'
  const [selectedTier, setSelectedTier] = useState('bronze');
  const [showPassword, setShowPassword] = useState(false);
  const [showQuickPassword, setShowQuickPassword] = useState(false);

  // Form Fields
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [country, setCountry] = useState('Cameroun');
  const [city, setCity] = useState('Douala');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [refCode, setRefCode] = useState('');

  // Quick Unlock Password
  const [quickPassword, setQuickPassword] = useState('');

  const handleSelectTier = (tKey) => {
    setSelectedTier(tKey);
  };

  const handleSignupSubmit = (e) => {
    if (e) e.preventDefault();
    if (!firstname.trim() || !lastname.trim()) {
      showToast("Champs requis", "Veuillez renseigner votre nom et prénom.", true);
      return;
    }
    if (password.length < 4) {
      showToast("Mot de passe court", "Le mot de passe doit comporter au moins 4 caractères.", true);
      return;
    }

    const userData = {
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: email.trim() || `${firstname.toLowerCase()}.${lastname.toLowerCase()}@scalia.io`,
      country,
      city: city.trim() || 'Douala',
      role: 'entraineur',
      tier: selectedTier,
      username: `COACH-${firstname.substring(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      initials: `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase()
    };

    loginUser(userData);
  };

  const handleQuickUnlock = () => {
    const userData = {
      firstname: 'Jean',
      lastname: 'Baptiste',
      email: 'jean.baptiste@scalia.io',
      country: 'Cameroun',
      city: 'Douala',
      role: 'entraineur',
      tier: selectedTier || 'bronze',
      username: 'COACH-JB-5582',
      initials: 'JB'
    };
    loginUser(userData);
  };

  return (
    <div id="onboarding-screen" className="view-screen" style={{ display: 'block' }}>
      <div style={{ maxWidth: '920px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
          <button className="btn btn-secondary" onClick={() => setScreen('landing')} style={{ padding: '8px 16px' }}>
            <i className="ri-arrow-left-line"></i> <span>Retour</span>
          </button>
          <h1 style={{ fontSize: '2rem' }}>Rejoindre le Programme Scalia</h1>
        </div>

        {/* FOMO Onboarding Urgency Card */}
        <div style={{ background: 'rgba(225, 29, 72, 0.08)', border: '1px solid rgba(225, 29, 72, 0.35)', borderRadius: '14px', padding: '14px 20px', marginBottom: '25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-red)' }}>
            <i className="ri-fire-fill" style={{ fontSize: '1.4rem' }}></i>
            <span style={{ fontSize: '0.92rem', fontWeight: 700 }}>
              Urgence : Plus que <span>{fomoSeats.toLocaleString('fr-FR')}</span> places disponibles sur 50 000 !
            </span>
          </div>
          <span className="badge badge-red">8 nouvelles inscriptions !</span>
        </div>

        <div className="sim-tab-header">
          <button
            className={`sim-tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            <i className="ri-user-add-line"></i> <span>Créer un compte (Souscrire)</span>
          </button>
          <button
            className={`sim-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            <i className="ri-login-box-line"></i> <span>Se Connecter (Accès direct)</span>
          </button>
        </div>

        {/* 1. SIGNUP CONTAINER */}
        {activeTab === 'signup' && (
          <div id="onboard-signup-container">
            <div className="glass-card watermark-container" style={{ padding: '35px' }}>
              <div className="card-watermark watermark-training"></div>
              
              <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>Emploi IA Actif</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Devenir Entraîneur d'IA Certifié</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '20px' }}>
                Choisissez votre palier d'engagement quotidien. Votre collatéral sera placé sous séquestre sécurisé pour activer votre quota d'exercices et vous sera intégralement restitué.
              </p>

              <button type="button" className="btn-google-auth" onClick={handleQuickUnlock} style={{ marginBottom: '16px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"/>
                </svg>
                <span>Inscription rapide en 1 clic avec Google</span>
              </button>

              <div className="auth-separator">
                <span>OU inscription classique</span>
              </div>

              {/* 5 Tiers Selector */}
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                <span>Sélectionnez votre Palier de Travail :</span>
              </label>
              <div className="tier-selector">
                <div
                  className={`tier-card ${selectedTier === 'bronze' ? 'selected' : ''}`}
                  onClick={() => handleSelectTier('bronze')}
                >
                  <div className="tier-name">Bronze</div>
                  <div className="tier-salary">30k - 50k</div>
                  <div className="tier-meta">
                    <span>⏱️ 2h / j</span>
                    <span>🔒 15 000 FCFA</span>
                  </div>
                </div>

                <div
                  className={`tier-card ${selectedTier === 'silver' ? 'selected' : ''}`}
                  onClick={() => handleSelectTier('silver')}
                >
                  <div className="tier-name">Silver</div>
                  <div className="tier-salary">70k - 120k</div>
                  <div className="tier-meta">
                    <span>⏱️ 3h / j</span>
                    <span>🔒 25 000 FCFA</span>
                  </div>
                </div>

                <div
                  className={`tier-card ${selectedTier === 'gold' ? 'selected' : ''}`}
                  onClick={() => handleSelectTier('gold')}
                >
                  <div className="tier-name">Gold</div>
                  <div className="tier-salary">130k - 180k</div>
                  <div className="tier-meta">
                    <span>⏱️ 4h / j</span>
                    <span>🔒 45 000 FCFA</span>
                  </div>
                </div>

                <div
                  className={`tier-card ${selectedTier === 'platinum' ? 'selected' : ''}`}
                  onClick={() => handleSelectTier('platinum')}
                >
                  <div className="tier-name">Platinum</div>
                  <div className="tier-salary">190k - 250k</div>
                  <div className="tier-meta">
                    <span>⏱️ 6h / j</span>
                    <span>🔒 75 000 FCFA</span>
                  </div>
                </div>

                <div
                  className={`tier-card ${selectedTier === 'diamond' ? 'selected' : ''}`}
                  onClick={() => handleSelectTier('diamond')}
                >
                  <div className="tier-name">Diamond</div>
                  <div className="tier-salary">280k - 350k</div>
                  <div className="tier-meta">
                    <span>⏱️ 8h / j</span>
                    <span>🔒 100 000 FCFA</span>
                  </div>
                </div>
              </div>

              {/* Form fields */}
              <div className="form-row-2col">
                <div className="form-input-group">
                  <label>Prénom</label>
                  <input
                    type="text"
                    className="form-text-input"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder="Ex: Jean"
                  />
                </div>
                <div className="form-input-group">
                  <label>Nom de famille</label>
                  <input
                    type="text"
                    className="form-text-input"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Ex: Baptiste"
                  />
                </div>
              </div>

              <div className="form-row-2col">
                <div className="form-input-group">
                  <label>Pays de résidence</label>
                  <select
                    className="form-select"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="Cameroun">🇨🇲 Cameroun</option>
                    <option value="Côte d'Ivoire">🇨🇮 Côte d'Ivoire</option>
                    <option value="Sénégal">🇸🇳 Sénégal</option>
                    <option value="Bénin">🇧🇯 Bénin</option>
                    <option value="Togo">🇹🇬 Togo</option>
                    <option value="RDC">🇨🇩 RD Congo</option>
                    <option value="Gabon">🇬🇦 Gabon</option>
                    <option value="France">🇫🇷 France / Europe</option>
                  </select>
                </div>
                <div className="form-input-group">
                  <label>Ville</label>
                  <input
                    type="text"
                    className="form-text-input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Douala"
                  />
                </div>
              </div>

              <div className="form-row-2col">
                <div className="form-input-group">
                  <label>Compte Gmail / Adresse e-mail (Optionnel)</label>
                  <input
                    type="email"
                    className="form-text-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@gmail.com (optionnel)"
                  />
                </div>
                <div className="form-input-group">
                  <label>Mot de passe (Min. 4 caractères)</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-text-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      minLength={4}
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(prev => !prev)}
                      title="Afficher le mot de passe"
                    >
                      <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-input-group">
                <label>Code de parrainage (Optionnel)</label>
                <input
                  type="text"
                  className="form-text-input"
                  value={refCode}
                  onChange={(e) => setRefCode(e.target.value)}
                  placeholder="Ex: COACH-AMINA"
                  style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}
                />
              </div>

              <button
                className="btn btn-primary-trainer"
                style={{ width: '100%', marginTop: '15px' }}
                onClick={handleSignupSubmit}
              >
                <i className="ri-shield-check-line"></i> Souscrire & Déposer le Collatéral
              </button>
            </div>
          </div>
        )}

        {/* 2. LOGIN CONTAINER */}
        {activeTab === 'login' && (
          <div id="onboard-login-container" style={{ maxWidth: '580px', margin: '0 auto' }}>
            <div className="glass-card watermark-container" style={{ padding: '35px' }}>
              <div className="card-watermark watermark-training"></div>
              
              <div id="login-returning-card">
                <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
                  <i className="ri-shield-user-line"></i> Compte Reconnu
                </div>
                <h3 style={{ fontSize: '1.45rem', marginBottom: '6px' }}>Déverrouiller votre Console</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '20px' }}>
                  Votre session est protégée. Entrez votre mot de passe pour reprendre vos missions.
                </p>

                {/* Profile summary card */}
                <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div className="user-avatar" id="quick-login-avatar" style={{ width: '50px', height: '50px', fontSize: '1.3rem', flexShrink: 0, cursor: 'default' }}>
                    JB
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: '1.05rem', margin: '0 0 3px', fontWeight: 700 }}>Jean Baptiste</h4>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      JB-5582 • 📍 Douala, Cameroun
                    </div>
                    <span className="badge badge-emerald" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                      Palier Bronze
                    </span>
                  </div>
                </div>

                {/* Google button */}
                <button type="button" className="btn-google-auth" onClick={handleQuickUnlock} style={{ marginBottom: '16px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"/>
                  </svg>
                  <span>Déverrouiller avec Google</span>
                </button>

                <div className="auth-separator">
                  <span>OU avec votre mot de passe</span>
                </div>

                {/* Password only field */}
                <div className="form-input-group" style={{ marginBottom: '16px' }}>
                  <label>Mot de passe</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showQuickPassword ? 'text' : 'password'}
                      className="form-text-input"
                      value={quickPassword}
                      onChange={(e) => setQuickPassword(e.target.value)}
                      placeholder="••••••••"
                      minLength={4}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleQuickUnlock(); }}
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowQuickPassword(prev => !prev)}
                      title="Afficher le mot de passe"
                    >
                      <i className={showQuickPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
                    </button>
                  </div>
                </div>

                <button
                  className="btn btn-primary-trainer"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={handleQuickUnlock}
                >
                  <i className="ri-lock-unlock-line"></i> Déverrouiller ma Console
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
