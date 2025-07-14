import React from 'react';
import { ExternalLink, Github, Clock, CheckCircle, PlayCircle } from 'lucide-react';
import { projects } from '../data/mockData';

const ProjectsScreen = () => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Terminé':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'En cours':
        return <Clock size={16} className="text-yellow-400" />;
      default:
        return <PlayCircle size={16} className="text-blue-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Terminé':
        return 'bg-green-500/20 text-green-400';
      case 'En cours':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-blue-500/20 text-blue-400';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50">
        <h1 className="text-2xl font-bold text-white mb-2">Mes Projets</h1>
        <p className="text-gray-400 text-sm">Découvrez mes réalisations récentes</p>
      </div>
      
      {/* Projects List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 hover:bg-gray-800/50 transition-all duration-300"
          >
            {/* Project Image */}
            <div className="mb-4 rounded-xl overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-32 object-cover"
              />
            </div>
            
            {/* Project Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white text-lg">{project.title}</h3>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                  {getStatusIcon(project.status)}
                  <span>{project.status}</span>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Links */}
              <div className="flex space-x-3 pt-2">
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Github size={16} className="text-white" />
                  <span className="text-white text-sm">Code</span>
                </a>
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <ExternalLink size={16} className="text-white" />
                  <span className="text-white text-sm">Demo</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsScreen;