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

export const services = [
  {
    id: 1,
    title: "Site Vitrine",
    price: "50€",
    description: "Site simple et professionnel, parfait pour présenter votre activité en ligne avec élégance.",
    features: [
      "Design professionnel et moderne",
      "1 à 3 pages optimisées",
      "Responsive (mobile + desktop)", 
      "Optimisation SEO de base",
      "Livraison en 3-5 jours"
    ],
    icon: "🌐",
    popular: false
  },
  {
    id: 2,
    title: "Site Avancé", 
    price: "70€",
    description: "Solution complète avec fonctionnalités étendues, idéale pour des besoins plus complexes.",
    features: [
      "Tout du site vitrine",
      "Pages illimitées",
      "Fonctionnalités personnalisées",
      "Formulaires de contact avancés",
      "Analytics et suivi intégrés",
      "Support prioritaire"
    ],
    icon: "🚀",
    popular: true
  }
];

export const faqData = [
  {
    id: 1,
    question: "Quels sont les délais de livraison d'un site ?",
    answer: "En moyenne 3 à 7 jours selon la complexité. Site vitrine : 3-5 jours, Site avancé : 5-7 jours. Je vous tiens informé à chaque étape du processus."
  },
  {
    id: 2,
    question: "Que comprend l'offre 'Site vitrine' ?",
    answer: "Un site simple de 1 à 3 pages avec design personnalisé, optimisation mobile, référencement de base et intégration de vos contenus. Parfait pour présenter votre activité."
  },
  {
    id: 3,
    question: "Que comprend l'offre 'Site avancé' ?",
    answer: "Toutes les fonctionnalités du site vitrine + pages illimitées, fonctionnalités personnalisées, formulaires avancés, analytics intégrés et support prioritaire."
  },
  {
    id: 4,
    question: "Fournissez-vous une maintenance après livraison ?",
    answer: "Oui, options de maintenance disponibles sur demande. Support gratuit pendant 1 mois après livraison pour corrections éventuelles."
  },
  {
    id: 5,
    question: "Comment se passe le paiement ?",
    answer: "Paiement sécurisé avec acompte de 50% avant le lancement du projet, puis solde à la livraison. Paiement par virement ou PayPal."
  },
  {
    id: 6,
    question: "Puis-je modifier mon site après livraison ?",
    answer: "Absolument ! Je vous forme à la gestion de base et propose des modifications supplémentaires à tarif préférentiel."
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Marie Laurent",
    business: "Boutique Mode",
    text: "Site magnifique et livré dans les temps ! Mes ventes en ligne ont explosé.",
    rating: 5
  },
  {
    id: 2,
    name: "Thomas Dubois", 
    business: "Restaurant",
    text: "Très professionnel, à l'écoute et prix très correct. Je recommande !",
    rating: 5
  },
  {
    id: 3,
    name: "Sophie Martin",
    business: "Coach Sportif",
    text: "Parfait pour présenter mon activité, design moderne et responsive.",
    rating: 5
  }
];