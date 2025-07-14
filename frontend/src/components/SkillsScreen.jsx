import React from 'react';
import { skills } from '../data/mockData';

const SkillsScreen = () => {
  const getSkillColor = (level) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 80) return 'bg-blue-500';
    if (level >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50">
        <h1 className="text-2xl font-bold text-white mb-2">Compétences</h1>
        <p className="text-gray-400 text-sm">Mon expertise technique</p>
      </div>
      
      {/* Skills Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {skills.map((skillCategory, categoryIndex) => (
          <div key={categoryIndex} className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4">
            <h3 className="text-lg font-semibold text-white mb-4">{skillCategory.category}</h3>
            
            <div className="space-y-4">
              {skillCategory.technologies.map((tech, techIndex) => (
                <div key={techIndex} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">{tech.name}</span>
                    <span className="text-gray-400 text-sm">{tech.level}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${getSkillColor(tech.level)}`}
                      style={{ width: `${tech.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Summary */}
      <div className="p-4 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-400">12</div>
            <div className="text-xs text-gray-400">Technologies</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">4+</div>
            <div className="text-xs text-gray-400">Années d'exp.</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">50+</div>
            <div className="text-xs text-gray-400">Projets</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsScreen;