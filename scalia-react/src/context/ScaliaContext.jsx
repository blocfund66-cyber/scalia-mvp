import React, { createContext, useContext, useState, useEffect } from 'react';
import { tierParams, ScaliaPaymentConfig } from '../data/constants';
import { SCALIA_TRANSLATIONS } from '../data/translations';

const ScaliaContext = createContext(null);

export const ScaliaProvider = ({ children }) => {
  // Navigation synced with URL hash
  const getScreenFromHash = () => {
    const raw = (window.location.hash || '').replace('#', '').replace('/', '').trim();
    if (['dashboard', 'tasks', 'wallet', 'referral', 'onboarding', 'notifications', 'profile'].includes(raw)) {
      return raw;
    }
    return 'landing';
  };

  const [screen, setScreenState] = useState(() => getScreenFromHash());

  const setScreen = (newScreen) => {
    setScreenState(newScreen);
    if (newScreen === 'landing') {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname);
      }
    } else {
      window.location.hash = newScreen;
    }
  };

  useEffect(() => {
    const handleHash = () => {
      const scr = getScreenFromHash();
      setScreenState(scr);
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Theme & i18n
  const [theme, setTheme] = useState(() => localStorage.getItem('scalia_theme') || 'light');
  const [lang, setLang] = useState(() => localStorage.getItem('scalia_lang') || 'fr');

  // User & Auth
  const [user, setUser] = useState(() => {
    const active = localStorage.getItem('scalia_session_active') === 'true';
    if (!active) return null;
    return {
      role: localStorage.getItem('scalia_role') || 'entraineur',
      firstname: localStorage.getItem('scalia_firstname') || '',
      lastname: localStorage.getItem('scalia_lastname') || '',
      email: localStorage.getItem('scalia_email') || '',
      username: localStorage.getItem('scalia_username') || 'COACH-5582',
      initials: localStorage.getItem('scalia_initials') || 'SC',
      tier: localStorage.getItem('scalia_tier') || 'bronze',
      country: localStorage.getItem('scalia_country') || 'Cameroun',
      city: localStorage.getItem('scalia_city') || 'Douala'
    };
  });

  // Strict Zero Initial State for Financials
  const [collateralActive, setCollateralActive] = useState(() => localStorage.getItem('scalia_collateral_active') === 'true');
  const userTier = user?.tier || 'bronze';
  const tierInfo = tierParams[userTier] || tierParams.bronze;
  
  const [collateralLocked, setCollateralLocked] = useState(() => {
    const active = localStorage.getItem('scalia_collateral_active') === 'true';
    return active ? (tierInfo.collateral || 15000) : 0;
  });

  const [balance, setBalance] = useState(() => parseInt(localStorage.getItem('scalia_balance')) || 0);
  const [dailyEarnings, setDailyEarnings] = useState(() => parseInt(localStorage.getItem('scalia_daily_earnings')) || 0);
  const [dailyTime, setDailyTime] = useState(() => parseInt(localStorage.getItem('scalia_daily_time')) || 0);
  const [dailyTargetTime, setDailyTargetTime] = useState(tierInfo.time || 120);

  // Training Cycle & Withdrawal Milestone (Default 4 weeks / 28 days = 1 month milestone reached)
  const [cycleWeeks, setCycleWeeks] = useState(() => {
    const saved = localStorage.getItem('scalia_cycle_weeks');
    return saved !== null ? parseInt(saved, 10) : 4;
  });
  const [cycleDays, setCycleDays] = useState(() => {
    const saved = localStorage.getItem('scalia_cycle_days');
    return saved !== null ? parseInt(saved, 10) : 28;
  });

  const isWithdrawalCycleReached = cycleWeeks >= 4 || cycleDays >= 28;

  const setTrainerCycle = (weeks, days = weeks * 7) => {
    setCycleWeeks(weeks);
    setCycleDays(days);
    localStorage.setItem('scalia_cycle_weeks', weeks);
    localStorage.setItem('scalia_cycle_days', days);
  };

  // Trainer Rating (/ 20), Quality, Warnings, Suspension
  const [trainerRating, setTrainerRating] = useState(() => parseFloat(localStorage.getItem('scalia_rating')) || 20.0);
  const [ratingQuality, setRatingQuality] = useState(() => parseFloat(localStorage.getItem('scalia_rating_quality')) || 12.0);
  const [ratingTime, setRatingTime] = useState(() => parseFloat(localStorage.getItem('scalia_rating_time')) || 8.0);
  const [evaluatedTasksCount, setEvaluatedTasksCount] = useState(() => parseInt(localStorage.getItem('scalia_eval_tasks_count')) || 0);
  const [warningsCount, setWarningsCount] = useState(() => parseInt(localStorage.getItem('scalia_warnings_count')) || 0);
  const [isSuspended, setIsSuspended] = useState(() => localStorage.getItem('scalia_is_suspended') === 'true');

  // Referral Parameters (Strict Zero Default)
  const [trainerReferralCount, setTrainerReferralCount] = useState(() => parseInt(localStorage.getItem('scalia_ref_count')) || 0);
  const [trainerReferralCommissions, setTrainerReferralCommissions] = useState(() => parseInt(localStorage.getItem('scalia_ref_commissions')) || 0);
  const [trainerReferralTransactions, setTrainerReferralTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('scalia_ref_tx');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Transactions History
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('scalia_transactions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Toast & Modals
  const [toast, setToast] = useState({ show: false, title: '', message: '', isError: false });
  const [activeModal, setActiveModal] = useState(null); // 'payment', 'recommendation', 'suspension', 'guidelines', 'checkout', 'payout-incident'
  const [payoutIncidentType, setPayoutIncidentType] = useState('salary'); // 'salary' | 'collateral'
  const [selectedCheckoutTier, setSelectedCheckoutTier] = useState('bronze');

  // FOMO Countdown Seats
  const [fomoSeats, setFomoSeats] = useState(38556);

  // Synchronize Body Classes for Light/Dark and Landing/Console
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
    localStorage.setItem('scalia_theme', theme);
  }, [theme]);

  useEffect(() => {
    if (screen === 'landing' || screen === 'onboarding') {
      document.body.classList.remove('console-mode');
      document.body.classList.add('landing-mode');
    } else {
      document.body.classList.remove('landing-mode');
      document.body.classList.add('console-mode');
    }
    window.scrollTo(0, 0);
  }, [screen]);

  // FOMO live decrements
  useEffect(() => {
    const interval = setInterval(() => {
      setFomoSeats(prev => Math.max(35000, prev - Math.floor(1 + Math.random() * 3)));
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const t = (key) => {
    const dict = SCALIA_TRANSLATIONS[lang] || SCALIA_TRANSLATIONS.fr;
    return dict[key] || SCALIA_TRANSLATIONS.fr[key] || key;
  };

  const showToast = (title, message, isError = false) => {
    setToast({ show: true, title, message, isError });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR').format(amount || 0) + ' FCFA';
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('scalia_lang', newLang);
  };

  const loginUser = (userData) => {
    localStorage.setItem('scalia_session_active', 'true');
    localStorage.setItem('scalia_role', userData.role || 'entraineur');
    localStorage.setItem('scalia_firstname', userData.firstname || 'Jean');
    localStorage.setItem('scalia_lastname', userData.lastname || 'Baptiste');
    localStorage.setItem('scalia_email', userData.email || '');
    localStorage.setItem('scalia_username', userData.username || 'COACH-JB-5582');
    localStorage.setItem('scalia_initials', userData.initials || 'JB');
    localStorage.setItem('scalia_tier', userData.tier || 'bronze');
    localStorage.setItem('scalia_country', userData.country || 'Cameroun');
    localStorage.setItem('scalia_city', userData.city || 'Douala');

    setUser(userData);
    setDailyTargetTime(tierParams[userData.tier || 'bronze']?.time || 120);

    const hasCollat = localStorage.getItem('scalia_collateral_active') === 'true';
    setCollateralActive(hasCollat);
    setCollateralLocked(hasCollat ? (tierParams[userData.tier || 'bronze']?.collateral || 15000) : 0);

    setScreen('dashboard');
    showToast("Connexion Réussie", `Ravi de vous accueillir sur Scalia, ${userData.firstname} !`);

    if (!hasCollat) {
      setTimeout(() => {
        setActiveModal('recommendation');
      }, 400);
    }
  };

  const logoutUser = () => {
    localStorage.setItem('scalia_session_active', 'false');
    setUser(null);
    setScreen('landing');
    showToast("Déconnexion", "Votre session a été verrouillée.");
  };

  // Complete a task and adjust rating /20, warnings and suspension
  const completeTask = ({ payout, minutes, label, qualityScore = 12.0, elapsedSec = 8 }) => {
    let finalPayout = payout;
    let bonusMsg = "";

    if (userTier === 'platinum') {
      finalPayout = Math.round(payout * 1.10);
      bonusMsg = " (+10% Bonus Platinum)";
    } else if (userTier === 'diamond') {
      finalPayout = Math.round(payout * 1.20);
      bonusMsg = " (+20% Bonus Diamond Plein Temps)";
    }

    // Time respect calculation
    let timeScore = 8.0;
    let isRushed = false;
    if (elapsedSec < 3) {
      timeScore = 2.0;
      isRushed = true;
    } else if (elapsedSec < 6) {
      timeScore = 5.0;
    }

    // Update Moving Rating
    const newEvalCount = evaluatedTasksCount + 1;
    setEvaluatedTasksCount(newEvalCount);
    localStorage.setItem('scalia_eval_tasks_count', newEvalCount);

    let newQ = qualityScore;
    let newT = timeScore;
    let newTotal = qualityScore + timeScore;

    if (newEvalCount > 1) {
      newQ = Math.round(((ratingQuality * 0.7) + (qualityScore * 0.3)) * 10) / 10;
      newT = Math.round(((ratingTime * 0.7) + (timeScore * 0.3)) * 10) / 10;
      newTotal = Math.max(0, Math.min(20, Math.round((newQ + newT) * 10) / 10));
    }

    setRatingQuality(newQ);
    setRatingTime(newT);
    setTrainerRating(newTotal);
    localStorage.setItem('scalia_rating_quality', newQ);
    localStorage.setItem('scalia_rating_time', newT);
    localStorage.setItem('scalia_rating', newTotal);

    // Warning & Suspension Management
    if (newTotal < 10.0) {
      const nextWarn = warningsCount + 1;
      setWarningsCount(nextWarn);
      localStorage.setItem('scalia_warnings_count', nextWarn);

      if (nextWarn === 1) {
        showToast("Avertissement Qualité (1/3)", `Votre note est passée à ${newTotal.toFixed(1)}/20. Prenez le temps de soigner vos validations.`, true);
      } else if (nextWarn === 2) {
        showToast("Dernier Avertissement (2/3)", "Attention : une nouvelle baisse de note provoquera la suspension de votre compte.", true);
      } else if (nextWarn >= 3 || newTotal < 6.0) {
        setIsSuspended(true);
        localStorage.setItem('scalia_is_suspended', 'true');
        showToast("Compte Suspendu", "Compte suspendu pour non-conformité qualité répétée (< 10/20).", true);
        setActiveModal('suspension');
      }
    } else if (newTotal >= 15.0 && warningsCount > 0) {
      const decWarn = Math.max(0, warningsCount - 1);
      setWarningsCount(decWarn);
      localStorage.setItem('scalia_warnings_count', decWarn);
    }

    // Financial updates
    const newBal = balance + finalPayout;
    const newDailyEarn = dailyEarnings + finalPayout;
    const newDailyTime = dailyTime + minutes;

    setBalance(newBal);
    setDailyEarnings(newDailyEarn);
    setDailyTime(newDailyTime);

    localStorage.setItem('scalia_balance', newBal);
    localStorage.setItem('scalia_daily_earnings', newDailyEarn);
    localStorage.setItem('scalia_daily_time', newDailyTime);

    // Add transaction
    const dateStr = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
    const newTx = {
      date: dateStr,
      type: label + bonusMsg,
      amount: finalPayout,
      status: 'Complété',
      method: 'Console Entraîneur'
    };
    const updatedTx = [newTx, ...transactions];
    setTransactions(updatedTx);
    localStorage.setItem('scalia_transactions', JSON.stringify(updatedTx));

    // Dynamic Notification Event
    addNotificationEvent({
      category: 'tasks',
      type: 'success',
      icon: 'ri-checkbox-circle-fill',
      badge: 'Micro-Tâche Validée',
      title: `+${finalPayout} FCFA crédités (${label})`,
      message: `Exercice validé avec succès (+${minutes} min au compteur). Note actuelle: ${newTotal.toFixed(1)}/20.`,
      time: "À l'instant"
    });

    showToast("Tâche Validée", `+${finalPayout} FCFA ajoutés • Note: ${newTotal.toFixed(1)}/20`);
  };

  const activateCollateral = (tierKey) => {
    const tier = tierParams[tierKey] || tierParams.bronze;
    setCollateralActive(true);
    setCollateralLocked(tier.collateral);
    setDailyTargetTime(tier.time);

    localStorage.setItem('scalia_collateral_active', 'true');
    localStorage.setItem('scalia_tier', tierKey);
    localStorage.setItem('scalia_collateral_paid_verified', 'true');

    if (user) {
      setUser(prev => ({ ...prev, tier: tierKey }));
    }

    addNotificationEvent({
      category: 'finances',
      type: 'cta',
      icon: 'ri-shield-check-fill',
      badge: 'Collatéral Garanti',
      title: `Palier ${tier.label} Activé avec Succès !`,
      message: `Votre dépôt de garantie de ${tier.collateral.toLocaleString()} FCFA est placé sous séquestre sécurisé (100% remboursable). Vos exercices rémunérés sont débloqués.`,
      time: "À l'instant"
    });

    showToast("Collatéral Activé !", `Félicitations, Palier ${tier.label} activé. Exercices débloqués.`);
    setActiveModal(null);
  };

  const openCheckoutForTier = (tierKey) => {
    setSelectedCheckoutTier(tierKey || userTier || 'bronze');
    setActiveModal('recommendation');
  };

  // Notification History Management (Persistent events)
  const [notificationHistory, setNotificationHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('scalia_notifications_history');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'notif-welcome',
          category: 'system',
          type: 'tip',
          icon: 'ri-sparkling-fill',
          badge: 'Bienvenue',
          title: 'Bienvenue dans la Communauté des Entraîneurs Scalia',
          message: 'Votre console de labellisation d\'IA est active. Prenez connaissance des consignes de rigueur pour maximiser vos gains quotidiens.',
          time: 'Il y a 10 min',
          actionText: 'Guide des Bonnes Pratiques',
          actionModal: 'guidelines'
        }
      ];
    } catch {
      return [];
    }
  });

  const addNotificationEvent = (event) => {
    const newNotif = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: Date.now(),
      time: "À l'instant",
      category: event.category || 'system',
      type: event.type || 'tip',
      icon: event.icon || 'ri-notification-3-line',
      badge: event.badge || 'Notification',
      title: event.title,
      message: event.message,
      actionText: event.actionText || null,
      actionModal: event.actionModal || null
    };

    setNotificationHistory(prev => {
      const updated = [newNotif, ...prev];
      localStorage.setItem('scalia_notifications_history', JSON.stringify(updated));
      return updated;
    });

    setNotificationsRead(false);
    localStorage.setItem('scalia_notifs_read', 'false');
  };

  const deleteNotification = (id) => {
    setNotificationHistory(prev => {
      const updated = prev.filter(n => n.id !== id);
      localStorage.setItem('scalia_notifications_history', JSON.stringify(updated));
      return updated;
    });
  };

  const clearAllNotifications = () => {
    setNotificationHistory([]);
    localStorage.setItem('scalia_notifications_history', JSON.stringify([]));
  };

  // Notifications Read State & Exact Count
  const [notificationsRead, setNotificationsRead] = useState(() => {
    return localStorage.getItem('scalia_notifs_read') === 'true';
  });

  const markNotificationsAsRead = () => {
    setNotificationsRead(true);
    localStorage.setItem('scalia_notifs_read', 'true');
  };

  // Automatically mark notifications as read when entering notifications screen
  useEffect(() => {
    if (screen === 'notifications') {
      markNotificationsAsRead();
    }
  }, [screen]);

  // Actual count of active notifications (system alerts + unread events)
  const totalNotifCount = (() => {
    if (isSuspended) return 1;
    let c = 0;
    if (warningsCount > 0) c += 1;
    if (!collateralActive) c += 1;
    else {
      c += 2; // Tip + Daily goal
      if (trainerRating >= 16.0) c += 1;
    }
    c += notificationHistory.length;
    return c;
  })();

  const unreadNotifCount = notificationsRead ? 0 : totalNotifCount;

  return (
    <ScaliaContext.Provider value={{
      screen, setScreen,
      theme, toggleTheme,
      lang, changeLanguage, t,
      user, setUser, loginUser, logoutUser,
      collateralActive, collateralLocked,
      cycleWeeks, cycleDays, isWithdrawalCycleReached, setTrainerCycle,
      balance, dailyEarnings, dailyTime, dailyTargetTime,
      trainerRating, ratingQuality, ratingTime, evaluatedTasksCount, warningsCount, isSuspended,
      trainerReferralCount, trainerReferralCommissions, trainerReferralTransactions,
      transactions,
      fomoSeats,
      toast, showToast,
      activeModal, setActiveModal,
      payoutIncidentType, setPayoutIncidentType,
      selectedCheckoutTier, setSelectedCheckoutTier, openCheckoutForTier,
      formatCurrency, completeTask, activateCollateral,
      unreadNotifCount, totalNotifCount, notificationsRead, markNotificationsAsRead,
      notificationHistory, addNotificationEvent, deleteNotification, clearAllNotifications
    }}>
      {children}
    </ScaliaContext.Provider>
  );
};

export const useScalia = () => {
  const context = useContext(ScaliaContext);
  return context || {};
};
