import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

const StatusBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-black/50 backdrop-blur-sm text-white text-sm font-medium">
      <div className="flex items-center space-x-1">
        <span>{formatTime(time)}</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <Signal size={16} />
          <span className="text-xs">•••••</span>
        </div>
        <Wifi size={16} />
        <div className="flex items-center space-x-1">
          <span className="text-xs">87%</span>
          <Battery size={16} />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;