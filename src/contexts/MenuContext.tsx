
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MenuContextType {
  activeKey: string;
  setActiveKey: (key: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [activeKey, setActiveKey] = useState('correct');

  const value = { activeKey, setActiveKey };

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