import React from 'react';
import { MapPin, Mail, Phone, Instagram } from 'lucide-react';
import { personalInfo } from '../data/mockData';

const HomeScreen = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
                {personalInfo.name}
              </h1>
              <p className="text-2xl md:text-4xl text-blue-400 mb-8 font-light">
                {personalInfo.title}
              </p>
            </div>
            
            {/* Bio */}
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-16 font-light">
              {personalInfo.bio}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <a 
                href="https://instagram.com/Lwebmaker"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg text-lg group"
              >
                <span>Démarrer mon projet</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <button 
                onClick={() => document.querySelector('#services').scrollIntoView({behavior: 'smooth'})}
                className="inline-flex items-center border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-lg"
              >
                Voir mes services
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Développement Rapide</h3>
                <p className="text-gray-400">Sites livrés en 3 à 7 jours maximum</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Qualité Garantie</h3>
                <p className="text-gray-400">100% des clients satisfaits de leur site</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Design Responsive</h3>
                <p className="text-gray-400">Parfait sur mobile, tablette et desktop</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 hover:bg-gray-800/40 transition-all duration-300">
                <div className="text-5xl font-bold text-blue-400 mb-3">50+</div>
                <div className="text-gray-300 text-xl">Sites créés</div>
              </div>
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 hover:bg-gray-800/40 transition-all duration-300">
                <div className="text-5xl font-bold text-green-400 mb-3">100%</div>
                <div className="text-gray-300 text-xl">Clients satisfaits</div>
              </div>
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 hover:bg-gray-800/40 transition-all duration-300">
                <div className="text-5xl font-bold text-purple-400 mb-3">3-7j</div>
                <div className="text-gray-300 text-xl">Délai moyen</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border-t border-gray-700/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Prêt à créer votre site ?</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Contactez-moi dès maintenant pour discuter de votre projet et obtenir un devis personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="https://instagram.com/Lwebmaker"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg text-lg group"
            >
              <Instagram size={20} className="mr-3" />
              <span>Instagram @Lwebmaker</span>
            </a>
            <a 
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-lg group"
            >
              <Mail size={20} className="mr-3" />
              <span>Email professionnel</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;