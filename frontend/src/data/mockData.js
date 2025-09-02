// Mock data for the portfolio

export const personalInfo = {
  name: "L.Webmaker",
  title: "Créateur de Sites Web",
  bio: "Spécialisé dans la création de sites web modernes et professionnels. Je transforme vos idées en présence digitale percutante avec des designs sur-mesure et une expérience utilisateur optimale.",
  email: "contact@lwebmaker.fr",
  phone: "+33 06 06 06 06 06",
  location: "France",
  avatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjMUUzQThBIi8+Cjx0ZXh0IHg9IjQ1IiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5MPC90ZXh0Pgo8Y2lyY2xlIGN4PSI2NSIgY3k9IjQ1IiByPSIzIiBmaWxsPSIjNjBBNUZBIi8+Cjwvc3ZnPg==",
  social: {
    instagram: "https://instagram.com/Lwebmaker",
    website: "https://lwebmaker.fr",
    email: "contact@lwebmaker.fr"
  }
};

export const skills = [
  {
    category: "Mécanique",
    technologies: [
      { name: "EN COURS", level: 85 },
      { name: "EN COURS", level: 85 },
      { name: "EN COURS", level: 85 },
      { name: "EN COURS", level: 85 },
      { name: "EN COURS", level: 85 },
    ]
  },
  {
    category: "Outils",
    technologies: [
      { name: "EN COURS", level: 85 },
      { name: "EN COURS", level: 85 },
      { name: "EN COURS", level: 85 },
      { name: "EN COURS", level: 85 },
      { name: "EN COURS", level: 85 },
    ]
  },
  {
    category: "Tech",
    technologies: [
      { name: "HTML/CSS", level: 70 },
      { name: "JavaScript", level: 60 },
      { name: "Python", level: 30 },
      { name: "Git", level: 55 },
      { name: "Arduino", level: 45 }
    ]
  }
];

export const projects = [
  {
    id: 1,
    title: "Restauration Moto 125",
    description: "Projet de restauration complète d'une moto 125cc avec remise en état du moteur et des pièces",
    technologies: ["Mécanique", "Électronique", "Carrosserie", "Peinture"],
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkY0NTAwIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk1vdG8gMTI1PC90ZXh0Pgo8L3N2Zz4=",
    githubUrl: "https://github.com/lucas/moto-restoration",
    liveUrl: "https://moto.lcsmrct.fr",
    status: "En cours"
  },
  {
    id: 2,
    title: "Système d'Allumage Arduino",
    description: "Création d'un système d'allumage électronique programmable avec Arduino pour moto custom",
    technologies: ["Arduino", "C++", "Électronique", "Capteurs"],
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMDA3RkZGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkFyZHVpbm88L3RleHQ+Cjwvc3ZnPg==",
    githubUrl: "https://github.com/",
    liveUrl: "https://arduino.lcsmrct.fr",
    status: "Terminé"
  },
  {
    id: 3,
    title: "Application Révision code de la route",
    description: "Site internet permettant d'apprendre / réviser le code de la route Gratuitement",
    technologies: ["Mécanique", "Mesure", "Analyse", "Fabrication"],
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMTBCOTgxIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJhbmMgVGVzdDwvdGV4dD4KPC9zdmc+",
    githubUrl: "https://github.com/t",
    liveUrl: "https://code.lcsmrct.fr",
    status: "En cours"
  },
  {
    id: 4,
    title: "Site Web Portfolio",
    description: "Création de ce portfolio interactif avec des jeux intégrés et design iPhone",
    technologies: ["React", "JavaScript", "CSS", "HTML"],
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjOEI1Q0Y2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlBvcnRmb2xpbzwvdGV4dD4KPC9zdmc+",
    githubUrl: "https://github.com/lucas/portfolio",
    liveUrl: "https://lcsmrct.fr",
    status: "En cours"
  }
];

export const experience = [
  {
    company: "Lycée Modeste leroy",
    position: "Seconde professionel Mécanique",
    period: "2024-2025",
    description: "Formation en mécanique automobile",
    technologies: ["Mécanique", "Diagnostic", "Réparation"]
  },
  {
    company: "Garage Renault Pontchartrain",
    position: "Stagiaire Mécanicien",
    period: "Mai 2023",
    description: "Stage d'observation et d'initiation aux techniques de réparation",
    technologies: ["Entretien", "Réparation", "Outils", "Diagnostic"]
  },
  {
    company: "Projet Personnel",
    position: "Restauration Moto",
    period: "2022 - Présent",
    description: "Restauration complète d'une moto 125cc, apprentissage autodidacte des techniques de mécanique",
    technologies: ["Démontage", "Remontage", "Peinture", "Électronique"]
  }
];

export const education = [
  {
    degree: "Seconde Bac Pro Mécanique",
    school: "Lycée Modeste leroy",
    period: "2024-2025",
    description: "Formation en mécanique automobile"
  }
];

export const certificates = [
  {
    name: "Certification Pix",
    issuer: "College Jean Claude Dauphin",
    date: "2023",
    credentialId: "SEC-2023-001"
  },
  {
    name: "Certification Evalang",
    issuer: "College Jean Claude Dauphin",
    date: "2023",
    credentialId: "PSC1-2023-456"
  },
  {
    name: "Brevet des collèges",
    issuer: "Collège Jean Claude Dauphin",
    date: "2024",
    credentialId: "JSP ENCORE"
  }
];

export const gameScores = {
  snake: {
    highScore: 450,
    games: [
      { score: 450, date: "2024-01-15" },
      { score: 320, date: "2024-01-14" },
      { score: 180, date: "2024-01-13" }
    ]
  },
  agar: {
    highScore: 2800,
    games: [
      { score: 2800, date: "2024-01-15" },
      { score: 1900, date: "2024-01-14" },
      { score: 1200, date: "2024-01-13" }
    ]
  },
  tetris: {
    highScore: 8500,
    games: [
      { score: 8500, date: "2024-01-15" },
      { score: 5200, date: "2024-01-14" },
      { score: 3400, date: "2024-01-13" }
    ]
  },
  pong: {
    highScore: 8,
    games: [
      { score: 8, date: "2024-01-15" },
      { score: 6, date: "2024-01-14" },
      { score: 4, date: "2024-01-13" }
    ]
  },
  flappy: {
    highScore: 25,
    games: [
      { score: 25, date: "2024-01-15" },
      { score: 18, date: "2024-01-14" },
      { score: 12, date: "2024-01-13" }
    ]
  },
  breakout: {
    highScore: 3400,
    games: [
      { score: 3400, date: "2024-01-15" },
      { score: 2100, date: "2024-01-14" },
      { score: 1500, date: "2024-01-13" }
    ]
  }
};