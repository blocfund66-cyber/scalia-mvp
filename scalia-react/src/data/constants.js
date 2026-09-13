// constants.js - Paramètres et données de référence pour Scalia

export const tierParams = {
  bronze: {
    time: 120,
    collateral: 15000,
    salaryText: '30 000 - 50 000 FCFA',
    shortSalary: '30k - 50k',
    hours: 2,
    label: 'Bronze'
  },
  silver: {
    time: 180,
    collateral: 25000,
    salaryText: '70 000 - 120 000 FCFA',
    shortSalary: '70k - 120k',
    hours: 3,
    label: 'Silver'
  },
  gold: {
    time: 240,
    collateral: 45000,
    salaryText: '130 000 - 180 000 FCFA',
    shortSalary: '130k - 180k',
    hours: 4,
    label: 'Gold'
  },
  platinum: {
    time: 360,
    collateral: 75000,
    salaryText: '190 000 - 250 000 FCFA',
    shortSalary: '190k - 250k',
    hours: 6,
    label: 'Platinum'
  },
  diamond: {
    time: 480,
    collateral: 100000,
    salaryText: '280 000 - 350 000 FCFA',
    shortSalary: '280k - 350k',
    hours: 8,
    label: 'Diamond'
  }
};

export const partnersList = [
  { name: "OpenAI", role: "Titans IA", icon: "ri-brain-line" },
  { name: "Anthropic", role: "Titans IA", icon: "ri-cpu-line" },
  { name: "Mistral AI", role: "Titans IA", icon: "ri-sparkling-line" },
  { name: "Google DeepMind", role: "Titans IA", icon: "ri-google-line" },
  { name: "Hugging Face", role: "Titans IA", icon: "ri-robot-line" },
  { name: "Scale AI", role: "Titans IA", icon: "ri-bar-chart-grouped-line" },
  { name: "Cohere", role: "Titans IA", icon: "ri-terminal-box-line" },
  { name: "Kili Technology", role: "Annotation", icon: "ri-price-tag-3-line" },
  { name: "AfriNLP Labs", role: "Langues Africaines", icon: "ri-earth-line" },
  { name: "Labelbox", role: "Data Engine", icon: "ri-box-3-line" },
  { name: "Neuropulse AI", role: "Vision Médicale", icon: "ri-heart-pulse-line" },
  { name: "Baobab DataWorks", role: "Datasets Régionaux", icon: "ri-database-2-line" },
  { name: "Cognitio Research", role: "Audit Multi-Agents", icon: "ri-shield-check-line" },
  { name: "Synthetix Vision", role: "Véhicules Autonomes", icon: "ri-car-line" },
  { name: "DataWeave", role: "E-Commerce IA", icon: "ri-shopping-cart-line" },
  { name: "Turing Data Hub", role: "Workforce Cloud", icon: "ri-cloud-line" },
  { name: "Voxellence AI", role: "Reconnaissance Vocale", icon: "ri-mic-line" }
];

export const teamMembers = [
  {
    name: "Alexandre Moreau",
    role: "CEO & Co-fondateur",
    desc: "Ex-Scale AI & Polytechnique. 12 ans d'expérience dans l'orchestration des données d'entraînement pour modèles de fondation.",
    image: "/assets/team_alexandre_ceo.jpg"
  },
  {
    name: "Dr. Claire Dumont",
    role: "Directrice Recherche IA & RLHF",
    desc: "Docteure INRIA, spécialiste de l'alignement éthique et des protocoles de renforcement par feedback humain (RLHF).",
    image: "/assets/team_claire_cto.jpg"
  },
  {
    name: "Babacar Ndiaye",
    role: "VP Opérations & Workforce Afrique",
    desc: "Diplômé Télécom Paris, architecte du déploiement des hubs de labellisation à Dakar, Douala, Abidjan et Kigali.",
    image: "/assets/team_malik_ops.jpg"
  },
  {
    name: "Julien Vasseur",
    role: "Directeur Ingénierie & Cloud",
    desc: "Ancien Lead Architecte chez Mistral AI, responsable de la scalabilité et du chiffrement séquestre des collatéraux.",
    image: "/assets/team_julien_eng.jpg"
  },
  {
    name: "Sophie Lefebvre",
    role: "Responsable Qualité & Éthique",
    desc: "Experte en gouvernance de données et validation de conformité des datasets multimodaux pour l'IA générative.",
    image: "/assets/team_sophie_ethics.jpg"
  },
  {
    name: "Aïssatou Diallo",
    role: "Lead Communauté & Succès Entraîneurs",
    desc: "Pionnière de l'inclusion numérique en Afrique francophone, dédiée à l'accompagnement et l'avancement des dresseurs.",
    image: "/assets/team_aissatou_community.jpg"
  }
];

