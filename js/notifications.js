// notifications.js - Gestion du centre de notifications contextuel et dynamique pour le tableau de bord

function getContextualNotifications() {
  const list = [];
  const hasCollateral = state.collateralActive && state.collateralLocked > 0;

  // 1. Critical: Account Suspension Notice
  if (state.isSuspended) {
    list.push({
      id: 'notif-suspended',
      type: 'critical',
      icon: 'ri-error-warning-fill',
      badge: 'Suspension Temporaire',
      title: 'Compte Entraîneur Suspendu pour Non-Conformité Qualité (< 10/20)',
      message: 'Suite à des évaluations répétées non conformes aux critères de rigueur exigés par les laboratoires d\'IA, l\'accès aux exercices a été temporairement suspendu. Votre collatéral demeure 100% sécurisé sous séquestre contractuel.',
      actionText: 'Consulter mon Dossier & Déposer un Recours',
      actionFn: 'openSuspensionModal()'
    });
    return list;
  }

  // 2. Warnings Alert (if any strikes)
  if (state.warningsCount > 0) {
    const isLastWarning = state.warningsCount >= 2;
    list.push({
      id: 'notif-warning',
      type: 'warning',
      icon: 'ri-alert-fill',
      badge: isLastWarning ? 'Dernier Rappel' : 'Avertissement Qualité (' + state.warningsCount + '/3)',
      title: isLastWarning ? 'Dernier Avertissement avant Suspension de Compte' : 'Attention requise sur la qualité de vos évaluations',
      message: 'Votre note globale est de ' + state.trainerRating.toFixed(1) + '/20. Les réponses trop brèves, les validations précipitées ou les erreurs répétées altèrent la fiabilité des modèles d\'IA. Prenez le temps d\'évaluer avec minutie.',
      actionText: 'Consulter les Recommandations de Qualité IA',
      actionFn: 'showQualityGuidelinesModal()'
    });
  }

  // 3. User NOT Subscribed (No active collateral): Strong Conversion & Encouragement
  if (!hasCollateral) {
    list.push({
      id: 'notif-subscribe-cta',
      type: 'cta',
      icon: 'ri-flashlight-line',
      badge: 'Action Requise',
      title: 'Activez votre Collatéral Garanti pour débloquer vos Tâches Rémunérées',
      message: 'Félicitations pour votre inscription ! Pour commencer à entraîner les modèles d\'IA et percevoir de 30 000 à 350 000 FCFA/mois, choisissez parmi nos 5 formules. Votre collatéral est placé sous séquestre sécurisé et 100% remboursable à terme.',
      actionText: 'Choisir mon Palier (5 formules dès 15 000 FCFA) →',
      actionFn: "openCollateralRecommendationModal()"
    });
  } else {
    // 4. User Subscribed: Encouragement for Rigor, Efficiency & Daily Goal
    const currentMin = Math.max(0, parseInt(state.dailyTime) || 0);
    const targetMin = state.dailyTargetTime || 120;
    const isGoalReached = currentMin >= targetMin;

    list.push({
      id: 'notif-rigor-tip',
      type: 'tip',
      icon: 'ri-sparkling-line',
      badge: 'Conseil de Rigueur IA',
      title: 'Précision et Méthode : La clé d\'une Note d\'Excellence',
      message: 'Nos laboratoires partenaires (Mistral, OpenAI, Anthropic...) rémunèrent la haute précision. Prenez au moins 8 à 15 secondes pour évaluer chaque élément et formulez des critiques constructives pour maintenir votre note au-dessus de 16/20.',
      actionText: 'Guide des Bonnes Pratiques',
      actionFn: 'showQualityGuidelinesModal()'
    });

    list.push({
      id: 'notif-daily-goal',
      type: isGoalReached ? 'success' : 'progress',
      icon: isGoalReached ? 'ri-checkbox-circle-line' : 'ri-compass-3-line',
      badge: isGoalReached ? 'Objectif Atteint' : 'Assiduité Quotidienne',
      title: isGoalReached ? 'Quota du Jour Accompli avec Succès !' : 'Objectif Quotidien en Cours : ' + currentMin + ' / ' + targetMin + ' min',
      message: isGoalReached 
        ? 'Bravo ! Vous avez validé votre temps de travail quotidien. Vos gains de la journée sont définitivement sécurisés.'
        : 'Il vous reste ' + (targetMin - currentMin) + ' minutes pour compléter votre quota horaire du Palier ' + (tierParams[state.userTier]?.label || 'Bronze') + ' et valider votre rémunération mensuelle intégrale.',
      actionText: isGoalReached ? null : 'Reprendre les Exercices',
      actionFn: isGoalReached ? null : "handleTaskClick('captcha')"
    });

    // Score status card if note is excellent
    if (state.trainerRating >= 16.0) {
      list.push({
        id: 'notif-excellence-badge',
        type: 'success',
        icon: 'ri-medal-line',
        badge: 'Profil Élite ⭐',
        title: 'Note d\'Excellence : ' + state.trainerRating.toFixed(1) + ' / 20',
        message: 'Votre rigueur et votre respect des temps d\'apprentissage sont remarquables (Qualité: ' + state.ratingQuality.toFixed(1) + '/12 • Cadence: ' + state.ratingTime.toFixed(1) + '/8). Vous êtes prioritaire sur les flux de tâches spécialisées.',
        actionText: null,
        actionFn: null
      });
    }
  }

  return list;
}

