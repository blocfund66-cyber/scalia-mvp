// tasks.js

const captchaBank = [
  {
        "target": "Feux de circulation et feux tricolores",
        "icon": "ri-traffic-light-line",
        "distractorIcons": [
              "ri-signpost-line",
              "ri-car-line",
              "ri-road-map-line",
              "ri-truck-line"
        ]
  },
  {
        "target": "Passages piétons et zones piétonnes",
        "icon": "ri-walk-line",
        "distractorIcons": [
              "ri-car-line",
              "ri-bus-line",
              "ri-riding-line",
              "ri-traffic-light-line"
        ]
  },
  {
        "target": "Autobus et transports en commun",
        "icon": "ri-bus-line",
        "distractorIcons": [
              "ri-car-line",
              "ri-truck-line",
              "ri-riding-line",
              "ri-taxi-line"
        ]
  },
  {
        "target": "Camions et véhicules utilitaires lourds",
        "icon": "ri-truck-line",
        "distractorIcons": [
              "ri-car-line",
              "ri-bus-line",
              "ri-motorbike-line",
              "ri-taxi-line"
        ]
  },
  {
        "target": "Motos et scooters de livraison",
        "icon": "ri-motorbike-line",
        "distractorIcons": [
              "ri-riding-line",
              "ri-car-line",
              "ri-bus-line",
              "ri-truck-line"
        ]
  },
  {
        "target": "Voitures de tourisme et taxis",
        "icon": "ri-taxi-line",
        "distractorIcons": [
              "ri-car-line",
              "ri-bus-line",
              "ri-truck-line",
              "ri-motorbike-line"
        ]
  },
  {
        "target": "Panneaux solaires photovoltaïques",
        "icon": "ri-sun-line",
        "distractorIcons": [
              "ri-building-line",
              "ri-lightbulb-line",
              "ri-battery-2-charge-line",
              "ri-home-line"
        ]
  },
  {
        "target": "Bornes et stations de recharge électrique",
        "icon": "ri-charging-pile-2-line",
        "distractorIcons": [
              "ri-gas-station-line",
              "ri-car-line",
              "ri-flashlight-line",
              "ri-plug-line"
        ]
  },
  {
        "target": "Drones autonomes de livraison",
        "icon": "ri-flight-takeoff-line",
        "distractorIcons": [
              "ri-plane-line",
              "ri-rocket-line",
              "ri-helicopter-line",
              "ri-send-plane-line"
        ]
  },
  {
        "target": "Équipements de protection (Casques de chantier EPI)",
        "icon": "ri-hard-hat-line",
        "distractorIcons": [
              "ri-user-line",
              "ri-tools-line",
              "ri-shield-line",
              "ri-t-shirt-line"
        ]
  },
  {
        "target": "Dispositifs d'imagerie médicale et scanners",
        "icon": "ri-heart-pulse-line",
        "distractorIcons": [
              "ri-stethoscope-line",
              "ri-capsule-line",
              "ri-first-aid-kit-line",
              "ri-hospital-line"
        ]
  },
  {
        "target": "Antennes relais et pylônes 5G",
        "icon": "ri-base-station-line",
        "distractorIcons": [
              "ri-broadcast-line",
              "ri-wifi-line",
              "ri-signal-tower-line",
              "ri-radar-line"
        ]
  },
  {
        "target": "Compteurs électriques communicants et IoT",
        "icon": "ri-dashboard-3-line",
        "distractorIcons": [
              "ri-cpu-line",
              "ri-server-line",
              "ri-timer-line",
              "ri-calculator-line"
        ]
  },
  {
        "target": "Bateaux cargos et transport maritime",
        "icon": "ri-ship-line",
        "distractorIcons": [
              "ri-sailboat-line",
              "ri-anchor-line",
              "ri-compass-3-line",
              "ri-water-percent-line"
        ]
  },
  {
        "target": "Codes QR et étiquettes logistiques",
        "icon": "ri-qr-code-line",
        "distractorIcons": [
              "ri-barcode-line",
              "ri-coupon-line",
              "ri-price-tag-3-line",
              "ri-inbox-archive-line"
        ]
  },
  {
        "target": "Faune sauvage africaine protégée (Éléphants, girafes)",
        "icon": "ri-safari-line",
        "distractorIcons": [
              "ri-leaf-line",
              "ri-plant-line",
              "ri-tree-line",
              "ri-landscape-line"
        ]
  },
  {
        "target": "Arbres et couverts végétaux forestiers",
        "icon": "ri-tree-line",
        "distractorIcons": [
              "ri-leaf-line",
              "ri-seedling-line",
              "ri-plant-line",
              "ri-earth-line"
        ]
  },
  {
        "target": "Ponts suspendus et viaducs routiers",
        "icon": "ri-bridge-line",
        "distractorIcons": [
              "ri-road-map-line",
              "ri-building-4-line",
              "ri-route-line",
              "ri-car-line"
        ]
  },
  {
        "target": "Vélos et pistes cyclables urbaines",
        "icon": "ri-riding-line",
        "distractorIcons": [
              "ri-walk-line",
              "ri-motorbike-line",
              "ri-car-line",
              "ri-road-map-line"
        ]
  },
  {
        "target": "Hydrantes et sécurité incendie",
        "icon": "ri-fire-line",
        "distractorIcons": [
              "ri-drop-line",
              "ri-shield-cross-line",
              "ri-alarm-warning-line",
              "ri-flashlight-line"
        ]
  }
];

