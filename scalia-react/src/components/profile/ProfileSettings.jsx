import React, { useState } from 'react';
import { useScalia } from '../../context/ScaliaContext';
import { tierParams } from '../../data/constants';

export const ProfileSettings = () => {
  const {
    user,
    setUser,
    collateralActive,
    collateralLocked,
    trainerRating,
    formatCurrency,
    showToast,
    setScreen
  } = useScalia();

  const userTier = user?.tier || 'bronze';
  const tier = tierParams[userTier] || tierParams.bronze;

  // Personal Info Form
  const [firstname, setFirstname] = useState(user?.firstname || '');
  const [lastname, setLastname] = useState(user?.lastname || '');
  const [email, setEmail] = useState(user?.email || 'jean.baptiste@gmail.com');
  const [country, setCountry] = useState(user?.country || 'Cameroun');
  const [city, setCity] = useState(user?.city || 'Douala');

  // Security Form
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Certificate Modal State
  const [showCertModal, setShowCertModal] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...user,
      firstname,
      lastname,
      email,
      country,
      city,
      initials: ((firstname[0] || 'S') + (lastname[0] || 'C')).toUpperCase()
    };
    setUser(updated);
    localStorage.setItem('scalia_firstname', firstname);
    localStorage.setItem('scalia_lastname', lastname);
    localStorage.setItem('scalia_email', email);
    localStorage.setItem('scalia_country', country);
    localStorage.setItem('scalia_city', city);
    localStorage.setItem('scalia_initials', updated.initials);

    showToast("Profil Actualisé", "Vos informations personnelles ont été enregistrées avec succès.");
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showToast("Mot de Passe Trop Court", "Le mot de passe doit comporter au moins 6 caractères.", true);
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("Mots de Passe Différents", "La confirmation ne correspond pas au nouveau mot de passe.", true);
      return;
    }
    localStorage.setItem('scalia_password', newPassword);
    setCurrPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast("Sécurité", "Votre mot de passe a été mis à jour avec succès.");
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px' }}>
      {/* Top Banner Header */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '20px',
        padding: '24px 28px',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-emerald), #059669)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.6rem',
            fontWeight: 800,
            boxShadow: '0 4px 14px rgba(16,185,129,0.35)'
          }}>
            {user?.initials || 'SC'}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                {firstname || 'Entraîneur'} {lastname}
              </h2>
              <span className="badge badge-emerald" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                <i className="ri-shield-check-fill"></i> Entraîneur Certifié
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                ID : {user?.username || 'COACH-5582'}
              </span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {country} • {city} • Palier {tier.label} ({collateralActive ? 'Actif' : 'En attente'})
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            className="btn btn-secondary"
            onClick={() => setScreen('dashboard')}
            style={{ fontSize: '0.85rem', padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <i className="ri-arrow-left-line"></i> Retour Console
          </button>
          <button
            className="btn btn-primary-trainer"
            onClick={() => setShowCertModal(true)}
            style={{ fontSize: '0.85rem', padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <i className="ri-medal-fill"></i> Mon Certificat
          </button>
        </div>
      </div>

      {/* Grid of Settings Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* 1. Informations Personnelles */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <i className="ri-user-3-line" style={{ color: 'var(--accent-emerald)' }}></i>
            Fiche Personnelle
          </h3>
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Prénom</label>
                <input
                  type="text"
                  className="form-text-input"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="Votre prénom"
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Nom</label>
                <input
                  type="text"
                  className="form-text-input"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Votre nom"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Adresse Email</label>
              <input
                type="email"
                className="form-text-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@gmail.com"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Pays</label>
                <select
                  className="form-text-input"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <option value="Cameroun">🇨🇲 Cameroun</option>
                  <option value="Côte d'Ivoire">🇨🇮 Côte d'Ivoire</option>
                  <option value="Sénégal">🇸🇳 Sénégal</option>
                  <option value="Bénin">🇧🇯 Bénin</option>
                  <option value="Togo">🇹🇬 Togo</option>
                  <option value="Mali">🇲🇱 Mali</option>
                  <option value="Burkina Faso">🇧🇫 Burkina Faso</option>
                  <option value="RD Congo">🇨🇩 RD Congo</option>
                  <option value="Gabon">🇬🇦 Gabon</option>
                  <option value="Guinée">🇬🇳 Guinée</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Ville</label>
                <input
                  type="text"
                  className="form-text-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ex: Douala, Abidjan..."
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary-trainer" style={{ marginTop: '6px' }}>
              <i className="ri-save-line"></i> Enregistrer mon Profil
            </button>
          </form>
        </div>

        {/* 2. Passerelle Mobile Money Directe */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <i className="ri-shield-flash-line" style={{ color: 'var(--accent-emerald)' }}></i>
            Passerelle Directe API Mobile Money
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.5 }}>
            Toutes les transactions (dépôt du collatéral et déboursements de vos gains) s'effectuent directement via l'API officielle sécurisée.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px 14px', background: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="ri-checkbox-circle-fill" style={{ color: 'var(--accent-emerald)', fontSize: '1.2rem' }}></i>
              <div style={{ fontSize: '0.84rem' }}>
                <strong>Choix direct via l'API :</strong> La sélection de l'opérateur (Orange ou MTN) et la saisie du numéro s'effectuent directement sur l'interface de paiement officielle.
              </div>
            </div>

            <div style={{ padding: '12px 14px', background: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="ri-lock-2-line" style={{ color: 'var(--accent-cyan)', fontSize: '1.2rem' }}></i>
              <div style={{ fontSize: '0.84rem' }}>
                <strong>Chiffrement de bout en bout :</strong> Vos coordonnées téléphoniques et transactions ne transitent par aucun formulaire intermédiaire non sécurisé.
              </div>
            </div>
          </div>
        </div>

        {/* 3. Sécurité & Mot de passe */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <i className="ri-lock-password-line" style={{ color: 'var(--accent-emerald)' }}></i>
            Sécurité du Compte
          </h3>
          <form onSubmit={handleSavePassword} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Nouveau Mot de Passe</label>
              <input
                type="password"
                className="form-text-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Au moins 6 caractères"
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Confirmer le Nouveau Mot de Passe</label>
              <input
                type="password"
                className="form-text-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmez à l'identique"
                style={{ width: '100%' }}
              />
            </div>
            <button type="submit" className="btn btn-secondary" style={{ marginTop: '6px' }}>
              <i className="ri-key-line"></i> Mettre à Jour mon Mot de Passe
            </button>
          </form>
        </div>

        {/* 4. Statut Contractuel & Séquestre */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <i className="ri-file-shield-2-line" style={{ color: 'var(--accent-emerald)' }}></i>
            Statut Contractuel & Séquestre
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Palier Contractuel :</span>
              <strong style={{ color: 'var(--accent-emerald)' }}>{tier.label} ({formatCurrency(tier.collateral)})</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Garantie Séquestre :</span>
              <strong style={{ color: collateralActive ? 'var(--accent-emerald)' : 'var(--text-secondary)' }}>
                {collateralActive ? '100% Verrouillé & Restituable' : 'En attente d\'activation'}
              </strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Note de Qualité RLHF :</span>
              <strong style={{ color: 'var(--accent-cyan)' }}>{trainerRating.toFixed(1)} / 20</strong>
            </div>

            <button
              className="btn btn-primary-trainer"
              onClick={() => setShowCertModal(true)}
              style={{ width: '100%', marginTop: '6px' }}
            >
              <i className="ri-award-fill"></i> Consulter mon Attestation Agréée
            </button>
          </div>
        </div>

      </div>

      {/* Official Certificate Modal */}
      {showCertModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '2px solid var(--accent-emerald)',
            borderRadius: '24px',
            maxWidth: '650px',
            width: '100%',
            padding: '36px',
            position: 'relative',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            textAlign: 'center'
          }}>
            <button
              onClick={() => setShowCertModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                fontSize: '1.4rem',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              <i className="ri-close-line"></i>
            </button>

            {/* Certificate Header */}
            <div style={{ width: '68px', height: '68px', margin: '0 auto 16px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #047857)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#fff', boxShadow: '0 8px 24px rgba(16,185,129,0.4)' }}>
              <i className="ri-medal-fill"></i>
            </div>
            <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
              SCALIA AI WORKFORCE LABS • ATTESTATION OFFICIELLE
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '8px 0 16px', color: 'var(--text-primary)' }}>
              Certificat d'Entraîneur d'IA Agréé
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 auto 24px', maxWidth: '520px' }}>
              Délivré à l'attention de <strong>{firstname || 'Jean'} {lastname || 'Baptiste'}</strong> (ID : <strong>{user?.username || 'COACH-5582'}</strong>), certifiant son habilitation active sur les protocoles de renforcement RLHF, de labellisation multimodale et de validation CAPTCHA / Vidéo.
            </p>

            {/* Badges Matrix */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '14px', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Palier Homologué</span>
                <strong style={{ fontSize: '0.95rem', color: 'var(--accent-emerald)' }}>{tier.label}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Note Qualité</span>
                <strong style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)' }}>{trainerRating.toFixed(1)} / 20</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Collatéral Séquestre</span>
                <strong style={{ fontSize: '0.95rem', color: 'var(--accent-emerald)' }}>100% Garanti</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                className="btn btn-primary-trainer"
                onClick={() => {
                  window.print();
                }}
                style={{ padding: '10px 24px' }}
              >
                <i className="ri-printer-line"></i> Imprimer / Enregistrer en PDF
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowCertModal(false)}
                style={{ padding: '10px 24px' }}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
