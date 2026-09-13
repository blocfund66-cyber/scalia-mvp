// profile.js
function openProfileModal() {
  const modal = document.getElementById('profile-modal');
  const username = localStorage.getItem('scalia_username') || 'JB-5582';
  const firstname = localStorage.getItem('scalia_firstname') || 'Jean';
  const lastname = localStorage.getItem('scalia_lastname') || 'Baptiste';
  const country = localStorage.getItem('scalia_country') || 'Cameroun';
  const city = localStorage.getItem('scalia_city') || 'Douala';
  const email = localStorage.getItem('scalia_email') || '';
  const initials = localStorage.getItem('scalia_initials') || 'JB';

  document.getElementById('profile-name-text').innerText = firstname + " " + lastname;
  document.getElementById('profile-location-text').innerText = `📍 ${city}, ${country}`;
  document.getElementById('profile-edit-country').value = country;
  updateCityDropdown('profile-edit-country', 'profile-edit-city', city);
  document.getElementById('profile-username-text').innerText = username;
  document.getElementById('profile-avatar-modal').innerText = initials;
  document.getElementById('profile-tier-text').innerText = tierParams[state.userTier].label + " (" + tierParams[state.userTier].hours + "h/j)";
  document.getElementById('profile-range-text').innerText = tierParams[state.userTier].salaryText;
  document.getElementById('profile-collateral-text').innerText = formatCurrency(state.collateralLocked);
  document.getElementById('profile-balance-text').innerText = formatCurrency(state.balance);

  document.getElementById('profile-edit-firstname').value = firstname;
  document.getElementById('profile-edit-lastname').value = lastname;
  document.getElementById('profile-edit-email').value = email;
  document.getElementById('profile-edit-tier').value = state.userTier;

  modal.style.display = 'flex';
}

function closeProfileModal() {
  document.getElementById('profile-modal').style.display = 'none';
}

function saveProfileChanges() {
  const fn = document.getElementById('profile-edit-firstname').value.trim() || 'Jean';
  const ln = document.getElementById('profile-edit-lastname').value.trim() || 'Baptiste';
  const country = document.getElementById('profile-edit-country').value || 'Cameroun';
  const city = document.getElementById('profile-edit-city').value.trim() || 'Douala';
  const em = document.getElementById('profile-edit-email').value.trim();

  localStorage.setItem('scalia_country', country);
  localStorage.setItem('scalia_city', city);
  document.getElementById('profile-location-text').innerText = `📍 ${city}, ${country}`;
  const pwd = document.getElementById('profile-edit-password').value;
  const newTier = document.getElementById('profile-edit-tier').value;

  if (pwd && pwd.length < 4) {
    showToast("Mot de passe court", "Le nouveau mot de passe doit comporter au moins 4 caractères.", true);
    return;
  }
  if (pwd) {
    localStorage.setItem('scalia_password', pwd);
  }

  localStorage.setItem('scalia_firstname', fn);
  localStorage.setItem('scalia_lastname', ln);
  localStorage.setItem('scalia_email', em);

  const initials = (fn.charAt(0) + ln.charAt(0)).toUpperCase();
  localStorage.setItem('scalia_initials', initials);

  const avatar = document.getElementById('user-avatar-initials');
  if (avatar) avatar.innerText = initials;

  if (newTier !== state.userTier) {
    state.userTier = newTier;
    state.collateralLocked = tierParams[newTier].collateral;
    state.dailyTargetTime = tierParams[newTier].time;
    showToast("Palier Mis à Jour", "Nouveau palier : " + tierParams[newTier].label + " (" + tierParams[newTier].salaryText + ").");
  } else {
    showToast("Profil Enregistré", "Vos informations ont bien été mises à jour.");
  }

  saveSessionToLocalStorage();
  updateNavigationBars();
  closeProfileModal();
}