const videoBank = [
  {
        "title": "Campagne 1 : PaySafe MoMo — Transfert d'argent instantané",
        "headline": "PaySafe MoMo : 0% de frais sur tous vos retraits",
        "sub": "Test d'impact visuel & lisibilité du logo",
        "icon": "ri-smartphone-line"
  },
  {
        "title": "Campagne 2 : SpeedyBoutique — Courses livrées en 45 min",
        "headline": "SpeedyBoutique : Vos courses du marché livrées à domicile",
        "sub": "Test de clarté de l'offre commerciale & dynamique du cadrage",
        "icon": "ri-shopping-bag-3-line"
  },
  {
        "title": "Campagne 3 : PowerVolt Energy — Performance Sportive",
        "headline": "PowerVolt : L'énergie saine des créateurs africains",
        "sub": "Test de rythme visuel et contraste des couleurs",
        "icon": "ri-flashlight-line"
  },
  {
        "title": "Campagne 4 : AfriCode Academy — Devenez Développeur IA",
        "headline": "AfriCode : Maîtrisez le Machine Learning en 6 mois",
        "sub": "Test de lisibilité des sous-titres et voix-off",
        "icon": "ri-code-s-slash-line"
  },
  {
        "title": "Campagne 5 : TelcoMax 5G — Fibre & Très Haut Débit",
        "headline": "TelcoMax 5G : Naviguez sans latence dans toute la sous-région",
        "sub": "Test de mémorisation du slogan final",
        "icon": "ri-wifi-line"
  },
  {
        "title": "Campagne 6 : EcoDrive — Moto-taxi 100% électrique",
        "headline": "EcoDrive : Zéro émission, 100% économique au quotidien",
        "sub": "Test d'accroche et pertinence écologique",
        "icon": "ri-charging-pile-2-line"
  },
  {
        "title": "Campagne 7 : AgriTech Sahel — Irrigation par Satellite",
        "headline": "AgriTech Sahel : Doublez vos rendements agricoles grâce aux données météo",
        "sub": "Test de clarté didactique & compréhension pour agriculteurs",
        "icon": "ri-plant-line"
  },
  {
        "title": "Campagne 8 : BioSoin Santé — Téléconsultation & Ordonnances",
        "headline": "BioSoin : Un médecin généraliste disponible en 5 minutes sur smartphone",
        "sub": "Test de réassurance & sentiment de sécurité médicale",
        "icon": "ri-heart-pulse-line"
  },
  {
        "title": "Campagne 9 : SunSolar Home — Énergie Solaire Autonome",
        "headline": "SunSolar : Électrifiez votre maison rurale avec garantie 5 ans",
        "sub": "Test de compréhension de l'offre de micro-paiement journalier",
        "icon": "ri-sun-line"
  },
  {
        "title": "Campagne 10 : SwiftCargo Express — Logistique Panafricaine",
        "headline": "SwiftCargo : Suivez votre marchandise de Douala à Abidjan par GPS",
        "sub": "Test de perception de fiabilité et rigueur industrielle",
        "icon": "ri-truck-line"
  },
  {
        "title": "Campagne 11 : Horizon MicroBank — Comptes Pro & Micro-Crédits",
        "headline": "Horizon Bank : Financez l'extension de votre commerce sans paperasse",
        "sub": "Test de transparence des conditions et appel à l'action",
        "icon": "ri-bank-card-line"
  },
  {
        "title": "Campagne 12 : Edumobile Kids — Apprentissage Hors-Ligne",
        "headline": "Edumobile : Le programme scolaire officiel disponible sans connexion internet",
        "sub": "Test d'attractivité pour les parents d'élèves",
        "icon": "ri-book-open-line"
  },
  {
        "title": "Campagne 13 : CacaoDurable — Traçabilité Équitable",
        "headline": "CacaoDurable : Rémunérez équitablement les planteurs grâce à la blockchain",
        "sub": "Test d'authenticité et valorisation des producteurs locaux",
        "icon": "ri-seedling-line"
  },
  {
        "title": "Campagne 14 : SahelConstruct — Habitat Écologique en Terre",
        "headline": "SahelConstruct : Des maisons fraîches et durables sans climatiseur",
        "sub": "Test de crédibilité des arguments thermiques et architecturaux",
        "icon": "ri-home-4-line"
  },
  {
        "title": "Campagne 15 : CloudIvoire Data — Hébergement Souverain",
        "headline": "CloudIvoire : Vos données sensibles hébergées sur le sol africain",
        "sub": "Test de positionnement haut de gamme et conformité réglementaire",
        "icon": "ri-server-line"
  },
  {
        "title": "Campagne 16 : AquaPure Sahel — Kiosques Solaires d'Eau Potable",
        "headline": "AquaPure : De l'eau purifiée et filtrée à prix solidaire dans chaque village",
        "sub": "Test d'impact sociétal et clarté du modèle solidaire",
        "icon": "ri-drop-line"
  }
];

const textBank = [
  {
        "theme": "Géographie & Volcanologie",
        "wrong": "\"Le mont Cameroun est un volcan actif situé en Afrique de l'Ouest, culminant à 8 500 mètres d'altitude, ce qui en fait le plus haut sommet d'Afrique.\"",
        "tip": "Indice : Altitude réelle 4 040m, situé en Afrique centrale, le Kilimandjaro (5 895m) est le plus haut sommet d'Afrique."
  },
  {
        "theme": "Économie & Monnaies",
        "wrong": "\"La monnaie officielle du Sénégal est le Franc Guinéen (GNF), géré directement par la Banque Centrale Européenne à Francfort.\"",
        "tip": "Indice : La monnaie du Sénégal est le Franc CFA (XOF), émis par la BCEAO à Dakar."
  },
  {
        "theme": "Histoire de l'Informatique",
        "wrong": "\"Le langage Python a été créé en 1985 par Steve Jobs chez Apple comme successeur direct du Fortran pour les ordinateurs Macintosh.\"",
        "tip": "Indice : Python a été créé par Guido van Rossum et publié en 1991 aux Pays-Bas."
  },
  {
        "theme": "Hydrographie Africaine",
        "wrong": "\"Le fleuve Congo est le plus court d'Afrique avec 400 kilomètres et se jette dans la mer Rouge sans aucun affluent majeur.\"",
        "tip": "Indice : Le fleuve Congo fait 4 700 km, c'est le 2e plus grand débit au monde après l'Amazone et se jette dans l'océan Atlantique."
  },
  {
        "theme": "Capitale Politique",
        "wrong": "\"La capitale politique de la Côte d'Ivoire est Abidjan depuis 1960, et Yamoussoukro n'est qu'un petit village de pêcheurs du littoral.\"",
        "tip": "Indice : La capitale politique et administrative est Yamoussoukro depuis 1983. Abidjan est la capitale économique."
  },
  {
        "theme": "Archéologie & Histoire Antique",
        "wrong": "\"Les Pyramides de Gizeh ont été construites au 18e siècle par l'empereur Napoléon Bonaparte lors de son séjour en Alexandrie.\"",
        "tip": "Indice : Elles ont été bâties durant l'Égypte antique (vers 2500 av. J.-C.) sur le plateau de Gizeh près du Caire."
  },
  {
        "theme": "Astronomie & Système Solaire",
        "wrong": "\"La distance moyenne entre la Terre et la Lune est de 150 millions de kilomètres, soit un voyage de 45 ans en fusée standard.\"",
        "tip": "Indice : La distance Terre-Lune est d'environ 384 400 km (150 millions de km est la distance Terre-Soleil)."
  },
  {
        "theme": "Intelligence Artificielle & Deep Learning",
        "wrong": "\"L'architecture 'Transformer' au cœur de ChatGPT et Claude a été inventée en 1972 par Alan Turing dans son laboratoire de Bletchley Park.\"",
        "tip": "Indice : Le Transformer a été publié en 2017 par une équipe de chercheurs de Google dans le papier 'Attention Is All You Need'."
  },
  {
        "theme": "Histoire & Intégration Panafricaine",
        "wrong": "\"L'Union Africaine a été créée à Tokyo en 1945 pour remplacer la Société des Nations après la Seconde Guerre mondiale.\"",
        "tip": "Indice : L'Organisation de l'Unité Africaine (OUA) a été fondée en 1963 à Addis-Abeba, puis est devenue l'Union Africaine (UA) en 2002 à Durban."
  },
  {
        "theme": "Médecine & Pharmacologie",
        "wrong": "\"La pénicilline, premier antibiotique efficace, a été synthétisée chimiquement en laboratoire par Albert Einstein en 1955.\"",
        "tip": "Indice : La pénicilline a été découverte en 1928 par le biologiste britannique Alexander Fleming à partir du champignon Penicillium notatum."
  },
  {
        "theme": "Agriculture & Commerce Mondial",
        "wrong": "\"Le premier producteur mondial de fèves de cacao est la Norvège, qui fournit à elle seule 85% du chocolat consommé dans le monde.\"",
        "tip": "Indice : La Côte d'Ivoire est le 1er producteur mondial de cacao (~40-45% de l'offre mondiale), suivie du Ghana."
  },
  {
        "theme": "Réseaux & Câbles Sous-Marins",
        "wrong": "\"L'internet en Afrique fonctionne à 100% via des pigeons voyageurs électroniques et ne possède aucune connexion physique sous la mer.\"",
        "tip": "Indice : L'Afrique est reliée au réseau mondial par des dizaines de câbles sous-marins de fibre optique géants (2Africa, WACS, Equiano, ACE)."
  },
  {
        "theme": "Linguistique & Langues Africaines",
        "wrong": "\"Le swahili est une langue germanique inventée à Berlin au 19e siècle et parlée uniquement par 500 personnes en Islande.\"",
        "tip": "Indice : Le swahili (Kiswahili) est une langue bantoue parlée par plus de 150 millions de personnes en Afrique de l'Est et centrale."
  },
  {
        "theme": "Énergies & Physique",
        "wrong": "\"Les panneaux solaires photovoltaïques produisent de l'électricité en brûlant du charbon liquide extrait des rayons lunaires.\"",
        "tip": "Indice : Ils convertissent directement les photons de la lumière du Soleil en électricité grâce à l'effet photoélectrique des semi-conducteurs au silicium."
  },
  {
        "theme": "Droit & Affaires Panafricaines",
        "wrong": "\"Le traité OHADA a été signé pour imposer les lois impériales de l'Empire romain à tous les tribunaux d'Australie.\"",
        "tip": "Indice : L'OHADA (Organisation pour l'Harmonisation du Droit des Affaires en Afrique) harmonise le droit commercial dans 17 pays membres africains."
  },
  {
        "theme": "Écologie & Environnement",
        "wrong": "\"La Grande Muraille Verte est une muraille en béton armé de 15 mètres de haut construite pour entourer le pôle Sud.\"",
        "tip": "Indice : C'est une initiative écologique panafricaine visant à créer une bande végétale d'arbres de 8 000 km à travers le Sahel pour stopper la désertification."
  },
  {
        "theme": "Cryptographie & Sécurité Web",
        "wrong": "\"Le protocole HTTPS est une technique secrète qui permet à tout pirate de lire les numéros de carte bancaire en clair sans mot de passe.\"",
        "tip": "Indice : HTTPS utilise le protocole TLS/SSL pour chiffrer les données échangées entre le navigateur et le serveur, garantissant confidentialité et intégrité."
  },
  {
        "theme": "Chimie & Minéraux Stratégiques",
        "wrong": "\"Le cobalt et le lithium sont des gaz volatils invisibles qui ne se trouvent que dans les nuages au-dessus de Mars.\"",
        "tip": "Indice : Le cobalt et le lithium sont des métaux solides indispensables aux batteries rechargeables. La RDC détient plus de 70% des réserves mondiales de cobalt."
  }
];

