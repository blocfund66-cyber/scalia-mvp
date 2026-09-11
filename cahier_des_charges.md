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


