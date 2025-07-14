import React from 'react';

const IPhoneFrame = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="relative">
        {/* iPhone 15 Frame */}
        <div className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
          {/* Outer frame */}
          <div className="bg-black rounded-[2.5rem] p-1">
            {/* Inner frame */}
            <div className="bg-gray-900 rounded-[2.2rem] p-2">
              {/* Screen */}
              <div className="w-[375px] h-[812px] bg-black rounded-[2rem] overflow-hidden relative">
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-full z-50"></div>
                
                {/* Screen Content */}
                <div className="w-full h-full bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
                  {children}
                </div>
                
                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-36 h-1 bg-white rounded-full opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Side Buttons */}
        <div className="absolute left-[-4px] top-24 w-1 h-12 bg-gray-700 rounded-l-sm"></div>
        <div className="absolute left-[-4px] top-40 w-1 h-8 bg-gray-700 rounded-l-sm"></div>
        <div className="absolute left-[-4px] top-52 w-1 h-8 bg-gray-700 rounded-l-sm"></div>
        <div className="absolute right-[-4px] top-48 w-1 h-16 bg-gray-700 rounded-r-sm"></div>
      </div>
    </div>
  );
};

export default IPhoneFrame;