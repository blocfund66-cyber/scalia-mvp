// auth.js - Authentification, session et UI de connexion
const GOOGLE_CLIENT_ID = '100687360531-n9tqbvkrdvee5k8ki9t6k991j480pt3f.apps.googleusercontent.com';

let googleInitialized = false;

function initGoogleSignIn() {
  if (googleInitialized) return;
  if (typeof google === 'undefined' || !google.accounts || !google.accounts.id) {
    console.warn('[Scalia] Google Identity Services SDK not loaded yet.');
    return;
  }
  if (GOOGLE_CLIENT_ID === 'YOUR_CLIENT_ID.apps.googleusercontent.com') {
    console.warn('[Scalia] Google Client ID not configured — running in DEMO mode.');
    return;
  }
  try {
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
      context: 'signin',
      ux_mode: 'popup',
      itp_support: true
    });
    googleInitialized = true;
    console.log('[Scalia] ✅ Google Sign-In initialized.');
  } catch (err) {
    console.error('[Scalia] Google init error:', err);
  }
}

// Decode JWT payload from Google credential
function decodeGoogleJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('[Scalia] JWT decode error:', e);
    return null;
  }
}

// ----------------------------------------------------
// GOOGLE AUTHENTICATION & LOGIN LOGIC
// ----------------------------------------------------

function handleGoogleCredentialResponse(response) {
  const payload = decodeGoogleJwt(response.credential);
  if (!payload) {
    showToast('Erreur Google', 'Impossible de décoder les informations Google. Réessayez.', true);
    return;
  }

  const fn = payload.given_name || 'Utilisateur';
  const ln = payload.family_name || 'Google';
  const email = payload.email || '';
  const picture = payload.picture || '';
  const googleId = payload.sub || '';
  const initials = (fn.charAt(0) + ln.charAt(0)).toUpperCase();
  const existingUsername = localStorage.getItem('scalia_username');
  const username = existingUsername || ('COACH-' + fn.substring(0, 3).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000));
  const tier = localStorage.getItem('scalia_tier') || 'bronze';
  const country = localStorage.getItem('scalia_country') || '';
  const city = localStorage.getItem('scalia_city') || '';

  const hasActiveCollateral = localStorage.getItem('scalia_collateral_active') === 'true';

  // Persist session
  localStorage.setItem('scalia_session_active', 'true');
  localStorage.setItem('scalia_role', 'entraineur');
  localStorage.setItem('scalia_firstname', fn);
  localStorage.setItem('scalia_lastname', ln);
  localStorage.setItem('scalia_email', email);
  localStorage.setItem('scalia_google_id', googleId);
  localStorage.setItem('scalia_google_picture', picture);
  localStorage.setItem('scalia_username', username);
  localStorage.setItem('scalia_initials', initials);
  localStorage.setItem('scalia_tier', tier);
  localStorage.setItem('scalia_auth_method', 'google');
  if (country) localStorage.setItem('scalia_country', country);
  if (city) localStorage.setItem('scalia_city', city);

  // Initialize state with STRICT ZERO balances
  state.role = 'entraineur';
  state.userTier = tier;
  state.collateralActive = hasActiveCollateral;
  state.collateralLocked = hasActiveCollateral ? (tierParams[tier]?.collateral || 15000) : 0;
  state.dailyTargetTime = tierParams[tier]?.time || 120;
  state.balance = hasActiveCollateral ? (parseInt(localStorage.getItem('scalia_balance')) || 0) : 0;
  state.dailyEarnings = 0;
  state.dailyTime = 0;

  // Update avatar
  updateGoogleAvatar(picture, initials);

  showToast('Connexion Google réussie', 'Ravi de vous accueillir sur Scalia, ' + fn + ' !');
  updateNavigationBars();
  updateAuthUI();
  goTo('dresseur-screen');

  // If user has NOT deposited collateral, IMMEDIATELY show recommendation dialog box!
  if (!hasActiveCollateral) {
    setTimeout(() => {
      openCollateralRecommendationModal(fn);
    }, 350);
  }
}

// Update avatar elements with Google picture or fallback to initials
function updateGoogleAvatar(pictureUrl, initials) {
  const avatarEls = document.querySelectorAll('#user-avatar-initials, .user-avatar');
  avatarEls.forEach(el => {
    if (pictureUrl) {
      el.innerHTML = `<img src="${pictureUrl}" alt="Profile" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" referrerpolicy="no-referrer" />`;
    } else {
      el.innerText = initials;
    }
  });
}

