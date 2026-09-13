// Internationalization and language selection (setLanguage, changeLanguage, toggleLangDropdown, closeAllLangDropdowns)
let currentLang = (typeof localStorage !== 'undefined' ? localStorage.getItem('scalia_lang') : null) || 'fr';
if (typeof window !== 'undefined') window.currentLang = currentLang;

function setLanguage(lang) {
  if (typeof SCALIA_TRANSLATIONS !== 'undefined' && !SCALIA_TRANSLATIONS[lang]) lang = 'fr';
  currentLang = lang;
  if (typeof window !== 'undefined') window.currentLang = lang;
  if (typeof localStorage !== 'undefined') localStorage.setItem('scalia_lang', lang);

      // Set document attributes
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

      // Update labels in pickers
      const langLabels = {
        fr: { full: 'Français', code: 'FR', flag: '🇫🇷' },
        en: { full: 'English', code: 'EN', flag: '🇬🇧' },
        es: { full: 'Español', code: 'ES', flag: '🇪🇸' },
        ar: { full: 'العربية', code: 'AR', flag: '🇸🇦' }
      };
      
      const footerLabel = document.getElementById('landing-lang-label');
      if (footerLabel) {
        footerLabel.innerHTML = `${langLabels[lang].flag} ${langLabels[lang].full}`;
      }
      const topbarLabel = document.getElementById('topbar-lang-label');
      if (topbarLabel) {
        topbarLabel.innerText = langLabels[lang].code;
      }

      // Update active class in menus
      document.querySelectorAll('.lang-option').forEach(opt => {
        if (opt.getAttribute('data-lang') === lang) {
          opt.classList.add('active');
        } else {
          opt.classList.remove('active');
        }
      });

      // Apply translations to elements with data-i18n
      const dict = SCALIA_TRANSLATIONS[lang] || SCALIA_TRANSLATIONS.fr;
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
          el.innerHTML = dict[key];
        }
      });

      // Update current topbar screen title if console is active
      const titleEl = document.getElementById('topbar-title-text');
      if (titleEl) {
        const activeScreen = document.querySelector('.view-screen.active-screen');
        if (activeScreen) {
          if (activeScreen.id === 'dresseur-screen') {
            titleEl.innerText = dict.topbar_title_trainer;
          } else if (activeScreen.id === 'wallet-screen') {
            titleEl.innerText = dict.topbar_title_wallet;
          } else if (activeScreen.id === 'referral-entraineur-screen') {
            titleEl.innerText = dict.topbar_title_referral;
          }
        }
      }

      // Refresh dynamic UI components
      if (typeof updateAuthUI === 'function') updateAuthUI();
      if (typeof refreshUI === 'function') refreshUI();
      if (typeof updateTrainerSim === 'function') updateTrainerSim();
      
      closeAllLangDropdowns();
    }

    function changeLanguage(lang, event) {
      if (event) {
        event.stopPropagation();
      }
      setLanguage(lang);
      const toastTitles = {
        fr: "Langue mise à jour",
        en: "Language updated",
        es: "Idioma actualizado",
        ar: "تم تحديث اللغة"
      };
      const toastMsgs = {
        fr: "Interface désormais en Français.",
        en: "Interface is now in English.",
        es: "La interfaz ahora está en Español.",
        ar: "تم تغيير واجهة التطبيق إلى اللغة العربية."
      };
      showToast(toastTitles[lang] || toastTitles.fr, toastMsgs[lang] || toastMsgs.fr);
    }

    function toggleLangDropdown(which, event) {
      if (event) {
        event.stopPropagation();
      }
      const menu = document.getElementById(which === 'landing' ? 'landing-lang-menu' : 'topbar-lang-menu');
      if (!menu) return;
      const isShown = menu.classList.contains('show');
      closeAllLangDropdowns();
      if (!isShown) {
        menu.classList.add('show');
      }
    }

    function closeAllLangDropdowns() {
      const m1 = document.getElementById('landing-lang-menu');
      const m2 = document.getElementById('topbar-lang-menu');
      if (m1) m1.classList.remove('show');
      if (m2) m2.classList.remove('show');
    }

    // Close language dropdowns on click outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.lang-selector-container')) {
        closeAllLangDropdowns();
      }
    });
