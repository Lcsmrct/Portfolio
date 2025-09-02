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
            {/* Profile Image */}
            <div className="relative mb-8 inline-block">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 p-1 shadow-2xl">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center">
                <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              {personalInfo.name}
            </h1>
            <p className="text-2xl md:text-3xl text-blue-400 mb-6">
              {personalInfo.title}
            </p>
            
            {/* Location */}
            <div className="flex items-center justify-center text-gray-400 mb-8">
              <MapPin size={20} className="mr-2" />
              <span className="text-lg">{personalInfo.location}</span>
            </div>
            
            {/* Bio */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
              {personalInfo.bio}
            </p>
            
            {/* CTA Button */}
            <div className="mb-16">
              <a 
                href="https://instagram.com/Lwebmaker"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg text-lg"
              >
                <span>Créons votre site web !</span>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
                <div className="text-gray-300 text-lg">Sites créés</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
                <div className="text-gray-300 text-lg">Clients satisfaits</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <div className="text-4xl font-bold text-purple-400 mb-2">3-7j</div>
                <div className="text-gray-300 text-lg">Délai moyen</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="py-16 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Contactez-moi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a 
              href={`mailto:${personalInfo.email}`}
              className="flex items-center justify-center p-6 bg-blue-500/20 rounded-2xl hover:bg-blue-500/30 transition-all duration-300 border border-blue-500/30 group"
            >
              <Mail size={24} className="text-blue-400 mr-4 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-blue-400 font-semibold text-lg">Email</div>
                <div className="text-gray-300">{personalInfo.email}</div>
              </div>
            </a>
            <a 
              href="https://instagram.com/Lwebmaker"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-6 bg-pink-500/20 rounded-2xl hover:bg-pink-500/30 transition-all duration-300 border border-pink-500/30 group"
            >
              <Instagram size={24} className="text-pink-400 mr-4 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-pink-400 font-semibold text-lg">Instagram</div>
                <div className="text-gray-300">@Lwebmaker</div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;