// Mock data for the portfolio

export const personalInfo = {
  name: "Lucas",
  title: "Étudiant en Mécanique",
  bio: "Passionné par la moto et la mécanique, je suis actuellement en première année de mécanique. J'aime comprendre comment les choses fonctionnent et créer des projets innovants.",
  email: "lucas@lcsmrct.fr",
  phone: "+33 6 12 34 56 78",
  location: "France",
  avatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5MPC90ZXh0Pgo8L3N2Zz4=",
  social: {
    github: "https://github.com/lucas",
    linkedin: "https://linkedin.com/in/lucas",
    twitter: "https://twitter.com/lucas"
  }
};

export const skills = [
  {
    category: "Mécanique",
    technologies: [
      { name: "Moteurs 2 temps", level: 85 },
      { name: "Moteurs 4 temps", level: 80 },
      { name: "Transmission", level: 75 },
      { name: "Freinage", level: 70 },
      { name: "Suspension", level: 65 }
    ]
  },
  {
    category: "Outils",
    technologies: [
      { name: "Clés et douilles", level: 95 },
      { name: "Multimètre", level: 85 },
      { name: "Tournevis", level: 90 },
      { name: "Clé dynamométrique", level: 80 },
      { name: "Compresseur", level: 75 }
    ]
  },
  {
    category: "Tech",
    technologies: [
      { name: "HTML/CSS", level: 70 },
      { name: "JavaScript", level: 60 },
      { name: "Python", level: 50 },
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
    liveUrl: "https://moto-project.com",
    status: "En cours"
  },
  {
    id: 2,
    title: "Système d'Allumage Arduino",
    description: "Création d'un système d'allumage électronique programmable avec Arduino pour moto custom",
    technologies: ["Arduino", "C++", "Électronique", "Capteurs"],
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMDA3RkZGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkFyZHVpbm88L3RleHQ+Cjwvc3ZnPg==",
    githubUrl: "https://github.com/lucas/arduino-ignition",
    liveUrl: "https://arduino-ignition.com",
    status: "Terminé"
  },
  {
    id: 3,
    title: "Banc de Test Moteur",
    description: "Construction d'un banc de test pour mesurer les performances des moteurs 2 temps",
    technologies: ["Mécanique", "Mesure", "Analyse", "Fabrication"],
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMTBCOTgxIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJhbmMgVGVzdDwvdGV4dD4KPC9zdmc+",
    githubUrl: "https://github.com/lucas/engine-test",
    liveUrl: "https://engine-test.com",
    status: "En cours"
  },
  {
    id: 4,
    title: "Site Web Portfolio",
    description: "Création de ce portfolio interactif avec des jeux intégrés et design iPhone",
    technologies: ["React", "JavaScript", "CSS", "HTML"],
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjOEI1Q0Y2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlBvcnRmb2xpbzwvdGV4dD4KPC9zdmc+",
    githubUrl: "https://github.com/lucas/portfolio",
    liveUrl: "https://lucas-portfolio.com",
    status: "En cours"
  }
];

export const experience = [
  {
    company: "TechStart Solutions",
    position: "Développeur Full Stack Senior",
    period: "2022 - Présent",
    description: "Développement d'applications web complexes, mentorat d'équipe, architecture microservices",
    technologies: ["React", "Node.js", "AWS", "MongoDB"]
  },
  {
    company: "Digital Agency Pro",
    position: "Développeur Frontend",
    period: "2020 - 2022",
    description: "Création d'interfaces utilisateur modernes, optimisation des performances, intégration API",
    technologies: ["Vue.js", "SCSS", "Webpack", "REST API"]
  },
  {
    company: "Innovation Labs",
    position: "Développeur Junior",
    period: "2019 - 2020",
    description: "Développement de prototypes, maintenance de code legacy, apprentissage des bonnes pratiques",
    technologies: ["JavaScript", "PHP", "MySQL", "Git"]
  }
];

export const education = [
  {
    degree: "Master en Informatique",
    school: "École Supérieure d'Informatique",
    period: "2017 - 2019",
    description: "Spécialisation en développement web et intelligence artificielle"
  },
  {
    degree: "Licence en Informatique",
    school: "Université Paris-Saclay",
    period: "2014 - 2017",
    description: "Formation générale en informatique et mathématiques"
  }
];

export const certificates = [
  {
    name: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialId: "AWS-123456"
  },
  {
    name: "React Developer Certification",
    issuer: "Meta",
    date: "2022",
    credentialId: "META-789012"
  },
  {
    name: "MongoDB Developer",
    issuer: "MongoDB University",
    date: "2022",
    credentialId: "MONGO-345678"
  }
];

export const gameScores = {
  snake: {
    highScore: 1250,
    games: [
      { score: 1250, date: "2024-01-15" },
      { score: 980, date: "2024-01-14" },
      { score: 750, date: "2024-01-13" }
    ]
  },
  agar: {
    highScore: 8500,
    games: [
      { score: 8500, date: "2024-01-15" },
      { score: 6200, date: "2024-01-14" },
      { score: 4800, date: "2024-01-13" }
    ]
  }
};