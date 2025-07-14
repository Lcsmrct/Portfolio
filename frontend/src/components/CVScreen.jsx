import React, { useState } from 'react';
import { Calendar, MapPin, ExternalLink, Download, Award, Briefcase, GraduationCap } from 'lucide-react';
import { experience, education, certificates } from '../data/mockData';

const CVScreen = () => {
  const [activeTab, setActiveTab] = useState('experience');

  const tabs = [
    { id: 'experience', label: 'Expérience', icon: Briefcase },
    { id: 'education', label: 'Formation', icon: GraduationCap },
    { id: 'certificates', label: 'Certifications', icon: Award }
  ];

  const renderExperience = () => (
    <div className="space-y-4">
      {experience.map((exp, index) => (
        <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-white">{exp.position}</h3>
              <p className="text-blue-400 font-medium">{exp.company}</p>
            </div>
            <span className="text-gray-400 text-sm">{exp.period}</span>
          </div>
          
          <p className="text-gray-300 text-sm mb-3">{exp.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech, techIndex) => (
              <span 
                key={techIndex}
                className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-md text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-4">
      {education.map((edu, index) => (
        <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-white">{edu.degree}</h3>
              <p className="text-purple-400 font-medium">{edu.school}</p>
            </div>
            <span className="text-gray-400 text-sm">{edu.period}</span>
          </div>
          
          <p className="text-gray-300 text-sm">{edu.description}</p>
        </div>
      ))}
    </div>
  );

  const renderCertificates = () => (
    <div className="space-y-4">
      {certificates.map((cert, index) => (
        <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-white">{cert.name}</h3>
              <p className="text-green-400 font-medium">{cert.issuer}</p>
            </div>
            <span className="text-gray-400 text-sm">{cert.date}</span>
          </div>
          
          <div className="flex items-center text-gray-400 text-sm">
            <span>ID: {cert.credentialId}</span>
            <ExternalLink size={14} className="ml-2" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Curriculum Vitae</h1>
            <p className="text-gray-400 text-sm">Mon parcours professionnel</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
            <Download size={16} className="text-white" />
            <span className="text-white text-sm">PDF</span>
          </button>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700/50">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 p-3 transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-500/20 text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Icon size={16} />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'experience' && renderExperience()}
        {activeTab === 'education' && renderEducation()}
        {activeTab === 'certificates' && renderCertificates()}
      </div>
    </div>
  );
};

export default CVScreen;