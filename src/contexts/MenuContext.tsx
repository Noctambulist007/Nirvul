import { DiffResult } from "@/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface MenuContextType {
  activeKey: string;
  setActiveKey: (key: string) => void;
  showHistorySider: boolean;
  setShowHistorySider: (show: boolean) => void;
  inputText: string;
  setInputText: (text: string) => void;
  readOnly: boolean;
  setReadOnly: (readOnly: boolean) => void;
  originalText: string | null;
  setOriginalText: (text: string | null) => void;
  outputText: string;
  setOutputText: (text: string) => void;
  diffResult: DiffResult[] | null;
  setDiffResult: (result: DiffResult[] | null) => void;
  outputTitle: string;
  setOutputTitle: (title: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [activeKey, setActiveKey] = useState("correct");
  const [showHistorySider, setShowHistorySider] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [inputText, setInputText] = useState<string>("");
  const [originalText, setOriginalText] = useState<string | null>(null);
  const [outputText, setOutputText] = useState<string>("");
  const [diffResult, setDiffResult] = useState<DiffResult[] | null>(null);
  const [outputTitle, setOutputTitle] = useState<string>("আপনার ফলাফল");

  const value = {
    activeKey,
    setActiveKey,
    showHistorySider,
    setShowHistorySider,
    inputText,
    setInputText,
    readOnly,
    setReadOnly,
    originalText,
    setOriginalText,
    outputText,
    setOutputText,
    diffResult,
    setDiffResult,
    outputTitle,
    setOutputTitle,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
