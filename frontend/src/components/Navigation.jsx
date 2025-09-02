import React from 'react';
import { User, Briefcase, Phone, FileText } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Accueil', icon: User },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'faq', label: 'FAQ', icon: FileText },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  return (
    <nav className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50">
      <div className="grid grid-cols-4 gap-1 p-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-300'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;