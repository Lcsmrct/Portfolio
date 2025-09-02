import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { faqData } from '../data/mockData';

const FAQScreen = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="pt-16">
      {/* Header Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center mb-6">
            <HelpCircle size={48} className="text-blue-400 mr-4" />
            <h1 className="text-5xl md:text-6xl font-bold text-white">FAQ</h1>
          </div>
          <p className="text-xl text-gray-400 leading-relaxed">
            Toutes les réponses aux questions que vous vous posez
          </p>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-4">
            {faqData.map((item) => (
              <div 
                key={item.id}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:border-gray-600/50 hover:shadow-lg"
              >
                {/* Question */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors"
                >
                  <span className="text-white font-semibold text-lg pr-4">{item.question}</span>
                  {openItems.has(item.id) ? (
                    <ChevronUp size={24} className="text-blue-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown size={24} className="text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {/* Answer */}
                {openItems.has(item.id) && (
                  <div className="px-6 pb-6 border-t border-gray-700/30">
                    <div className="pt-4 text-gray-300 text-base leading-7">
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Vous avez d'autres questions ?</h2>
          <p className="text-gray-400 text-lg mb-8">
            N'hésitez pas à me contacter directement sur Instagram
          </p>
          <a 
            href="https://instagram.com/Lwebmaker"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-lg shadow-lg"
          >
            <span>Contactez-moi sur Instagram</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQScreen;