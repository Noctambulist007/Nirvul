
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MenuContextType {
  activeKey: string;
  setActiveKey: (key: string) => void;
  showHistorySider: boolean;
  setShowHistorySider: (show: boolean) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [activeKey, setActiveKey] = useState('correct');
  const [showHistorySider, setShowHistorySider] = useState(false);

  const value = { activeKey, setActiveKey, showHistorySider, setShowHistorySider };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};


export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};