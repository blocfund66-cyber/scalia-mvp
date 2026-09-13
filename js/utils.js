// Utility functions (formatNumber, formatCurrency, getCurrentDate, showToast, togglePasswordVisibility, makeImageTransparent, etc.)
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;
      const counters = document.querySelectorAll('.counter-number');
      if (!counters || counters.length === 0) return;
      countersAnimated = true;

      counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        if (isNaN(target)) return;
        const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
        let start = 0;
        const duration = 1200;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            counter.innerText = decimals > 0 ? target.toFixed(decimals) : formatNumber(Math.round(target));
            clearInterval(timer);
          } else {
            counter.innerText = decimals > 0 ? start.toFixed(decimals) : formatNumber(Math.round(start));
          }
        }, stepTime);
      });
    }

    function initCounterObserver() {
      const statsSection = document.getElementById('landing-stats');
      if (!statsSection) {
        animateCounters();
        return;
      }
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateCounters();
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });
        observer.observe(statsSection);
      } else {
        animateCounters();
      }
    }

    function formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function formatCurrency(amount) {
      return formatNumber(amount) + " FCFA";
    }

    function togglePasswordVisibility(inputId, btnEl) {
      const input = document.getElementById(inputId);
      if (!input) return;
      const icon = btnEl ? btnEl.querySelector('i') : null;
      if (input.type === 'password') {
        input.type = 'text';
        if (icon) {
          icon.className = 'ri-eye-off-line';
        }
        if (btnEl) btnEl.title = 'Masquer le mot de passe';
      } else {
        input.type = 'password';
        if (icon) {
          icon.className = 'ri-eye-line';
        }
        if (btnEl) btnEl.title = 'Afficher le mot de passe';
      }
    }

    // ----------------------------------------------------
    // UTILITIES
    // ----------------------------------------------------
    function getCurrentDate() {
      const d = new Date();
      return d.toISOString().split('T')[0];
    }

    function showToast(title, desc, isError = false) {
      const toast = document.getElementById('toast-notify');
      if (!toast) return;
      const titleEl = document.getElementById('toast-title');
      const descEl = document.getElementById('toast-desc');
      const icon = toast.querySelector('i');

      if (titleEl) titleEl.innerText = title;
      if (descEl) descEl.innerText = desc;

      if (icon) {
        if (isError) {
          icon.className = 'ri-error-warning-fill';
          icon.style.color = 'var(--accent-red)';
        } else {
          icon.className = 'ri-checkbox-circle-fill';
          icon.style.color = 'var(--accent-emerald)';
        }
      }

      toast.classList.add('active');
      setTimeout(() => {
        toast.classList.remove('active');
      }, 3500);
    }

    function makeImageTransparent(imgElement) {
      if (imgElement.dataset.transparentProcessed === "true") return;
      imgElement.dataset.transparentProcessed = "true";
      
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imgElement.src;
      img.onload = function() {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;
          
          const targetR = data[0];
          const targetG = data[1];
          const targetB = data[2];
          
          const threshold = 35; 
          
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i+1];
            const b = data[i+2];
            
            const dist = Math.sqrt(
              Math.pow(r - targetR, 2) +
              Math.pow(g - targetG, 2) +
              Math.pow(b - targetB, 2)
            );
            
            if (dist < threshold) {
              data[i+3] = 0;
            }
          }
          
          ctx.putImageData(imgData, 0, 0);
          imgElement.src = canvas.toDataURL();
          imgElement.style.backgroundColor = 'transparent';
        } catch (e) {
          console.warn("Canvas transparency failed: ", e);
        }
      };
    }

function scrollHowStep(index) {
  const slider = document.getElementById('how-steps-slider');
  if (!slider) return;
  const cards = slider.querySelectorAll('.how-step-card');
  if (cards[index]) {
    cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
}

function initHowSliderObserver() {
  const slider = document.getElementById('how-steps-slider');
  const dots = document.querySelectorAll('#how-dots-container .how-dot');
  if (!slider || !dots.length) return;

  slider.addEventListener('scroll', () => {
    const scrollLeft = slider.scrollLeft;
    const cardWidth = slider.querySelector('.how-step-card')?.offsetWidth || 280;
    const activeIndex = Math.min(dots.length - 1, Math.max(0, Math.round(scrollLeft / (cardWidth + 16))));
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === activeIndex);
    });
  }, { passive: true });
}

window.addEventListener('DOMContentLoaded', () => {
  initHowSliderObserver();
});

// ----------------------------------------------------
// REGIONAL PAYMENT RESTRICTION MODAL
// ----------------------------------------------------
function showPaymentUnavailableModal(methodName) {
  const modal = document.getElementById('payment-unavailable-modal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

function closePaymentUnavailableModal() {
  const modal = document.getElementById('payment-unavailable-modal');
  if (modal) {
    modal.style.display = 'none';
  }
  
  // Re-force Mobile Money selection
  if (typeof selectCheckoutMethod === 'function') {
    selectCheckoutMethod('momo');
  }
  if (typeof selectPayMethod === 'function') {
    selectPayMethod('momo');
  }
}