export const captchaBank = [
  {
    target: "des feux de circulation",
    fullTarget: "Feux de circulation et feux tricolores",
    targetIndices: [1, 4, 7],
    images: [
      "/assets/captcha/crosswalk_1.jpg",
      "/assets/captcha/traffic_light_1.jpg",
      "/assets/captcha/cars_1.jpg",
      "/assets/captcha/bus_1.jpg",
      "/assets/captcha/traffic_light_2.jpg",
      "/assets/captcha/fire_hydrant_1.jpg",
      "/assets/captcha/bicycle_1.jpg",
      "/assets/captcha/traffic_light_3.jpg",
      "/assets/captcha/storefront_1.jpg"
    ]
  },
  {
    target: "des passages piétons",
    fullTarget: "Passages piétons et zones piétonnes",
    targetIndices: [0, 4, 7],
    images: [
      "/assets/captcha/crosswalk_1.jpg",
      "/assets/captcha/traffic_light_2.jpg",
      "/assets/captcha/cars_2.jpg",
      "/assets/captcha/storefront_1.jpg",
      "/assets/captcha/crosswalk_2.jpg",
      "/assets/captcha/bus_2.jpg",
      "/assets/captcha/fire_hydrant_1.jpg",
      "/assets/captcha/crosswalk_1.jpg",
      "/assets/captcha/bicycle_1.jpg"
    ]
  },
  {
    target: "des autobus",
    fullTarget: "Autobus et transports en commun",
    targetIndices: [2, 5, 8],
    images: [
      "/assets/captcha/cars_1.jpg",
      "/assets/captcha/traffic_light_1.jpg",
      "/assets/captcha/bus_1.jpg",
      "/assets/captcha/crosswalk_2.jpg",
      "/assets/captcha/storefront_1.jpg",
      "/assets/captcha/bus_2.jpg",
      "/assets/captcha/fire_hydrant_1.jpg",
      "/assets/captcha/bicycle_1.jpg",
      "/assets/captcha/bus_1.jpg"
    ]
  },
  {
    target: "des voitures et véhicules",
    fullTarget: "Véhicules automobiles et voitures",
    targetIndices: [1, 3, 7],
    images: [
      "/assets/captcha/fire_hydrant_1.jpg",
      "/assets/captcha/cars_1.jpg",
      "/assets/captcha/traffic_light_3.jpg",
      "/assets/captcha/cars_2.jpg",
      "/assets/captcha/bus_2.jpg",
      "/assets/captcha/crosswalk_1.jpg",
      "/assets/captcha/bicycle_1.jpg",
      "/assets/captcha/cars_1.jpg",
      "/assets/captcha/storefront_1.jpg"
    ]
  }
];

export const videoBank = [
  {
    title: "Évaluez la pertinence : Campagne PaySafe Mobile Money",
    headline: "Transfert d'argent instantané & sans frais",
    sub: "Spot publicitaire fintech mobile (8s)",
    icon: "ri-smartphone-line"
  },
  {
    title: "Évaluez la clarté : Application Santé Téléconsultation",
    headline: "Votre médecin spécialiste disponible 24/7",
    sub: "Campagne vidéo e-santé Afrique (8s)",
    icon: "ri-heart-pulse-line"
  },
  {
    title: "Évaluez l'impact : Livraison Express E-Commerce",
    headline: "Livraison en 30 minutes dans votre quartier",
    sub: "Publicité application de logistique urbaine (8s)",
    icon: "ri-e-bike-2-line"
  },
  {
    title: "Évaluez la conversion : AgriTech Irrigation Solaire",
    headline: "Doublez vos rendements agricoles avec l'IA prédictive",
    sub: "Spot d'innovation agricole durable (8s)",
    icon: "ri-plant-line"
  }
];

