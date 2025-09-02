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
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 text-center bg-gradient-to-b from-gray-900 to-black">
        <div className="flex items-center justify-center mb-3">
          <HelpCircle size={32} className="text-blue-400 mr-2" />
          <h1 className="text-2xl font-bold text-white">FAQ</h1>
        </div>
        <p className="text-gray-400 text-sm">
          Questions fréquemment posées
        </p>
      </div>

      {/* FAQ Items */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {faqData.map((item) => (
          <div 
            key={item.id}
            className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:border-gray-600/50"
          >
            {/* Question */}
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors"
            >
              <span className="text-white font-medium pr-4">{item.question}</span>
              {openItems.has(item.id) ? (
                <ChevronUp size={20} className="text-blue-400 flex-shrink-0" />
              ) : (
                <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
              )}
            </button>

            {/* Answer */}
            {openItems.has(item.id) && (
              <div className="px-4 pb-4 border-t border-gray-700/30">
                <div className="pt-3 text-gray-300 text-sm leading-6">
                  {item.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="p-6 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-3">
            Vous avez d'autres questions ?
          </p>
          <a 
            href="https://instagram.com/Lwebmaker"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
          >
            <span>Contactez-moi sur Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQScreen;