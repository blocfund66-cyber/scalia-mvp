// checkout.js

const ScaliaPaymentConfig = {
  sandboxMode: false,
  currency: 'XAF',
  checkoutBaseUrl: 'https://checkout.scalia.io/pay',
  paymentLinks: {
    bronze: 'https://pay.reeserva.com/en/pay/cmtxnxrpa007n06om9zakp7wl',
    silver: 'https://pay.reeserva.com/en/pay/cmtxnw9ae007m06om34wpmgro',
    gold: 'https://pay.reeserva.com/en/pay/cmtxnuxn3007l06omrryt60lw',
    platinum: 'https://pay.reeserva.com/en/pay/cmtxntd78007k06omfg2s11az',
    diamond: 'https://pay.reeserva.com/en/pay/cmtxnrow7007j06ome19gczyx'
  },
  crypto: {
    trc20Address: 'TYD2vE1w9bJm5cE7X1x9LpQ8qRz3A7W4sF',
    bep20Address: '0x71C8360d8C9c7B8964297120c9F356eF776269b0',
    exchangeRateFcfaPerUsdt: 600
  }
};

let pendingTrainerData = null;
let activeCheckoutTier = 'bronze';
let currentCheckoutMethod = 'momo';
let currentOperator = 'mtn';
let currentGeneratedPaylink = '';
let currentGeneratedTxnRef = '';

let currentRecommendedTier = 'gold';

function openCollateralRecommendationModal(userName) {
  currentRecommendedTier = 'gold';
  selectRecommendationTier('gold');

  const titleEl = document.getElementById('rec-modal-title');
  if (titleEl) {
    titleEl.innerText = "👋 Bienvenue ! Activez votre Console";
  }

  const modal = document.getElementById('collateral-recommendation-modal');
  if (modal) modal.style.display = 'flex';
}

function closeCollateralRecommendationModal() {
  const modal = document.getElementById('collateral-recommendation-modal');
  if (modal) modal.style.display = 'none';
}

function selectRecommendationTier(tierKey) {
  currentRecommendedTier = tierKey;
  ['bronze', 'silver', 'gold', 'platinum', 'diamond'].forEach(t => {
    const card = document.getElementById('rec-card-' + t);
    const radio = document.getElementById('radio-' + t);
    if (card) {
      if (t === tierKey) {
        card.style.borderColor = 'var(--accent-emerald)';
        card.style.background = 'rgba(16,185,129,0.06)';
      } else {
        card.style.borderColor = 'var(--border-color)';
        card.style.background = 'var(--bg-card)';
      }
    }
    if (radio) radio.checked = (t === tierKey);
  });
}

function confirmRecommendationTierSubscription() {
  closeCollateralRecommendationModal();
  openCollateralModalForTier(currentRecommendedTier);
}

function simulateRecommendationApproval() {
  activeCheckoutTier = currentRecommendedTier;
  closeCollateralRecommendationModal();
  simulatePaymentApproval('Validation Test Démo');
}

function startTrainerSubscriptionWithPayment() {
  const fn = (document.getElementById('onboard-trainer-firstname')?.value || '').trim() || 'Jean';
  const ln = (document.getElementById('onboard-trainer-lastname')?.value || '').trim() || 'Baptiste';
  const country = document.getElementById('onboard-trainer-country')?.value || 'Cameroun';
  const city = (document.getElementById('onboard-trainer-city')?.value || '').trim() || 'Douala';
  const em = (document.getElementById('onboard-trainer-email')?.value || '').trim() || `${fn.toLowerCase()}.${ln.toLowerCase()}@gmail.com`;
  const pass = document.getElementById('onboard-trainer-password')?.value || '';
  const ref = (document.getElementById('onboard-ref-code')?.value || '').trim();

  if (pass.length < 4) {
    showToast("Mot de passe trop court", "Le mot de passe doit comporter au moins 4 caractères.", true);
    return;
  }

  pendingTrainerData = {
    firstname: fn,
    lastname: ln,
    country: country,
    city: city,
    email: em,
    password: pass,
    refCode: ref,
    tier: state.userTier || 'bronze'
  };

  openCollateralModalForTier(pendingTrainerData.tier);
}

