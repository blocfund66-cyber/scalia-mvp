import { useScalia } from './context/ScaliaContext';

// Layout
import { FomoBanner } from './components/layout/FomoBanner';
import LandingHeader from './components/landing/LandingHeader';
import { Topbar } from './components/layout/Topbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';

// Common
import { Toast } from './components/common/Toast';

// Screens
import LandingScreen from './components/landing/LandingScreen';
import OnboardingScreen from './components/onboarding/OnboardingScreen';
import { TrainerHeaderStats } from './components/dashboard/TrainerHeaderStats';
import { TimeProgressTracker } from './components/dashboard/TimeProgressTracker';
import { NotificationCenter } from './components/dashboard/NotificationCenter';
import { TasksConsole } from './components/tasks/TasksConsole';
import { WalletScreen } from './components/wallet/WalletScreen';
import { ReferralScreen } from './components/referral/ReferralScreen';
import { ProfileSettings } from './components/profile/ProfileSettings';

// Modals
import SuspensionModal from './components/modals/SuspensionModal';
import QualityGuidelinesModal from './components/modals/QualityGuidelinesModal';
import RecommendationModal from './components/modals/RecommendationModal';
import CheckoutModal from './components/modals/CheckoutModal';
import TermsModal from './components/modals/TermsModal';
import PayoutIncidentModal from './components/modals/PayoutIncidentModal';
import WithdrawalLockModal from './components/modals/WithdrawalLockModal';

export default function App() {
  const { screen, setScreen } = useScalia();

  if (screen === 'landing') {
    return (
      <>
        <FomoBanner />
        <LandingScreen />
        <Toast />
        <CheckoutModal />
        <TermsModal />
      </>
    );
  }

  if (screen === 'onboarding') {
    return (
      <>
        <FomoBanner />
        <OnboardingScreen />
        <Toast />
        <TermsModal />
      </>
    );
  }

  // Authenticated Console Layout
  return (
    <>
      <FomoBanner />
      <Sidebar />
      <Topbar />
      <MobileNav />

      <main className="main-content">
        {screen === 'dashboard' && (
          <div id="dresseur-screen" className="view-screen" style={{ position: 'relative', display: 'block' }}>
            <div className="screen-watermark" style={{ backgroundImage: "url('/assets/ai_training_concept.png')" }}></div>
            <TrainerHeaderStats />
            <NotificationCenter />
            <TimeProgressTracker />
            <div style={{ marginTop: '24px' }}>
              <TasksConsole />
            </div>
          </div>
        )}

        {screen === 'tasks' && (
          <div id="dresseur-screen" className="view-screen" style={{ position: 'relative', display: 'block' }}>
            <div className="screen-watermark" style={{ backgroundImage: "url('/assets/ai_training_concept.png')" }}></div>
            <TrainerHeaderStats />
            <TasksConsole />
          </div>
        )}

        {screen === 'wallet' && (
          <div id="wallet-screen" className="view-screen" style={{ display: 'block' }}>
            <WalletScreen />
          </div>
        )}

        {screen === 'referral' && (
          <div id="referral-entraineur-screen" className="view-screen" style={{ display: 'block' }}>
            <ReferralScreen />
          </div>
        )}

        {screen === 'notifications' && (
          <div id="notifications-screen" className="view-screen" style={{ display: 'block', maxWidth: '960px', margin: '0 auto', padding: '10px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i className="ri-notification-3-fill" style={{ color: 'var(--accent-emerald)' }}></i>
                  Centre de Notifications & Alertes
                </h2>
                <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Suivi des actions requises, assiduité horaire, conformité qualité et sécurité
                </p>
              </div>
              <button
                className="btn btn-secondary"
                onClick={() => setScreen('dashboard')}
                style={{ fontSize: '0.82rem', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <i className="ri-arrow-left-line"></i> Console Entraîneur
              </button>
            </div>
            <NotificationCenter />
          </div>
        )}

        {screen === 'profile' && (
          <div id="profile-screen" className="view-screen" style={{ display: 'block', padding: '10px 0' }}>
            <ProfileSettings />
          </div>
        )}
      </main>

      {/* Global Modals */}
      <SuspensionModal />
      <QualityGuidelinesModal />
      <RecommendationModal />
      <CheckoutModal />
      <TermsModal />
      <PayoutIncidentModal />
      <WithdrawalLockModal />

      {/* Global Toast */}
      <Toast />
    </>
  );
}
