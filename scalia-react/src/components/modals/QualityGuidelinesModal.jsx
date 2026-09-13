import React from 'react';
import { useScalia } from '../../context/ScaliaContext';

export default function QualityGuidelinesModal() {
  const { activeModal, setActiveModal } = useScalia();

  if (activeModal !== 'guidelines') return null;

  return (
    <div className="modal-overlay" style={{ display: 'flex' }}>
      <div className="modal-card" style={{ maxWidth: '540px' }}>
        <button className="modal-close-btn" onClick={() => setActiveModal(null)}>&times;</button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'var(--accent-emerald-soft)',
            color: 'var(--accent-emerald)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            flexShrink: 0
          }}>
            <i className="ri-book-open-line"></i>
          </div>
          <div>
            <h3 className="modal-title" style={{ margin: 0, fontSize: '1.2rem' }}>Guide des Bonnes Pratiques IA</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Maintenir votre note au-dessus de 16/20</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
          <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '12px 14px' }}>
            <strong style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <i className="ri-eye-line" style={{ color: 'var(--accent-emerald)' }}></i> 1. Attention & Visionnage Intégral
            </strong>
            <span>Regardez chaque publicité pendant la totalité des 8 secondes. L'algorithme détecte et pénalise toute tentative de validation prématurée.</span>
          </div>

          <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '12px 14px' }}>
            <strong style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <i className="ri-edit-line" style={{ color: 'var(--accent-cyan)' }}></i> 2. Rétroaction Rédigée & Factuelle
            </strong>
            <span>Évitez les mots isolés (ex: "bien", "ok"). Formulez des remarques précises sur le cadrage, l'audio ou les faits erronés dans les textes LLM pour obtenir la note maximale de 12/12 en rigueur.</span>
          </div>

          <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '12px 14px' }}>
            <strong style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <i className="ri-time-line" style={{ color: '#f59e0b' }}></i> 3. Régularité & Respect du Temps
            </strong>
            <span>Respectez la cadence d'heures quotidienne prévue par votre palier pour maximiser vos gains et consolider votre score de régularité (8/8).</span>
          </div>
        </div>

        <button
          className="btn btn-primary-trainer"
          style={{ width: '100%', justifyContent: 'center', marginTop: '18px' }}
          onClick={() => setActiveModal(null)}
        >
          J'ai compris, reprendre mes tâches
        </button>
      </div>
    </div>
  );
}