function openCollateralModalForTier(tierKey) {
  activeCheckoutTier = tierKey || state.userTier || 'bronze';
  const tierInfo = tierParams[activeCheckoutTier] || tierParams['bronze'];

  // Populate UI
  const nameEl = document.getElementById('chk-tier-name');
  const detailsEl = document.getElementById('chk-tier-details');
  const amountEl = document.getElementById('chk-collateral-amount');
  const cryptoAmountEl = document.getElementById('chk-crypto-amount-usdt');

  if (nameEl) nameEl.innerText = 'Palier ' + tierInfo.label;
  if (detailsEl) detailsEl.innerText = `⏱️ ${tierInfo.hours}h / jour • 🎯 Gains visés : ${tierInfo.salaryText}`;
  if (amountEl) amountEl.innerText = formatCurrency(tierInfo.collateral);
  
  const usdtVal = (tierInfo.collateral / ScaliaPaymentConfig.crypto.exchangeRateFcfaPerUsdt).toFixed(2);
  if (cryptoAmountEl) cryptoAmountEl.innerText = usdtVal + ' USDT';

  // Pre-fill phone prefix based on country
  const country = pendingTrainerData?.country || localStorage.getItem('scalia_country') || 'Cameroun';
  const prefixEl = document.getElementById('chk-phone-prefix');
  if (prefixEl) {
    if (country === 'Cameroun') prefixEl.value = '+237';
    else if (country === "Côte d'Ivoire") prefixEl.value = '+225';
    else if (country === 'Sénégal') prefixEl.value = '+221';
    else if (country === 'Bénin') prefixEl.value = '+229';
    else if (country === 'Togo') prefixEl.value = '+228';
    else if (country === 'Mali') prefixEl.value = '+223';
    else if (country === 'Burkina Faso') prefixEl.value = '+226';
    else if (country === 'RD Congo') prefixEl.value = '+243';
    else if (country === 'Congo-Brazzaville') prefixEl.value = '+242';
    else if (country === 'Gabon') prefixEl.value = '+241';
    else prefixEl.value = '+237';
  }

  // Show modal
  const modal = document.getElementById('collateral-checkout-modal');
  if (modal) modal.style.display = 'flex';

  // Automatically display paylink for active tier silently
  generateCollateralPaylink(true);
}

function closeCollateralModal() {
  const modal = document.getElementById('collateral-checkout-modal');
  if (modal) modal.style.display = 'none';
}

function selectCheckoutMethod(method) {
  if (method === 'card' || method === 'crypto') {
    const label = method === 'card' ? 'Carte Bancaire (Visa / Mastercard)' : 'Cryptomonnaie USDT (TRC-20)';
    if (typeof showPaymentUnavailableModal === 'function') {
      showPaymentUnavailableModal(label);
    }
    return;
  }

  currentCheckoutMethod = 'momo';
  document.getElementById('tab-chk-momo')?.classList.add('active');
  document.getElementById('tab-chk-card')?.classList.remove('active');
  document.getElementById('tab-chk-crypto')?.classList.remove('active');

  const fiatSection = document.getElementById('chk-section-fiat');
  const cryptoSection = document.getElementById('chk-section-crypto');
  const opLabel = document.getElementById('chk-operator-label');
  const opGrid = document.getElementById('chk-operator-grid');
  const phoneGroup = document.getElementById('chk-phone-group');

  if (method === 'crypto') {
    if (fiatSection) fiatSection.style.display = 'none';
    if (cryptoSection) cryptoSection.style.display = 'block';
  } else {
    if (fiatSection) fiatSection.style.display = 'block';
    if (cryptoSection) cryptoSection.style.display = 'none';

    if (method === 'card') {
      if (opLabel) opLabel.innerText = "Type de carte bancaire :";
      if (opGrid) {
        opGrid.innerHTML = `
          <div class="operator-chip active" id="chip-op-visa" onclick="selectOperator('visa')">
            <i class="ri-visa-line" style="color:#3b82f6;font-size:1.1rem;"></i>
            <span>Visa Card</span>
          </div>
          <div class="operator-chip" id="chip-op-mc" onclick="selectOperator('mastercard')">
            <i class="ri-mastercard-line" style="color:#ef4444;font-size:1.1rem;"></i>
            <span>Mastercard</span>
          </div>
        `;
      }
      if (phoneGroup) phoneGroup.style.display = 'none';
      currentOperator = 'visa';
    } else {
      if (opLabel) opLabel.innerText = "Sélectionnez votre opérateur de paiement :";
      if (opGrid) {
        opGrid.innerHTML = `
          <div class="operator-chip active" id="chip-op-mtn" onclick="selectOperator('mtn')">
            <i class="ri-radio-button-line" style="color: #fbbf24;"></i>
            <span>MTN MoMo</span>
          </div>
          <div class="operator-chip" id="chip-op-orange" onclick="selectOperator('orange')">
            <i class="ri-radio-button-line" style="color: #f97316;"></i>
            <span>Orange Money</span>
          </div>
        `;
      }
      if (phoneGroup) phoneGroup.style.display = 'block';
      currentOperator = 'mtn';
    }
  }

  // Hide previous paylink box on tab change
  const box = document.getElementById('chk-paylink-box');
  if (box) box.style.display = 'none';
}

