'use client'

import { useContext, createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

// Define the interface for the context value
interface AppContextType {
  isQuoteLoading: boolean;
  isAbleSwap: boolean;
  setIsQuateLoading: Dispatch<SetStateAction<boolean>>;
  setIsAbleSwap: Dispatch<SetStateAction<boolean>>;
}

// Create the context with a default value (can be `undefined`)
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  // Define the value that will be provided to all consumers of this context
  const [isQuoteLoading, setIsQuateLoading] = useState(false);
  const [isAbleSwap, setIsAbleSwap] = useState(false);

  return (
    <AppContext.Provider value={{ isQuoteLoading, isAbleSwap, setIsQuateLoading, setIsAbleSwap }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  
  // Throw an error if the context is used outside the provider
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};