const countryCities = {
  "Cameroun": {
    major: ["Douala", "Yaoundé", "Bafoussam", "Garoua", "Bamenda", "Maroua"],
    others: ["Kribi", "Limbé", "Ngaoundéré", "Bertoua", "Ebolowa", "Buea", "Dschang", "Kumba", "Edéa", "Foumban", "Sangmélima", "Mbalmayo", "Autre ville (Cameroun)"]
  },
  "Côte d'Ivoire": {
    major: ["Abidjan", "Bouaké", "Yamoussoukro", "San-Pédro", "Daloa", "Korhogo"],
    others: ["Man", "Gagnoa", "Divo", "Soubré", "Grand-Bassam", "Anyama", "Bingerville", "Agboville", "Abengourou", "Bondoukou", "Séguéla", "Autre ville (Côte d'Ivoire)"]
  },
  "Sénégal": {
    major: ["Dakar", "Touba", "Thiès", "Rufisque", "Kaolack", "Saint-Louis", "Ziguinchor"],
    others: ["Mbour", "Diourbel", "Louga", "Tambacounda", "Kolda", "Richard-Toll", "Tivaouane", "Fatick", "Kédougou", "Autre ville (Sénégal)"]
  },
  "Bénin": {
    major: ["Cotonou", "Porto-Novo", "Parakou", "Abomey-Calavi", "Godomey", "Djougou"],
    others: ["Bohicon", "Kandi", "Natitingou", "Ouidah", "Lokossa", "Abomey", "Malanville", "Pobè", "Savé", "Allada", "Autre ville (Bénin)"]
  },
  "Togo": {
    major: ["Lomé", "Sokodé", "Kara", "Kpalimé", "Atakpamé"],
    others: ["Dapaong", "Tsévié", "Aného", "Notsé", "Mango", "Bassar", "Bafilo", "Tabligbo", "Autre ville (Togo)"]
  },
  "RDC": {
    major: ["Kinshasa", "Lubumbashi", "Goma", "Kisangani", "Bukavu", "Mbuji-Mayi", "Kananga"],
    others: ["Kolwezi", "Likasi", "Matadi", "Kikwit", "Tshikapa", "Bunia", "Uvira", "Boma", "Mbandaka", "Autre ville (RD Congo)"]
  },
  "Gabon": {
    major: ["Libreville", "Port-Gentil", "Franceville", "Oyem", "Moanda"],
    others: ["Mouila", "Lambaréné", "Koulamoutou", "Makokou", "Tchibanga", "Bitam", "Gamba", "Autre ville (Gabon)"]
  },
  "Congo": {
    major: ["Brazzaville", "Pointe-Noire", "Dolisie", "Nkayi"],
    others: ["Ouesso", "Impfondo", "Oyo", "Madingou", "Kinkala", "Sibiti", "Mossendjo", "Autre ville (Congo)"]
  },
  "Mali": {
    major: ["Bamako", "Sikasso", "Mopti", "Koutiala", "Kayes", "Ségou"],
    others: ["Gao", "Kati", "San", "Koulikoro", "Tombouctou", "Kita", "Nioro du Sahel", "Autre ville (Mali)"]
  },
  "Burkina Faso": {
    major: ["Ouagadougou", "Bobo-Dioulasso", "Koudougou", "Ouahigouya", "Banfora"],
    others: ["Dédougou", "Kaya", "Fada N'Gourma", "Tenkodogo", "Houndé", "Dori", "Gaoua", "Autre ville (Burkina Faso)"]
  },
  "Guinée": {
    major: ["Conakry", "Kankan", "Nzérékoré", "Kindia", "Labé"],
    others: ["Mamou", "Boké", "Faranah", "Guéckédou", "Coyah", "Kissidougou", "Macenta", "Siguiri", "Autre ville (Guinée)"]
  },
  "France": {
    major: ["Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux", "Lille", "Nice", "Nantes", "Strasbourg"],
    others: ["Rennes", "Montpellier", "Grenoble", "Toulon", "Reims", "Saint-Étienne", "Le Havre", "Bruxelles", "Genève", "Autre ville (France / Europe)"]
  },
  "Autre": {
    major: ["Autre grande métropole africaine", "Autre métropole internationale"],
    others: ["Autre ville / localité"]
  }
};

function updateCityDropdown(countrySelectId, citySelectId, preselectedCity = null) {
  const countryEl = document.getElementById(countrySelectId);
  const cityEl = document.getElementById(citySelectId);
  if (!countryEl || !cityEl) return;

  const country = countryEl.value || "Cameroun";
  const data = countryCities[country] || countryCities["Cameroun"];

  let html = "";

  if (data.major && data.major.length > 0) {
    html += '<optgroup label="Grandes Villes / Métropoles">';
    data.major.forEach(c => {
      html += `<option value="${c}">${c}</option>`;
    });
    html += '</optgroup>';
  }

  if (data.others && data.others.length > 0) {
    html += '<optgroup label="Autres Villes & Régions">';
    data.others.forEach(c => {
      html += `<option value="${c}">${c}</option>`;
    });
    html += '</optgroup>';
  }

  cityEl.innerHTML = html;

  if (preselectedCity) {
    let found = false;
    for (let i = 0; i < cityEl.options.length; i++) {
      if (cityEl.options[i].value === preselectedCity) {
        cityEl.selectedIndex = i;
        found = true;
        break;
      }
    }
    if (!found) {
      const opt = document.createElement("option");
      opt.value = preselectedCity;
      opt.innerText = preselectedCity;
      opt.selected = true;
      cityEl.insertBefore(opt, cityEl.firstChild);
    }
  }
}