function selectOperator(op) {
  currentOperator = op;
  document.querySelectorAll('.operator-chip').forEach(c => c.classList.remove('active'));
  const chip = document.getElementById('chip-op-' + op);
  if (chip) chip.classList.add('active');
}

function generateCollateralPaylink(silent = false) {
  const tierInfo = tierParams[activeCheckoutTier] || tierParams['bronze'];
  const gateway = document.getElementById('chk-gateway-select')?.value || 'cinetpay';
  const phonePrefix = document.getElementById('chk-phone-prefix')?.value || '+237';
  const phoneInput = (document.getElementById('chk-phone-input')?.value || '').trim();
  const fullPhone = phoneInput ? (phonePrefix + ' ' + phoneInput) : '';

  // Create unique transaction reference
  const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const randomPart = Math.floor(10000 + Math.random() * 90000);
  currentGeneratedTxnRef = `SCL-${activeCheckoutTier.toUpperCase()}-${datePart}-${randomPart}`;

  // Use official live payment link if configured, otherwise fallback to dynamic paylink
  const configuredLink = ScaliaPaymentConfig.paymentLinks && ScaliaPaymentConfig.paymentLinks[activeCheckoutTier];
  const payUrl = configuredLink || `${ScaliaPaymentConfig.checkoutBaseUrl}/${currentGeneratedTxnRef}?tier=${activeCheckoutTier}&amount=${tierInfo.collateral}&currency=${ScaliaPaymentConfig.currency}&op=${currentOperator}&ref=${currentGeneratedTxnRef}`;

  currentGeneratedPaylink = payUrl;

  // Update Paylink UI
  const box = document.getElementById('chk-paylink-box');
  const refEl = document.getElementById('chk-paylink-ref');
  const urlTextEl = document.getElementById('chk-paylink-url-text');
  const directBtn = document.getElementById('chk-paylink-direct-btn');

  if (refEl) refEl.innerText = currentGeneratedTxnRef;
  if (urlTextEl) urlTextEl.innerText = payUrl;
  if (directBtn) directBtn.href = payUrl;

  // Render QR code SVG
  renderPaylinkQrSvg(payUrl);

  if (box) {
    box.style.display = 'block';
    if (!silent) {
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  if (!silent) {
    showToast("Lien de Paiement Généré", "Référence " + currentGeneratedTxnRef + " prête.");
  }
}

function copyPaymentLink() {
  if (!currentGeneratedPaylink) return;
  navigator.clipboard.writeText(currentGeneratedPaylink).then(() => {
    showToast("Lien Copié", "Le lien de paiement est copié dans le presse-papiers !");
  }).catch(() => {
    showToast("Lien de Paiement", currentGeneratedPaylink);
  });
}

function togglePaylinkQrCode() {
  const qrBox = document.getElementById('chk-qrcode-box');
  if (qrBox) {
    qrBox.style.display = (qrBox.style.display === 'none' || !qrBox.style.display) ? 'block' : 'none';
  }
}

function copyCryptoAddress() {
  const addr = document.getElementById('chk-crypto-address')?.innerText || ScaliaPaymentConfig.crypto.trc20Address;
  navigator.clipboard.writeText(addr).then(() => {
    showToast("Adresse Copiée", "Adresse USDT TRC-20 copiée !");
  }).catch(() => {
    showToast("Adresse USDT", addr);
  });
}

function confirmCryptoDeposit() {
  const txid = (document.getElementById('chk-crypto-txid')?.value || '').trim();
  if (!txid || txid.length < 10) {
    showToast("Hash TXID requis", "Veuillez entrer le hash de votre transaction USDT.", true);
    return;
  }
  simulatePaymentApproval('Crypto USDT (TRC-20)');
}

function renderPaylinkQrSvg(text) {
  const container = document.getElementById('chk-qrcode-img-container');
  if (!container) return;

  // Deterministic SVG QR pattern
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash |= 0;
  }

  let cells = '';
  const size = 15;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Corner position markers (classic QR code squares)
      const isTopLeft = (r < 4 && c < 4);
      const isTopRight = (r < 4 && c >= size - 4);
      const isBottomLeft = (r >= size - 4 && c < 4);

      let filled = false;
      if (isTopLeft || isTopRight || isBottomLeft) {
        const inInner = (r >= 1 && r <= 2 && c >= 1 && c <= 2) ||
                        (r >= 1 && r <= 2 && c >= size - 3 && c <= size - 2) ||
                        (r >= size - 3 && r <= size - 2 && c >= 1 && c <= 2);
        filled = inInner || (r === 0 || r === 3 || c === 0 || c === 3 ||
                             c === size - 4 || c === size - 1 || r === size - 4 || r === size - 1);
      } else {
        filled = ((hash ^ (r * 31 + c * 17)) % 2) === 0;
      }

      if (filled) {
        cells += `<rect x="${c * 8}" y="${r * 8}" width="8" height="8" fill="#1e293b"/>`;
      }
    }
  }

  container.innerHTML = `
    <svg width="120" height="120" viewBox="0 0 ${size * 8} ${size * 8}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      ${cells}
    </svg>
  `;
}

