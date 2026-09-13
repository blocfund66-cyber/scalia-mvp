import React from 'react';
import { useScalia } from '../../context/ScaliaContext';
import { tierParams } from '../../data/constants';

export const TimeProgressTracker = () => {
  const { user, dailyTime, dailyTargetTime } = useScalia();

  const userTier = user?.tier || 'bronze';
  const tier = tierParams[userTier] || tierParams.bronze;

  const currentMin = Math.max(0, dailyTime);
  const targetMin = dailyTargetTime || 120;
  const pct = targetMin > 0 ? Math.min(100, Math.round((currentMin / targetMin) * 100)) : 0;

  return (
    <div className="progress-track-container">
      <div className="progress-label-row">
        <div>
          <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="ri-time-line" style={{ color: 'var(--accent-emerald)' }}></i>
            <span>Temps d'apprentissage validé aujourd'hui</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Quota requis : <strong style={{ color: 'var(--text-primary)' }}>{tier.hours} heures / jour</strong> pour débloquer votre rémunération mensuelle complète.
          </p>
        </div>
        <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--accent-emerald)' }}>
          {currentMin} min / {targetMin} min ({pct}%)
        </span>
      </div>
      <div className="progress-bar-outer">
        <div className="progress-bar-inner" style={{ width: `${pct}%` }}></div>
      </div>
    </div>
  );
};
