import React, { useState } from 'react';
import { useScalia } from '../../context/ScaliaContext';
import { tierParams } from '../../data/constants';

export const ReferralScreen = () => {
  const {
    user,
    trainerReferralCount,
    trainerReferralCommissions,
    trainerReferralTransactions,
    formatCurrency,
    showToast
  } = useScalia();

  const [customTag, setCustomTag] = useState('');
  const [simRole, setSimRole] = useState('bronze');

  const userCode = customTag || (user?.username ? user.username.replace(/^COACH-/, '') : 'TRAINER');
  const referralLink = `https://scalia.io/join?ref=COACH-${userCode.toUpperCase()}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    showToast("Lien Copié", "Votre lien de parrainage a été copié dans le presse-papiers !");
  };

  const simCollat = tierParams[simRole]?.collateral || 15000;
  const simComm = Math.round(simCollat * 0.05);

  return (
    <div>
      {/* Stats Row */}
      <div className="trainer-header-stats">
        <div className="stat-card">
          <div className="stat-icon" style={{ color: 'var(--accent-indigo)', background: 'var(--accent-indigo-soft)' }}>
            <i className="ri-group-line"></i>
          </div>
          <div className="stat-details">
            <span className="stat-label">Filleuls Entraîneurs</span>
            <span className="stat-value">{trainerReferralCount} personne{trainerReferralCount > 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ color: 'var(--accent-indigo)', background: 'var(--accent-indigo-soft)' }}>
            <i className="ri-coins-line"></i>
          </div>
          <div className="stat-details">
            <span className="stat-label">Commissions Touchées</span>
            <span className="stat-value" style={{ color: 'var(--accent-indigo)' }}>
              {formatCurrency(trainerReferralCommissions)}
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ color: 'var(--accent-emerald)', background: 'var(--accent-emerald-soft)' }}>
            <i className="ri-flashlight-line"></i>
          </div>
          <div className="stat-details">
            <span className="stat-label">Versement</span>
            <span className="stat-value" style={{ color: 'var(--accent-emerald)' }}>Instantané (5%)</span>
          </div>
        </div>
      </div>

      <div className="wallet-layout">
        {/* Left: Link Customization and Simulator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="ri-link" style={{ color: 'var(--accent-indigo)' }}></i>
              Mon Lien de Parrainage
            </h3>

            <div className="referral-link-row">
              <input type="text" className="form-text-input" value={referralLink} readOnly />
              <button className="btn btn-primary-trainer" style={{ background: 'var(--accent-indigo)', color: 'white' }} onClick={copyLink}>
                <i className="ri-file-copy-line"></i> Copier
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px dashed var(--border-color)', paddingTop: '15px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                Personnaliser mon identifiant :
              </label>
              <input
                type="text"
                className="form-text-input"
                placeholder="Ex: COACH123, RAPIDE, CHAMPION"
                style={{ fontSize: '0.85rem', textTransform: 'uppercase' }}
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Saisissez votre mot-clé pour mettre à jour la terminaison de votre lien en temps réel.
              </span>
            </div>
          </div>

          <div className="glass-card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="ri-calculator-line" style={{ color: 'var(--accent-indigo)' }}></i>
              Simulateur de Commission Filleul (5%)
            </h3>

            <div className="form-input-group">
              <label>Palier choisi par votre filleul</label>
              <select className="form-select" value={simRole} onChange={(e) => setSimRole(e.target.value)}>
                <option value="bronze">Bronze (Collatéral 15 000 FCFA | 30k-50k)</option>
                <option value="silver">Silver (Collatéral 25 000 FCFA | 70k-120k)</option>
                <option value="gold">Gold (Collatéral 45 000 FCFA | 130k-180k)</option>
                <option value="platinum">Platinum (Collatéral 75 000 FCFA | 190k-250k)</option>
                <option value="diamond">Diamond (Collatéral 100 000 FCFA | 280k-350k)</option>
              </select>
            </div>

            <div className="referral-sim-result-box">
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Votre gain instantané (5%) :</span>
              <span style={{ fontWeight: 700, color: 'var(--accent-emerald)', fontSize: '1.1rem' }}>
                {formatCurrency(simComm)}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Referral History */}
        <div className="tx-table-card">
          <h3 style={{ fontSize: '1.25rem' }}>
            <i className="ri-history-line" style={{ color: 'var(--accent-indigo)', marginRight: '8px' }}></i>
            Commissions reçues
          </h3>

          <div className="tx-table-container">
            <table>
              <thead>
                <tr>
                  <th>Filleul</th>
                  <th>Activité</th>
                  <th>Commission</th>
                  <th style={{ textAlign: 'right' }}>Statut</th>
                </tr>
              </thead>
              <tbody>
                {trainerReferralTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '35px 12px', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                      <i className="ri-user-shared-line" style={{ fontSize: '2rem', display: 'block', marginBottom: '8px', opacity: 0.5, color: 'var(--accent-indigo)' }}></i>
                      <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                        Aucun filleul actif pour le moment
                      </strong>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: '320px', display: 'inline-block', lineHeight: 1.4 }}>
                        Partagez votre lien ci-contre pour percevoir instantanément 5% de commission sur chaque collatéral déposé par un filleul !
                      </span>
                    </td>
                  </tr>
                ) : (
                  trainerReferralTransactions.map((item, idx) => (
                    <tr key={idx}>
                      <td><strong>{item.name}</strong></td>
                      <td><span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.role}</span></td>
                      <td style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>+{formatCurrency(item.commission)}</td>
                      <td style={{ textAlign: 'right' }}><span className="badge badge-emerald">{item.status}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