function simulatePaymentApproval(overrideMethod) {
  const tierInfo = tierParams[activeCheckoutTier] || tierParams['bronze'];
  const methodLabel = overrideMethod || (currentCheckoutMethod === 'momo' ? `${currentOperator.toUpperCase()} Mobile Money` : currentCheckoutMethod === 'card' ? `${currentOperator.toUpperCase()} Card` : 'Crypto USDT');
  
  const txnRef = currentGeneratedTxnRef || `SCL-${activeCheckoutTier.toUpperCase()}-${Date.now().toString().slice(-6)}`;

  // Finalize candidate account if from onboarding
  const fn = pendingTrainerData?.firstname || localStorage.getItem('scalia_firstname') || 'Jean';
  const ln = pendingTrainerData?.lastname || localStorage.getItem('scalia_lastname') || 'Baptiste';
  const em = pendingTrainerData?.email || localStorage.getItem('scalia_email') || `${fn.toLowerCase()}.${ln.toLowerCase()}@gmail.com`;
  const country = pendingTrainerData?.country || localStorage.getItem('scalia_country') || 'Cameroun';
  const city = pendingTrainerData?.city || localStorage.getItem('scalia_city') || 'Douala';
  const pass = pendingTrainerData?.password || localStorage.getItem('scalia_password') || '1234';
  const username = localStorage.getItem('scalia_username') || ('COACH-' + fn.substring(0, 3).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000));
  const initials = (fn.charAt(0) + ln.charAt(0)).toUpperCase();

  // Persist user session
  localStorage.setItem('scalia_session_active', 'true');
  localStorage.setItem('scalia_role', 'entraineur');
  localStorage.setItem('scalia_username', username);
  localStorage.setItem('scalia_firstname', fn);
  localStorage.setItem('scalia_lastname', ln);
  localStorage.setItem('scalia_email', em);
  localStorage.setItem('scalia_initials', initials);
  localStorage.setItem('scalia_country', country);
  localStorage.setItem('scalia_city', city);
  localStorage.setItem('scalia_password', pass);
  localStorage.setItem('scalia_tier', activeCheckoutTier);
  localStorage.setItem('scalia_collateral_active', 'true');
  localStorage.setItem('scalia_collateral_paid_verified', 'true');
  state.collateralActive = true;

  // Update state
  state.role = 'entraineur';
  state.userTier = activeCheckoutTier;
  state.collateralLocked = tierInfo.collateral;
  state.dailyTargetTime = tierInfo.time;
  state.balance = parseInt(localStorage.getItem('scalia_balance')) || 0;

  // Add transaction to wallet history
  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-FR') + ' ' + now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  state.transactions.unshift({
    date: dateStr,
    type: `Dépôt Collatéral (${tierInfo.label})`,
    amount: tierInfo.collateral,
    status: 'Séquestré',
    method: methodLabel,
    ref: txnRef
  });

  saveSessionToLocalStorage();
  updateNavigationBars();
  updateAuthUI();

  // Close checkout modal & show receipt modal
  closeCollateralModal();
  showDigitalReceiptModal({
    ref: txnRef,
    date: dateStr,
    trainerName: `${fn} ${ln}`,
    location: `${city}, ${country}`,
    tierLabel: `Palier ${tierInfo.label} (${tierInfo.hours}h/j)`,
    method: methodLabel,
    amountText: formatCurrency(tierInfo.collateral)
  });
}