const auditBank = [
  {
        "theme": "Optimisation de Requête SQL",
        "userMsg": "Comment optimiser une requête SQL avec une jointure multi-tables devenue extrêmement lente en production ?",
        "aiMsg": "Pour accélérer votre jointure, vous devez appliquer la clause ORDER BY sur l'intégralité des tables, et désactiver tous les index pour que le moteur lise les données brutes sans surcharge.",
        "defaultDiag": "hallucination",
        "danger": "Recommandation désastreuse : supprimer les index détruit les performances et trier toutes les tables alourdit dramatiquement la mémoire vive. Il faut ajouter des index ciblés et analyser le plan EXPLAIN."
  },
  {
        "theme": "Sécurité & Stockage de Mots de Passe",
        "userMsg": "Quelle fonction de hachage dois-je utiliser pour sécuriser les mots de passe de mes utilisateurs dans une application web moderne ?",
        "aiMsg": "Vous devriez utiliser MD5 simple sans sel (salt), car c'est l'algorithme le plus rapide et le plus universel supporté par tous les serveurs sans aucune dépendance.",
        "defaultDiag": "hallucination",
        "danger": "Faille de sécurité critique : MD5 est totalement obsolète et vulnérable aux attaques par tables arc-en-ciel. Il faut impérativement utiliser Argon2id, bcrypt ou scrypt avec un sel fort."
  },
  {
        "theme": "Diagnostic Réseau & Latence DNS",
        "userMsg": "Mes requêtes API échouent avec l'erreur 'DNS_PROBE_FINISHED_NXDOMAIN'. Que dois-je faire sur mon routeur ?",
        "aiMsg": "Changez l'adresse MAC physique de votre carte réseau pour forcer le satellite de télécommunication à réinitialiser votre compte bancaire.",
        "defaultDiag": "hallucination",
        "danger": "Incohérence totale et conseil hors-sujet : l'erreur est un échec de résolution de nom de domaine (DNS), aucun rapport avec la MAC ou la banque. Il faut vérifier la configuration DNS (ex: 8.8.8.8, 1.1.1.1)."
  },
  {
        "theme": "Conteneurisation Docker en Production",
        "userMsg": "Quelle est la bonne pratique pour lancer des conteneurs d'application web en production avec Docker ?",
        "aiMsg": "Pour éviter tout blocage de permission, lancez toujours vos conteneurs avec le flag '--privileged' et connectez-les directement en utilisateur root du serveur hôte.",
        "defaultDiag": "hallucination",
        "danger": "Risque de compromission totale : lancer en --privileged donne un accès root complet au noyau de l'hôte si le conteneur subit une injection. Il faut exécuter en utilisateur non-root et restreindre les capabilities."
  },
  {
        "theme": "Gestion de Version Git en Équipe",
        "userMsg": "J'ai un conflit de merge avec la branche principale de mon collègue sur Git. Comment le résoudre ?",
        "aiMsg": "La solution la plus rapide est d'exécuter 'git push --force origin main', cela écrasera l'historique distant pour imposer votre code sans perdre de temps.",
        "defaultDiag": "hallucination",
        "danger": "Risque de perte irrémédiable de données : un force push sur main écrase les commits de l'équipe sans résoudre les conflits logiques. Il faut faire git fetch, git rebase ou merge, et résoudre les conflits localement."
  },
  {
        "theme": "Architecture Web & Protocole Réseau",
        "userMsg": "Puis-je utiliser WebSockets pour échanger des messages textuels bidirectionnels entre mon serveur et mon client mobile ?",
        "aiMsg": "Non, les WebSockets sont réservés aux fichiers compressés binaires supérieurs à 10 Mo. Pour du texte, vous devez utiliser le protocole FTP.",
        "defaultDiag": "hallucination",
        "danger": "Hallucination technique manifeste : WebSocket transmet nativement des frames de texte UTF-8 de toute taille avec une très faible latence bidirectionnelle."
  },
  {
        "theme": "Sécurité API REST & Headers CORS",
        "userMsg": "Comment configurer CORS sur mon API Node.js pour permettre à mon frontend d'envoyer des cookies de session ?",
        "aiMsg": "Configurez Access-Control-Allow-Origin: '*' avec Access-Control-Allow-Credentials: 'true'. C'est la configuration standard recommandée par tous les navigateurs.",
        "defaultDiag": "hallucination",
        "danger": "Erreur de spécification : les navigateurs bloquent strictement l'association du wildcard '*' avec Credentials=true pour prévenir les attaques CSRF. Il faut spécifier l'origine exacte autorisée."
  },
  {
        "theme": "Passerelles de Paiement & Idempotence",
        "userMsg": "Comment éviter qu'un client Mobile Money soit débité deux fois si sa connexion coupe pendant la validation du webhook ?",
        "aiMsg": "Renvoyez simplement la requête en boucle infinie toutes les 200 millisecondes jusqu'à ce que le solde bancaire soit complètement épuisé.",
        "defaultDiag": "hallucination",
        "danger": "Conséquence catastrophique : double débit du client et échec de réconciliation. Il faut implémenter une clé d'idempotence unique (Idempotency Key) et stocker l'état de la transaction en base de données."
  },
  {
        "theme": "Conformité RGPD & Données Médicales",
        "userMsg": "Puis-je stocker les diagnostics médicaux de mes patients dans une base de données Firebase ouverte sans authentification pour aller plus vite ?",
        "aiMsg": "Oui, c'est parfaitement conforme car la transparence totale des dossiers médicaux accélère le diagnostic collectif des internautes.",
        "defaultDiag": "hallucination",
        "danger": "Violation grave du secret médical et des lois sur la protection des données (RGPD / réglementations nationales). Les données de santé doivent être chiffrées au repos et en transit avec contrôle d'accès strict."
  },
  {
        "theme": "Sécurité des Tokens JWT",
        "userMsg": "Quelle durée de validité dois-je attribuer à mes JSON Web Tokens d'authentification pour mon application bancaire ?",
        "aiMsg": "Fixez la durée de vie à 15 ans avec l'algorithme 'none' pour que l'utilisateur n'ait jamais besoin de se reconnecter.",
        "defaultDiag": "hallucination",
        "danger": "Faille critique majeure : l'algorithme 'none' supprime la signature cryptographique et une durée de 15 ans rend le vol de token définitif. Il faut un Access Token court (15 min) avec Refresh Token rotatif et signature HMAC-SHA256 ou RSA."
  },
  {
        "theme": "Transactions Distribuées & Base de Données",
        "userMsg": "Dans une architecture microservices, comment garantir la cohérence des soldes entre le service Compte et le service Commande ?",
        "aiMsg": "Évitez toute transaction et écrivez les soldes dans un fichier texte partagé sur Dropbox sans aucun verrouillage.",
        "defaultDiag": "hallucination",
        "danger": "Absurdité architecturale totale : risque immédiat de race condition et incohérence financière. Il faut utiliser le pattern Saga (orchesté ou chorégraphié) avec transactions compensatoires ou du Two-Phase Commit."
  },
  {
        "theme": "Smart Contracts Ethereum & Sécurité",
        "userMsg": "Comment protéger ma fonction de retrait Solidity contre les attaques de réentrance (Reentrancy attack) ?",
        "aiMsg": "Envoyez l'ether au contrat tiers avant de mettre à jour le solde interne de l'utilisateur, cela garantit que la blockchain valide le transfert en premier.",
        "defaultDiag": "hallucination",
        "danger": "Vulnérabilité critique historique (comme le hack The DAO) : il faut appliquer le pattern Checks-Effects-Interactions (mettre à jour l'état avant d'envoyer les fonds) ou utiliser le modifier nonReentrant d'OpenZeppelin."
  },
  {
        "theme": "Intelligence Artificielle & Prompt Injection",
        "userMsg": "Comment empêcher un utilisateur malveillant de forcer mon chatbot IA à révéler son System Prompt secret ?",
        "aiMsg": "Dites simplement à l'utilisateur dans votre charte qu'il lui est interdit de pirater le modèle sous peine d'exclusion.",
        "defaultDiag": "hallucination",
        "danger": "Absence de protection technique : une charte ne bloque aucun jailbreak. Il faut appliquer un filtre d'entrée strict, des délimiteurs de contexte hermétiques, et un validateur de sortie (LLM Guard / NeMo Guardrails)."
  },
  {
        "theme": "Protection Anti-DDoS & Scalabilité",
        "userMsg": "Mon serveur reçoit 50 000 requêtes malveillantes par seconde sur le port 80. Comment réagir ?",
        "aiMsg": "Répondez à chaque requête avec un fichier vidéo 4K non compressé de 2 Go pour épuiser la bande passante de l'attaquant.",
        "defaultDiag": "hallucination",
        "danger": "Auto-DDoS immédiat : envoyer un fichier 4K va saturer instantanément la carte réseau et la mémoire du serveur légitime. Il faut activer un reverse-proxy anti-DDoS (Cloudflare, AWS Shield) avec filtrage Anycast et Rate Limiting."
  }
];

function startOnboardingRole(role, forceNew = false) {
  state.role = role;
  goTo('onboarding-screen');
  switchOnboardTab('signup');
  if (forceNew) {
    const fn = document.getElementById('onboard-trainer-firstname');
    const ln = document.getElementById('onboard-trainer-lastname');
    const em = document.getElementById('onboard-trainer-email');
    const pwd = document.getElementById('onboard-trainer-password');
    if (fn) fn.value = '';
    if (ln) ln.value = '';
    if (em) em.value = '';
    if (pwd) pwd.value = '';
  }
}

function switchOnboardTab(tab) {
  const signupBox = document.getElementById('onboard-signup-container');
  const loginBox = document.getElementById('onboard-login-container');
  const signupBtn = document.getElementById('onboard-tab-signup-btn');
  const loginBtn = document.getElementById('onboard-tab-login-btn');

  if (tab === 'signup') {
    signupBox.style.display = 'block';
    loginBox.style.display = 'none';
    signupBtn.classList.add('active');
    loginBtn.classList.remove('active');
  } else {
    signupBox.style.display = 'none';
    loginBox.style.display = 'block';
    signupBtn.classList.remove('active');
    loginBtn.classList.add('active');
  }
}

function selectTier(tierKey) {
  state.userTier = tierKey;
  document.querySelectorAll('.tier-card').forEach(c => c.classList.remove('selected'));
  const card = document.getElementById('tier-' + tierKey);
  if (card) card.classList.add('selected');
}

function confirmRoleSelection(role) {
  startTrainerSubscriptionWithPayment();
  return;
  state.role = 'entraineur';
  const fn = document.getElementById('onboard-trainer-firstname').value.trim() || 'Jean';
  const ln = document.getElementById('onboard-trainer-lastname').value.trim() || 'Baptiste';
  const country = document.getElementById('onboard-trainer-country').value || 'Cameroun';
  const city = document.getElementById('onboard-trainer-city').value.trim() || 'Douala';
  const em = document.getElementById('onboard-trainer-email').value.trim();
  const pass = document.getElementById('onboard-trainer-password').value;
  const ref = document.getElementById('onboard-ref-code').value.trim();

  if (pass.length < 4) {
    showToast("Mot de passe trop court", "Le mot de passe doit comporter au moins 4 caractères.", true);
    return;
  }

  const username = 'COACH-' + fn.substring(0, 3).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
  const initials = (fn.charAt(0) + ln.charAt(0)).toUpperCase();

  localStorage.setItem('scalia_username', username);
  localStorage.setItem('scalia_firstname', fn);
  localStorage.setItem('scalia_lastname', ln);
  localStorage.setItem('scalia_country', country);
  localStorage.setItem('scalia_city', city);
  localStorage.setItem('scalia_email', em);
  localStorage.setItem('scalia_initials', initials);
  localStorage.setItem('scalia_password', pass);

  state.collateralLocked = tierParams[state.userTier].collateral;
  state.dailyTargetTime = tierParams[state.userTier].time;
  state.balance = parseInt(localStorage.getItem('scalia_balance')) || 0;

  localStorage.setItem('scalia_session_active', 'true');
  saveSessionToLocalStorage();

  const avatar = document.getElementById('user-avatar-initials');
  if (avatar) avatar.innerText = initials;

  showToast("Souscription Réussie", "Bienvenue sur Scalia ! Collatéral garanti : " + formatCurrency(state.collateralLocked));
  updateNavigationBars();
  updateAuthUI();
  goTo('dresseur-screen');
}

function changeLoginPresetProfile() {
  const preset = document.getElementById('login-profile-preset').value;
  const userField = document.getElementById('login-username');
  const tierField = document.getElementById('login-tier');

  if (preset === 'entraineur_bronze') {
    userField.value = 'JB-5582';
    tierField.value = 'bronze';
  } else if (preset === 'entraineur_silver') {
    userField.value = 'SILVER-99';
    tierField.value = 'silver';
  } else if (preset === 'entraineur_gold') {
    userField.value = 'GOLD-MASTER';
    tierField.value = 'gold';
  } else if (preset === 'entraineur_platinum') {
    userField.value = 'PLATINUM-PRO';
    tierField.value = 'platinum';
  } else if (preset === 'entraineur_diamond') {
    userField.value = 'DIAMOND-VIP';
    tierField.value = 'diamond';
  }
}

