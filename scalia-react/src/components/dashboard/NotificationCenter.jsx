import React, { useState } from 'react';
import { useScalia } from '../../context/ScaliaContext';
import { tierParams } from '../../data/constants';

export const NotificationCenter = () => {
  const {
    collateralActive,
    user,
    dailyTime,
    dailyTargetTime,
    trainerRating,
    ratingQuality,
    ratingTime,
    warningsCount,
    isSuspended,
    openCheckoutForTier,
    setActiveModal,
    markNotificationsAsRead,
    notificationsRead,
    notificationHistory = [],
    deleteNotification,
    clearAllNotifications
  } = useScalia();

  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'tasks' | 'finances' | 'quality'

  const userTier = user?.tier || 'bronze';
  const tier = tierParams[userTier] || tierParams.bronze;

  const currentMin = Math.max(0, dailyTime);
  const targetMin = dailyTargetTime || 120;
  const isGoalReached = currentMin >= targetMin;

  const getSystemNotifications = () => {
    const list = [];

    if (isSuspended) {
      list.push({
        id: 'notif-suspended',
        category: 'quality',
        type: 'critical',
        icon: 'ri-error-warning-fill',
        badge: 'Suspension Temporaire',
        title: 'Compte Entraîneur Suspendu pour Non-Conformité Qualité (< 10/20)',
        message: 'Suite à des évaluations répétées non conformes aux critères de rigueur exigés par les laboratoires d\'IA, l\'accès aux exercices a été temporairement suspendu. Votre collatéral demeure 100% sécurisé sous séquestre contractuel.',
        time: 'Prioritaire',
        actionText: 'Consulter mon Dossier & Déposer un Recours',
        action: () => setActiveModal('suspension')
      });
      return list;
    }

    if (warningsCount > 0) {
      const isLast = warningsCount >= 2;
      list.push({
        id: 'notif-warning',
        category: 'quality',
        type: 'warning',
        icon: 'ri-alert-fill',
        badge: isLast ? 'Dernier Rappel' : `Avertissement Qualité (${warningsCount}/3)`,
        title: isLast ? 'Dernier Avertissement avant Suspension de Compte' : 'Attention requise sur la qualité de vos évaluations',
        message: `Votre note globale est de ${trainerRating.toFixed(1)}/20. Les réponses trop brèves, les validations précipitées ou les erreurs répétées altèrent la fiabilité des modèles d'IA. Prenez le temps d'évaluer avec minutie.`,
        time: 'Important',
        actionText: 'Consulter les Recommandations de Qualité IA',
        action: () => setActiveModal('guidelines')
      });
    }

    if (!collateralActive) {
      list.push({
        id: 'notif-subscribe-cta',
        category: 'finances',
        type: 'cta',
        icon: 'ri-flashlight-line',
        badge: 'Action Requise',
        title: 'Activez votre Collatéral Garanti pour débloquer vos Tâches Rémunérées',
        message: 'Félicitations pour votre inscription ! Pour commencer à entraîner les modèles d\'IA et percevoir de 30 000 à 350 000 FCFA/mois, choisissez parmi nos 5 formules. Votre collatéral est placé sous séquestre sécurisé et 100% remboursable à terme.',
        time: 'À l\'instant',
        actionText: 'Choisir mon Palier (5 formules dès 15 000 FCFA) →',
        action: () => setActiveModal('recommendation')
      });
    } else {
      list.push({
        id: 'notif-rigor-tip',
        category: 'quality',
        type: 'tip',
        icon: 'ri-sparkling-line',
        badge: 'Conseil de Rigueur IA',
        title: 'Précision et Méthode : La clé d\'une Note d\'Excellence',
        message: 'Nos laboratoires partenaires (Mistral, OpenAI, Anthropic...) rémunèrent la haute précision. Prenez au moins 8 à 15 secondes pour évaluer chaque élément et formulez des critiques constructives pour maintenir votre note au-dessus de 16/20.',
        time: 'Recommandation',
        actionText: 'Guide des Bonnes Pratiques',
        action: () => setActiveModal('guidelines')
      });

      list.push({
        id: 'notif-daily-goal',
        category: 'tasks',
        type: isGoalReached ? 'success' : 'progress',
        icon: isGoalReached ? 'ri-checkbox-circle-line' : 'ri-compass-3-line',
        badge: isGoalReached ? 'Objectif Atteint' : 'Assiduité Quotidienne',
        title: isGoalReached ? 'Quota du Jour Accompli avec Succès !' : `Objectif Quotidien en Cours : ${currentMin} / ${targetMin} min`,
        message: isGoalReached
          ? 'Bravo ! Vous avez validé votre temps de travail quotidien. Vos gains de la journée sont définitivement sécurisés.'
          : `Il vous reste ${targetMin - currentMin} minutes pour compléter votre quota horaire du Palier ${tier.label} et valider votre rémunération mensuelle intégrale.`,
        time: 'Aujourd\'hui',
        actionText: null,
        action: null
      });

      if (trainerRating >= 16.0) {
        list.push({
          id: 'notif-excellence-badge',
          category: 'quality',
          type: 'success',
          icon: 'ri-medal-line',
          badge: 'Profil Élite ⭐',
          title: `Note d'Excellence : ${trainerRating.toFixed(1)} / 20`,
          message: `Votre rigueur et votre respect des temps d'apprentissage sont exemplaires (Qualité: ${ratingQuality.toFixed(1)}/12 • Cadence: ${ratingTime.toFixed(1)}/8). Vous êtes prioritaire sur les flux de tâches spécialisées.`,
          time: 'Permanent',
          actionText: null,
          action: null
        });
      }
    }

    return list;
  };

  const systemNotifs = getSystemNotifications();
  // Combined list: system alerts first, then dynamic event history
  const allNotifs = [...systemNotifs, ...notificationHistory];

  const filteredNotifs = activeCategory === 'all'
    ? allNotifs
    : allNotifs.filter(item => item.category === activeCategory);

  const counts = {
    all: allNotifs.length,
    tasks: allNotifs.filter(n => n.category === 'tasks').length,
    finances: allNotifs.filter(n => n.category === 'finances').length,
    quality: allNotifs.filter(n => n.category === 'quality' || n.category === 'system').length
  };

  return (
    <div className="notifications-section-card" id="trainer-notifications-container">
      {/* Header Row */}
      <div className="notifications-header-row" style={{ flexWrap: 'wrap', gap: '15px' }}>
        <div className="notifications-header-left">
          <div className="notifications-bell-icon">
            <i className="ri-notification-3-line"></i>
            <span className="notifications-pulse-dot"></span>
          </div>
          <div>
            <h3 className="notifications-section-title">Centre de Notifications & Journal d'Événements</h3>
            <span className="notifications-section-sub">
              Mises à jour en direct, alertes financières, consignes RLHF et historique des tâches
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <div className="notifications-count-badge">
            {allNotifs.length} message{allNotifs.length > 1 ? 's' : ''}
          </div>
          {!notificationsRead && (
            <button
              onClick={markNotificationsAsRead}
              className="btn btn-secondary"
              style={{
                padding: '4px 10px',
                fontSize: '0.74rem',
                borderRadius: '8px',
                color: 'var(--accent-emerald)',
                borderColor: 'rgba(16, 185, 129, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="Marquer toutes les notifications comme lues"
            >
              <i className="ri-check-double-line"></i> Tout marquer lu
            </button>
          )}
          {notificationHistory.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="btn btn-secondary"
              style={{
                padding: '4px 10px',
                fontSize: '0.74rem',
                borderRadius: '8px',
                color: 'var(--text-secondary)',
                borderColor: 'var(--border-subtle)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="Purger l'historique des notifications"
            >
              <i className="ri-delete-bin-line"></i> Purger
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 0 16px 0',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '16px',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}>
        {[
          { id: 'all', label: 'Toutes', icon: 'ri-apps-line', count: counts.all },
          { id: 'tasks', label: 'Gains & Tâches', icon: 'ri-money-cny-box-line', count: counts.tasks },
          { id: 'finances', label: 'Finances & Collatéral', icon: 'ri-shield-keyhole-line', count: counts.finances },
          { id: 'quality', label: 'Qualité & Système', icon: 'ri-award-line', count: counts.quality }
        ].map(tab => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              style={{
                background: isActive ? 'var(--accent-emerald-soft)' : 'transparent',
                color: isActive ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                border: isActive ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '6px 12px',
                fontSize: '0.8rem',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <i className={tab.icon}></i>
              <span>{tab.label}</span>
              <span style={{
                background: isActive ? 'var(--accent-emerald)' : 'rgba(150, 150, 150, 0.15)',
                color: isActive ? '#ffffff' : 'inherit',
                fontSize: '0.7rem',
                padding: '1px 6px',
                borderRadius: '10px',
                fontWeight: 600
              }}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Notifications List */}
      <div className="notifications-feed-list">
        {filteredNotifs.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 16px',
            color: 'var(--text-secondary)',
            background: 'var(--bg-card-subtle)',
            borderRadius: '12px',
            border: '1px dashed var(--border-subtle)'
          }}>
            <i className="ri-notification-off-line" style={{ fontSize: '2rem', opacity: 0.5, display: 'block', marginBottom: '8px' }}></i>
            <h4 style={{ fontSize: '0.95rem', margin: '0 0 4px 0', color: 'var(--text-primary)' }}>Aucune notification dans cette catégorie</h4>
            <p style={{ fontSize: '0.8rem', margin: 0, opacity: 0.8 }}>Les nouveaux événements apparaîtront ici automatiquement.</p>
          </div>
        ) : (
          filteredNotifs.map(item => {
            let badgeClass = 'badge-cyan';
            if (item.type === 'critical') badgeClass = 'badge-red';
            else if (item.type === 'warning') badgeClass = 'badge-gold';
            else if (item.type === 'cta') badgeClass = 'badge-emerald';
            else if (item.type === 'success') badgeClass = 'badge-emerald';

            const isHistoryItem = item.id && item.id.startsWith('notif-') && item.id !== 'notif-subscribe-cta' && item.id !== 'notif-warning' && item.id !== 'notif-suspended' && item.id !== 'notif-rigor-tip' && item.id !== 'notif-daily-goal' && item.id !== 'notif-excellence-badge';

            return (
              <div key={item.id} className={`notif-card notif-card-${item.type}`} id={item.id} style={{ position: 'relative' }}>
                <div className="notif-card-main">
                  <div className="notif-icon-circle">
                    <i className={item.icon}></i>
                  </div>
                  <div className="notif-content-body" style={{ width: '100%' }}>
                    <div className="notif-top-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className={`badge ${badgeClass}`} style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                          {item.badge}
                        </span>
                        <span className="notif-time-tag">{item.time || "À l'instant"}</span>
                      </div>
                      {isHistoryItem && (
                        <button
                          onClick={() => deleteNotification(item.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            padding: '2px 6px',
                            fontSize: '0.9rem',
                            opacity: 0.6
                          }}
                          title="Supprimer cette notification"
                        >
                          <i className="ri-close-line"></i>
                        </button>
                      )}
                    </div>
                    <h4 className="notif-card-title" style={{ marginTop: '6px' }}>{item.title}</h4>
                    <p className="notif-card-desc">{item.message}</p>
                    {item.actionText && (
                      <div className="notif-action-wrapper">
                        <button
                          className="btn btn-sm btn-notif-action"
                          onClick={() => {
                            if (item.action) item.action();
                            else if (item.actionModal) setActiveModal(item.actionModal);
                          }}
                        >
                          {item.actionText}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
