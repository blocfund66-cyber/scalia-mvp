import React, { useState } from 'react';
import { useScalia } from '../../context/ScaliaContext';

export default function PayoutIncidentModal() {
  const { activeModal, setActiveModal, payoutIncidentType, balance, collateralLocked, formatCurrency, showToast } = useScalia();
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (activeModal !== 'payout-incident') return null;

  const isCollateral = payoutIncidentType === 'collateral';

  const handleRefreshStatus = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast(
        "Statut Fournisseur Inchangé",
        "L'incident technique chez le fournisseur Mobile Money est toujours en cours de résolution par leurs équipes. Rétablissement sous peu.",
        true
      );
    }, 900);
  };

  const handleClose = () => {
    setActiveModal(null);
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
            <i className="ri-error-warning-fill"></i>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#d97706', fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px' }}>
                INCIDENT TECHNIQUE FOURNISSEUR • CODE 503-GW
              </span>
            </div>
            <h3 className="modal-title" style={{ margin: '4px 0 0', fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 800 }}>
              {isCollateral ? "Restitution du Collatéral Différée" : "Retrait de Salaire / Gains Différé"}
            </h3>
          </div>
        </div>

        {/* Incident Explanation Box */}
        <div style={{
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          borderRadius: '14px',
          padding: '16px 18px',
          marginBottom: '18px',
          fontSize: '0.88rem',
          lineHeight: '1.55',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d97706', fontWeight: 700, marginBottom: '8px', fontSize: '0.92rem' }}>
            <i className="ri-tools-line"></i>
            <span>Dysfonctionnement Passerelle Opérateur (Orange Money & MTN MoMo)</span>
          </div>
          <p style={{ margin: '0 0 10px' }}>
            {isCollateral
              ? `Votre demande de restitution de collatéral (${formatCurrency(collateralLocked)}) est temporairement suspendue. Une perturbation technique imprévue affecte actuellement l'API de décaissement automatisé de notre partenaire agrégateur télécom.`
              : `Votre demande de retrait de salaire (${formatCurrency(balance)}) est temporairement suspendue. Une perturbation technique imprévue affecte actuellement l'API de décaissement automatisé de notre partenaire agrégateur télécom.`}
          </p>
          <div style={{
            background: 'rgba(245, 158, 11, 0.08)',
            borderLeft: '3px solid #f59e0b',
            padding: '10px 12px',
            borderRadius: '0 8px 8px 0',
            fontSize: '0.84rem',
            color: 'var(--text-primary)'
          }}>
            <strong>Diagnostic Opérateur :</strong> Déploiement d'un correctif d'infrastructure réseau en cours. Les équipes techniques du fournisseur sont mobilisées et confirment que le service sera <strong>pleinement rétabli sous peu</strong>.
          </div>
        </div>

        {/* Funds Safety Reassurance Card */}
        <div style={{
          background: 'var(--accent-emerald-soft)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: '14px',
          padding: '14px 16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--accent-emerald)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            flexShrink: 0
          }}>
            <i className="ri-shield-check-fill"></i>
          </div>
          <div style={{ fontSize: '0.84rem', lineHeight: '1.45' }}>
            <strong style={{ color: 'var(--accent-emerald)', display: 'block', fontSize: '0.88rem', marginBottom: '2px' }}>
              Vos Fonds et Garanties Sont 100% Préservés & Sécurisés
            </strong>
            <span style={{ color: 'var(--text-secondary)' }}>
              Aucune déduction n'a été effectuée. Votre solde de salaire/gains (<b>{formatCurrency(balance)}</b>) ainsi que votre collatéral garanti sous séquestre (<b>{formatCurrency(collateralLocked)}</b>) demeurent intégralement protégés et disponibles sur votre compte.
            </span>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleRefreshStatus}
            disabled={isRefreshing}
            style={{ padding: '10px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <i className={`ri-refresh-line ${isRefreshing ? 'ri-spin' : ''}`}></i>
            {isRefreshing ? "Vérification..." : "Vérifier l'état"}
          </button>
          <button
            type="button"
            className="btn btn-primary-trainer"
            onClick={handleClose}
            style={{ flex: 1, padding: '10px 18px', fontSize: '0.9rem' }}
          >
            <i className="ri-checkbox-circle-line"></i> Compris, surveiller la reprise
          </button>
        </div>
      </div>
    </div>
  );
}
