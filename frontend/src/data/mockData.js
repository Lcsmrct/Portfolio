// Mock data for the portfolio

export const personalInfo = {
  name: "Alex Morgan",
  title: "Développeur Full Stack",
  bio: "Passionné par la création d'expériences numériques innovantes, je combine créativité et expertise technique pour donner vie à des projets exceptionnels.",
  email: "alex.morgan@example.com",
  phone: "+33 6 12 34 56 78",
  location: "Paris, France",
  avatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BTTwvdGV4dD4KPC9zdmc+",
  social: {
    github: "https://github.com/alexmorgan",
    linkedin: "https://linkedin.com/in/alexmorgan",
    twitter: "https://twitter.com/alexmorgan"
  }
};

export const skills = [
  {
    category: "Frontend",
    technologies: [
      { name: "React", level: 95 },
      { name: "Vue.js", level: 85 },
      { name: "TypeScript", level: 90 },
      { name: "CSS/SCSS", level: 95 },
      { name: "Tailwind", level: 90 }
    ]
  },
  {
    category: "Backend",
    technologies: [
      { name: "Node.js", level: 90 },
      { name: "Python", level: 85 },
      { name: "FastAPI", level: 80 },
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 80 }
    ]
  },
  {
    category: "Outils",
    technologies: [
      { name: "Git", level: 95 },
      { name: "Docker", level: 85 },
      { name: "AWS", level: 75 },
      { name: "Figma", level: 80 },
      { name: "Webpack", level: 70 }
    ]
  }
];

export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Plateforme e-commerce complète avec panier, paiement Stripe et gestion des commandes",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMUY2MEY5Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkUtQ29tbWVyY2U8L3RleHQ+Cjwvc3ZnPg==",
    githubUrl: "https://github.com/alexmorgan/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
    status: "Terminé"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Application de gestion de tâches collaborative avec notifications en temps réel",
    technologies: ["Vue.js", "Socket.io", "Express", "PostgreSQL"],
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMTBCOTgxIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlRhc2sgTWFuYWdlcjwvdGV4dD4KPC9zdmc+",
    githubUrl: "https://github.com/alexmorgan/taskmanager",
    liveUrl: "https://taskmanager-demo.com",
    status: "En cours"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Dashboard météo avec prévisions, cartes interactives et alertes personnalisées",
    technologies: ["React", "D3.js", "OpenWeather API", "Tailwind"],
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkY3RjAwIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPldlYXRoZXIgQXBwPC90ZXh0Pgo8L3N2Zz4=",
    githubUrl: "https://github.com/alexmorgan/weather",
    liveUrl: "https://weather-demo.com",
    status: "Terminé"
  },
  {
    id: 4,
    title: "AI Chat Assistant",
    description: "Assistant conversationnel IA avec interface moderne et intégration GPT",
    technologies: ["React", "OpenAI API", "FastAPI", "WebSockets"],
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjOEI1Q0Y2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkFJIENoYXQ8L3RleHQ+Cjwvc3ZnPg==",
    githubUrl: "https://github.com/alexmorgan/ai-chat",
    liveUrl: "https://ai-chat-demo.com",
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