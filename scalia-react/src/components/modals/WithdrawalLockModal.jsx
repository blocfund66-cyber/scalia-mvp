import React from 'react';
import { useScalia } from '../../context/ScaliaContext';

export default function WithdrawalLockModal() {
  const {
    activeModal,
    setActiveModal,
    cycleWeeks,
    cycleDays,
    balance,
    collateralLocked,
    formatCurrency,
    setScreen
  } = useScalia();

  if (activeModal !== 'withdrawal-lock') return null;

  const daysRemaining = Math.max(0, 28 - cycleDays);
  const cyclePercent = Math.min(100, Math.round((cycleDays / 28) * 100));

  const handleClose = () => {
    setActiveModal(null);
  };

  const handleGoToTasks = () => {
    setActiveModal(null);
    setScreen('tasks');
  };

  return (
    <div className="modal-overlay" style={{ display: 'flex', zIndex: 1100 }}>
      <div className="modal-card" style={{ maxWidth: '560px', padding: '28px' }}>
        <button className="modal-close-btn" onClick={handleClose}>&times;</button>

        {/* Top Header Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(245, 158, 11, 0.15)',
            color: '#f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.7rem',
            flexShrink: 0,
            boxShadow: '0 0 15px rgba(245, 158, 11, 0.2)'
          }}>
            <i className="ri-time-line"></i>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#d97706', fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px' }}>
                ÉCHÉANCE DU CYCLE • RÈGLE DES 28 JOURS
              </span>
            </div>
            <h3 className="modal-title" style={{ margin: '4px 0 0', fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 800 }}>
              Retrait Non Disponible (Cycle en Cours)
            </h3>
          </div>
        </div>

        {/* High-visibility Warning Notice */}
        <div style={{
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '14px',
          padding: '16px 18px',
          marginBottom: '18px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start'
        }}>
          <i className="ri-error-warning-fill" style={{ color: '#d97706', fontSize: '1.4rem', flexShrink: 0, marginTop: '2px' }}></i>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#b45309', marginBottom: '4px' }}>
              Les retraits sont disponibles après 28 jours (au moins 5 000 FCFA)
            </div>
            <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Votre premier cycle d'entraînement est actuellement en cours. Conformément à la charte Scalia,
              les demandes de retraits de gains et de restitution de collatéral sont débloquées à terme échu
              après <strong>28 jours d'activité</strong> (1 mois complet).
            </p>
          </div>
        </div>

        {/* Progress & Stats Box */}
        <div style={{
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          borderRadius: '14px',
          padding: '16px 18px',
          marginBottom: '18px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Progression de votre cycle :
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f59e0b' }}>
              {cycleDays} jours / 28 ({cycleWeeks} semaines sur 4)
            </span>
          </div>

          <div style={{ height: '8px', background: 'rgba(0,0,0,0.1)', borderRadius: '6px', overflow: 'hidden', marginBottom: '14px' }}>
            <div style={{
              width: `${cyclePercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #f59e0b, #10b981)',
              borderRadius: '6px',
              transition: 'width 0.4s ease'
            }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: 'var(--bg-card)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Temps restant avant retrait</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                {daysRemaining} jour{daysRemaining > 1 ? 's' : ''}
              </div>
            </div>
            <div style={{ background: 'var(--bg-card)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Seuil minimum requis</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                5 000 FCFA
              </div>
            </div>
          </div>
        </div>

        {/* Security & Integrity Note */}
        <div style={{
          fontSize: '0.82rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.5',
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: '12px',
          padding: '12px 14px',
          marginBottom: '22px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          <i className="ri-shield-check-fill" style={{ color: 'var(--accent-emerald)', fontSize: '1.3rem', flexShrink: 0 }}></i>
          <div>
            Votre solde actuel de <strong>{formatCurrency(balance)}</strong> ainsi que votre collatéral sous séquestre de <strong>{formatCurrency(collateralLocked)}</strong> restent <strong>100% préservés et sécurisés</strong>. Continuez d'accomplir vos tâches pour maximiser vos gains à l'échéance.
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={handleClose} style={{ padding: '10px 18px', fontSize: '0.9rem' }}>
            Compris, fermer
          </button>
          <button className="btn btn-primary-trainer" onClick={handleGoToTasks} style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
            <i className="ri-play-circle-line"></i> Continuer mes exercices
          </button>
        </div>
      </div>
    </div>
  );
}
