// fomo.js - Gestion du FOMO (Fear Of Missing Out)
let remainingSeats = 38556;

function initFomoCountdown() {
  const savedSeats = localStorage.getItem('scalia_remaining_seats_v2');
  if (savedSeats) {
    remainingSeats = parseInt(savedSeats);
    if (isNaN(remainingSeats) || remainingSeats < 100 || remainingSeats > 50000) remainingSeats = 38556;
  } else {
    remainingSeats = 38556;
    localStorage.setItem('scalia_remaining_seats_v2', remainingSeats);
  }

  updateFomoUI(8);

  // Decrement every 60 seconds (with quick first trigger at 4s for immediate user verification)
  setTimeout(() => {
    decrementFomoSeats();
  }, 4000);

  setInterval(() => {
    decrementFomoSeats();
  }, 60000);
}

function decrementFomoSeats() {
  // Random drop between 1 and 10 seats
  const drop = Math.floor(Math.random() * 10) + 1;
  remainingSeats = Math.max(12, remainingSeats - drop);
  localStorage.setItem('scalia_remaining_seats_v2', remainingSeats);

  updateFomoUI(drop);
}

function updateFomoUI(recentCount) {
  const topBadge = document.getElementById('fomo-seats-counter');
  const topBadgeDup = document.getElementById('fomo-seats-counter-dup');
  const onboardBadge = document.getElementById('onboard-fomo-seats');
  const ticker = document.getElementById('fomo-ticker-live');
  const tickerDup = document.getElementById('fomo-ticker-live-dup');
  const onboardTicker = document.getElementById('onboard-fomo-recent');

  const formatted = formatNumber(remainingSeats);
  if (topBadge) topBadge.innerText = formatted;
  if (topBadgeDup) topBadgeDup.innerText = formatted;
  if (onboardBadge) onboardBadge.innerText = formatted;

  const cities = ["Douala", "Abidjan", "Yaoundé", "Dakar", "Cotonou", "Lomé", "Bafoussam", "Libreville", "Bamako"];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const msg = `+${recentCount} nouvelles inscriptions (${city}) !`;
  const htmlMsg = `<i class="ri-user-add-line" style="color: var(--accent-emerald);"></i> ${msg}`;

  if (ticker) ticker.innerHTML = htmlMsg;
  if (tickerDup) tickerDup.innerHTML = htmlMsg;

  if (onboardTicker) {
    onboardTicker.innerText = `${recentCount} nouvelles inscriptions !`;
  }
  syncFomoBannerHeight();
}

// Synchronize --fomo-banner-height dynamically in real time with actual DOM height
function syncFomoBannerHeight() {
  const banner = document.getElementById('global-fomo-banner');
  if (banner) {
    const height = Math.round(banner.getBoundingClientRect().height);
    if (height > 0) {
      document.documentElement.style.setProperty('--fomo-banner-height', `${height}px`);
    }
  }
}

if (typeof ResizeObserver !== 'undefined') {
  const bannerEl = document.getElementById('global-fomo-banner');
  if (bannerEl) {
    new ResizeObserver(() => syncFomoBannerHeight()).observe(bannerEl);
  }
}
window.addEventListener('resize', syncFomoBannerHeight);
window.addEventListener('DOMContentLoaded', syncFomoBannerHeight);
window.addEventListener('load', syncFomoBannerHeight);
