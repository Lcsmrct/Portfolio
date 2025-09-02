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
    <div className="App">
      <IPhoneFrame>
        <div className="h-full flex flex-col">
          <StatusBar />
          <div className="flex-1 overflow-hidden">
            {renderScreen()}
          </div>
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </IPhoneFrame>
    </div>
  );
};

export default App;