import React, { useState } from 'react';
import { useScalia } from '../../context/ScaliaContext';
import { tierParams } from '../../data/constants';

export const WalletScreen = () => {
  const {
    balance,
    collateralActive,
    collateralLocked,
    user,
    transactions,
    cycleWeeks,
    cycleDays,
    isWithdrawalCycleReached,
    setTrainerCycle,
    formatCurrency,
    openCheckoutForTier,
    setActiveModal,
    showToast,
    addNotificationEvent,
    payoutIncidentType,
    setPayoutIncidentType
  } = useScalia();

  const [incidentAlert, setIncidentAlert] = useState(null); // null | 'salary' | 'collateral'

  const userTier = user?.tier || 'bronze';
  const tier = tierParams[userTier] || tierParams.bronze;

  const handleDeposit = () => {
    openCheckoutForTier(userTier);
  };

  // Retrait du Salaire / Gains disponibles
  const handleWithdraw = async () => {
    if (balance <= 0) {
      showToast(
        "Solde Insuffisant",
        "Vous n'avez aucun gain disponible à retirer pour le moment. Effectuez vos exercices rémunérés pour alimenter votre solde.",
        true
      );
      return;
    }

    // 1. AVANT 1 MOIS (avant 28 jours) : Message d'erreur officiel bloquant le retrait
    if (!isWithdrawalCycleReached) {
      showToast(
        "Retrait Non Disponible",
        `Les retraits sont disponibles après 28 jours (au moins 5 000 FCFA). Progression de votre cycle : ${cycleDays}/28 jours.`,
        true
      );
      setActiveModal('withdrawal-lock');

      if (typeof addNotificationEvent === 'function') {
        addNotificationEvent({
          category: 'finances',
          type: 'warning',
          icon: 'ri-time-line',
          badge: 'Règle des 28 Jours',
          title: 'Retrait non disponible : Cycle de 28 jours en cours',
          message: `Les retraits sont disponibles après 28 jours (au moins 5 000 FCFA). Votre progression actuelle est de ${cycleDays}/28 jours (${cycleWeeks} semaines sur 4). Vos gains restent 100% sécurisés.`,
          actionText: 'Voir conditions',
          actionModal: 'withdrawal-lock'
        });
      }
      return;
    }

    // 2. APRÈS 28 JOURS : Vérification du seuil minimum de 5 000 FCFA
    if (balance < 5000) {
      showToast(
        "Montant Minimum Requis",
        `Le montant minimum pour effectuer un retrait est de 5 000 FCFA. Votre solde disponible actuel est de ${formatCurrency(balance)}.`,
        true
      );
      setActiveModal('withdrawal-lock');
      return;
    }

    // 3. APRÈS 28 JOURS & SOLDE >= 5000 FCFA : Déclenchement de l'incident technique fournisseur Mobile Money
    // 1. Définir le type d'incident et afficher la bannière
    setIncidentAlert('salary');
    if (typeof setPayoutIncidentType === 'function') {
      setPayoutIncidentType('salary');
    }

    // 2. Ouvrir la modale officielle d'incident technique fournisseur
    setActiveModal('payout-incident');

    // 3. Journaliser l'incident dans le Centre de Notifications
    if (typeof addNotificationEvent === 'function') {
      addNotificationEvent({
        category: 'finances',
        type: 'warning',
        icon: 'ri-alarm-warning-fill',
        badge: 'Incident Fournisseur',
        title: 'Décaissement Salaire différé : Maintenance Passerelle Mobile Money',
        message: `Votre demande de retrait de salaire de ${formatCurrency(balance)} est momentanément suspendue en raison d'une perturbation technique chez le fournisseur de paiement (Orange Money & MTN MoMo). Vos fonds et votre collatéral restent 100% sécurisés sous séquestre. Rétablissement sous peu.`,
        actionText: "Détails de l'incident",
        actionModal: 'payout-incident'
      });
    }

    // 4. Afficher le toast d'avertissement
    showToast(
      "Incident Fournisseur en cours",
      "Anomalie temporaire sur la passerelle Mobile Money. Vos gains sont en sécurité et le service sera rétabli sous peu.",
      true
    );

    // 5. Consigner l'ordre suspendu dans l'historique des opérations
    const dateStr = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
    const pendingTx = {
      date: dateStr,
      type: 'Demande Retrait Salaire (API Mobile Money)',
      amount: -balance,
      status: 'Suspendu (Incident Fournisseur)',
      method: 'Passerelle API Mobile Money'
    };
    const existingTx = JSON.parse(localStorage.getItem('scalia_transactions') || '[]');
    localStorage.setItem('scalia_transactions', JSON.stringify([pendingTx, ...existingTx]));

    // 6. Appel de l'API backend pour synchronisation
    try {
      await fetch('/api/payout/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: balance, type: 'salary', cycleWeeks, cycleDays, timestamp: Date.now() })
      });
    } catch {}
  };

  // Retrait / Restitution du Collatéral de Garantie
  const handleWithdrawCollateral = async () => {
    if (!collateralActive || collateralLocked <= 0) {
      showToast(
        "Collatéral Non Disponible",
        "Aucun collatéral sous séquestre n'est actuellement enregistré sur votre compte.",
        true
      );
      return;
    }

    // 1. AVANT 1 MOIS (avant 28 jours) : Message d'erreur officiel bloquant la restitution
    if (!isWithdrawalCycleReached) {
      showToast(
        "Restitution Non Disponible",
        `La restitution de votre collatéral de garantie est disponible après 28 jours (cycle d'1 mois complété). Progression : ${cycleDays}/28 jours.`,
        true
      );
      setActiveModal('withdrawal-lock');

      if (typeof addNotificationEvent === 'function') {
        addNotificationEvent({
          category: 'finances',
          type: 'warning',
          icon: 'ri-time-line',
          badge: 'Collatéral sous Séquestre',
          title: 'Restitution collatéral : Cycle de 28 jours requis',
          message: `La restitution de votre collatéral de ${formatCurrency(collateralLocked)} intervient à l'échéance de votre cycle de 28 jours (1 mois). Progression actuelle : ${cycleDays}/28 jours. Vos garanties restent 100% sécurisées.`,
          actionText: 'Voir conditions',
          actionModal: 'withdrawal-lock'
        });
      }
      return;
    }

    // 2. APRÈS 28 JOURS : Déclenchement de l'incident technique fournisseur Mobile Money pour le collatéral
    // 1. Définir le type d'incident et afficher la bannière
    setIncidentAlert('collateral');
    if (typeof setPayoutIncidentType === 'function') {
      setPayoutIncidentType('collateral');
    }

    // 2. Ouvrir la modale officielle d'incident
    setActiveModal('payout-incident');

    // 3. Journaliser dans le Centre de Notifications
    if (typeof addNotificationEvent === 'function') {
      addNotificationEvent({
        category: 'finances',
        type: 'warning',
        icon: 'ri-alarm-warning-fill',
        badge: 'Incident Fournisseur',
        title: 'Restitution Collatéral différée : Maintenance Passerelle Mobile Money',
        message: `Votre demande de restitution de collatéral de ${formatCurrency(collateralLocked)} est momentanément suspendue en raison d'une perturbation technique chez le fournisseur de paiement (Orange & MTN). Vos garanties restent 100% sécurisées sous séquestre. Rétablissement sous peu.`,
        actionText: "Détails de l'incident",
        actionModal: 'payout-incident'
      });
    }

    // 4. Toast
    showToast(
      "Incident Fournisseur en cours",
      "Anomalie temporaire sur la passerelle Mobile Money. La restitution de votre collatéral sera traitée sous peu.",
      true
    );

    // 5. Consigner dans l'historique des opérations
    const dateStr = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
    const pendingTx = {
      date: dateStr,
      type: 'Demande Restitution Collatéral (API Mobile Money)',
      amount: -collateralLocked,
      status: 'Suspendu (Incident Fournisseur)',
      method: 'Passerelle API Mobile Money'
    };
    const existingTx = JSON.parse(localStorage.getItem('scalia_transactions') || '[]');
    localStorage.setItem('scalia_transactions', JSON.stringify([pendingTx, ...existingTx]));

    // 6. Appel API backend
    try {
      await fetch('/api/payout/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: collateralLocked, type: 'collateral', cycleWeeks, cycleDays, timestamp: Date.now() })
      });
    } catch {}
  };

  const exportCSV = () => {
    if (transactions.length === 0) {
      showToast("Aucune Donnée", "Aucune transaction à exporter pour le moment.", true);
      return;
    }
    let csv = "Date,Type,Methode,Montant,Statut\n";
    transactions.forEach(t => {
      csv += `"${t.date}","${t.type}","${t.method}",${t.amount},"${t.status}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "scalia_transactions.csv";
    a.click();
    showToast("Export Réussi", "Fichier CSV téléchargé avec succès.");
  };

  return (
    <div className="wallet-layout">
      {/* Left: Card balances & Collaterals */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Provider Outage / Incident Warning Banner - Uniquement déclenché lors d'une tentative de retrait */}
        {incidentAlert && (
          <div style={{
            background: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: '16px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
            boxShadow: '0 4px 18px rgba(245, 158, 11, 0.1)',
            position: 'relative'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(245, 158, 11, 0.18)',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              flexShrink: 0
            }}>
              <i className="ri-error-warning-fill"></i>
            </div>
            <div style={{ flex: 1, paddingRight: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <strong style={{ color: '#d97706', fontSize: '0.92rem' }}>
                  Avis d'Exploitation : Incident Fournisseur en cours de résolution
                </strong>
                <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#d97706', fontSize: '0.72rem', padding: '3px 8px' }}>
                  <i className="ri-time-line"></i> Rétablissement sous peu
                </span>
              </div>
              <p style={{ margin: '6px 0 0', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                La passerelle de transfert Mobile Money (Orange & MTN) effectue une maintenance corrective urgente sur son API de décaissement. Tout retrait demandé {incidentAlert === 'collateral' ? 'pour votre collatéral de garantie' : 'pour votre salaire d\'entraînement'} est temporairement suspendu. Vos gains et votre collatéral sous séquestre demeurent 100% préservés et sécurisés.
              </p>
              <div style={{ marginTop: '10px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ padding: '4px 12px', fontSize: '0.76rem', borderColor: 'rgba(245, 158, 11, 0.4)' }}
                  onClick={() => {
                    if (typeof setPayoutIncidentType === 'function') setPayoutIncidentType(incidentAlert);
                    setActiveModal('payout-incident');
                  }}
                >
                  <i className="ri-file-list-3-line"></i> Voir les détails de l'incident
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIncidentAlert(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'transparent',
                border: 'none',
                fontSize: '1.3rem',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                lineHeight: 1
              }}
              title="Masquer l'avis"
            >
              &times;
            </button>
          </div>
        )}

        <div className="wallet-card-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Portefeuille Scalia
              </h3>
              <span className="badge badge-emerald" style={{ marginTop: '8px' }}>
                <i className="ri-checkbox-circle-fill"></i> Compte Vérifié
              </span>
            </div>
            <i className="ri-bank-card-line" style={{ fontSize: '2.2rem', color: 'var(--accent-emerald)' }}></i>
          </div>

          <div className="wallet-balance-row">
            <span className="wallet-balance-title">Solde disponible</span>
            <div className="wallet-balance-big">{formatCurrency(balance)}</div>
          </div>

          <div className="wallet-actions-row">
            <button className="btn btn-primary-trainer" onClick={handleDeposit}>
              <i className="ri-add-line"></i> Déposer
            </button>
            <button className="btn btn-secondary" onClick={handleWithdraw}>
              <i className="ri-bank-card-line"></i> Retirer
            </button>
            <button
              className="btn btn-secondary wallet-btn-collateral"
              onClick={() => openCheckoutForTier(userTier)}
              title="Gérer ou alimenter mon collatéral via un lien de paiement"
            >
              <i className="ri-shield-check-line" style={{ color: 'var(--accent-emerald)', flexShrink: 0 }}></i>
              <span>Collatéral / Paylink</span>
            </button>
          </div>
        </div>

        {/* Training Cycle & Withdrawal Milestone Card */}
        <div className="collateral-list-card" style={{ padding: '18px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ margin: 0, fontSize: '0.98rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="ri-calendar-check-line" style={{ color: 'var(--accent-emerald)' }}></i>
              Échéance du Cycle d'Entraînement & Retrait
            </h4>
            <span className={`badge ${isWithdrawalCycleReached ? 'badge-emerald' : 'badge-amber'}`} style={{ fontSize: '0.75rem' }}>
              {isWithdrawalCycleReached ? "Délai d'1 mois atteint (4 semaines complétées)" : `Semaine ${cycleWeeks}/4`}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Progression de votre cycle :</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {cycleWeeks} semaines complétées ({cycleDays} jours / 28)
            </span>
          </div>

          <div style={{ height: '8px', background: 'var(--bg-tertiary)', borderRadius: '6px', overflow: 'hidden', marginBottom: '14px' }}>
            <div style={{
              width: `${Math.min(100, (cycleDays / 28) * 100)}%`,
              height: '100%',
              background: isWithdrawalCycleReached ? 'linear-gradient(90deg, #10b981, #06b6d4)' : 'linear-gradient(90deg, #f59e0b, #10b981)',
              borderRadius: '6px',
              transition: 'width 0.4s ease'
            }}></div>
          </div>
          <div style={{
            background: isWithdrawalCycleReached ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
            border: isWithdrawalCycleReached ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: '10px',
            padding: '10px 12px',
            marginBottom: '12px',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-secondary)'
          }}>
            <i className={isWithdrawalCycleReached ? "ri-checkbox-circle-fill" : "ri-information-fill"} style={{ color: isWithdrawalCycleReached ? '#10b981' : '#f59e0b', fontSize: '1.1rem', flexShrink: 0 }}></i>
            <span>
              {isWithdrawalCycleReached
                ? "Délai d'1 mois (28 jours) atteint : éligibilité aux décaissements Mobile Money débloquée."
                : "Les retraits sont disponibles après 28 jours d'activité (au moins 5 000 FCFA)."}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', paddingTop: '10px', borderTop: '1px dashed var(--border-color)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Simulation de l'échéance :
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                className={`btn btn-secondary ${!isWithdrawalCycleReached ? 'btn-active' : ''}`}
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                onClick={() => setTrainerCycle(2, 14)}
              >
                2 semaines (En cours)
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${isWithdrawalCycleReached ? 'btn-active' : ''}`}
                style={{ padding: '4px 10px', fontSize: '0.75rem', borderColor: isWithdrawalCycleReached ? 'var(--accent-emerald)' : undefined }}
                onClick={() => setTrainerCycle(4, 28)}
              >
                4 semaines (1 mois atteint) ✓
              </button>
            </div>
          </div>
        </div>

        {/* Collateral Security Card */}
        <div className="collateral-list-card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="ri-shield-keyhole-line" style={{ color: 'var(--accent-emerald)' }}></i>
            Garanties & Collatéral Bloqué
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '15px', lineHeight: 1.4 }}>
            Le collatéral garantit le respect de la cadence de labellisation et prend en charge les coûts opérationnels des serveurs d'IA. Il est intégralement restituable.
          </p>

          <div className="collateral-row-item">
            <div>
              <span style={{ fontWeight: 600, display: 'block' }}>Collatéral de formation IA</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Palier souscrit : <b>{collateralActive ? tier.label : "Aucun palier activé"}</b>
              </span>
            </div>
            <span style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>
              {formatCurrency(collateralActive ? collateralLocked : 0)}
            </span>
          </div>

          <div className="collateral-row-item">
            <div>
              <span style={{ fontWeight: 600, display: 'block' }}>Statut de sécurité</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Protection sous séquestre</span>
            </div>
            <span style={{ fontWeight: 700, color: collateralActive ? 'var(--accent-emerald)' : 'var(--text-secondary)' }}>
              {collateralActive ? "Verrouillé & Sécurisé" : "En attente de souscription"}
            </span>
          </div>

          {/* Action de retrait / restitution du collatéral */}
          {collateralActive && (
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed var(--border-color)' }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px 14px', fontWeight: 600, fontSize: '0.86rem' }}
                onClick={handleWithdrawCollateral}
              >
                <i className="ri-hand-coin-line" style={{ color: 'var(--accent-emerald)', fontSize: '1.15rem' }}></i>
                Demander le Retrait de mon Collatéral ({formatCurrency(collateralLocked)})
              </button>
            </div>
          )}

          <div style={{ marginTop: '18px', padding: '14px 16px', borderRadius: '14px', background: 'var(--accent-emerald-soft)', border: '1px solid rgba(16, 185, 129, 0.25)', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--accent-emerald)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
              <i className="ri-shield-check-fill"></i>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent-emerald)' }}>
                Garantie 100% Sécurisée & Restituable
              </span>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                Votre collatéral demeure votre propriété exclusive. Il est placé sous séquestre sécurisé et vous est automatiquement restitué à 100% sur votre solde disponible dès l'achèvement de votre cycle ou sur simple demande.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Transaction History */}
      <div className="tx-table-card">
        <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span><i className="ri-history-line" style={{ color: 'var(--accent-emerald)', marginRight: '8px' }}></i>Historique des opérations</span>
          <button className="btn btn-secondary" onClick={exportCSV} style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '8px' }}>
            Exporter CSV
          </button>
        </h3>

        <div className="tx-table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type d'opération</th>
                <th>Source / Mode</th>
                <th style={{ textAlign: 'right' }}>Montant</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '35px 12px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <i className="ri-inbox-line" style={{ fontSize: '1.8rem', display: 'block', marginBottom: '8px', opacity: 0.5 }}></i>
                    Aucune transaction enregistrée pour le moment
                  </td>
                </tr>
              ) : (
                transactions.map((tx, idx) => {
                  const isPos = tx.amount > 0;
                  const isIncident = tx.status && tx.status.includes('Incident');
                  return (
                    <tr key={idx}>
                      <td>{tx.date}</td>
                      <td>
                        <strong>{tx.type}</strong>
                        {tx.status && (
                          <div style={{ marginTop: '4px' }}>
                            <span
                              className={`badge ${isIncident ? 'badge-amber' : tx.status === 'En cours' ? 'badge-cyan' : 'badge-emerald'}`}
                              style={{
                                fontSize: '0.68rem',
                                padding: '2px 6px',
                                background: isIncident ? 'rgba(245, 158, 11, 0.15)' : undefined,
                                color: isIncident ? '#d97706' : undefined
                              }}
                            >
                              <i className={isIncident ? "ri-error-warning-line" : "ri-checkbox-circle-line"} style={{ marginRight: '3px' }}></i>
                              {tx.status}
                            </span>
                          </div>
                        )}
                      </td>
                      <td><span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{tx.method}</span></td>
                      <td style={{ textAlign: 'right', fontWeight: 700, color: isPos ? 'var(--accent-emerald)' : isIncident ? '#d97706' : 'var(--text-primary)' }}>
                        {isPos ? '+' : ''}{formatCurrency(tx.amount)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
