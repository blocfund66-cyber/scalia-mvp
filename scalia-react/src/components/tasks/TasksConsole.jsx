import React, { useState, useEffect, useRef } from 'react';
import { useScalia } from '../../context/ScaliaContext';
import { captchaBank, videoBank, textBank, auditBank, tierParams } from '../../data/constants';

export const TasksConsole = () => {
  const {
    collateralActive,
    collateralLocked,
    user,
    isSuspended,
    completeTask,
    openCheckoutForTier,
    setActiveModal,
    showToast
  } = useScalia();

  const userTier = user?.tier || 'bronze';
  const isSilverPlus = ['silver', 'gold', 'platinum', 'diamond'].includes(userTier);
  const isGoldPlus = ['gold', 'platinum', 'diamond'].includes(userTier);

  const [activeTask, setActiveTask] = useState(null); // 'captcha' | 'video' | 'text' | 'audit' | null
  const [taskStartTime, setTaskStartTime] = useState(null);
  const [taskIndex, setTaskIndex] = useState(1);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [successInfo, setSuccessInfo] = useState({ payout: 0, minutes: 0, label: '', note: 20 });

  // CAPTCHA State
  const [captchaIdx, setCaptchaIdx] = useState(0);
  const [selectedCells, setSelectedCells] = useState([]);

  // Video State
  const [videoIdx, setVideoIdx] = useState(0);
  const [videoSeconds, setVideoSeconds] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [videoRating, setVideoRating] = useState(null);
  const [videoFeedback, setVideoFeedback] = useState('');
  const videoTimerRef = useRef(null);

  // Text Correction State
  const [textIdx, setTextIdx] = useState(0);
  const [textCorrection, setTextCorrection] = useState('');

  // Audit State
  const [auditIdx, setAuditIdx] = useState(0);
  const [auditDiag, setAuditDiag] = useState('hallucination');
  const [auditFeedback, setAuditFeedback] = useState('');

  // Cleanup video timer on unmount
  useEffect(() => {
    return () => {
      if (videoTimerRef.current) clearInterval(videoTimerRef.current);
    };
  }, []);

  const handleSelectModule = (type) => {
    if (isSuspended) {
      showToast("Compte Suspendu", "Votre compte est suspendu pour non-conformité qualité. Consultez vos notifications.", true);
      setActiveModal('suspension');
      return;
    }

    if (!collateralActive || collateralLocked === 0) {
      showToast("Collatéral Requis", "Activez votre collatéral de garantie pour accéder aux exercices rémunérés.", true);
      openCheckoutForTier('bronze');
      return;
    }

    if (type === 'text' && !isSilverPlus) {
      showToast("Palier Silver Requis", "La correction de textes LLM nécessite le Palier Silver (25 000 FCFA).", true);
      openCheckoutForTier('silver');
      return;
    }

    if (type === 'audit' && !isGoldPlus) {
      showToast("Palier Gold Requis", "L'audit multi-agents nécessite le Palier Gold (45 000 FCFA).", true);
      openCheckoutForTier('gold');
      return;
    }

    // Launch task
    setActiveTask(type);
    setTaskStartTime(Date.now());
    setShowSuccessOverlay(false);

    if (type === 'captcha') {
      setSelectedCells([]);
    } else if (type === 'video') {
      setIsPlayingVideo(false);
      setVideoCompleted(false);
      setVideoSeconds(0);
      setVideoRating(null);
      setVideoFeedback('');
    } else if (type === 'text') {
      setTextCorrection('');
    } else if (type === 'audit') {
      setAuditDiag('hallucination');
      setAuditFeedback('');
    }
  };

  // 1. Submit CAPTCHA
  const handleSubmitCaptcha = () => {
    if (selectedCells.length === 0) {
      showToast("Sélection requise", "Veuillez sélectionner au moins une image correspondant au libellé.", true);
      return;
    }

    const item = captchaBank[captchaIdx % captchaBank.length];
    // Evaluate accuracy against authentic scenario targets
    let correct = 0;
    let falsePositives = 0;
    const targetIndices = item.targetIndices || [1, 4, 7];

    selectedCells.forEach(idx => {
      if (targetIndices.includes(idx)) correct++;
      else falsePositives++;
    });

    let qScore = 12.0;
    if (falsePositives > 0 || correct < targetIndices.length) {
      qScore = 9.0;
    }

    const elapsedSec = Math.max(1, Math.round((Date.now() - taskStartTime) / 1000));
    completeTask({ payout: 50, minutes: 5, label: "Validation CAPTCHA", qualityScore: qScore, elapsedSec });

    setSuccessInfo({ payout: 50, minutes: 5, label: "Validation CAPTCHA" });
    setShowSuccessOverlay(true);
    setCaptchaIdx(prev => prev + 1);
  };

  // 2. Video Playing Simulation
  const handlePlayVideo = () => {
    setIsPlayingVideo(true);
    setVideoSeconds(0);
    setVideoCompleted(false);

    if (videoTimerRef.current) clearInterval(videoTimerRef.current);

    videoTimerRef.current = setInterval(() => {
      setVideoSeconds(prev => {
        if (prev >= 7) {
          clearInterval(videoTimerRef.current);
          setVideoCompleted(true);
          return 8;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleSubmitVideo = () => {
    if (videoRating === null) {
      showToast("Note requise", "Veuillez indiquer si vous validez ou non la qualité de la vidéo.", true);
      return;
    }

    let qScore = 12.0;
    if (videoFeedback.trim().length < 15) {
      qScore = 6.0;
    }

    const elapsedSec = Math.max(1, Math.round((Date.now() - taskStartTime) / 1000));
    completeTask({ payout: 150, minutes: 10, label: "Évaluation Vidéo Ad", qualityScore: qScore, elapsedSec });

    setSuccessInfo({ payout: 150, minutes: 10, label: "Évaluation Vidéo Ad" });
    setShowSuccessOverlay(true);
    setVideoIdx(prev => prev + 1);
  };

  // 3. Submit Text Correction
  const handleSubmitText = () => {
    if (textCorrection.trim().length < 15) {
      showToast("Correction trop courte", "Veuillez rédiger une correction détaillée d'au moins 15 caractères.", true);
      return;
    }

    let qScore = textCorrection.trim().length >= 35 ? 12.0 : 9.5;
    const elapsedSec = Math.max(1, Math.round((Date.now() - taskStartTime) / 1000));
    completeTask({ payout: 400, minutes: 15, label: "Correction LLM", qualityScore: qScore, elapsedSec });

    setSuccessInfo({ payout: 400, minutes: 15, label: "Correction LLM" });
    setShowSuccessOverlay(true);
    setTextIdx(prev => prev + 1);
  };

  // 4. Submit Audit
  const handleSubmitAudit = () => {
    if (auditFeedback.trim().length < 10) {
      showToast("Justification requise", "Veuillez justifier votre audit technique (au moins 10 caractères).", true);
      return;
    }

    let qScore = auditDiag === 'hallucination' ? 12.0 : 6.0;
    const elapsedSec = Math.max(1, Math.round((Date.now() - taskStartTime) / 1000));
    completeTask({ payout: 950, minutes: 25, label: "Audit Multi-Agents", qualityScore: qScore, elapsedSec });

    setSuccessInfo({ payout: 950, minutes: 25, label: "Audit Multi-Agents" });
    setShowSuccessOverlay(true);
    setAuditIdx(prev => prev + 1);
  };

  const handleNextTask = () => {
    setShowSuccessOverlay(false);
    setTaskIndex(prev => prev + 1);
    setTaskStartTime(Date.now());

    // Reset module specific inputs for the next rotating item
    setSelectedCells([]);
    setIsPlayingVideo(false);
    setVideoCompleted(false);
    setVideoSeconds(0);
    setVideoRating(null);
    setVideoFeedback('');
    setTextCorrection('');
    setAuditDiag('hallucination');
    setAuditFeedback('');
  };

  return (
    <div className="tasks-grid">
      {/* Left: List of modules */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
          <h3 className="tasks-section-title" style={{ marginBottom: 0 }}>
            Modules d'exercices rémunérés
          </h3>
          <span className={`badge ${collateralActive ? 'badge-emerald' : 'badge-red'}`} style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
            {collateralActive ? `Palier ${tierParams[userTier]?.label} Actif` : 'Collatéral Inactif'}
          </span>
        </div>

        {/* 1. Captcha Module */}
        <div className="task-item-row" onClick={() => handleSelectModule('captcha')}>
          <div className="task-info-left">
            <div className="task-num-circle">1</div>
            <div className="task-meta-info">
              <span className="task-title-text">CAPTCHA Intelligent de Précision</span>
              <div className="task-payout-row">
                <span>💰 Gain: 50 FCFA / validation</span>
                <span>⏱️ Temps: +5 min</span>
              </div>
            </div>
          </div>
          <div className="badge badge-emerald">Disponible</div>
        </div>

        {/* 2. Video Module */}
        <div className="task-item-row" onClick={() => handleSelectModule('video')}>
          <div className="task-info-left">
            <div className="task-num-circle">2</div>
            <div className="task-meta-info">
              <span className="task-title-text">Reconnaissance de qualité vidéo publicitaire</span>
              <div className="task-payout-row">
                <span>💰 Gain: 150 FCFA / évaluation</span>
                <span>⏱️ Temps: +10 min</span>
              </div>
            </div>
          </div>
          <div className="badge badge-emerald">Disponible</div>
        </div>

        {/* 3. Text LLM Module */}
        <div className={`task-item-row ${!isSilverPlus ? 'locked' : ''}`} onClick={() => handleSelectModule('text')}>
          <div className="task-info-left">
            <div className="task-num-circle">
              {isSilverPlus ? '3' : <i className="ri-lock-line"></i>}
            </div>
            <div className="task-meta-info">
              <span className="task-title-text">Correction et Labellisation de Textes LLM</span>
              <div className="task-payout-row">
                <span>💰 Gain: 400 FCFA / texte</span>
                <span>⏱️ Temps: +15 min</span>
              </div>
            </div>
          </div>
          <div className={`badge ${isSilverPlus ? 'badge-emerald' : 'badge-red'}`}>
            {isSilverPlus ? 'Disponible' : 'Palier Silver (25k)'}
          </div>
        </div>

        {/* 4. Multi-Agent Audit Module */}
        <div className={`task-item-row ${!isGoldPlus ? 'locked' : ''}`} onClick={() => handleSelectModule('audit')}>
          <div className="task-info-left">
            <div className="task-num-circle">
              {isGoldPlus ? '4' : <i className="ri-lock-line"></i>}
            </div>
            <div className="task-meta-info">
              <span className="task-title-text">Audit Expert de Conversations IA Multi-Agents</span>
              <div className="task-payout-row">
                <span>💰 Gain: 950 FCFA / audit</span>
                <span>⏱️ Temps: +25 min</span>
              </div>
            </div>
          </div>
          <div className={`badge ${isGoldPlus ? 'badge-emerald' : 'badge-red'}`}>
            {isGoldPlus ? 'Disponible' : 'Palier Gold (45k)'}
          </div>
        </div>
      </div>

      {/* Right: Workspace Card */}
      <div className="active-task-container">
        <div className="glass-card task-play-card">
          {/* Empty State */}
          {!activeTask && (
            <div className="task-empty-state">
              <i className="ri-terminal-window-line"></i>
              <h3>Console d'Apprentissage Active</h3>
              <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
                Sélectionnez l'un des modules d'exercices à gauche pour charger une tâche réelle et commencer à entraîner l'IA.
              </p>
            </div>
          )}

          {/* Success Overlay */}
          {showSuccessOverlay && (
            <div className="task-success-overlay" style={{ display: 'flex' }}>
              <div className="success-icon-circle">
                <i className="ri-checkbox-circle-fill"></i>
              </div>
              <h3 style={{ fontSize: '1.3rem' }}>Tâche validée avec succès !</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                +{successInfo.payout} FCFA crédités sur votre solde (+{successInfo.minutes} min de quota validé).
              </p>
              <button className="btn btn-secondary" onClick={handleNextTask}>
                Exercice suivant
              </button>
            </div>
          )}

          {/* CAPTCHA Workspace */}
          {activeTask === 'captcha' && !showSuccessOverlay && (
            <div className="captcha-game" style={{ display: 'flex' }}>
              <div className="task-counter-header">
                <span>Série d'entraînement #{taskIndex} sur 20</span>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>+50 FCFA</span>
              </div>
              <div className="captcha-header">
                <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: 600 }}>
                  <i className="ri-focus-3-line" style={{ marginRight: '5px', color: 'var(--accent-emerald)' }}></i>
                  Vision par Ordinateur • Détection d'Objets
                </div>
                <span className="captcha-instruction">
                  Sélectionnez toutes les images montrant : <strong style={{ color: 'var(--accent-emerald)', fontSize: '1.05rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}>{captchaBank[captchaIdx % captchaBank.length].target}</strong>
                </span>
              </div>
              <div className="captcha-grid">
                {captchaBank[captchaIdx % captchaBank.length].images.map((imgSrc, i) => {
                  const isSelected = selectedCells.includes(i);
                  return (
                    <div
                      key={i}
                      className={`captcha-cell ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedCells(prev =>
                          prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
                        );
                      }}
                      title={`Échantillon #${i + 1} - Cliquer pour sélectionner`}
                    >
                      <img
                        src={imgSrc}
                        alt={`Échantillon urbain ${i + 1}`}
                        loading="eager"
                      />
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px', alignItems: 'center' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ padding: '10px 14px', fontSize: '1.1rem' }}
                  title="Changer d'échantillon"
                  onClick={() => {
                    setCaptchaIdx(prev => prev + 1);
                    setSelectedCells([]);
                  }}
                >
                  <i className="ri-refresh-line"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-primary-trainer"
                  style={{ flex: 1 }}
                  onClick={handleSubmitCaptcha}
                >
                  <i className="ri-checkbox-circle-line"></i> Valider l'annotation ({selectedCells.length} sélectionnée{selectedCells.length > 1 ? 's' : ''})
                </button>
              </div>
            </div>
          )}

          {/* Video Workspace */}
          {activeTask === 'video' && !showSuccessOverlay && (
            <div className="video-game" style={{ display: 'flex' }}>
              <div className="task-counter-header">
                <span>Évaluation de Publicité #{taskIndex} sur 16</span>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>+150 FCFA</span>
              </div>
              <div className="captcha-header" style={{ background: 'var(--accent-cyan-soft)', borderColor: 'rgba(6,182,212,0.15)' }}>
                <span className="captcha-instruction">{videoBank[videoIdx % videoBank.length].title}</span>
              </div>
              <div className="video-mock-player">
                {isPlayingVideo ? (
                  <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white', padding: '20px', textAlign: 'center' }}>
                    <i className={videoBank[videoIdx % videoBank.length].icon} style={{ fontSize: '3rem', color: 'var(--accent-cyan)', marginBottom: '8px' }}></i>
                    <strong style={{ fontSize: '1.1rem' }}>{videoBank[videoIdx % videoBank.length].headline}</strong>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{videoBank[videoIdx % videoBank.length].sub}</span>
                  </div>
                ) : (
                  <button className="btn btn-primary-trainer" onClick={handlePlayVideo}>
                    <i className="ri-play-fill"></i> Démarrer le spot publicitaire (8s)
                  </button>
                )}
                <div className="video-play-progress" style={{ width: `${(videoSeconds / 8) * 100}%` }}></div>
                <div className="video-play-timer">0:0{videoSeconds} / 0:08</div>
              </div>

              {videoCompleted && (
                <div className="video-form" style={{ display: 'flex' }}>
                  <div className="form-input-group">
                    <label>Notez la qualité générale de cette publicité :</label>
                    <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
                      <div className={`ad-quality-btn ${videoRating === true ? 'selected' : ''}`} onClick={() => setVideoRating(true)}>
                        <i className="ri-thumb-up-line"></i> J'aime (Qualité validée)
                      </div>
                      <div className={`ad-quality-btn ${videoRating === false ? 'selected' : ''}`} onClick={() => setVideoRating(false)}>
                        <i className="ri-thumb-down-line"></i> Je n'aime pas (Qualité médiocre)
                      </div>
                    </div>
                  </div>
                  <div className="form-input-group">
                    <label>Observations ou points d'amélioration pour l'IA (Requis) :</label>
                    <textarea
                      className="form-text-input"
                      rows="2"
                      placeholder="Ex: Message dynamique, fluidité correcte, contraste soigné..."
                      value={videoFeedback}
                      onChange={(e) => setVideoFeedback(e.target.value)}
                    ></textarea>
                  </div>
                  <button className="btn btn-primary-trainer" style={{ width: '100%' }} onClick={handleSubmitVideo}>
                    <i className="ri-send-plane-line"></i> Envoyer l'évaluation
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Text Correction Workspace */}
          {activeTask === 'text' && !showSuccessOverlay && (
            <div className="video-game" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="task-counter-header">
                <span>Contrôle LLM #{taskIndex} sur 18</span>
                <span style={{ color: 'var(--accent-indigo)', fontWeight: 600 }}>+400 FCFA</span>
              </div>
              <div className="captcha-header" style={{ background: 'var(--accent-indigo-soft)', borderColor: 'rgba(99,102,241,0.15)' }}>
                <span className="captcha-instruction">Tâche : Correction d'hallucination — {textBank[textIdx % textBank.length].theme}</span>
              </div>
              <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', padding: '15px', borderRadius: '12px', fontSize: '0.9rem' }}>
                <p style={{ fontWeight: 600, color: 'var(--accent-red)', marginBottom: '6px' }}>Réponse erronée générée par l'IA :</p>
                <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                  {textBank[textIdx % textBank.length].wrong}
                </p>
              </div>
              <div className="form-input-group">
                <label style={{ fontSize: '0.88rem' }}>Saisissez la correction factuelle ({textBank[textIdx % textBank.length].tip}) :</label>
                <textarea
                  className="form-text-input"
                  rows="4"
                  placeholder="Rédigez la correction exacte pour réaligner le modèle..."
                  value={textCorrection}
                  onChange={(e) => setTextCorrection(e.target.value)}
                ></textarea>
              </div>
              <button className="btn btn-primary-trainer" style={{ width: '100%' }} onClick={handleSubmitText}>
                <i className="ri-checkbox-circle-line"></i> Soumettre la correction textuelle
              </button>
            </div>
          )}

          {/* Audit Workspace */}
          {activeTask === 'audit' && !showSuccessOverlay && (
            <div className="video-game" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="task-counter-header">
                <span>Audit Expert #{taskIndex} sur 14</span>
                <span style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>+950 FCFA</span>
              </div>
              <div className="captcha-header" style={{ background: 'rgba(168,85,247,0.1)', borderColor: 'rgba(168,85,247,0.2)' }}>
                <span className="captcha-instruction">Audit Expert : {auditBank[auditIdx % auditBank.length].theme}</span>
              </div>
              <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', padding: '15px', borderRadius: '12px', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <strong style={{ color: 'var(--accent-cyan)' }}>Utilisateur : </strong>
                  <span>{auditBank[auditIdx % auditBank.length].userMsg}</span>
                </div>
                <div>
                  <strong style={{ color: 'var(--accent-indigo)' }}>Assistant IA : </strong>
                  <span style={{ color: 'var(--text-secondary)' }}>{auditBank[auditIdx % auditBank.length].aiMsg}</span>
                </div>
              </div>
              <div className="form-input-group">
                <label style={{ fontSize: '0.88rem' }}>Diagnostic technique de la réponse :</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input type="radio" name="diag" checked={auditDiag === 'correct'} onChange={() => setAuditDiag('correct')} />
                    Réponse correcte et optimisée
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input type="radio" name="diag" checked={auditDiag === 'hallucination'} onChange={() => setAuditDiag('hallucination')} />
                    Contient de graves erreurs / risques techniques (Hallucination)
                  </label>
                </div>
              </div>
              <div className="form-input-group">
                <label style={{ fontSize: '0.88rem' }}>Justification technique de votre audit (Requis) :</label>
                <textarea
                  className="form-text-input"
                  rows="2"
                  placeholder="Justifiez votre diagnostic pour l'alignement multi-agents..."
                  value={auditFeedback}
                  onChange={(e) => setAuditFeedback(e.target.value)}
                ></textarea>
              </div>
              <button className="btn btn-primary-trainer" style={{ background: 'var(--accent-purple)', color: 'white' }} onClick={handleSubmitAudit}>
                <i className="ri-checkbox-circle-line"></i> Soumettre l'audit d'expert
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
