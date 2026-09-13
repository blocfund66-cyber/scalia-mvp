import React, { useState, useEffect } from 'react';
import { useScalia } from '../../context/ScaliaContext';
import { tierParams, ScaliaPaymentConfig } from '../../data/constants';

export default function RecommendationModal() {
  const {
    activeModal,
    setActiveModal,
    selectedCheckoutTier,
    setSelectedCheckoutTier,
    activateCollateral,
    formatCurrency,
    showToast
  } = useScalia();

  const [selectedTier, setSelectedTier] = useState(selectedCheckoutTier || 'bronze');
  const [viewMode, setViewMode] = useState('select'); // 'select' | 'gateway'
  const [iframeLoading, setIframeLoading] = useState(true);

  useEffect(() => {
    if (selectedCheckoutTier) {
      setSelectedTier(selectedCheckoutTier);
    }
  }, [selectedCheckoutTier]);

  // Reset viewMode to 'select' whenever modal opens or closes
  useEffect(() => {
    if (!activeModal) {
      setViewMode('select');
      setIframeLoading(true);
    }
  }, [activeModal]);

  if (activeModal !== 'recommendation' && activeModal !== 'checkout') return null;

  const currentTier = tierParams[selectedTier] || tierParams.bronze;
  const payLink = ScaliaPaymentConfig.paymentLinks[selectedTier] || ScaliaPaymentConfig.paymentLinks.bronze;
  const inAppPayUrl = payLink.replace('https://pay.reeserva.com', '/pay-gateway');

  const handleOpenInAppGateway = () => {
    setViewMode('gateway');
    setIframeLoading(true);
  };

  const handleSimulatePayment = () => {
    activateCollateral(selectedTier);
    setActiveModal(null);
    setViewMode('select');
    showToast(
      "Console Activée avec Succès",
      `Félicitations ! Votre Palier ${currentTier.label} est activé. Vous pouvez dès maintenant commencer vos sessions rémunérées.`
    );
  };

  const tiersList = [
    { key: 'bronze', color: '#cd7f32', badge: '15 000 FCFA', desc: '⏱️ 2h/jour • CAPTCHA & Vidéo • 🎯 Cible : 30 000 - 50 000 FCFA/mois' },
    { key: 'silver', color: '#94a3b8', badge: '25 000 FCFA', desc: '⏱️ 3h/jour • + Textes LLM • 🎯 Cible : 70 000 - 120 000 FCFA/mois' },
    { key: 'gold', color: '#eab308', badge: '45 000 FCFA • Top Choix ⭐', desc: '⏱️ 4h/jour • Tous modules IA • 🎯 Cible : 130 000 - 180 000 FCFA/mois', recommended: true },
    { key: 'platinum', color: '#38bdf8', badge: '75 000 FCFA', desc: '⏱️ 6h/jour • Tous modules + Bonus +10% • 🎯 Cible : 190 000 - 250 000 FCFA/mois' },
    { key: 'diamond', color: '#a855f7', badge: '100 000 FCFA', desc: '⏱️ 8h/jour • Plein Temps + Bonus +20% • 🎯 Cible : 280 000 - 350 000 FCFA/mois' }
  ];

  return (
    <div className="modal-overlay" style={{ display: 'flex', zIndex: 1600 }}>
      <div className="glass-card watermark-container" style={{
        maxWidth: viewMode === 'gateway' ? '720px' : '600px',
        width: '95%',
        maxHeight: '94vh',
        overflowY: 'auto',
        padding: viewMode === 'gateway' ? '20px 20px 16px' : '24px 22px',
        borderRadius: '20px',
        textAlign: 'center',
        position: 'relative',
        transition: 'all 0.3s ease'
      }}>
        {/* Close button */}
        <button
          onClick={() => {
            setActiveModal(null);
            setViewMode('select');
          }}
          style={{
            position: 'absolute',
            top: '14px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '1.4rem',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            zIndex: 20
          }}
          title="Fermer"
        >
          ✕
        </button>

        {/* MODE 1: 5 TIERS SELECTION */}
        {viewMode === 'select' && (
          <>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.12)',
              color: 'var(--accent-emerald)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              marginBottom: '10px',
              boxShadow: '0 0 25px rgba(16, 185, 129, 0.25)'
            }}>
              <i className="ri-shield-check-line"></i>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px' }}>
              Choix de votre Formule d'Entraîneur
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 14px', lineHeight: 1.45 }}>
              Sélectionnez votre palier ci-dessous. Le collatéral de garantie est <strong>100% garanti sous séquestre sécurisé</strong> et intégralement restituable.
            </p>

            {/* 5 Tiers List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', textAlign: 'left' }}>
              {tiersList.map(t => {
                const isSelected = selectedTier === t.key;
                const tInfo = tierParams[t.key];
                return (
                  <div
                    key={t.key}
                    onClick={() => {
                      setSelectedTier(t.key);
                      if (setSelectedCheckoutTier) setSelectedCheckoutTier(t.key);
                    }}
                    style={{
                      border: isSelected ? '2px solid var(--accent-emerald)' : '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '11px 14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      background: isSelected ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-card)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input
                        type="radio"
                        name="react-rec-tier"
                        checked={isSelected}
                        onChange={() => {
                          setSelectedTier(t.key);
                          if (setSelectedCheckoutTier) setSelectedCheckoutTier(t.key);
                        }}
                        style={{ accentColor: 'var(--accent-emerald)', width: '17px', height: '17px', cursor: 'pointer' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.94rem', color: isSelected ? 'var(--text-primary)' : t.color }}>
                          Palier {tInfo.label} • {formatCurrency(tInfo.collateral)}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {t.desc}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`badge ${t.recommended ? 'badge-emerald' : ''}`}
                      style={{
                        background: t.recommended ? undefined : 'rgba(255,255,255,0.06)',
                        color: t.color,
                        fontSize: '0.74rem',
                        padding: '3px 9px',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {t.badge}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Selected Tier Banner */}
            <div style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '12px 16px',
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'left'
            }}>
              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Palier Sélectionné
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                  Palier {currentTier.label} ({currentTier.hours}h / jour)
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                  🎯 Objectif de gains : {currentTier.salaryText}/mois
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Collatéral Restituable</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                  {formatCurrency(currentTier.collateral)}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <button
                className="btn btn-primary-trainer"
                style={{
                  width: '100%',
                  padding: '13px',
                  fontSize: '0.96rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onClick={handleOpenInAppGateway}
              >
                <i className="ri-shield-keyhole-line"></i> Payer mon Collatéral sur le Guichet Intégré ({formatCurrency(currentTier.collateral)}) →
              </button>

              <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)' }}>
                ou valider immédiatement en environnement de test :
              </div>

              <button
                className="btn btn-secondary"
                onClick={handleSimulatePayment}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '0.84rem',
                  color: 'var(--accent-emerald)',
                  borderColor: 'rgba(16, 185, 129, 0.3)'
                }}
              >
                <i className="ri-checkbox-circle-line"></i> Confirmer & Activer la Console (Validation Démo)
              </button>

              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setActiveModal('terms')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    fontSize: '0.78rem',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                >
                  <i className="ri-shield-keyhole-line"></i> Consulter la Charte de Garantie du Collatéral (100% remboursable)
                </button>
              </div>
            </div>
          </>
        )}

        {/* MODE 2: IN-APP EMBEDDED PAYMENT GATEWAY */}
        {viewMode === 'gateway' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Top Toolbar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '12px',
              paddingRight: '36px'
            }}>
              <button
                type="button"
                onClick={() => setViewMode('select')}
                className="btn btn-secondary"
                style={{
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '8px'
                }}
              >
                <i className="ri-arrow-left-line"></i> Changer de Palier
              </button>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                  Guichet de Paiement Sécurisé
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                  Palier {currentTier.label} • {formatCurrency(currentTier.collateral)}
                </div>
              </div>

              <button
                type="button"
                onClick={() => window.open(payLink, '_blank')}
                title="Ouvrir en plein écran dans un nouvel onglet"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <i className="ri-external-link-line"></i>
                <span style={{ fontSize: '0.72rem' }}>Plein écran</span>
              </button>
            </div>

            {/* Escrow Guarantee Pill */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '0.75rem',
              color: 'var(--accent-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}>
              <i className="ri-lock-2-line"></i>
              <span>Guichet Chiffré SSL • Mobile Money (MTN, Orange) & Cartes Bancaires intégrés</span>
            </div>

            {/* Embedded Iframe */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '560px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)'
            }}>
              {iframeLoading && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--bg-card)',
                  zIndex: 10,
                  gap: '12px'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    border: '3px solid rgba(16,185,129,0.2)',
                    borderTopColor: 'var(--accent-emerald)',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }}></div>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    Chargement sécurisé du guichet de paiement...
                  </span>
                </div>
              )}
              <iframe
                src={inAppPayUrl}
                title="Guichet de Paiement Sécurisé Scalia"
                style={{ width: '100%', height: '100%', border: 'none' }}
                onLoad={() => setIframeLoading(false)}
              />
            </div>

            {/* Post-Payment Activation Button */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
              <button
                className="btn btn-primary-trainer"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onClick={handleSimulatePayment}
              >
                <i className="ri-checkbox-circle-fill"></i> J'ai effectué mon paiement → Activer ma Console
              </button>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Cliquez dès que vous avez finalisé le paiement sur le guichet ci-dessus pour déverrouiller vos tâches.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
