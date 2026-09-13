// app.js

// PRODUCTION STORAGE SANITIZER: ZERO OUT ALL DUMMY BALANCES & LEGACY MOCK DATA
(function sanitizeScaliaStorage() {
  try {
    // Clean legacy mock referrals if stored
    const refTx = localStorage.getItem('scalia_ref_tx');
    if (refTx && refTx.includes('Paul N.')) {
      localStorage.removeItem('scalia_ref_tx');
      localStorage.setItem('scalia_ref_count', '0');
      localStorage.setItem('scalia_ref_commissions', '0');
    }
    const isVerified = localStorage.getItem('scalia_collateral_paid_verified') === 'true';
    const isActive = localStorage.getItem('scalia_collateral_active') === 'true';
    if (!isVerified && !isActive) {
      localStorage.setItem('scalia_collateral_active', 'false');
      localStorage.setItem('scalia_balance', '0');
      localStorage.setItem('scalia_daily_earnings', '0');
      localStorage.setItem('scalia_daily_time', '0');
    }
  } catch (e) {
    console.warn('[Scalia] Storage sanitize notice:', e);
  }
})();

// Initialize session when DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
  if (typeof initSession === 'function') {
    initSession();
  }
});

// Check URL payment redirects when all resources are loaded
window.addEventListener('load', () => {
  if (typeof checkUrlPaymentRedirect === 'function') {
    checkUrlPaymentRedirect();
  }
});
