// wallet.js
function openPaymentModal(mode) {
  paymentModalMode = mode;
  const modal = document.getElementById('payment-modal');
  const title = document.getElementById('payment-modal-title');
  const btn = document.getElementById('payment-confirm-btn');
  const noticeBox = document.getElementById('withdraw-notice-box');
  const amountInput = document.getElementById('payment-amount-input');
  const amountLabel = document.getElementById('payment-amount-label');

  if (mode === 'deposit') {
    title.innerText = "Déposer des fonds";
    btn.innerText = "Valider le dépôt";
    btn.style.opacity = '1';
    btn.style.cursor = 'pointer';
    if (noticeBox) noticeBox.style.display = 'none';
    if (amountInput) amountInput.disabled = false;
    if (amountLabel) amountLabel.innerText = "Montant à transférer (FCFA)";
  } else {
    title.innerText = "Retrait de Gains & Commissions";
    btn.innerText = "Retrait programmé à terme (4 sem.)";
    if (noticeBox) noticeBox.style.display = 'block';
    if (amountInput) {
      amountInput.value = state.balance;
      amountInput.disabled = true;
    }
    if (amountLabel) amountLabel.innerText = "Solde cumulé pour le cycle mensuel (FCFA)";
  }

  modal.style.display = 'flex';
}

function closePaymentModal() {
  document.getElementById('payment-modal').style.display = 'none';
}

function selectPayMethod(method) {
  if (method === 'crypto') {
    if (typeof showPaymentUnavailableModal === 'function') {
      showPaymentUnavailableModal('Cryptomonnaie USDT (TRC-20)');
    }
    return;
  }
  currentPayMethod = 'momo';
  document.getElementById('method-momo')?.classList.add('selected');
  document.getElementById('method-crypto')?.classList.remove('selected');
}

function confirmPaymentAction() {
  if (paymentModalMode === 'withdraw') {
    showToast(
      "Retraits Programmés (Cycle 4 Semaines)",
      "Les retraits de gains et commissions sont traités à la fin du mois après 4 semaines complètes d'activité validée. Vos fonds sont en sécurité.",
      true
    );
    return;
  }

  const amount = parseInt(document.getElementById('payment-amount-input').value);
  if (isNaN(amount) || amount < 1000) {
    showToast("Montant Invalide", "Veuillez saisir un montant d'au moins 1 000 FCFA.", true);
    return;
  }

  const methodStr = currentPayMethod === 'momo' ? 'Mobile Money' : 'Crypto / USDT';

  if (paymentModalMode === 'deposit') {
    state.balance += amount;
    state.transactions.unshift({
      date: getCurrentDate(),
      type: 'Dépôt de Fonds',
      amount: amount,
      status: 'Complété',
      method: methodStr
    });
    showToast("Dépôt Réussi", formatCurrency(amount) + " ajoutés à votre solde.");
  } else {
    if (amount > state.balance) {
      showToast("Solde Insuffisant", "Vous ne disposez que de " + formatCurrency(state.balance) + ".", true);
      return;
    }
    state.balance -= amount;
    state.transactions.unshift({
      date: getCurrentDate(),
      type: 'Retrait de Gains',
      amount: -amount,
      status: 'En cours',
      method: methodStr
    });
    showToast("Demande de Retrait", "Retrait de " + formatCurrency(amount) + " soumis avec succès.");
  }

  saveSessionToLocalStorage();
  updateNavigationBars();
  renderTransactionsTable();
  closePaymentModal();
}

function renderTransactionsTable() {
  const tbody = document.getElementById('wallet-tx-table-rows');
  if (!tbody) return;

  tbody.innerHTML = '';
  if (!state.transactions || state.transactions.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; padding: 25px 10px; color: var(--text-secondary); font-size: 0.85rem;">
          <i class="ri-inbox-line" style="font-size: 1.5rem; display: block; margin-bottom: 6px; opacity: 0.5;"></i>
          Aucune transaction enregistrée pour le moment
        </td>
      </tr>
    `;
    return;
  }

  state.transactions.forEach(tx => {
    const tr = document.createElement('tr');
    const isPos = tx.amount > 0;
    const color = isPos ? 'var(--accent-emerald)' : 'var(--text-primary)';
    const sign = isPos ? '+' : '';

    tr.innerHTML = `
      <td>${tx.date}</td>
      <td><strong>${tx.type}</strong></td>
      <td><span style="font-size: 0.8rem; color: var(--text-secondary);">${tx.method}</span></td>
      <td style="text-align: right; font-weight: 700; color: ${color};">${sign}${formatCurrency(tx.amount)}</td>
    `;
    tbody.appendChild(tr);
  });
}

function exportTransactionsCSV() {
  let csv = "Date,Type,Methode,Montant,Statut\n";
  state.transactions.forEach(t => {
    csv += `"${t.date}","${t.type}","${t.method}",${t.amount},"${t.status}"\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "scalia_transactions.csv";
  a.click();
}
