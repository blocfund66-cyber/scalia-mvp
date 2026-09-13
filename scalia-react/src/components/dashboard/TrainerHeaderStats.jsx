import React from 'react';
import { useScalia } from '../../context/ScaliaContext';
import { tierParams } from '../../data/constants';

export const TrainerHeaderStats = () => {
  const {
    user,
    collateralActive,
    collateralLocked,
    dailyEarnings,
    trainerRating,
    ratingQuality,
    ratingTime,
    warningsCount,
    isSuspended,
    formatCurrency
  } = useScalia();

  const userTier = user?.tier || 'bronze';
  const tier = tierParams[userTier] || tierParams.bronze;

  const getRatingBadge = () => {
    if (isSuspended) {
      return { cls: 'badge-red', icon: 'ri-forbid-2-line', text: 'Suspendu' };
    }
    if (trainerRating >= 16.0) {
      return { cls: 'badge-emerald', icon: 'ri-medal-line', text: 'Excellence IA' };
    }
    if (trainerRating >= 12.0) {
      return { cls: 'badge-cyan', icon: 'ri-thumb-up-line', text: 'Conforme' };
    }
    if (trainerRating >= 10.0) {
      return { cls: 'badge-gold', icon: 'ri-alert-line', text: 'Vigilance' };
    }
    return { cls: 'badge-red', icon: 'ri-error-warning-line', text: 'Critique' };
  };

  const badge = getRatingBadge();

  return (
    <div className="trainer-header-stats">
      {/* 1. Daily Earnings */}
      <div className="stat-card">
        <div className="stat-icon"><i className="ri-line-chart-line"></i></div>
        <div className="stat-details">
          <span className="stat-label">Gains d'aujourd'hui</span>
          <span className="stat-value">{formatCurrency(dailyEarnings)}</span>
        </div>
      </div>

      {/* 2. Target Salary */}
      <div className="stat-card">
        <div className="stat-icon"><i className="ri-wallet-3-line"></i></div>
        <div className="stat-details">
          <span className="stat-label">Objectif Palier Actif</span>
          <span className="stat-value">
            {collateralActive ? tier.salaryText : "Collatéral requis"}
          </span>
        </div>
      </div>

      {/* 3. Locked Collateral */}
      <div className="stat-card">
        <div className="stat-icon"><i className="ri-shield-check-line"></i></div>
        <div className="stat-details">
          <span className="stat-label">Collatéral Verrouillé</span>
          <span className="stat-value">
            {collateralActive ? (
              formatCurrency(collateralLocked)
            ) : (
              <span style={{ color: '#ef4444', fontSize: '0.95rem', fontWeight: 700 }}>
                0 FCFA (Non activé)
              </span>
            )}
          </span>
        </div>
      </div>

      {/* 4. Trainer Rating out of 20 */}
      <div className="stat-card" id="stat-card-rating">
        <div className="stat-icon" style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.12)' }}>
          <i className="ri-star-line"></i>
        </div>
        <div className="stat-details">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span className="stat-label">Note Entraîneur</span>
            <span className={`badge ${badge.cls}`} style={{ fontSize: '0.7rem', padding: '2px 6px' }}>
              <i className={badge.icon}></i> {badge.text}
            </span>
          </div>
          <span className="stat-value">{trainerRating.toFixed(1)} / 20</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {warningsCount > 0 ? (
              <span style={{ color: '#ef4444', fontWeight: 700 }}>
                Avertissement {warningsCount}/3 • Qualité: {ratingQuality.toFixed(1)}/12
              </span>
            ) : (
              `Qualité: ${ratingQuality.toFixed(1)}/12 • Cadence: ${ratingTime.toFixed(1)}/8`
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
