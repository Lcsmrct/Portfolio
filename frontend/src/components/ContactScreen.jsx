import React, { useState } from 'react';
import { Mail, MapPin, Send, User, MessageSquare, Instagram, ExternalLink } from 'lucide-react';
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
    <div className="pt-16">
      {/* Header Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Contact</h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Parlons de votre projet web ! N'hésitez pas à me contacter pour discuter de vos besoins.
          </p>
        </div>
      </section>

      <div className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Mes coordonnées</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <Mail size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-semibold text-lg">{personalInfo.email}</p>
                  </div>
                </div>
                

                
                <div className="flex items-center space-x-4 p-4 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <MapPin size={24} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Localisation</p>
                    <p className="text-white font-semibold text-lg">{personalInfo.location}</p>
                  </div>
                </div>
                
                <a 
                  href="https://instagram.com/Lwebmaker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl border border-pink-500/30 hover:from-pink-500/30 hover:to-purple-500/30 transition-all duration-300 group"
                >
                  <div className="p-3 bg-pink-500/20 rounded-xl">
                    <Instagram size={24} className="text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm">Instagram</p>
                    <p className="text-white font-semibold text-lg">@Lwebmaker</p>
                  </div>
                  <ExternalLink size={20} className="text-gray-400 group-hover:text-pink-400 transition-colors" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Envoyez-moi un message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-400 text-base mb-3 font-medium">
                    <User size={18} className="inline mr-2" />
                    Nom
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors text-base"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-base mb-3 font-medium">
                    <Mail size={18} className="inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors text-base"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-base mb-3 font-medium">
                    <MessageSquare size={18} className="inline mr-2" />
                    Sujet
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors text-base"
                    placeholder="Sujet de votre message"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-base mb-3 font-medium">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors resize-none text-base"
                    placeholder="Votre message..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={formStatus === 'Envoi en cours...'}
                  className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-xl transition-all duration-300 disabled:opacity-50 text-lg font-semibold"
                >
                  <Send size={20} className="text-white" />
                  <span className="text-white">
                    {formStatus === 'Envoi en cours...' ? 'Envoi...' : 'Envoyer le message'}
                  </span>
                </button>
                
                {formStatus && (
                  <div className={`text-center p-4 rounded-xl text-base ${
                    formStatus.includes('succès') 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {formStatus}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;