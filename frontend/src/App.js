import React, { useState } from 'react';
import './App.css';
import IPhoneFrame from './components/IPhoneFrame';
import StatusBar from './components/StatusBar';
import Navigation from './components/Navigation';
import HomeScreen from './components/HomeScreen';
import ServicesScreen from './components/ServicesScreen';
import FAQScreen from './components/FAQScreen';
import ContactScreen from './components/ContactScreen';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'services':
        return <ServicesScreen />;
      case 'faq':
        return <FAQScreen />;
      case 'contact':
        return <ContactScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="App min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="min-h-screen">
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;