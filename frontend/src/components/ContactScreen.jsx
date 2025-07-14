import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare } from 'lucide-react';
import { personalInfo } from '../data/mockData';

const ContactScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    setFormStatus('Envoi en cours...');
    setTimeout(() => {
      setFormStatus('Message envoyé avec succès !');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50">
        <h1 className="text-2xl font-bold text-white mb-2">Contact</h1>
        <p className="text-gray-400 text-sm">Contactez-moi pour discuter de vos projets</p>
      </div>
      
      {/* Contact Info */}
      <div className="p-4 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Mail size={18} className="text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white font-medium">{personalInfo.email}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Phone size={18} className="text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Téléphone</p>
              <p className="text-white font-medium">{personalInfo.phone}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <MapPin size={18} className="text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Localisation</p>
              <p className="text-white font-medium">{personalInfo.location}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Form */}
      <div className="flex-1 overflow-y-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              <User size={14} className="inline mr-2" />
              Nom
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Votre nom"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              <Mail size={14} className="inline mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="votre@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              <MessageSquare size={14} className="inline mr-2" />
              Sujet
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Sujet de votre message"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-400 text-sm mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder="Votre message..."
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={formStatus === 'Envoi en cours...'}
            className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            <Send size={16} className="text-white" />
            <span className="text-white font-medium">
              {formStatus === 'Envoi en cours...' ? 'Envoi...' : 'Envoyer'}
            </span>
          </button>
          
          {formStatus && (
            <div className={`text-center p-3 rounded-lg ${
              formStatus.includes('succès') 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-blue-500/20 text-blue-400'
            }`}>
              {formStatus}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactScreen;