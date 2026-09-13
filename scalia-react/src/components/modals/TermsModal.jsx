import React from 'react';
import { useScalia } from '../../context/ScaliaContext';

export default function TermsModal() {
  const { activeModal, setActiveModal } = useScalia();

  if (activeModal !== 'terms') return null;

  return (
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
        border: '1px solid var(--border-color)',
        borderRadius: '24px',
        maxWidth: '780px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-emerald" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                <i className="ri-shield-check-fill"></i> Sceau de Séquestre Garanti
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Réglementation Scalia AI Labs</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Conditions Générales d'Utilisation & Charte de Séquestre
            </h3>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.4rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{
          padding: '24px 28px',
          overflowY: 'auto',
          fontSize: '0.88rem',
          lineHeight: 1.6,
          color: 'var(--text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Article 1 */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ color: 'var(--text-primary)', margin: '0 0 8px', fontSize: '0.98rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="ri-article-line" style={{ color: 'var(--accent-emerald)' }}></i>
              Article 1 — Statut Contractuel de l'Entraîneur d'IA
            </h4>
            <p style={{ margin: 0 }}>
              Tout utilisateur inscrit sur Scalia exerce à titre d'Entraîneur d'Intelligence Artificielle indépendant. Sa mission consiste à réaliser des sessions d'alignement RLHF (Reinforcement Learning from Human Feedback), d'annotation multimodale, de validation CAPTCHA et d'audit de sécurité des réponses générées par les modèles d'IA partenaires.
            </p>
          </div>

          {/* Article 2 */}
          <div style={{ background: 'rgba(16, 185, 129, 0.06)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
            <h4 style={{ color: 'var(--accent-emerald)', margin: '0 0 8px', fontSize: '0.98rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="ri-shield-keyhole-fill"></i>
              Article 2 — Garantie Intégrale du Collatéral Sous Séquestre (100% Restituable)
            </h4>
            <p style={{ margin: '0 0 8px', color: 'var(--text-primary)' }}>
              Le collatéral déposé lors de l'adhésion à l'un des 5 paliers (Bronze : 15 000 FCFA, Silver : 25 000 FCFA, Gold : 45 000 FCFA, Platinum : 75 000 FCFA, Diamond : 100 000 FCFA) constitue un dépôt de garantie sous séquestre contractuel bloqué.
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>Le collatéral reste la propriété exclusive de l'utilisateur durant toute la période contractuelle.</li>
              <li>Il est intégralement remboursable à 100% à l'issue de votre période d'activité ou sur simple demande écrite de clôture de compte.</li>
              <li>Les fonds sous séquestre sont ségrégués et protégés contre tout aléa opérationnel.</li>
            </ul>
          </div>

          {/* Article 3 */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ color: 'var(--text-primary)', margin: '0 0 8px', fontSize: '0.98rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="ri-money-cny-circle-line" style={{ color: 'var(--accent-cyan)' }}></i>
              Article 3 — Rémunérations Quotidiennes & Retraits Mobile Money
            </h4>
            <p style={{ margin: 0 }}>
              Chaque micro-tâche validée crédite immédiatement le portefeuille de l'entraîneur (50 FCFA pour CAPTCHA, 150 FCFA pour Vidéo, 400 FCFA pour Texte LLM, 950 FCFA pour Audit). Les retraits de solde disponible sont transférés directement vers les comptes de paiement officiels enregistrés (MTN MoMo ou Orange Money).
            </p>
          </div>

          {/* Article 4 */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ color: 'var(--text-primary)', margin: '0 0 8px', fontSize: '0.98rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="ri-scales-3-line" style={{ color: 'var(--accent-indigo)' }}></i>
              Article 4 — Charte Déontologique RLHF & Évaluation Qualité
            </h4>
            <p style={{ margin: 0 }}>
              L'entraîneur s'engage à effectuer chaque évaluation avec impartialité et sérieux. L'utilisation de robots d'automatisation, les clics aléatoires systématiques ou les validations instantanées répétées altèrent la justesse des modèles d'IA et font l'objet d'avertissements de qualité. Le compte est suspendu temporairement en cas de 3 avertissements avérés.
            </p>
          </div>

          {/* Article 5 */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ color: 'var(--text-primary)', margin: '0 0 8px', fontSize: '0.98rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="ri-lock-2-line" style={{ color: 'var(--accent-purple)' }}></i>
              Article 5 — Confidentialité & Propriété Intellectuelle
            </h4>
            <p style={{ margin: 0 }}>
              Les données soumises à labellisation (dialogues, textes, vidéos) sont strictement confidentielles. L'entraîneur s'interdit toute diffusion ou capture des données des modèles de fondation partenaires.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '18px 28px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px'
        }}>
          <button
            className="btn btn-secondary"
            onClick={() => setActiveModal(null)}
            style={{ padding: '10px 20px' }}
          >
            Fermer
          </button>
          <button
            className="btn btn-primary-trainer"
            onClick={() => {
              localStorage.setItem('scalia_cgu_accepted', 'true');
              setActiveModal(null);
            }}
            style={{ padding: '10px 24px' }}
          >
            <i className="ri-checkbox-circle-fill"></i> J'accepte les Conditions Générales
          </button>
        </div>
      </div>
    </div>
  );
}