function initSession() {
  // Theme Restoration — default is light mode
  const savedTheme = localStorage.getItem('scalia_theme');
  if (savedTheme === 'dark') {
    document.body.classList.remove('light-mode');
    updateThemeIcons(false);
  } else {
    document.body.classList.add('light-mode');
    if (!savedTheme) localStorage.setItem('scalia_theme', 'light');
    updateThemeIcons(true);
  }

  const sessionActive = localStorage.getItem('scalia_session_active') === 'true';
  const savedRole = localStorage.getItem('scalia_role');
  const savedTier = localStorage.getItem('scalia_tier') || 'bronze';
  const savedBalance = localStorage.getItem('scalia_balance');
  const savedUsername = localStorage.getItem('scalia_username');
  
  if (sessionActive && savedRole) {
    state.role = savedRole;
    state.userTier = savedTier;
    state.balance = parseInt(savedBalance) || 0;

    const hasActiveCollateral = localStorage.getItem('scalia_collateral_active') === 'true';
    state.collateralActive = hasActiveCollateral;
    const tierInfo = tierParams[state.userTier] || tierParams['bronze'];
    state.collateralLocked = hasActiveCollateral ? tierInfo.collateral : 0;
    state.dailyTargetTime = tierInfo.time;

    // Restore Trainer Rating & Evaluation
    state.trainerRating = parseFloat(localStorage.getItem('scalia_rating')) || 20.0;
    state.ratingQuality = parseFloat(localStorage.getItem('scalia_rating_quality')) || 12.0;
    state.ratingTime = parseFloat(localStorage.getItem('scalia_rating_time')) || 8.0;
    state.evaluatedTasksCount = parseInt(localStorage.getItem('scalia_eval_tasks_count')) || 0;
    state.warningsCount = parseInt(localStorage.getItem('scalia_warnings_count')) || 0;
    state.isSuspended = localStorage.getItem('scalia_is_suspended') === 'true';

    // Restore Referral Parameters
    state.trainerReferralCount = parseInt(localStorage.getItem('scalia_ref_count')) || 0;
    state.trainerReferralCommissions = parseInt(localStorage.getItem('scalia_ref_commissions')) || 0;
    try {
      const savedRefTx = localStorage.getItem('scalia_ref_tx');
      state.trainerReferralTransactions = savedRefTx ? JSON.parse(savedRefTx) : [];
    } catch (e) {
      state.trainerReferralTransactions = [];
    }

    try {
      const savedTx = localStorage.getItem('scalia_transactions');
      if (savedTx) {
        state.transactions = JSON.parse(savedTx);
      } else {
        state.transactions = [];
      }
    } catch (e) {
      console.warn('[Scalia] Could not parse transactions from storage:', e);
      state.transactions = [];
    }
    
    const username = savedUsername || 'JB-5582';
    const savedInitials = localStorage.getItem('scalia_initials') || username.substring(0, 2).toUpperCase();
    const avatar = document.getElementById('user-avatar-initials');
    if (avatar) avatar.innerText = savedInitials;

    updateNavigationBars();
    updateAuthUI();
    goTo('dresseur-screen');
  } else {
    state.role = null;
    updateNavigationBars();
    updateAuthUI();
    goTo('landing-screen');
  }

  if (typeof initCounterObserver === 'function') initCounterObserver();
  if (typeof setLanguage === 'function') setLanguage(typeof currentLang !== 'undefined' ? currentLang : 'fr');
  initFomoCountdown();
  if (typeof updateCityDropdown === 'function') updateCityDropdown('onboard-trainer-country', 'onboard-trainer-city', localStorage.getItem('scalia_city') || 'Douala');
}

function saveSessionToLocalStorage() {
  localStorage.setItem('scalia_role', state.role);
  localStorage.setItem('scalia_tier', state.userTier);
  localStorage.setItem('scalia_balance', state.balance);
  localStorage.setItem('scalia_collateral_active', state.collateralActive ? 'true' : 'false');
  localStorage.setItem('scalia_rating', state.trainerRating);
  localStorage.setItem('scalia_rating_quality', state.ratingQuality);
  localStorage.setItem('scalia_rating_time', state.ratingTime);
  localStorage.setItem('scalia_eval_tasks_count', state.evaluatedTasksCount);
  localStorage.setItem('scalia_warnings_count', state.warningsCount);
  localStorage.setItem('scalia_is_suspended', state.isSuspended ? 'true' : 'false');
  localStorage.setItem('scalia_ref_count', state.trainerReferralCount);
  localStorage.setItem('scalia_ref_commissions', state.trainerReferralCommissions);
  try {
    localStorage.setItem('scalia_ref_tx', JSON.stringify(state.trainerReferralTransactions || []));
    localStorage.setItem('scalia_transactions', JSON.stringify(state.transactions || []));
  } catch (e) {
    console.warn('[Scalia] Could not save transactions to storage:', e);
  }
}

