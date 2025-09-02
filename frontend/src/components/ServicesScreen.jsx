import React from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import { services } from '../data/mockData';

const ServicesScreen = () => {
  return (
    <div className="pt-16">
      {/* Header Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Mes Services</h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Des solutions web adaptées à vos besoins, du site vitrine simple au projet complexe
          </p>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                className={`relative bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                  service.popular 
                    ? 'border-blue-500/50 shadow-lg shadow-blue-500/20' 
                    : 'border-gray-700/50 hover:border-gray-600/50'
                }`}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm px-4 py-2 rounded-full flex items-center shadow-lg">
                      <Star size={16} className="mr-2 fill-current" />
                      Populaire
                    </div>
                  </div>
                )}

                {/* Service Header */}
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <div className="text-4xl font-bold text-blue-400 mb-4">{service.price}</div>
                  <p className="text-gray-400 text-lg leading-relaxed">{service.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check size={20} className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-300 text-base">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group text-lg">
                  <span>Commander</span>
                  <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Besoin d'un devis personnalisé ?</h2>
          <p className="text-gray-400 text-lg mb-8">
            Chaque projet est unique. Contactez-moi pour discuter de vos besoins spécifiques.
          </p>
          <a 
            href="https://instagram.com/Lwebmaker"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-lg shadow-lg"
          >
            <span>Contactez @Lwebmaker</span>
            <ArrowRight size={20} className="ml-3" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default ServicesScreen;