function renderDashboardNotifications() {
  const container = document.getElementById('trainer-notifications-container');
  if (!container) return;

  const notifs = getContextualNotifications();
  state.notifications = notifs;

  // Update sidebar & mobile nav badge count
  const unreadCount = notifs.length;
  const sideBadge = document.getElementById('sidebar-notifications-count');
  const mobBadge = document.getElementById('mob-notifications-count');
  if (sideBadge) {
    sideBadge.innerText = unreadCount;
    sideBadge.style.display = unreadCount > 0 ? 'inline-flex' : 'none';
  }
  if (mobBadge) {
    mobBadge.innerText = unreadCount;
    mobBadge.style.display = unreadCount > 0 ? 'inline-flex' : 'none';
  }

  let html = `
    <div class="notifications-section-card">
      <div class="notifications-header-row">
        <div class="notifications-header-left">
          <div class="notifications-bell-icon">
            <i class="ri-notification-3-line"></i>
            <span class="notifications-pulse-dot"></span>
          </div>
          <div>
            <h3 class="notifications-section-title">Centre de Notifications & Suivi Qualité</h3>
            <span class="notifications-section-sub">Mises à jour en direct, consignes d'entraînement et alertes d'évaluation</span>
          </div>
        </div>
        <div class="notifications-count-badge">${notifs.length} message${notifs.length > 1 ? 's' : ''}</div>
      </div>
      <div class="notifications-feed-list">
  `;

  notifs.forEach(item => {
    let cardClass = 'notif-card-' + item.type;
    let badgeClass = 'badge-cyan';
    if (item.type === 'critical') badgeClass = 'badge-red';
    else if (item.type === 'warning') badgeClass = 'badge-gold';
    else if (item.type === 'cta') badgeClass = 'badge-emerald';
    else if (item.type === 'success') badgeClass = 'badge-emerald';

    html += `
      <div class="notif-card ${cardClass}" id="${item.id}">
        <div class="notif-card-main">
          <div class="notif-icon-circle">
            <i class="${item.icon}"></i>
          </div>
          <div class="notif-content-body">
            <div class="notif-top-meta">
              <span class="badge ${badgeClass}" style="font-size: 0.72rem; padding: 2px 8px;">${item.badge}</span>
              <span class="notif-time-tag">À l'instant</span>
            </div>
            <h4 class="notif-card-title">${item.title}</h4>
            <p class="notif-card-desc">${item.message}</p>
            ${item.actionText ? `
              <div class="notif-action-wrapper">
                <button class="btn btn-sm btn-notif-action" onclick="${item.actionFn}">
                  ${item.actionText}
                </button>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function scrollToNotifications() {
  const el = document.getElementById('trainer-notifications-container');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add('highlight-notif-pulse');
    setTimeout(() => el.classList.remove('highlight-notif-pulse'), 1500);
  } else {
    goTo('dresseur-screen');
    setTimeout(() => {
      const el2 = document.getElementById('trainer-notifications-container');
      if (el2) el2.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  }
}

function openSuspensionModal() {
  const modal = document.getElementById('suspension-modal');
  if (modal) modal.style.display = 'flex';
}

function closeSuspensionModal() {
  const modal = document.getElementById('suspension-modal');
  if (modal) modal.style.display = 'none';
}

function submitSuspensionAppeal() {
  const txt = document.getElementById('appeal-text-input') ? document.getElementById('appeal-text-input').value.trim() : '';
  if (!txt || txt.length < 20) {
    showToast("Message trop court", "Veuillez expliquer vos engagements de conformité (au moins 20 caractères).", true);
    return;
  }
  closeSuspensionModal();
  showToast("Recours Soumis", "Votre demande de réexamen a été transmise au superviseur technique. Délai de traitement : 2 à 4h.");
}

function showQualityGuidelinesModal() {
  const modal = document.getElementById('quality-guidelines-modal');
  if (modal) modal.style.display = 'flex';
}

function closeQualityGuidelinesModal() {
  const modal = document.getElementById('quality-guidelines-modal');
  if (modal) modal.style.display = 'none';
}