function logOutSession() {
  localStorage.setItem('scalia_session_active', 'false');
  state.role = null;

  // If signed in via Google, revoke the token
  if (localStorage.getItem('scalia_auth_method') === 'google' && typeof google !== 'undefined' && google.accounts && google.accounts.id) {
    const email = localStorage.getItem('scalia_email');
    if (email) {
      try { google.accounts.id.revoke(email); } catch(e) { /* ignore */ }
    }
    try { google.accounts.id.disableAutoSelect(); } catch(e) { /* ignore */ }
  }

  showToast("Déconnexion", "Votre console est verrouillée. À bientôt !");
  updateNavigationBars();
  updateAuthUI();
  goTo('landing-screen');
}


// ----------------------------------------------------
// DYNAMIC AUTH STATE & UI (VISITOR / RETURNING / LOGGED IN)
// ----------------------------------------------------
function updateAuthUI() {
  const sessionActive = localStorage.getItem('scalia_session_active') === 'true';
  const savedUsername = localStorage.getItem('scalia_username');
  const firstname = localStorage.getItem('scalia_firstname') || 'Jean';
  const lastname = localStorage.getItem('scalia_lastname') || 'Baptiste';
  const initials = localStorage.getItem('scalia_initials') || (firstname.charAt(0) + lastname.charAt(0)).toUpperCase();
  const tier = localStorage.getItem('scalia_tier') || state.userTier || 'bronze';
  const tierLabel = tierParams[tier] ? tierParams[tier].label : 'Bronze';

  const isLoggedIn = sessionActive && state.role;
  const isReturning = !sessionActive && !!savedUsername;

  const dict = (typeof SCALIA_TRANSLATIONS !== 'undefined' && SCALIA_TRANSLATIONS[typeof currentLang !== 'undefined' ? currentLang : 'fr']) ? SCALIA_TRANSLATIONS[typeof currentLang !== 'undefined' ? currentLang : 'fr'] : (typeof SCALIA_TRANSLATIONS !== 'undefined' ? SCALIA_TRANSLATIONS.fr : null);
  const strAccessConsole = dict ? dict.btn_access_console : "Accéder à ma Console";
  const strLogin = dict ? dict.btn_login : "Se Connecter";
  const strSimulate = dict ? dict.btn_simulate_earnings : "Simuler mes gains";
  const strBecomeTrainer = dict ? dict.btn_become_trainer : "Devenir Entraîneur d'IA";
  const strLoginConsole = dict ? dict.btn_login_console : "Se Connecter à ma Console";
  const strNewAccount = dict ? dict.btn_create_new_account : "Créer un nouveau compte";
  const strSessionActive = dict ? dict.session_active_label : "Session active :";
  const strTier = dict ? dict.tier_label_prefix : "Palier";
  const strWelcomePrefix = dict ? dict.welcome_back_prefix : "👋 Bon retour,";
  const strWelcomeSuffix = dict ? dict.welcome_back_suffix : "! Déverrouillez votre console pour continuer.";

  // Google profile picture support
  const authMethod = localStorage.getItem('scalia_auth_method') || '';
  const googlePicture = localStorage.getItem('scalia_google_picture') || '';
  const avatarContent = (authMethod === 'google' && googlePicture) 
    ? `<img src="${googlePicture}" alt="Profile" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" referrerpolicy="no-referrer" />`
    : initials;

  // 1. Landing Header Actions
  const headerActionsEl = document.getElementById('landing-header-auth-actions');
  if (headerActionsEl) {
    if (isLoggedIn) {
      headerActionsEl.innerHTML = `
        <button class="btn btn-primary-trainer header-console-btn" onclick="goToActiveConsole()" style="padding: 6px 11px; font-size: 0.82rem; display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; border-radius: 9999px;">
          <i class="ri-terminal-box-line"></i>
          <span class="header-console-full">${strAccessConsole}</span>
          <span class="header-console-short">Console</span>
        </button>
        <div class="user-avatar" onclick="handleAvatarClick()" title="Consulter mon Profil" style="width: 34px; height: 34px; font-size: 0.85rem; cursor: pointer; flex-shrink: 0;">${avatarContent}</div>
      `;
    } else {
      headerActionsEl.innerHTML = `
        <button class="btn btn-secondary" onclick="openLoginScreen()" style="padding: 7px 14px; font-size: 0.85rem; white-space: nowrap; display: inline-flex; align-items: center; gap: 6px;">
          <i class="ri-login-box-line"></i> ${strLogin}
        </button>
      `;
    }
  }

  // 2. Hero Actions Container
  const heroActionsEl = document.getElementById('hero-actions-container');
  if (heroActionsEl) {
    if (isLoggedIn) {
      heroActionsEl.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 12px; align-items: center; text-align: center; width: 100%;">
          <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; align-items: center; width: 100%;">
            <button class="btn btn-primary-trainer" onclick="goToActiveConsole()">
              <i class="ri-terminal-box-line"></i> ${strAccessConsole}
            </button>
            <button class="btn btn-secondary" onclick="scrollToSimulator('trainer')">
              <i class="ri-calculator-line"></i> ${strSimulate}
            </button>
          </div>
          <div style="font-size: 0.85rem; color: var(--accent-emerald); display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 4px; text-align: center;">
            <span style="background: var(--accent-emerald); width: 8px; height: 8px; border-radius: 50%; display: inline-block; box-shadow: 0 0 8px var(--accent-emerald); flex-shrink: 0;"></span>
            <span>${strSessionActive} <strong>${firstname} ${lastname}</strong> (${strTier} ${tierLabel})</span>
          </div>
        </div>
      `;
    } else if (isReturning) {
      heroActionsEl.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 12px; align-items: center; text-align: center; width: 100%;">
          <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; align-items: center; width: 100%;">
            <button class="btn btn-primary-trainer" onclick="openLoginScreen()">
              <i class="ri-login-box-line"></i> ${strLoginConsole}
            </button>
            <button class="btn btn-secondary" onclick="startOnboardingRole('entraineur', true)">
              <i class="ri-user-add-line"></i> ${strNewAccount}
            </button>
          </div>
          <div style="font-size: 0.88rem; color: var(--text-secondary); display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 4px; text-align: center;">
            <span>${strWelcomePrefix} <strong>${firstname}</strong> ${strWelcomeSuffix}</span>
          </div>
        </div>
      `;
    } else {
      heroActionsEl.innerHTML = `
        <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; align-items: center; width: 100%;">
          <button class="btn btn-primary-trainer" onclick="startOnboardingRole('entraineur')">
            <i class="ri-terminal-line"></i> ${strBecomeTrainer}
          </button>
          <button class="btn btn-secondary" onclick="scrollToSimulator('trainer')">
            <i class="ri-calculator-line"></i> ${strSimulate}
          </button>
        </div>
      `;
    }
  }

  setupLoginView();
}

