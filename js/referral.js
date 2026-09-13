// referral.js
function copyReferralLinkTrainer() {
  const input = document.getElementById('ref-trainer-link-input');
  if (input) {
    input.select();
    navigator.clipboard.writeText(input.value);
    showToast("Lien Copié", "Lien de parrainage copié dans le presse-papiers !");
  }
}

function generateCustomReferralLinkTrainer() {
  const valEl = document.getElementById('ref-trainer-username-input');
  const val = valEl ? valEl.value.trim().toUpperCase() : '';
  const input = document.getElementById('ref-trainer-link-input');
  const origin = (window.location.origin && window.location.origin !== 'null' && !window.location.origin.startsWith('file'))
    ? (window.location.origin + window.location.pathname)
    : 'https://scalia.io/';
  const base = origin.replace(/\/+$/, '') + '?ref=COACH-';
  const savedUser = localStorage.getItem('scalia_username') || '';
  const userCode = val || (savedUser ? savedUser.replace(/^COACH-/, '') : 'TRAINER');
  if (input) input.value = base + userCode;
}

function updateReferralSimTrainer() {
  const select = document.getElementById('ref-trainer-sim-role').value;
  let collat = 15000;
  if (select === 'entraineur_silver') collat = 25000;
  else if (select === 'entraineur_gold') collat = 45000;
  else if (select === 'entraineur_platinum') collat = 75000;
  else if (select === 'entraineur_diamond') collat = 100000;

  const comm = Math.round(collat * 0.05);
  const simResultEl = document.getElementById('ref-trainer-sim-result');
  if (simResultEl) simResultEl.innerText = formatCurrency(comm);
}

function renderReferralTable() {
  const countEl = document.getElementById('stats-ref-trainer-count');
  const commEl = document.getElementById('stats-ref-trainer-commissions');
  if (countEl) countEl.innerText = (state.trainerReferralCount || 0) + " personne" + ((state.trainerReferralCount || 0) > 1 ? "s" : "");
  if (commEl) commEl.innerText = formatCurrency(state.trainerReferralCommissions || 0);

  const tbody = document.getElementById('referral-trainer-table-rows-container');
  if (!tbody) return;

  tbody.innerHTML = '';
  if (!state.trainerReferralTransactions || state.trainerReferralTransactions.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; padding: 35px 12px; color: var(--text-secondary); font-size: 0.88rem;">
          <i class="ri-user-shared-line" style="font-size: 2rem; display: block; margin-bottom: 8px; opacity: 0.5; color: var(--accent-indigo);"></i>
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Aucun filleul actif pour le moment</strong>
          <span style="font-size: 0.82rem; color: var(--text-secondary); max-width: 320px; display: inline-block; line-height: 1.4;">
            Partagez votre lien ci-contre pour percevoir instantanément 5% de commission sur chaque collatéral déposé par un filleul !
          </span>
        </td>
      </tr>
    `;
    return;
  }

  state.trainerReferralTransactions.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.name}</strong></td>
      <td><span style="font-size: 0.8rem; color: var(--text-secondary);">${item.role}</span></td>
      <td style="color: var(--accent-emerald); font-weight: 700;">+${formatCurrency(item.commission)}</td>
      <td style="text-align: right;"><span class="badge badge-emerald">${item.status}</span></td>
    `;
    tbody.appendChild(tr);
  });
}
