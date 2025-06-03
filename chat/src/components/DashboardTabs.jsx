import React, { useRef } from 'react';
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const DashboardTabs = ({ tabIndex, setTabIndex, tabs, handleTabClick }) => {
  
  const tabsRef = useRef(null);
  

  const scroll = (direction) => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-20 px-2 bg-white bg-opacity-70"

        >
          {/* <ChevronLeftIcon className="w-5 h-5 text-gray-500" /> */}
        </button>
        
        <div ref={tabsRef} className="flex overflow-x-auto scrollbar-hide">
          <div className="flex space-x-1 mx-8">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTabClick(tab.value)}
                className={`px-4 py-3 cursor-pointer text-sm font-medium transition-colors duration-200 ${
                  tabIndex === tab.value
                    ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-20 px-2 bg-white bg-opacity-70"
        >
          {/* <ChevronRightIcon className="w-5 h-5 text-gray-500" /> */}
        </button>
      </div>
    </div>
  );
};

export default DashboardTabs;