function openLoginScreen(forceNew = false) {
  goTo('onboarding-screen');
  switchOnboardTab('login');
  if (forceNew) {
    showManualLoginForm();
  } else {
    setupLoginView();
  }
}

function setupLoginView() {
  const savedUsername = localStorage.getItem('scalia_username');
  const savedFirstname = localStorage.getItem('scalia_firstname') || 'Jean';
  const savedLastname = localStorage.getItem('scalia_lastname') || 'Baptiste';
  const savedInitials = localStorage.getItem('scalia_initials') || 'JB';
  const savedCountry = localStorage.getItem('scalia_country') || 'Cameroun';
  const savedCity = localStorage.getItem('scalia_city') || 'Douala';
  const savedTier = localStorage.getItem('scalia_tier') || 'bronze';
  const tierInfo = tierParams[savedTier] || tierParams['bronze'];

  const quickCard = document.getElementById('login-returning-card');
  const manualCard = document.getElementById('login-manual-card');

  if (savedUsername && quickCard && manualCard) {
    const nameEl = document.getElementById('quick-login-name');
    const metaEl = document.getElementById('quick-login-meta');
    const avatarEl = document.getElementById('quick-login-avatar');
    const tierBadgeEl = document.getElementById('quick-login-tier-badge');
    const pwdInput = document.getElementById('login-quick-password');

    if (nameEl) nameEl.innerText = `${savedFirstname} ${savedLastname}`;
    if (metaEl) metaEl.innerText = `${savedUsername} • 📍 ${savedCity}, ${savedCountry}`;
    if (avatarEl) avatarEl.innerText = savedInitials;
    if (tierBadgeEl) tierBadgeEl.innerText = `Palier ${tierInfo.label} (${tierInfo.hours}h/j)`;
    if (pwdInput) pwdInput.value = '';

    quickCard.style.display = 'block';
    manualCard.style.display = 'none';
  } else if (manualCard) {
    if (quickCard) quickCard.style.display = 'none';
    manualCard.style.display = 'block';
  }
}

