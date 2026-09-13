// pwa.js

let deferredPWAEvent = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPWAEvent = e;
  const banner = document.getElementById('install-prompt-banner');
  if (banner) banner.style.display = 'block';
});

window.addEventListener('appinstalled', () => {
  deferredPWAEvent = null;
  closeInstallModal();
  showToast('Application Installée', 'Le raccourci Scalia a été installé avec succès sur votre appareil !');
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      console.log('Scalia PWA Service Worker actif');
    }).catch(err => {
      console.log('Service Worker info:', err);
    });
  });
}

function openInstallModal() {
  const modal = document.getElementById('install-modal');
  if (!modal) return;
  
  const banner = document.getElementById('install-prompt-banner');
  if (banner) {
    banner.style.display = deferredPWAEvent ? 'block' : 'none';
  }

  // Detect OS for highlighting guide
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isAndroid = /Android/.test(navigator.userAgent);
  
  const guideAndroid = document.getElementById('guide-android');
  const guideIOS = document.getElementById('guide-ios');
  const guideDesktop = document.getElementById('guide-desktop');

  if (guideAndroid) guideAndroid.style.borderColor = isAndroid ? 'var(--accent-emerald)' : 'var(--border-color)';
  if (guideIOS) guideIOS.style.borderColor = isIOS ? 'var(--accent-emerald)' : 'var(--border-color)';
  if (guideDesktop) guideDesktop.style.borderColor = (!isIOS && !isAndroid) ? 'var(--accent-cyan)' : 'var(--border-color)';

  modal.style.display = 'flex';
}

function closeInstallModal() {
  const modal = document.getElementById('install-modal');
  if (modal) modal.style.display = 'none';
}

async function executeNativeInstallPrompt() {
  if (deferredPWAEvent) {
    deferredPWAEvent.prompt();
    const { outcome } = await deferredPWAEvent.userChoice;
    if (outcome === 'accepted') {
      showToast('Installation', "Installation de l'application Scalia en cours...");
      closeInstallModal();
    }
    deferredPWAEvent = null;
  } else {
    showToast('Information', 'Suivez les instructions ci-dessous pour ajouter le raccourci.');
  }
}

async function triggerPWAInstall() {
  if (deferredPWAEvent) {
    deferredPWAEvent.prompt();
    const { outcome } = await deferredPWAEvent.userChoice;
    if (outcome === 'accepted') {
      showToast('Installation', "Installation de l'application Scalia en cours...");
      closeInstallModal();
      deferredPWAEvent = null;
      return;
    }
    deferredPWAEvent = null;
  }
  openInstallModal();
}