export const textBank = [
  {
    theme: "Géographie Africaine",
    wrong: "\"Le mont Cameroun est un volcan actif situé en Afrique de l'Ouest, culminant à 8 500 mètres d'altitude, ce qui en fait le plus haut sommet d'Afrique.\"",
    tip: "Altitude réelle ~4 095m, Afrique centrale, le Kilimandjaro (5 895m) est le plus haut sommet d'Afrique."
  },
  {
    theme: "Histoire & Indépendances",
    wrong: "\"Le Sénégal a proclamé son indépendance le 14 juillet 1789 sous la présidence de Nelson Mandela.\"",
    tip: "Indépendance proclamée en 1960, premier président : Léopold Sédar Senghor."
  },
  {
    theme: "Sciences & Physique",
    wrong: "\"La vitesse de la lumière dans le vide est de 30 000 kilomètres par heure, découverte par Isaac Newton avec une loupe en 1890.\"",
    tip: "La vitesse de la lumière est d'environ 300 000 km/s (soit ~1 milliard de km/h)."
  },
  {
    theme: "Économie & Monnaies Régionales",
    wrong: "\"Le Franc CFA de la CEMAC et celui de l'UEMOA sont émis par la même banque centrale unique basée à Tokyo.\"",
    tip: "La CEMAC est gérée par la BEAC (Yaoundé) et l'UEMOA par la BCEAO (Dakar)."
  }
];

export const auditBank = [
  {
    theme: "Optimisation de Requêtes SQL & Indexation",
    userMsg: "Comment optimiser une requête SQL de jointure lente comportant 2 millions de lignes ?",
    aiMsg: "Pour optimiser une jointure, vous devez utiliser l'opérateur ORDER BY sur toutes les tables sans condition WHERE, et supprimer les index pour accélérer la lecture brute des disques.",
    defaultDiag: "hallucination"
  },
  {
    theme: "Architecture Distribuée & Cohérence des Soldes",
    userMsg: "Dans une architecture microservices, comment garantir la cohérence des soldes bancaires entre le service Paiement et le service Portefeuille ?",
    aiMsg: "Évitez toute transaction ACID et écrivez les soldes dans un fichier texte partagé sur Dropbox sans aucun système de verrouillage (locking).",
    defaultDiag: "hallucination"
  },
  {
    theme: "Smart Contracts Ethereum & Sécurité",
    userMsg: "Comment protéger ma fonction de retrait Solidity contre les attaques de réentrance (Reentrancy attack) ?",
    aiMsg: "Envoyez l'ether au contrat tiers avant de mettre à jour le solde interne de l'utilisateur, cela garantit que la blockchain valide le transfert en premier.",
    defaultDiag: "hallucination"
  },
  {
    theme: "IA Médicale & Diagnostic Assisté",
    userMsg: "Quels sont les paramètres vitaux prioritaires à évaluer lors d'une suspicion de choc septique aux urgences ?",
    aiMsg: "Prescrivez immédiatement 4 tasses de thé vert chaud et attendez 48 heures avant de mesurer la tension artérielle ou la saturation en oxygène.",
    defaultDiag: "hallucination"
  }
];

export const ScaliaPaymentConfig = {
  paymentLinks: {
    bronze: 'https://pay.reeserva.com/en/pay/cmtxnxrpa007n06om9zakp7wl',
    silver: 'https://pay.reeserva.com/en/pay/cmtxnw9ae007m06om34wpmgro',
    gold: 'https://pay.reeserva.com/en/pay/cmtxnuxn3007l06omrryt60lw',
    platinum: 'https://pay.reeserva.com/en/pay/cmtxntd78007k06omfg2s11az',
    diamond: 'https://pay.reeserva.com/en/pay/cmtxnrow7007j06ome19gczyx'
  }
};