function showDigitalReceiptModal(receipt) {
  document.getElementById('rec-ref').innerText = receipt.ref;
  document.getElementById('rec-date').innerText = receipt.date;
  document.getElementById('rec-trainer-name').innerText = receipt.trainerName;
  document.getElementById('rec-location').innerText = receipt.location;
  document.getElementById('rec-tier').innerText = receipt.tierLabel;
  document.getElementById('rec-method').innerText = receipt.method;
  document.getElementById('rec-amount').innerText = receipt.amountText;

  const modal = document.getElementById('payment-receipt-modal');
  if (modal) modal.style.display = 'flex';
}

function closeReceiptModal() {
  const modal = document.getElementById('payment-receipt-modal');
  if (modal) modal.style.display = 'none';
}

function finishReceiptAndEnterConsole() {
  closeReceiptModal();
  const tier = activeCheckoutTier || state.userTier || 'bronze';
  const tierInfo = tierParams[tier] || tierParams['bronze'];
  state.collateralActive = true;
  state.collateralLocked = tierInfo.collateral;
  state.userTier = tier;
  state.dailyTargetTime = tierInfo.time;
  state.dailyTime = 0;
  localStorage.setItem('scalia_collateral_active', 'true');
  localStorage.setItem('scalia_collateral_paid_verified', 'true');
  localStorage.setItem('scalia_tier', tier);
  saveSessionToLocalStorage();
  showToast("Console Déverrouillée", "Collatéral séquestré avec succès ! Bon travail d'entraînement IA.");
  goTo('dresseur-screen');
}

function checkUrlPaymentRedirect() {
  try {
    const urlParams = new URLSearchParams(window.location.search);

    // 1. Auto-detect referral sponsor from URL query (?ref= or ?sponsor=)
    const refParam = urlParams.get('ref') || urlParams.get('sponsor');
    if (refParam) {
      const cleanRef = refParam.trim().toUpperCase();
      localStorage.setItem('scalia_sponsor_ref', cleanRef);
      const onboardRef = document.getElementById('onboard-ref-code');
      if (onboardRef) onboardRef.value = cleanRef;
      console.log('[Scalia] Auto-detected referral sponsor from URL:', cleanRef);
    }

    // 2. Auto-detect payment return status
    const paymentStatus = urlParams.get('payment') || urlParams.get('status');
    const tier = urlParams.get('tier') || 'bronze';

    if (paymentStatus === 'success' || paymentStatus === 'completed' || paymentStatus === 'approved') {
      console.log('[Scalia] Auto-detected successful payment return from redirect URL. Tier:', tier);
      activeCheckoutTier = tier;

      // Clean URL without reloading page so refreshing doesn't re-trigger
      const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.replaceState({ path: cleanUrl }, '', cleanUrl);

      // Activate account and show receipt
      simulatePaymentApproval('Paiement en ligne validé');
    }
  } catch (err) {
    console.warn('[Scalia] URL parameter error:', err);
  }
}
