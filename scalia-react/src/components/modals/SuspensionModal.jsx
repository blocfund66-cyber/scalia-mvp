import React, { useState } from 'react';
import { useScalia } from '../../context/ScaliaContext';

export default function SuspensionModal() {
  const { activeModal, setActiveModal, showToast } = useScalia();
  const [appealText, setAppealText] = useState('');

  if (activeModal !== 'suspension') return null;

  const handleSubmitAppeal = () => {
    if (!appealText.trim() || appealText.trim().length < 15) {
      showToast("Précisez votre recours", "Veuillez détailler vos engagements pour améliorer la qualité de vos validations.", true);
      return;
    }
    showToast("Recours Transmis", "Votre demande a été enregistrée. Notre équipe qualité réexaminera votre dossier sous 24h.");
    setActiveModal(null);
    setAppealText('');
  };

  return (
    <div className="modal-overlay" style={{ display: 'flex' }}>
      <div className="modal-card" style={{ maxWidth: '520px' }}>
        <button className="modal-close-btn" onClick={() => setActiveModal(null)}>&times;</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            flexShrink: 0
          }}>
            <i className="ri-forbid-2-line"></i>
          </div>
          <div>
            <h3 className="modal-title" style={{ margin: 0, fontSize: '1.2rem', color: '#ef4444' }}>
              Suspension Temporaire de Compte
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Non-conformité qualité répétée (Score &lt; 10/20)
            </span>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '14px 16px',
          marginBottom: '16px',
          fontSize: '0.86rem',
          lineHeight: '1.45',
          color: 'var(--text-secondary)'
        }}>
          <p style={{ margin: '0 0 8px', color: 'var(--text-primary)', fontWeight: 600 }}>Motifs de la décision :</p>
          <ul style={{ margin: '0 0 10px', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <li>Moyenne des évaluations inférieure au seuil critique de rigueur (<strong style={{ color: '#ef4444' }}>10.0 / 20</strong>).</li>
            <li>Temps d'observation anormalement court ou réponses non argumentées signalées par le validateur IA.</li>
            <li>Cumul de 3 avertissements qualité consécutifs sans amélioration notable.</li>
          </ul>
          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '8px',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.8rem',
            color: 'var(--accent-emerald)'
          }}>
            <i className="ri-shield-check-line" style={{ fontSize: '1.1rem', flexShrink: 0 }}></i>
            <span><strong>Garantie financière :</strong> Votre collatéral et vos gains validés restent 100% sécurisés sous séquestre contractuel.</span>
          </div>
        </div>

        <div className="form-input-group" style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Déposer une demande de recours ou de réévaluation :</label>
          <textarea
            className="form-text-input"
            value={appealText}
            onChange={(e) => setAppealText(e.target.value)}
            placeholder="Expliquez les mesures prises pour améliorer la rigueur de votre travail d'annotation..."
            rows="3"
            style={{ resize: 'none', fontSize: '0.85rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn btn-primary-trainer"
            style={{ flex: 1, justifyContent: 'center', background: '#ef4444', borderColor: '#ef4444' }}
            onClick={handleSubmitAppeal}
          >
            <i className="ri-send-plane-line"></i> Soumettre mon recours
          </button>
          <button className="btn btn-secondary" onClick={() => setActiveModal(null)}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
