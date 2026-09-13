import React from 'react';
import { useScalia } from '../../context/ScaliaContext';

export const FomoBanner = () => {
  const { fomoSeats } = useScalia();

  return (
    <div className="fomo-top-banner" id="global-fomo-banner">
      <div className="fomo-fixed-label">
        <span className="fomo-pulse-dot" title="Alerte Recrutement Direct"></span>
        <span className="fomo-label-text">EN DIRECT</span>
      </div>
      <div className="fomo-marquee-wrapper">
        <div className="fomo-marquee-track">
          <span className="fomo-marquee-item"><strong>PHASE FINALE DE RECRUTEMENT</strong> — Quota de <strong>50 000 places</strong></span>
          <span className="fomo-marquee-sep">•</span>
          <span className="fomo-marquee-item">Plus que <strong className="fomo-seats-badge">{fomoSeats.toLocaleString()}</strong> places disponibles avant fermeture !</span>
          <span className="fomo-marquee-sep">•</span>
          <span className="fomo-marquee-item fomo-ticker-msg"><i className="ri-user-add-line" style={{ color: 'var(--accent-emerald)' }}></i> +6 nouvelles inscriptions !</span>
          <span className="fomo-marquee-sep">•</span>
          <span className="fomo-marquee-item">Rémunération garantie pour l'entraînement d'IA</span>
          <span className="fomo-marquee-sep">•</span>
        </div>
        <div className="fomo-marquee-track" aria-hidden="true">
          <span className="fomo-marquee-item"><strong>PHASE FINALE DE RECRUTEMENT</strong> — Quota de <strong>50 000 places</strong></span>
          <span className="fomo-marquee-sep">•</span>
          <span className="fomo-marquee-item">Plus que <strong className="fomo-seats-badge">{fomoSeats.toLocaleString()}</strong> places disponibles avant fermeture !</span>
          <span className="fomo-marquee-sep">•</span>
          <span className="fomo-marquee-item fomo-ticker-msg"><i className="ri-user-add-line" style={{ color: 'var(--accent-emerald)' }}></i> +6 nouvelles inscriptions !</span>
          <span className="fomo-marquee-sep">•</span>
          <span className="fomo-marquee-item">Rémunération garantie pour l'entraînement d'IA</span>
          <span className="fomo-marquee-sep">•</span>
        </div>
      </div>
    </div>
  );
};
