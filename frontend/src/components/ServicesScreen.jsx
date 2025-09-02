import React from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import { services } from '../data/mockData';

const ServicesScreen = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 text-center bg-gradient-to-b from-gray-900 to-black">
        <h1 className="text-2xl font-bold text-white mb-2">Mes Services</h1>
        <p className="text-gray-400 text-sm">
          Des solutions web adaptées à vos besoins
        </p>
      </div>

      {/* Services Cards */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {services.map((service) => (
          <div 
            key={service.id}
            className={`relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
              service.popular 
                ? 'border-blue-500/50 shadow-lg shadow-blue-500/20' 
                : 'border-gray-700/50 hover:border-gray-600/50'
            }`}
          >
            {/* Popular Badge */}
            {service.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs px-3 py-1 rounded-full flex items-center">
                  <Star size={12} className="mr-1 fill-current" />
                  Populaire
                </div>
              </div>
            )}

            {/* Service Header */}
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <div className="text-3xl font-bold text-blue-400 mb-2">{service.price}</div>
              <p className="text-gray-400 text-sm">{service.description}</p>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check size={16} className="text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group">
              <span>Commander</span>
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="p-6 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-3">
            Besoin d'un devis personnalisé ?
          </p>
          <a 
            href="https://instagram.com/Lwebmaker"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
          >
            <span>@Lwebmaker</span>
            <ArrowRight size={14} className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServicesScreen;