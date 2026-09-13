# Cahier des Charges & Spécifications — Scalia MVP (Emploi & Entraînement d'IA)

Ce document définit les spécifications fonctionnelles, ergonomiques et techniques de l'application **Scalia MVP**, version dédiée exclusivement au volet **Emploi et Entraînement d'IA** (rôle actif, micro-tâches rémunérées, collatéral garanti, parrainage entraîneur et portefeuille).

---

## 1. Vision et Concept du MVP
Scalia MVP est une plateforme de micro-travail dans le domaine de l'intelligence artificielle :
* **Entraînement d'IA (Rôle Actif) :** Les utilisateurs effectuent des tâches quotidiennes simples ou spécialisées (validation CAPTCHA, évaluation de qualité vidéo publicitaire, correction textuelle d'hallucinations LLM, audit expert de conversations multi-agents).
* **Rémunération Quotidienne :** Les gains sont crédités instantanément sur le portefeuille de l'utilisateur à chaque validation réussie.
* **Système de Collatéral Garanti :** Pour garantir le sérieux des données fournies et amortir les coûts opérationnels des serveurs en cas d'inactivité ou d'abandon, un dépôt de garantie (collatéral) est verrouillé lors de la souscription au palier. Ce collatéral est 100% sécurisé et restituable à la fin du programme.

---

## 2. Système des 5 Paliers d'Entraînement

| Palier | Temps Quotidien Requis | Collatéral Garanti | Intervalle Rémunération Cible | Modules Débloqués |
|---|---|---|---|---|
| **Bronze** | 2 heures / jour (120 min) | 15 000 FCFA | 30 000 - 50 000 FCFA (30k - 50k) | CAPTCHA, Vidéo |
| **Silver** | 3 heures / jour (180 min) | 25 000 FCFA | 70 000 - 120 000 FCFA (70k - 120k) | CAPTCHA, Vidéo, Texte LLM |
| **Gold** | 4 heures / jour (240 min) | 45 000 FCFA | 130 000 - 180 000 FCFA (130k - 180k) | Tous modules |
| **Platinum** | 6 heures / jour (360 min) | 75 000 FCFA | 190 000 - 250 000 FCFA (190k - 250k) | Tous modules + Priorité |
| **Diamond** | 8 heures / jour (480 min) | 100 000 FCFA | 280 000 - 350 000 FCFA (280k - 350k) | Tous modules + Bonus Plein Temps |

* **Quota Restreint & Décompte FOMO :** Limite globale fixée à 50 000 places (initialement 38 556 places restantes) avec bandeau rouge d'urgence et décrément aléatoire en temps réel (1 à 10 places chaque minute) pour stimuler les inscriptions.
* **Sécurité & Authentification :** Inscription simplifiée avec mot de passe libre d'au moins 4 caractères et compte Gmail / adresse e-mail optionnel.
* **Localisation & Cohérence Géographique :** Sélection obligatoire du pays de résidence (menu déroulant avec drapeaux) et champ ville lors de l'inscription et dans le profil utilisateur, conférant une totale crédibilité et cohérence au flux d'inscriptions en temps réel.

---

## 3. Modules de Tâches Interactifs

1. **CAPTCHA Intelligent de Précision :**
   - Gain : **50 FCFA** par validation | Temps : **+5 min**.
   - Sélection d'images cibles (ex: véhicules, passages piétons, feux de signalisation).
2. **Évaluation de Qualité Vidéo Publicitaire :**
   - Gain : **150 FCFA** par évaluation | Temps : **+10 min**.
   - Lecture de spot publicitaire, appréciation (J'aime / Je n'aime pas) et feedback écrit.
3. **Correction d'Hallucinations LLM :**
   - Gain : **400 FCFA** par texte | Temps : **+15 min**.
   - Détection d'erreurs factuelles dans des réponses d'IA génératives et rédaction de la correction exacte.
4. **Audit Expert de Conversations Multi-Agents :**
   - Gain : **950 FCFA** par audit | Temps : **+25 min**.
   - Analyse critique de dialogues IA, diagnostic (réponse correcte, hallucination sévère, incomplète) et justification technique.

---

## 4. Programme de Parrainage Entraîneur
* **Lien Unique Personnalisable :** `https://scalia.io/join?ref=COACH-[NOM]`.
* **Commission Instantanée :** 5% du collatéral déposé par chaque filleul entraîneur, versés immédiatement dans le portefeuille sans délai d'attente.
* **Simulateur de Gains :** Calcul en direct de la commission selon le palier visé par le filleul.

---

## 5. Portefeuille & Transactions
* **Solde Disponible :** Retraits instantanés par Mobile Money (Orange Money, MTN MoMo, Wave) ou Crypto (USDT).
* **Sécurité du Collatéral :** Affichage du montant garanti sous séquestre sécurisé avec message rassurant de restitution à 100% à la fin du cycle ou clôture de compte.
* **Historique des Transactions :** Suivi horodaté des crédits de tâches, dépôts de garantie, commissions de parrainage et retraits.

---

## 6. Ergonomie & Design System
* **Thème Clair par Défaut :** Fond épuré (`#f8fafc` / `#ffffff`), typographies Google Fonts (*Outfit* et *Space Grotesk*), icônes Remix Icon.
* **Bascule Thème Sombre :** Accessible depuis le header et la landing page, mémorisé via `localStorage`.
* **Mode Responsive :** Navigation latérale sur Desktop, barre de navigation mobile optimisée sur smartphone/tablette.

---