function confirmLoginAction() {
  state.role = 'entraineur';
  const userField = document.getElementById('login-username').value.trim() || 'JB-5582';
  const passField = document.getElementById('login-password').value;
  const tierField = document.getElementById('login-tier').value;

  if (passField.length < 4) {
    showToast("Mot de passe trop court", "Le mot de passe doit comporter au moins 4 caractères.", true);
    return;
  }

  state.userTier = tierField;
  state.collateralLocked = tierParams[tierField].collateral;
  state.dailyTargetTime = tierParams[tierField].time;
  state.balance = parseInt(localStorage.getItem('scalia_balance')) || 0;

  const initials = userField.substring(0, 2).toUpperCase();
  localStorage.setItem('scalia_username', userField);
  localStorage.setItem('scalia_initials', initials);

  const avatar = document.getElementById('user-avatar-initials');
  if (avatar) avatar.innerText = initials;

  localStorage.setItem('scalia_session_active', 'true');
  saveSessionToLocalStorage();
  showToast("Connexion Réussie", "Accès accordé à la Console Entraîneur.");
  updateNavigationBars();
  updateAuthUI();
  goTo('dresseur-screen');
}

let currentTask = null;
let selectedCaptchaCells = [];
let videoProgressInterval = null;
let currentVideoRating = null;
let currentTaskStartTime = Date.now();

function toggleDemoCollateral(enable) {
  console.warn("[Scalia Security] Le verrouillage strict est actif. Aucun mode démo autorisé.");
  openCollateralRecommendationModal();
}

function refreshUI() {
  const savedCollat = (typeof localStorage !== 'undefined') ? localStorage.getItem('scalia_collateral_active') : null;
  const isPaidVerified = (typeof localStorage !== 'undefined') ? (localStorage.getItem('scalia_collateral_paid_verified') === 'true') : false;

  if (savedCollat === 'true' || isPaidVerified) {
    state.collateralActive = true;
    if (!state.collateralLocked || state.collateralLocked === 0) {
      state.collateralLocked = tierParams[state.userTier]?.collateral || 15000;
    }
  } else if (savedCollat === 'false') {
    state.collateralActive = false;
    state.collateralLocked = 0;
  }

  const hasCollateral = state.collateralActive && state.collateralLocked > 0;

  const curTierObj = tierParams[state.userTier] || tierParams['bronze'];

  const dailyEarn = document.getElementById('stats-daily-earnings');
  const targetSal = document.getElementById('stats-target-salary');
  const lockCol = document.getElementById('stats-locked-collateral');
  if (dailyEarn) dailyEarn.innerText = formatCurrency(state.dailyEarnings || 0);
  if (targetSal) {
    targetSal.innerText = hasCollateral 
      ? curTierObj.salaryText 
      : "Collatéral requis";
  }
  if (lockCol) {
    if (hasCollateral) {
      lockCol.innerText = formatCurrency(state.collateralLocked);
      lockCol.style.color = "var(--text-primary)";
    } else {
      lockCol.innerHTML = '<span style="color: #ef4444; font-size: 0.95rem; font-weight: 700;">0 FCFA (Non activé)</span>';
    }
  }

  // 4th Stat Card: Note de l'Entraîneur (/20) & Statut Qualité
  const ratingVal = document.getElementById('stats-trainer-rating');
  const ratingBadge = document.getElementById('stats-trainer-rating-badge');
  const ratingSub = document.getElementById('stats-trainer-rating-sub');
  if (ratingVal) {
    ratingVal.innerText = (state.trainerRating || 20.0).toFixed(1) + " / 20";
  }
  if (ratingBadge) {
    const score = state.trainerRating || 20.0;
    if (state.isSuspended) {
      ratingBadge.className = 'badge badge-red';
      ratingBadge.innerHTML = '<i class="ri-forbid-2-line"></i> Suspendu';
    } else if (score >= 16.0) {
      ratingBadge.className = 'badge badge-emerald';
      ratingBadge.innerHTML = '<i class="ri-medal-line"></i> Excellence IA';
    } else if (score >= 12.0) {
      ratingBadge.className = 'badge badge-cyan';
      ratingBadge.innerHTML = '<i class="ri-thumb-up-line"></i> Conforme';
    } else if (score >= 10.0) {
      ratingBadge.className = 'badge badge-gold';
      ratingBadge.innerHTML = '<i class="ri-alert-line"></i> Vigilance';
    } else {
      ratingBadge.className = 'badge badge-red';
      ratingBadge.innerHTML = '<i class="ri-error-warning-line"></i> Critique';
    }
  }
  if (ratingSub) {
    if (state.warningsCount > 0) {
      ratingSub.innerHTML = '<span style="color: #ef4444; font-weight: 700;">Avertissement ' + state.warningsCount + '/3</span> • Qualité: ' + (state.ratingQuality || 12.0).toFixed(1) + '/12';
    } else {
      ratingSub.innerText = "Qualité: " + (state.ratingQuality || 12.0).toFixed(1) + "/12 • Cadence: " + (state.ratingTime || 8.0).toFixed(1) + "/8";
    }
  }

  // Account Suspension Banner Display
  const suspendedBanner = document.getElementById('account-suspended-banner');
  if (suspendedBanner) {
    suspendedBanner.style.display = state.isSuspended ? 'block' : 'none';
  }

  const timeText = document.getElementById('progress-time-text');
  const targetHoursText = document.getElementById('target-hours-text');
  const barFill = document.getElementById('progress-bar-fill');
  
  const targetMin = curTierObj.time;
  state.dailyTargetTime = targetMin;
  const currentMinutes = Math.max(0, parseInt(state.dailyTime) || 0);
  const pct = targetMin > 0 ? Math.min(100, Math.round((currentMinutes / targetMin) * 100)) : 0;

  if (timeText) timeText.innerText = currentMinutes + " min / " + targetMin + " min (" + pct + "%)";
  const curLang = (typeof currentLang !== 'undefined' ? currentLang : (typeof localStorage !== 'undefined' ? localStorage.getItem('scalia_lang') : null)) || 'fr';
  const hText = (typeof SCALIA_TRANSLATIONS !== "undefined" && SCALIA_TRANSLATIONS[curLang]) ? SCALIA_TRANSLATIONS[curLang].hours_per_day : "heures / jour"; 
  if (targetHoursText) targetHoursText.innerText = curTierObj.hours + " " + hText;
  if (barFill) barFill.style.width = pct + "%";

  const activeTierBadge = document.getElementById('active-tier-indicator-badge');
  if (activeTierBadge) {
    if (hasCollateral) {
      activeTierBadge.className = 'badge badge-emerald';
      activeTierBadge.innerText = "Palier " + curTierObj.label + " Actif";
    } else {
      activeTierBadge.className = 'badge badge-red';
      activeTierBadge.innerText = "Collatéral Inactif";
    }
  }

  const statusBanner = document.getElementById('trainer-collateral-status-banner');
  if (statusBanner) {
    if (!hasCollateral) {
      statusBanner.innerHTML = `
        <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 12px; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; gap: 15px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(239,68,68,0.15); color: #ef4444; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
              <i class="ri-lock-2-line"></i>
            </div>
            <div>
              <div style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem;">Console Verrouillée — Collatéral Requis</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary);">Souscrivez à un palier pour débloquer l'accès aux exercices rémunérés.</div>
            </div>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <button class="btn btn-primary-trainer" onclick="openCollateralModalForTier('bronze')" style="padding: 8px 16px; font-size: 0.85rem;">
              <i class="ri-shield-keyhole-line"></i> Souscrire au Collatéral
            </button>
            
          </div>
        </div>
      `;
    } else {
      statusBanner.innerHTML = `
        <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 12px; padding: 12px 18px; display: flex; align-items: center; justify-content: space-between; gap: 15px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(16,185,129,0.15); color: #10b981; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
              <i class="ri-shield-check-line"></i>
            </div>
            <div>
              <div style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem;">
                Collatéral Garanti Actif : <span style="color: var(--accent-emerald);">Palier ${tierParams[state.userTier].label} (${formatCurrency(state.collateralLocked)})</span>
              </div>
              <div style="font-size: 0.8rem; color: var(--text-secondary);">
                ${state.userTier === 'diamond' ? '⭐ Bonus Plein Temps +20% sur tous les gains' : state.userTier === 'platinum' ? '⭐ Bonus Priorité +10% sur tous les gains' : 'Exercices débloqués • Dépôt garanti sous séquestre'}
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <button class="btn btn-secondary" onclick="openCollateralModalForTier(state.userTier)" style="padding: 7px 14px; font-size: 0.8rem;">
              <i class="ri-arrow-up-circle-line"></i> Changer de palier
            </button>
            
          </div>
        </div>
      `;
    }
  }

  const captchaRow = document.getElementById('task-row-captcha');
  const videoRow = document.getElementById('task-row-video');
  const textRow = document.getElementById('task-row-text');
  const auditRow = document.getElementById('task-row-audit');

  const captchaNum = document.getElementById('task-num-captcha');
  const videoNum = document.getElementById('task-num-video');
  const textNum = document.getElementById('task-num-text');
  const auditNum = document.getElementById('task-num-audit');

  const captchaBadge = document.getElementById('task-badge-captcha');
  const videoBadge = document.getElementById('task-badge-video');
  const textBadge = document.getElementById('task-badge-text');
  const auditBadge = document.getElementById('task-badge-audit');

  if (!hasCollateral) {
    [captchaRow, videoRow, textRow, auditRow].forEach(r => r && r.classList.add('locked'));
    if (captchaNum) captchaNum.innerHTML = '<i class="ri-lock-line"></i>';
    if (videoNum) videoNum.innerHTML = '<i class="ri-lock-line"></i>';
    if (textNum) textNum.innerHTML = '<i class="ri-lock-line"></i>';
    if (auditNum) auditNum.innerHTML = '<i class="ri-lock-line"></i>';

    if (captchaBadge) { captchaBadge.className = 'badge badge-red'; captchaBadge.innerText = 'Collatéral Requis'; }
    if (videoBadge) { videoBadge.className = 'badge badge-red'; videoBadge.innerText = 'Collatéral Requis'; }
    if (textBadge) { textBadge.className = 'badge badge-red'; textBadge.innerText = 'Collatéral Requis'; }
    if (auditBadge) { auditBadge.className = 'badge badge-red'; auditBadge.innerText = 'Collatéral Requis'; }

    const gateView = document.getElementById('task-collateral-gate-view');
    const emptyState = document.getElementById('task-empty-state');
    if (!currentTask) {
      if (gateView) gateView.style.display = 'block';
      if (emptyState) emptyState.style.display = 'none';
    }
  } else {
    const gateView = document.getElementById('task-collateral-gate-view');
    const emptyState = document.getElementById('task-empty-state');
    if (gateView) gateView.style.display = 'none';
    if (!currentTask && emptyState) emptyState.style.display = 'block';

    if (captchaRow) {
      captchaRow.classList.remove('locked');
      if (captchaNum) captchaNum.innerText = '1';
      if (captchaBadge) { captchaBadge.className = 'badge badge-emerald'; captchaBadge.innerText = 'Disponible'; }
    }
    if (videoRow) {
      videoRow.classList.remove('locked');
      if (videoNum) videoNum.innerText = '2';
      if (videoBadge) { videoBadge.className = 'badge badge-emerald'; videoBadge.innerText = 'Disponible'; }
    }

    const isSilverPlus = ['silver', 'gold', 'platinum', 'diamond'].includes(state.userTier);
    if (textRow) {
      if (isSilverPlus) {
        textRow.classList.remove('locked');
        if (textNum) textNum.innerText = '3';
        if (textBadge) { textBadge.className = 'badge badge-emerald'; textBadge.innerText = 'Disponible'; }
      } else {
        textRow.classList.add('locked');
        if (textNum) textNum.innerHTML = '<i class="ri-lock-line"></i>';
        if (textBadge) { textBadge.className = 'badge badge-red'; textBadge.innerText = 'Palier Silver (25k)'; }
      }
    }

    const isGoldPlus = ['gold', 'platinum', 'diamond'].includes(state.userTier);
    if (auditRow) {
      if (isGoldPlus) {
        auditRow.classList.remove('locked');
        if (auditNum) auditNum.innerText = '4';
        if (auditBadge) { auditBadge.className = 'badge badge-emerald'; auditBadge.innerText = 'Disponible'; }
      } else {
        auditRow.classList.add('locked');
        if (auditNum) auditNum.innerHTML = '<i class="ri-lock-line"></i>';
        if (auditBadge) { auditBadge.className = 'badge badge-red'; auditBadge.innerText = 'Palier Gold (45k)'; }
      }
    }
  }

  const wallTier = document.getElementById('wallet-collateral-tier');
  const wallColAmount = document.getElementById('wallet-collateral-amount');
  if (wallTier) wallTier.innerText = hasCollateral ? (curTierObj.label + " (" + curTierObj.hours + "h/j)") : "Aucun palier activé";
  if (wallColAmount) wallColAmount.innerText = formatCurrency(hasCollateral ? state.collateralLocked : 0);

  try {
    if (typeof renderTransactionsTable === 'function') renderTransactionsTable();
    if (typeof renderReferralTable === 'function') renderReferralTable();
    if (typeof renderDashboardNotifications === 'function') renderDashboardNotifications();
  } catch (e) {
    console.warn('[Scalia] Error rendering tables or notifications:', e);
  }
}

