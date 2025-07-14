import React from 'react';
import { Github, Linkedin, Twitter, MapPin, Mail, Phone } from 'lucide-react';
import { personalInfo } from '../data/mockData';

const HomeScreen = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-2xl">
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-black flex items-center justify-center">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-2">{personalInfo.name}</h1>
        <p className="text-blue-400 text-lg mb-4">{personalInfo.title}</p>
        
        <div className="flex items-center text-gray-400 mb-6">
          <MapPin size={16} className="mr-2" />
          <span>{personalInfo.location}</span>
        </div>
        
        <p className="text-gray-300 text-sm leading-relaxed px-4 mb-8">
          {personalInfo.bio}
        </p>
        
        {/* Social Links */}
        <div className="flex space-x-6">
          <a 
            href={personalInfo.social.github}
            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Github size={20} className="text-white" />
          </a>
          <a 
            href={personalInfo.social.linkedin}
            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Linkedin size={20} className="text-blue-400" />
          </a>
          <a 
            href={personalInfo.social.twitter}
            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Twitter size={20} className="text-blue-400" />
          </a>
        </div>
      </div>
      
      {/* Quick Contact */}
      <div className="p-6 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50">
        <div className="grid grid-cols-2 gap-4">
          <a 
            href={`mailto:${personalInfo.email}`}
            className="flex items-center justify-center p-3 bg-blue-500/20 rounded-xl hover:bg-blue-500/30 transition-colors"
          >
            <Mail size={18} className="text-blue-400 mr-2" />
            <span className="text-blue-400 text-sm">Email</span>
          </a>
          <a 
            href={`tel:${personalInfo.phone}`}
            className="flex items-center justify-center p-3 bg-green-500/20 rounded-xl hover:bg-green-500/30 transition-colors"
          >
            <Phone size={18} className="text-green-400 mr-2" />
            <span className="text-green-400 text-sm">Appel</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;