## 7. Section « À propos » & Équipe Dirigeante
* **Piliers de Mission :** Inclusion économique des talents africains, rigueur scientifique de l'alignement RLHF, sécurité financière des paiements quotidiens et collatéraux.
* **Portraits de l'Équipe Générés Spécifiquement :** Galerie de 6 dirigeants et responsables opérationnels aux portraits photoréalistes exclusifs (ratio de représentation conforme : 4 membres d'ascendance européenne ~70% et 2 membres d'ascendance africaine ~30%) :
  1. Alexandre Moreau — CEO & Co-fondateur
  2. Dr. Claire Dumont — Directrice Recherche IA & RLHF
  3. Babacar Ndiaye — VP Opérations & Workforce Afrique
  4. Julien Vasseur — Directeur Ingénierie & Cloud
  5. Sophie Lefebvre — Responsable Qualité & Éthique des Données
  6. Aïssatou Diallo — Lead Communauté & Succès Entraîneurs

---

## 8. Section « Partenaires » & Défilement Continu (Marquee)
* **Animation Continue :** Ruban défilant en boucle infinie (`marqueeScroll`) avec pause au survol et masque de dégradé latéral (fade-in / fade-out).
* **Écosystème Mixte (17 Acteurs Majeurs & Spécialisés) :**
  - **Titans mondiaux de l'IA :** OpenAI, Anthropic, Mistral AI, Google DeepMind, Hugging Face, Scale AI, Cohere.
  - **Startups & Labs spécialisés / émergents :** Kili Technology (Annotation), AfriNLP Labs (Langues Africaines), Labelbox (Data Engine), Neuropulse AI (Vision Médicale), Baobab DataWorks (Datasets Régionaux), Cognitio Research (Audit Multi-Agents), Synthetix Vision (Véhicules Autonomes), DataWeave Dynamics (E-Commerce IA), Turing Data Hub (Workforce Cloud), Voxellence AI (Reconnaissance Vocale).

---

## 9. Spécifications des Modules Restants & Feuille de Route d'Excellence

### 9.1. Centre de Notifications Augmenté & Journalisation d'Événements
1. **Système de Filtres par Catégorie :**
   - **Toutes :** Flux chronologique consolidé.
   - **Gains & Tâches :** Historique automatique à chaque exercice validé (+50 FCFA, +150 FCFA, etc.).
   - **Finances & Collatéral :** Dépôts de séquestre, activations de palier, demandes de retrait Mobile Money.
   - **Qualité & Système :** Avertissements RLHF, conseils d'entraînement, alertes d'inactivité.
2. **Génération Dynamique d'Événements Persistants :**
   - Chaque validation de tâche, demande de retrait ou changement de palier alimente un journal horodaté (`scalia_notifications_history`).
   - Horodatage dynamique en français (*« À l'instant »*, *« Il y a 5 min »*, *« Aujourd'hui à 14:32 »*).
3. **Gestion Avancée de Lecture & Suppression :**
   - Statut lu/non-lu par carte, possibilité de supprimer individuellement ou d'effacer tout l'historique.

### 9.2. Banque Dynamique de Tâches d'Entraînement Renouvelables (Pool Multi-Tâches)
1. **Rotation Continue sans Blocage :**
   - Déploiement d'un pool d'au moins 4 exercices distincts par module pour renouveler les sessions de travail.
2. **Contenu Détaillé par Module :**
   - **Module 1 (CAPTCHA) :** 4 scénarios (Feux tricolores, Passages piétons, Autobus urbains, Voitures).
   - **Module 2 (Vidéo Ad) :** 4 scénarios vidéo (Fintech Mobile Money, E-Santé téléconsultation, Logistique express, Agritech prédictive).
   - **Module 3 (Correction LLM) :** 4 études de cas (Géographie, Histoire politique, Formules biochimiques, Économie régionale).
   - **Module 4 (Audit Multi-Agents) :** 4 dialogues critiques (Arbitrage financier, Éthique & IA responsable, Sécurité cloud, Diagnostic médical).
3. **Compteur Quotidien & Progression :**
   - Affichage du nombre de tâches accomplies sur la journée et crédit immédiat du temps vers le quota horaire du palier.

### 9.3. Espace « Mon Profil & Paramètres Entraîneur »
1. **Fiche d'Identité Entraîneur :**
   - Affichage de l'identifiant unique (`COACH-XXXX`), Prénom, Nom, Email, Pays et Ville.
2. **Configuration des Paiements Mobile Money :**
   - Définition du numéro Mobile Money par défaut et sélection de l'opérateur (MTN MoMo ou Orange Money).
3. **Attestation & Certificat d'Entraîneur IA :**
   - Génération et affichage de l'attestation officielle de conformité RLHF de Scalia avec cachet de garantie du collatéral.
4. **Sécurité :**
   - Modification locale du mot de passe de connexion.

### 9.4. Cadre Juridique, CGU & Charte du Collatéral Sous Séquestre
1. **Modale Complète des CGU :**
   - Définition des devoirs de l'entraîneur d'IA, clauses de restitution intégrale du collatéral à 100%, conditions de retrait quotidien et politique de confidentialité des données.
2. **Accessibilité :**
   - Consultable depuis le footer, l'on-boarding, la modale de recommandation de palier et les paramètres du profil.

### 9.5. Couche Backend & Intégration Webhook Reeserva
1. **Webhook Reeserva Automatisé (`POST /api/webhook/reeserva`) :**
   - Réception serveur des notifications de paiement confirmées par Reeserva pour activer automatiquement le collatéral de l'entraîneur.
2. **API de Retrait (`POST /api/payout/request`) :**
   - Enregistrement des demandes de retrait avec génération d'un numéro de reçu officiel `TX-MM-XXXX`.