function showManualLoginForm() {
  const quickCard = document.getElementById('login-returning-card');
  const manualCard = document.getElementById('login-manual-card');
  if (quickCard) quickCard.style.display = 'none';
  if (manualCard) manualCard.style.display = 'block';
}

function forgetSavedUser() {
  localStorage.removeItem('scalia_session_active');
  localStorage.removeItem('scalia_role');
  localStorage.removeItem('scalia_username');
  localStorage.removeItem('scalia_firstname');
  localStorage.removeItem('scalia_lastname');
  localStorage.removeItem('scalia_email');
  localStorage.removeItem('scalia_initials');
  localStorage.removeItem('scalia_password');
  localStorage.removeItem('scalia_tier');
  localStorage.removeItem('scalia_balance');
  localStorage.removeItem('scalia_city');
  localStorage.removeItem('scalia_country');
  localStorage.removeItem('scalia_auth_method');
  localStorage.removeItem('scalia_google_id');
  localStorage.removeItem('scalia_google_picture');
  
  state.role = null;
  state.userTier = 'bronze';
  if (typeof showToast === 'function') showToast("Compte Oublié", "Vous pouvez maintenant vous inscrire ou vous connecter avec un autre identifiant.");
  updateNavigationBars();
  updateAuthUI();
  if (typeof switchOnboardTab === 'function') switchOnboardTab('signup');
}

function confirmQuickLogin() {
  const pwdInput = document.getElementById('login-quick-password');
  const inputPwd = pwdInput ? pwdInput.value : '';
  const storedPwd = localStorage.getItem('scalia_password') || '1234';

  if (!inputPwd || inputPwd.length < 4) {
    if (typeof showToast === 'function') showToast("Mot de passe requis", "Veuillez entrer au moins 4 caractères.", true);
    return;
  }

  if (storedPwd && inputPwd !== storedPwd) {
    if (typeof showToast === 'function') showToast("Mot de passe incorrect", "Le mot de passe saisi est invalide pour ce profil.", true);
    return;
  }

  localStorage.setItem('scalia_session_active', 'true');
  localStorage.setItem('scalia_role', 'entraineur');
  state.role = 'entraineur';
  state.userTier = localStorage.getItem('scalia_tier') || 'bronze';
  const hasActiveCollateral = localStorage.getItem('scalia_collateral_active') === 'true';
  state.collateralActive = hasActiveCollateral;
  state.collateralLocked = hasActiveCollateral ? (tierParams[state.userTier]?.collateral || 15000) : 0;
  state.dailyTargetTime = tierParams[state.userTier]?.time || 120;
  state.balance = parseInt(localStorage.getItem('scalia_balance')) || 0;

  const fn = localStorage.getItem('scalia_firstname') || 'Jean';
  if (typeof showToast === 'function') showToast("Connexion Réussie", `Ravi de vous revoir, ${fn} ! Console déverrouillée.`);
  updateNavigationBars();
  updateAuthUI();
  goTo('dresseur-screen');
}

function signInWithGoogle() {
  // If Google is properly initialized with a real Client ID, use the real flow
  if (googleInitialized && GOOGLE_CLIENT_ID !== 'YOUR_CLIENT_ID.apps.googleusercontent.com') {
    // Try One Tap first
    google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        console.log('[Scalia] One Tap not displayed, reason:', notification.getNotDisplayedReason());
        // Fallback: render Google button in a popup overlay
        showGoogleButtonFallback();
      } else if (notification.isSkippedMoment()) {
        console.log('[Scalia] One Tap skipped, reason:', notification.getSkippedReason());
        showGoogleButtonFallback();
      }
      // If displayed, the user will interact and handleGoogleCredentialResponse will fire
    });
  } else {
    // DEMO MODE: No real Client ID — simulate Google sign-in for testing
    signInWithGoogleDemo();
  }
}

