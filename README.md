# Scalia — Plateforme de Travail & Entraînement d'IA Rémunéré

Scalia est la première plateforme d'entraînement d'IA et de micro-travail rémunéré en Afrique et à l'international, permettant aux talents de monétiser leur temps et leurs compétences en qualifiant des modèles de pointe (vision par ordinateur, audio, RLHF, NLP).

---

## Architecture & Caractéristiques

- **Frontend Moderne** : Single-Page Application (SPA) responsive, thèmes Sombre & Clair, PWA (Progressive Web App installable).
- **Internationalisation (i18n)** : 4 langues complètes (Français, Anglais, Espagnol, Arabe) avec bascule instantanée.
- **Sécurisation & Escrow Collatéral** : 5 paliers d'entraînement (Bronze, Silver, Gold, Platinum, Diamond) garantis par collatéral de responsabilité.
- **White-Label Intégré** : Aucun nom d'opérateur tiers visible aux utilisateurs. Tous les flux sont estampillés *Scalia Escrow Protocol*.
- **Système de Parrainage Dynamique** : Liens d'affiliation personnalisables avec détection automatique du parrain lors de l'onboarding et calcul de commission instantané (5%).
- **Cycle de Retrait Sécurisé** : Politique de déblocage mensuel (après 4 semaines complètes d'activité validée) avec solde cumulé protégé.
- **Authentification Hybride** : Google Identity Services (One Tap / GIS) + Email/Mot de passe avec mode démo résilient.

---

## Déploiement sur Render (2 méthodes simples)

### Méthode 1 : Site Statique Render (Recommandée - 100% Gratuit)

1. Créez un dépôt sur GitHub (ex: `scalia-mvp`) et poussez ce code :
   ```bash
   git add .
   git commit -m "Deploy Scalia MVP to Render"
   git branch -M main
   git remote add origin https://github.com/<votre-utilisateur>/scalia-mvp.git
   git push -u origin main
   ```
2. Rendez-vous sur votre tableau de bord [Render Dashboard](https://dashboard.render.com).
3. Cliquez sur **New +** > **Static Site**.
4. Connectez votre dépôt GitHub `scalia-mvp`.
5. Renseignez les paramètres suivants :
   - **Name** : `scalia-mvp` (ou le nom de votre choix)
   - **Branch** : `main`
   - **Build Command** : *(laisser vide)*
   - **Publish Directory** : `.`
6. Dans l'onglet **Redirects / Rewrites** :
   - Source: `/*`
   - Destination: `/index.html`
   - Action: `Rewrite`
7. Cliquez sur **Create Static Site**. Votre site est en ligne en ~30 secondes avec HTTPS gratuit !

---

### Méthode 2 : Déploiement Blueprint Automatique (via `render.yaml`)

1. Poussez le dépôt sur GitHub.
2. Dans Render, cliquez sur **New +** > **Blueprint**.
3. Sélectionnez le dépôt : Render lit automatiquement le fichier `render.yaml` et configure l'intégralité du site sans aucune saisie manuelle.
4. Validez pour lancer le déploiement instantané.

---

### Méthode 3 : Service Web Node (Secours)

Si vous préférez déployer en tant que **Web Service Node.js** :
- **Runtime** : `Node`
- **Build Command** : *(vide ou `npm install`)*
- **Start Command** : `npm start`
Le serveur natif ultra-léger `server.js` (0 dépendance) écoutera sur le port attribué par Render (`$PORT`).

---

## Configuration Post-Déploiement

### 1. Activer Google Sign-In en Production
Pour activer la véritable connexion Google avec votre propre projet Google Cloud :
1. Allez sur [Google Cloud Console > Identifiants](https://console.cloud.google.com/apis/credentials).
2. Créez un ID client OAuth 2.0 (Type: Application Web).
3. Dans **Origines JavaScript autorisées**, ajoutez l'URL Render (ex: `https://scalia-mvp.onrender.com`).
4. Copiez votre Client ID et collez-le dans `index.html` à la ligne `GOOGLE_CLIENT_ID`.

### 2. URL de Redirection de Paiement
Sur le tableau de bord de votre fournisseur de liens de paiement :
- Définissez l'URL de redirection après succès vers :  
  `https://votre-site.onrender.com/?payment=success&tier=bronze`  
  *(remplacez le palier selon le lien concerné : bronze, silver, gold, platinum, diamond)*
- Scalia détecte automatiquement ce retour, valide le palier, émet le reçu de paiement et déverrouille l'accès à la console entraîneur !

---

© 2026 Scalia. Tous droits réservés.
