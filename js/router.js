// router.js - Gestion de la navigation et de l'état global
const tierParams = {
  bronze:   { time: 120, collateral: 15000,  salaryText: '30 000 - 50 000 FCFA',   shortSalary: '30k - 50k',   hours: 2, label: 'Bronze' },
  silver:   { time: 180, collateral: 25000,  salaryText: '70 000 - 120 000 FCFA',  shortSalary: '70k - 120k',  hours: 3, label: 'Silver' },
  gold:     { time: 240, collateral: 45000,  salaryText: '130 000 - 180 000 FCFA', shortSalary: '130k - 180k', hours: 4, label: 'Gold' },
  platinum: { time: 360, collateral: 75000,  salaryText: '190 000 - 250 000 FCFA', shortSalary: '190k - 250k', hours: 6, label: 'Platinum' },
  diamond:  { time: 480, collateral: 100000, salaryText: '280 000 - 350 000 FCFA', shortSalary: '280k - 350k', hours: 8, label: 'Diamond' }
};
if (typeof window !== 'undefined') window.tierParams = tierParams;

// ----------------------------------------------------
// STATE OBJECT (STATE OF TRUTH)
// ----------------------------------------------------
const state = {
  role: 'entraineur',
  userTier: (typeof localStorage !== 'undefined' ? localStorage.getItem('scalia_tier') : null) || 'bronze', 
  collateralActive: (typeof localStorage !== 'undefined' && localStorage.getItem('scalia_collateral_active') === 'true'),
  collateralLocked: (typeof localStorage !== 'undefined' && localStorage.getItem('scalia_collateral_active') === 'true') ? (tierParams[localStorage.getItem('scalia_tier') || 'bronze']?.collateral || 15000) : 0,
  balance: (typeof localStorage !== 'undefined' ? parseInt(localStorage.getItem('scalia_balance')) : 0) || 0,
  dailyTime: 0,
  dailyTargetTime: 120,
  dailyEarnings: 0,
  currentCaptchaIdx: 0,
  currentVideoIdx: 0,
  currentTextIdx: 0,
  currentAuditIdx: 0,
  completedTaskCount: 0,
  
  // Referral Parameters (Strict Zero Default)
  trainerReferralCount: (typeof localStorage !== 'undefined' ? parseInt(localStorage.getItem('scalia_ref_count')) : 0) || 0,
  trainerReferralCommissions: (typeof localStorage !== 'undefined' ? parseInt(localStorage.getItem('scalia_ref_commissions')) : 0) || 0,
  trainerReferralTransactions: (typeof localStorage !== 'undefined' && localStorage.getItem('scalia_ref_tx')) ? JSON.parse(localStorage.getItem('scalia_ref_tx')) : [],

  // Trainer Rating & Evaluation (/20)
  trainerRating: (typeof localStorage !== 'undefined' && localStorage.getItem('scalia_rating')) ? parseFloat(localStorage.getItem('scalia_rating')) : 20.0,
  ratingQuality: (typeof localStorage !== 'undefined' && localStorage.getItem('scalia_rating_quality')) ? parseFloat(localStorage.getItem('scalia_rating_quality')) : 12.0,
  ratingTime: (typeof localStorage !== 'undefined' && localStorage.getItem('scalia_rating_time')) ? parseFloat(localStorage.getItem('scalia_rating_time')) : 8.0,
  evaluatedTasksCount: (typeof localStorage !== 'undefined' && localStorage.getItem('scalia_eval_tasks_count')) ? parseInt(localStorage.getItem('scalia_eval_tasks_count')) : 0,
  warningsCount: (typeof localStorage !== 'undefined' && localStorage.getItem('scalia_warnings_count')) ? parseInt(localStorage.getItem('scalia_warnings_count')) : 0,
  isSuspended: (typeof localStorage !== 'undefined' && localStorage.getItem('scalia_is_suspended') === 'true'),
  
  notifications: [],
  transactions: []
};
if (typeof window !== 'undefined') window.state = state;

