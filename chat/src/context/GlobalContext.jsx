import React, { createContext, useContext, useState } from "react";

// Create the context
const GlobalContext = createContext();

// Create the provider component
export const GlobalProvider = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [user, setUser] = useState(null); // You can store user/auth info here
  const [file, setFile] = useState({}); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
 

  return (
    <GlobalContext.Provider
      value={{
        setActiveIndex,
        activeIndex,
        user,
        setUser,
        file,
        setFile,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook for using the context
export const useGlobalContext = () => useContext(GlobalContext);