// Fallback: Show a centered overlay with Google's own rendered button
function showGoogleButtonFallback() {
  // Remove any existing overlay
  const existing = document.getElementById('google-fallback-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'google-fallback-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);';
  overlay.innerHTML = `
    <div style="background:var(--bg-primary, #fff);border-radius:20px;padding:32px;max-width:400px;width:90%;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,0.3);position:relative;">
      <button onclick="document.getElementById('google-fallback-overlay').remove();" style="position:absolute;top:12px;right:12px;background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--text-muted, #999);">✕</button>
      <h3 style="font-size:1.2rem;margin-bottom:8px;color:var(--text-primary, #1f2937);">Connexion avec Google</h3>
      <p style="font-size:0.88rem;color:var(--text-secondary, #6b7280);margin-bottom:20px;">Cliquez sur le bouton ci-dessous pour vous connecter avec votre compte Google.</p>
      <div id="google-rendered-btn" style="display:flex;justify-content:center;"></div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

  // Render Google's official button
  google.accounts.id.renderButton(
    document.getElementById('google-rendered-btn'),
    {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      shape: 'pill',
      logo_alignment: 'left',
      width: 300
    }
  );
}

// DEMO MODE fallback — simulates Google sign-in when no Client ID is configured
function signInWithGoogleDemo() {
  const savedFirstname = localStorage.getItem('scalia_firstname');
  const savedLastname = localStorage.getItem('scalia_lastname');
  const savedEmail = localStorage.getItem('scalia_email');
  
  const fn = savedFirstname || 'Jean';
  const ln = savedLastname || 'Baptiste';
  const em = savedEmail || `${fn.toLowerCase()}.${ln.toLowerCase()}@gmail.com`;
  const username = localStorage.getItem('scalia_username') || ('COACH-' + fn.substring(0,3).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000));
  const tier = localStorage.getItem('scalia_tier') || 'bronze';
  const country = localStorage.getItem('scalia_country') || 'Cameroun';
  const city = localStorage.getItem('scalia_city') || 'Douala';
  const initials = (fn.charAt(0) + ln.charAt(0)).toUpperCase();

  const hasActiveCollateral = localStorage.getItem('scalia_collateral_active') === 'true';

  localStorage.setItem('scalia_session_active', 'true');
  localStorage.setItem('scalia_role', 'entraineur');
  localStorage.setItem('scalia_firstname', fn);
  localStorage.setItem('scalia_lastname', ln);
  localStorage.setItem('scalia_email', em);
  localStorage.setItem('scalia_username', username);
  localStorage.setItem('scalia_initials', initials);
  localStorage.setItem('scalia_tier', tier);
  localStorage.setItem('scalia_country', country);
  localStorage.setItem('scalia_city', city);
  localStorage.setItem('scalia_auth_method', 'demo_google');
  if (!localStorage.getItem('scalia_password')) {
    localStorage.setItem('scalia_password', '1234');
  }

  state.role = 'entraineur';
  state.userTier = tier;
  state.collateralActive = hasActiveCollateral;
  state.collateralLocked = hasActiveCollateral ? (tierParams[tier]?.collateral || 15000) : 0;
  state.dailyTargetTime = tierParams[tier]?.time || 120;
  state.balance = hasActiveCollateral ? (parseInt(localStorage.getItem('scalia_balance')) || 0) : 0;
  state.dailyEarnings = 0;
  state.dailyTime = 0;

  const avatar = document.getElementById('user-avatar-initials');
  if (avatar) avatar.innerText = initials;

  if (typeof showToast === 'function') showToast("Google Sign-In (Démo)", `Bienvenue ${fn} ${ln} !`);
  updateNavigationBars();
  updateAuthUI();
  goTo('dresseur-screen');

  // If user has NOT deposited collateral, IMMEDIATELY show recommendation dialog box!
  if (!hasActiveCollateral) {
    setTimeout(() => {
      if (typeof openCollateralRecommendationModal === 'function') openCollateralRecommendationModal(fn);
    }, 350);
  }
}

function goToActiveConsole() {
  if (!state.role) {
    if (typeof showToast === 'function') showToast("Connexion requise", "Veuillez créer un compte ou vous connecter.", true);
    goTo('onboarding-screen');
    return;
  }
  goTo('dresseur-screen');
}

function handleAvatarClick() {
  if (!state.role) {
    if (typeof showToast === 'function') showToast("Connexion requise", "Veuillez vous connecter pour accéder à votre profil.", true);
    goTo('onboarding-screen');
  } else {
    if (typeof openProfileModal === 'function') openProfileModal();
  }
}
