import React from 'react';
import { User, Briefcase, Phone, FileText } from 'lucide-react';
import { personalInfo } from '../data/mockData';

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Accueil', icon: User },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'faq', label: 'FAQ', icon: FileText },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
              <div className="w-2 h-2 bg-blue-300 rounded-full ml-1"></div>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">{personalInfo.name}</h1>
              <p className="text-blue-400 text-sm">{personalInfo.title}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="https://instagram.com/Lwebmaker"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
            >
              Contactez-moi
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="grid grid-cols-4 gap-2">
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
                  <Icon size={18} className="mb-1" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;