function goTo(screenId) {
  if (screenId !== 'landing-screen' && screenId !== 'onboarding-screen' && !state.role) {
    showToast("Connexion requise", "Veuillez créer un compte ou vous connecter.", true);
    screenId = 'onboarding-screen';
  }

  const screens = document.querySelectorAll('.view-screen');
  screens.forEach(s => s.classList.remove('active-screen'));

  const activeScreen = document.getElementById(screenId);
  if (activeScreen) {
    activeScreen.classList.add('active-screen');
  }

  const isLight = document.body.classList.contains('light-mode');
  if (screenId === 'landing-screen' || screenId === 'onboarding-screen') {
    document.body.className = isLight ? 'landing-mode light-mode' : 'landing-mode';
  } else {
    document.body.className = isLight ? 'console-mode light-mode' : 'console-mode';
  }

  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll('.mobile-nav-link').forEach(l => l.classList.remove('active'));

  const curLang = (typeof currentLang !== 'undefined' ? currentLang : (typeof localStorage !== 'undefined' ? localStorage.getItem('scalia_lang') : null)) || 'fr';
  const curDict = (typeof SCALIA_TRANSLATIONS !== 'undefined' && SCALIA_TRANSLATIONS[curLang]) ? SCALIA_TRANSLATIONS[curLang] : (typeof SCALIA_TRANSLATIONS !== 'undefined' ? SCALIA_TRANSLATIONS.fr : null);
  if (screenId === 'dresseur-screen') {
    const link = document.getElementById('link-entraineur');
    const mob = document.getElementById('mob-link-entraineur');
    if (link) link.classList.add('active');
    if (mob) mob.classList.add('active');
    const topbarText = document.getElementById('topbar-title-text');
    if (topbarText) topbarText.innerText = (curDict && curDict.topbar_title_trainer) ? curDict.topbar_title_trainer : "Console Entraîneur IA";
  } else if (screenId === 'wallet-screen') {
    const link = document.getElementById('link-wallet');
    const mob = document.getElementById('mob-link-wallet');
    if (link) link.classList.add('active');
    if (mob) mob.classList.add('active');
    const topbarText = document.getElementById('topbar-title-text');
    if (topbarText) topbarText.innerText = (curDict && curDict.topbar_title_wallet) ? curDict.topbar_title_wallet : "Portefeuille Scalia";
  } else if (screenId === 'referral-entraineur-screen') {
    const link = document.getElementById('link-referral');
    const mob = document.getElementById('mob-link-referral');
    if (link) link.classList.add('active');
    if (mob) mob.classList.add('active');
    const topbarText = document.getElementById('topbar-title-text');
    if (topbarText) topbarText.innerText = (curDict && curDict.topbar_title_referral) ? curDict.topbar_title_referral : "Programme de Parrainage";
    generateCustomReferralLinkTrainer();
  } else if (screenId === 'landing-screen') {
    const mob = document.getElementById('mob-link-home');
    if (mob) mob.classList.add('active');
  }

  window.scrollTo(0, 0);
  refreshUI();
  syncFomoBannerHeight();
  if (screenId === 'landing-screen') {
    updateAuthUI();
  } else if (screenId === 'onboarding-screen') {
    setupLoginView();
    const savedRef = localStorage.getItem('scalia_sponsor_ref');
    const onboardRef = document.getElementById('onboard-ref-code');
    if (savedRef && onboardRef && !onboardRef.value) {
      onboardRef.value = savedRef;
    }
  }
}

function updateNavigationBars() {
  const balStr = formatCurrency(state.balance);
  const topBal = document.getElementById('topbar-balance-val');
  const wallBal = document.getElementById('wallet-balance-val');
  if (topBal) topBal.innerText = balStr;
  if (wallBal) wallBal.innerText = balStr;
}

function scrollToSimulator(type) {
  const el = document.getElementById('landing-simulator');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function updateTrainerSim() {
  const slider = document.getElementById('sim-time-slider');
  if (!slider) return;
  const hours = parseInt(slider.value);
  
  const curLang = (typeof currentLang !== 'undefined' ? currentLang : (typeof localStorage !== 'undefined' ? localStorage.getItem('scalia_lang') : null)) || 'fr';
  const curDict = (typeof SCALIA_TRANSLATIONS !== 'undefined' && SCALIA_TRANSLATIONS[curLang]) ? SCALIA_TRANSLATIONS[curLang] : (typeof SCALIA_TRANSLATIONS !== 'undefined' ? SCALIA_TRANSLATIONS.fr : null);
  const hStr = curDict ? curDict.hours_per_day : "heures / jour";
  const tStr = curDict ? curDict.tier_label_prefix : "Palier";
  const hoursAbbr = curLang === 'en' ? 'h/day' : curLang === 'es' ? 'h/día' : curLang === 'ar' ? 'س/يوم' : 'h/j';

  const timeValEl = document.getElementById('sim-time-val');
  if (timeValEl) timeValEl.innerText = hours + " " + hStr;
  
  let tierKey = 'bronze';
  if (hours <= 2) tierKey = 'bronze';
  else if (hours === 3) tierKey = 'silver';
  else if (hours >= 4 && hours < 6) tierKey = 'gold';
  else if (hours >= 6 && hours < 8) tierKey = 'platinum';
  else tierKey = 'diamond';

  const tier = tierParams[tierKey];
  const colValEl = document.getElementById('sim-collateral-val');
  const tierValEl = document.getElementById('sim-tier-val');
  const salValEl = document.getElementById('sim-salary-val');

  if (colValEl) colValEl.innerText = formatCurrency(tier.collateral);
  if (tierValEl) tierValEl.innerText = tStr + " " + tier.label + " (" + tier.hours + " " + hoursAbbr + ")";
  if (salValEl) salValEl.innerText = tier.salaryText;
}

function toggleFaq(item) {
  item.classList.toggle('active');
}