function handleTaskClick(taskType) {
  if (state.isSuspended) {
    showToast("Compte Suspendu", "Votre compte est temporairement suspendu pour non-conformité qualité. Consultez le centre de notifications pour déposer un recours.", true);
    if (typeof openSuspensionModal === 'function') openSuspensionModal();
    return;
  }

  const hasCollateral = state.collateralActive && state.collateralLocked > 0;
  if (!hasCollateral) {
    showToast("Collatéral Requis", "Souscrivez à un palier avec votre collatéral de garantie pour accéder aux exercices rémunérés.", true);
    const gateView = document.getElementById('task-collateral-gate-view');
    const emptyState = document.getElementById('task-empty-state');
    if (gateView) {
      if (emptyState) emptyState.style.display = 'none';
      gateView.style.display = 'block';
      const container = document.getElementById('active-task-container');
      if (window.innerWidth <= 991 && container) container.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
    return;
  }

  if (taskType === 'text' && state.userTier === 'bronze') {
    showToast("Palier Silver Requis", "La correction de textes LLM nécessite le Palier Silver (25 000 FCFA).", true);
    openCollateralModalForTier('silver');
    return;
  }

  if (taskType === 'audit' && ['bronze', 'silver'].includes(state.userTier)) {
    showToast("Palier Gold Requis", "L'audit multi-agents nécessite le Palier Gold (45 000 FCFA).", true);
    openCollateralModalForTier('gold');
    return;
  }

  loadTask(taskType);
}

function clickLockedTask(type) {
  handleTaskClick(type);
}

function loadTask(taskType) {
  currentTask = taskType;
  currentTaskStartTime = Date.now();
  
  document.getElementById('task-empty-state').style.display = 'none';
  const gateView = document.getElementById('task-collateral-gate-view');
  if (gateView) gateView.style.display = 'none';

  document.getElementById('task-success-workspace').style.display = 'none';
  document.getElementById('task-workspace-counter-bar').style.display = 'flex';
  document.getElementById('captcha-workspace').style.display = 'none';
  document.getElementById('video-workspace').style.display = 'none';
  document.getElementById('text-workspace').style.display = 'none';
  document.getElementById('audit-workspace').style.display = 'none';

  state.completedTaskCount++;
  const trackerText = document.getElementById('task-progress-tracker-text');
  const gainIndicator = document.getElementById('task-progress-gain-indicator');

  let bonusLabel = "";
  if (state.userTier === 'platinum') bonusLabel = " (+10% Bonus)";
  else if (state.userTier === 'diamond') bonusLabel = " (+20% Bonus)";

  if (taskType === 'captcha') {
    trackerText.innerText = "Série d'apprentissage CAPTCHA #" + (state.completedTaskCount % 20 + 1) + " sur 20";
    gainIndicator.innerText = "+50 FCFA" + bonusLabel + " / 5 min";
    setupCaptchaTask();
  } else if (taskType === 'video') {
    trackerText.innerText = "Évaluation de Publicité #" + (state.completedTaskCount % 16 + 1) + " sur 16";
    gainIndicator.innerText = "+150 FCFA" + bonusLabel + " / 10 min";
    setupVideoTask();
  } else if (taskType === 'text') {
    trackerText.innerText = "Contrôle LLM d'hallucination #" + (state.completedTaskCount % 18 + 1) + " sur 18";
    gainIndicator.innerText = "+400 FCFA" + bonusLabel + " / 15 min";
    setupTextTask();
  } else if (taskType === 'audit') {
    trackerText.innerText = "Audit Expert Multi-Agents #" + (state.completedTaskCount % 14 + 1) + " sur 14";
    gainIndicator.innerText = "+950 FCFA" + bonusLabel + " / 25 min";
    setupAuditTask();
  }

  const container = document.getElementById('active-task-container');
  if (window.innerWidth <= 991 && container) {
    container.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }
}

function closeActiveTask() {
  const hasCollateral = state.collateralActive && state.collateralLocked > 0;
  const emptyState = document.getElementById('task-empty-state');
  const gateView = document.getElementById('task-collateral-gate-view');

  if (!hasCollateral) {
    if (gateView) gateView.style.display = 'block';
    if (emptyState) emptyState.style.display = 'none';
  } else {
    if (gateView) gateView.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
  }

  const counterBar = document.getElementById('task-workspace-counter-bar');
  if (counterBar) counterBar.style.display = 'none';
  const captchaWs = document.getElementById('captcha-workspace');
  if (captchaWs) captchaWs.style.display = 'none';
  const videoWs = document.getElementById('video-workspace');
  if (videoWs) videoWs.style.display = 'none';
  const textWs = document.getElementById('text-workspace');
  if (textWs) textWs.style.display = 'none';
  const auditWs = document.getElementById('audit-workspace');
  if (auditWs) auditWs.style.display = 'none';
  const successWs = document.getElementById('task-success-workspace');
  if (successWs) successWs.style.display = 'none';
  currentTask = null;

  if (window.innerWidth <= 991) {
    const listPanel = document.getElementById('tasks-list-panel');
    if (listPanel) listPanel.scrollIntoView({ behavior: 'smooth' });
  }
}

function setupCaptchaTask() {
  document.getElementById('captcha-workspace').style.display = 'flex';
  selectedCaptchaCells = [];
  
  const grid = document.getElementById('captcha-grid-images');
  grid.innerHTML = '';

  const bankItem = captchaBank[state.currentCaptchaIdx % captchaBank.length];
  state.currentCaptchaIdx++;

  document.getElementById('captcha-target-label').innerText = "Sélectionnez toutes les cases contenant : " + bankItem.target;

  for (let i = 0; i < 9; i++) {
    const isTarget = Math.random() > 0.5;
    const cell = document.createElement('div');
    cell.className = 'captcha-cell';
    cell.dataset.index = i;
    cell.dataset.isTarget = isTarget;

    const iconClass = isTarget 
      ? bankItem.icon 
      : bankItem.distractorIcons[i % bankItem.distractorIcons.length];

    cell.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2.2rem;color:var(--text-secondary);"><i class="' + iconClass + '"></i></div>';
    
    cell.onclick = () => toggleCaptchaCell(cell, i);
    grid.appendChild(cell);
  }
}

function toggleCaptchaCell(cell, idx) {
  if (selectedCaptchaCells.includes(idx)) {
    selectedCaptchaCells = selectedCaptchaCells.filter(x => x !== idx);
    cell.classList.remove('selected');
  } else {
    selectedCaptchaCells.push(idx);
    cell.classList.add('selected');
  }
}

function submitCaptcha() {
  if (selectedCaptchaCells.length === 0) {
    showToast("Sélection requise", "Veuillez sélectionner au moins une image correspondant au libellé.", true);
    return;
  }

  const allCells = document.querySelectorAll('.captcha-cell');
  let correct = 0;
  let falsePositives = 0;
  let totalTargets = 0;
  allCells.forEach(c => {
    const isTarget = c.dataset.isTarget === 'true';
    const isSelected = c.classList.contains('selected');
    if (isTarget) totalTargets++;
    if (isTarget && isSelected) correct++;
    if (!isTarget && isSelected) falsePositives++;
  });

  let qScore = 12.0;
  if (falsePositives > 0 || correct < totalTargets) {
    const errorCount = falsePositives + (totalTargets - correct);
    if (errorCount === 1) qScore = 9.0;
    else if (errorCount === 2) qScore = 6.0;
    else qScore = 3.0;
  }

  completeTaskSuccess(50, 5, "Validation CAPTCHA", qScore);
}

function setupVideoTask() {
  const ws = document.getElementById('video-workspace');
  if (ws) ws.style.display = 'flex';
  const evalForm = document.getElementById('video-evaluation-form');
  if (evalForm) evalForm.style.display = 'none';
  const playBtn = document.getElementById('video-play-btn-element');
  if (playBtn) playBtn.style.display = 'inline-flex';
  currentVideoRating = null;

  const btnLike = document.getElementById('btn-like-ad');
  const btnDislike = document.getElementById('btn-dislike-ad');
  if (btnLike) btnLike.classList.remove('selected');
  if (btnDislike) btnDislike.classList.remove('selected');

  const bankItem = videoBank[state.currentVideoIdx % videoBank.length];
  state.currentVideoIdx++;

  const spotTitle = document.getElementById('video-spot-title');
  if (spotTitle) spotTitle.innerText = bankItem.title;
  const mockVisual = document.getElementById('mock-video-visual');
  if (mockVisual) mockVisual.style.display = 'flex';
  const mockIcon = document.getElementById('mock-video-icon');
  if (mockIcon) mockIcon.className = bankItem.icon;
  const mockHead = document.getElementById('mock-video-headline');
  if (mockHead) mockHead.innerText = bankItem.headline;
  const mockSub = document.getElementById('mock-video-sub');
  if (mockSub) mockSub.innerText = bankItem.sub;

  const fill = document.getElementById('video-play-bar') || document.getElementById('video-progress-fill');
  const timer = document.getElementById('video-timer-label') || document.getElementById('video-timer-display');
  if (fill) fill.style.width = '0%';
  if (timer) timer.innerText = "0:00 / 0:08";

  if (videoProgressInterval) clearInterval(videoProgressInterval);
}

function playMockVideo() {
  const playBtn = document.getElementById('video-play-btn-element');
  if (playBtn) playBtn.style.display = 'none';

  const fill = document.getElementById('video-play-bar') || document.getElementById('video-progress-fill');
  const timer = document.getElementById('video-timer-label') || document.getElementById('video-timer-display');
  let seconds = 0;
  const totalSec = 8;

  if (fill) fill.style.width = '0%';
  if (timer) timer.innerText = "0:00 / 0:08";

  if (videoProgressInterval) clearInterval(videoProgressInterval);

  videoProgressInterval = setInterval(() => {
    seconds++;
    const pct = Math.min((seconds / totalSec) * 100, 100);
    if (fill) fill.style.width = pct + "%";
    if (timer) timer.innerText = "0:0" + seconds + " / 0:08";

    if (seconds >= totalSec) {
      clearInterval(videoProgressInterval);
      const evalForm = document.getElementById('video-evaluation-form');
      if (evalForm) {
        evalForm.style.display = 'flex';
        evalForm.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, 1000);
}

function rateAdQuality(isLiked) {
  currentVideoRating = isLiked;
  document.getElementById('btn-like-ad').classList.toggle('selected', isLiked);
  document.getElementById('btn-dislike-ad').classList.toggle('selected', !isLiked);
}

function submitVideoEvaluation() {
  if (currentVideoRating === null) {
    showToast("Note requise", "Veuillez cliquer sur J'aime ou Je n'aime pas.", true);
    return;
  }
  const fb = document.getElementById('video-feedback-input') ? document.getElementById('video-feedback-input').value.trim() : '';
  let qScore = 12.0;
  if (!fb || fb.length < 15) {
    qScore = 6.0;
  } else if (fb.length < 30) {
    qScore = 9.5;
  }
  completeTaskSuccess(150, 10, "Évaluation Vidéo Ad", qScore);
}

function setupTextTask() {
  document.getElementById('text-workspace').style.display = 'flex';
  
  const item = textBank[state.currentTextIdx % textBank.length];
  state.currentTextIdx++;

  document.getElementById('text-theme-title').innerText = "Tâche : Correction d'hallucination — " + item.theme;
  document.getElementById('text-hallucination-prompt').innerText = item.wrong;
  document.getElementById('text-tip-label').innerText = "Saisissez la correction factuelle (" + item.tip + ") :";
  document.getElementById('text-correction-input').value = '';
}

function submitTextCorrection() {
  const val = document.getElementById('text-correction-input').value.trim();
  if (val.length < 15) {
    showToast("Correction trop courte", "Veuillez rédiger une correction factuelle détaillée (au moins 15 caractères).", true);
    return;
  }
  let qScore = 12.0;
  if (val.length < 25) qScore = 8.5;
  else if (val.length < 40) qScore = 10.5;
  else qScore = 12.0;

  completeTaskSuccess(400, 15, "Correction LLM", qScore);
}

function setupAuditTask() {
  document.getElementById('audit-workspace').style.display = 'flex';
  
  const item = auditBank[state.currentAuditIdx % auditBank.length];
  state.currentAuditIdx++;

  document.getElementById('audit-theme-title').innerText = "Audit Expert : " + item.theme;
  document.getElementById('audit-user-msg').innerText = item.userMsg;
  document.getElementById('audit-ai-msg').innerText = item.aiMsg;
  document.getElementById('audit-feedback-input').value = '';
}

function submitAudit() {
  const fb = document.getElementById('audit-feedback-input').value.trim();
  if (fb.length < 10) {
    showToast("Justification requise", "Veuillez justifier votre audit technique (au moins 10 caractères).", true);
    return;
  }
  const selectedRadio = document.querySelector('input[name="audit-rating"]:checked');
  const isCorrectDiagnosed = selectedRadio && selectedRadio.value === 'hallucination';
  let qScore = isCorrectDiagnosed ? 12.0 : 6.0;
  if (fb.length < 20) qScore = Math.max(3.0, qScore - 2.5);

  completeTaskSuccess(950, 25, "Audit Multi-Agents", qScore);
}

function completeTaskSuccess(payout, minutes, label, qualityScore = 12.0) {
  let finalPayout = payout;
  let bonusMsg = "";

  if (state.userTier === 'platinum') {
    finalPayout = Math.round(payout * 1.10);
    bonusMsg = " (+10% Bonus Platinum)";
  } else if (state.userTier === 'diamond') {
    finalPayout = Math.round(payout * 1.20);
    bonusMsg = " (+20% Bonus Diamond Plein Temps)";
  }

  // Measure Real Human Attention / Diligence Time
  const elapsedSec = Math.max(1, Math.round((Date.now() - currentTaskStartTime) / 1000));
  let timeScore = 8.0;
  let isRushed = false;
  if (elapsedSec < 3) {
    timeScore = 2.0;
    isRushed = true;
  } else if (elapsedSec < 6) {
    timeScore = 5.0;
  }

  // Update Moving Average Trainer Rating (/ 20)
  state.evaluatedTasksCount = (state.evaluatedTasksCount || 0) + 1;
  const currentTaskRating = Math.max(0, Math.min(20, qualityScore + timeScore));

  if (state.evaluatedTasksCount === 1) {
    state.ratingQuality = qualityScore;
    state.ratingTime = timeScore;
    state.trainerRating = currentTaskRating;
  } else {
    // 70% previous grade retention + 30% current task evaluation
    state.ratingQuality = Math.round(((state.ratingQuality * 0.7) + (qualityScore * 0.3)) * 10) / 10;
    state.ratingTime = Math.round(((state.ratingTime * 0.7) + (timeScore * 0.3)) * 10) / 10;
    state.trainerRating = Math.max(0, Math.min(20, Math.round((state.ratingQuality + state.ratingTime) * 10) / 10));
  }

  // Check Quality Warnings & Account Suspension (< 10/20 threshold)
  if (state.trainerRating < 10.0) {
    state.warningsCount = (state.warningsCount || 0) + 1;
    if (state.warningsCount === 1) {
      showToast("Avertissement Qualité (1/3)", "Votre note est descendue à " + state.trainerRating.toFixed(1) + "/20. Prenez le temps de soigner vos validations pour éviter une suspension de compte.", true);
    } else if (state.warningsCount === 2) {
      showToast("Dernier Avertissement (2/3)", "Attention : une nouvelle évaluation insuffisante provoquera la suspension temporaire de votre compte.", true);
    } else if (state.warningsCount >= 3 || state.trainerRating < 6.0) {
      state.isSuspended = true;
      showToast("Compte Suspendu", "Votre compte a été suspendu pour non-conformité qualité répétée. Consultez le centre de notifications pour déposer un recours.", true);
      if (typeof openSuspensionModal === 'function') {
        setTimeout(openSuspensionModal, 1000);
      }
    }
  } else if (state.trainerRating >= 15.0 && state.warningsCount > 0) {
    // Progressive forgiveness for high quality diligence
    state.warningsCount = Math.max(0, state.warningsCount - 1);
  }

  state.balance += finalPayout;
  state.dailyEarnings += finalPayout;
  state.dailyTime += minutes;

  state.transactions.unshift({
    date: getCurrentDate(),
    type: label + bonusMsg,
    amount: finalPayout,
    status: 'Complété',
    method: 'Console Entraîneur'
  });

  saveSessionToLocalStorage();
  updateNavigationBars();
  refreshUI();

  document.getElementById('captcha-workspace').style.display = 'none';
  document.getElementById('video-workspace').style.display = 'none';
  document.getElementById('text-workspace').style.display = 'none';
  document.getElementById('audit-workspace').style.display = 'none';

  const overlay = document.getElementById('task-success-workspace');
  let rushedNote = isRushed ? " ⚠️ Attention : validation trop rapide enregistrée." : "";
  document.getElementById('task-success-payout-text').innerText = "+" + finalPayout + " FCFA crédités sur votre portefeuille" + bonusMsg + " (+" + minutes + " min de quota). Note actuelle : " + state.trainerRating.toFixed(1) + "/20." + rushedNote;
  overlay.style.display = 'flex';

  showToast("Tâche Validée", "+" + finalPayout + " FCFA ajoutés • Note: " + state.trainerRating.toFixed(1) + "/20");
}

function loadNextTask() {
  if (currentTask) {
    loadTask(currentTask);
  } else {
    closeActiveTask();
  }
}
