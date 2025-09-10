import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Spinner } from './Spinner';
import { CopyIcon, DownloadIcon, SearchIcon, ChevronDownIcon, ChevronUpIcon, PencilIcon } from './icons';
import { FileCheck, Languages, FileText, Sparkles } from 'lucide-react';
import type { DiffResult } from '../types';
import { HighlightedCorrection, LoadingAction } from '@/app/(core)/page';
import { useMenu } from '@/contexts/MenuContext';

interface OutputPanelProps {
  originalText: string | null;
  outputText: string;
  setOutputText: (text: string) => void;
  isLoading: boolean;
  error: string | null;
  outputTitle: string;
  loadingAction: LoadingAction;
  diffResult: DiffResult[] | null;
  highlightedCorrection: HighlightedCorrection;
}

const FindReplaceBar: React.FC<{
  onFind: (term: string) => void;
  onReplace: (term: string, replaceWith: string) => void;
  onReplaceAll: (term: string, replaceWith: string) => void;
  onNavigate: (direction: 'next' | 'prev') => void;
  findCount: { current: number; total: number };
}> = ({ onFind, onReplace, onReplaceAll, onNavigate, findCount }) => {
  const [findTerm, setFindTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');

  const handleFindChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFindTerm(e.target.value);
    onFind(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-gradient-to-r from-nirvul-gray-25 to-nirvul-primary-50 p-4 border-b border-nirvul-gray-100 flex flex-wrap items-center gap-3 text-sm"
    >
      <div className="relative flex-grow min-w-[180px]">
        <input
          type="text"
          placeholder="খুঁজুন..."
          value={findTerm}
          onChange={handleFindChange}
          className="w-full pl-4 pr-12 py-2.5 border border-nirvul-gray-200 rounded-xl focus:ring-2 focus:ring-nirvul-primary-500 focus:border-nirvul-primary-500 bg-white shadow-sm transition-all duration-200 hover:border-nirvul-gray-300"
          style={{
            fontFamily: "SolaimanLipi, Kalpurush, Arial, sans-serif",
          }}
        />
        {findCount.total > 0 && (
           <span className="absolute right-4 top-1/2 -translate-y-1/2 text-nirvul-gray-500 font-medium bg-nirvul-gray-100 px-2 py-0.5 rounded-full text-xs">
             {findCount.current}/{findCount.total}
           </span>
        )}
      </div>
      <div className="flex items-center gap-1 bg-white rounded-xl p-1 shadow-sm">
        <button 
          onClick={() => onNavigate('prev')} 
          className="p-2 hover:bg-nirvul-gray-100 rounded-lg transition-colors duration-200" 
          aria-label="Previous match"
        >
          <ChevronUpIcon className="w-4 h-4 text-nirvul-gray-600" />
        </button>
        <button 
          onClick={() => onNavigate('next')} 
          className="p-2 hover:bg-nirvul-gray-100 rounded-lg transition-colors duration-200" 
          aria-label="Next match"
        >
          <ChevronDownIcon className="w-4 h-4 text-nirvul-gray-600" />
        </button>
      </div>
      <div className="relative flex-grow min-w-[180px]">
        <input
          type="text"
          placeholder="এর সাথে প্রতিস্থাপন..."
          value={replaceTerm}
          onChange={(e) => setReplaceTerm(e.target.value)}
          className="w-full pl-4 py-2.5 border border-nirvul-gray-200 rounded-xl focus:ring-2 focus:ring-nirvul-primary-500 focus:border-nirvul-primary-500 bg-white shadow-sm transition-all duration-200 hover:border-nirvul-gray-300"
          style={{
            fontFamily: "SolaimanLipi, Kalpurush, Arial, sans-serif",
          }}
        />
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => onReplace(findTerm, replaceTerm)} 
          className="px-4 py-2.5 bg-nirvul-primary-500 hover:bg-nirvul-primary-600 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-nirvul-primary-500/25"
        >
          প্রতিস্থাপন
        </button>
        <button 
          onClick={() => onReplaceAll(findTerm, replaceTerm)} 
          className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/25"
        >
          সব
        </button>
      </div>
    </motion.div>
  );
};

export const OutputPanel: React.FC<OutputPanelProps> = ({ 
  originalText, 
  outputText, 
  setOutputText, 
  isLoading, 
  error, 
  outputTitle, 
  loadingAction, 
  diffResult, 
  highlightedCorrection 
}) => {
  const {activeKey} = useMenu();
  const [copyButtonText, setCopyButtonText] = useState('কপি');
  const [isEditMode, setIsEditMode] = useState(false);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findMatches, setFindMatches] = useState<number[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const diffViewRef = useRef<HTMLDivElement>(null);
  
  const isCorrection = loadingAction === 'correct' || (diffResult && originalText !== null);
  const hasResult = !isLoading && !error && outputText;
  const isEditable = (!isCorrection && hasResult) || isEditMode;

  // Get icon and colors based on loadingAction
  const getHeaderConfig = () => {
    switch (activeKey) {
      case 'correct':
        return {
          icon: <FileCheck className="w-5 h-5 text-white" />,
          bgGradient: "bg-gradient-to-br from-nirvul-primary-500 to-nirvul-primary-600",
        };
      case 'translate':
        return {
          icon: <Languages className="w-5 h-5 text-white" />,
          bgGradient: "bg-gradient-to-br from-nirvul-primary-500 to-nirvul-primary-600",
        };
      case 'summarize':
        return {
          icon: <FileText className="w-5 h-5 text-white" />,
          bgGradient: "bg-gradient-to-br from-nirvul-primary-500 to-nirvul-primary-600",
        };
      default:
        return {
          icon: <Sparkles className="w-5 h-5 text-white" />,
          bgGradient: "bg-gradient-to-br from-nirvul-primary-500 to-nirvul-primary-600",
        };
    }
  };

  const headerConfig = getHeaderConfig();

  // Character and word count
  const charCount = outputText.length;
  const wordCount = outputText.trim() === "" ? 0 : outputText.trim().split(/\s+/).length;

  // Reset edit mode when a new correction result comes in
  useEffect(() => {
    setIsEditMode(false);
    setShowFindReplace(false);
  }, [diffResult]);
  
  useEffect(() => {
    if (highlightedCorrection && diffViewRef.current) {
        const element = diffViewRef.current.querySelector(`#correction-start-${highlightedCorrection.start}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
  }, [highlightedCorrection]);

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText).then(() => {
      setCopyButtonText('কপি হয়েছে!');
      setTimeout(() => setCopyButtonText('কপি'), 2000);
    }).catch(err => console.error('Failed to copy: ', err));
  };
  
  const handleDownload = () => {
    const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nirvul-output.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getLoadingMessage = () => {
    switch (loadingAction) {
        case 'correct': return 'শুদ্ধ করা হচ্ছে...';
        case 'translate': return 'অনুবাদ করা হচ্ছে...';
        case 'summarize': return 'সারসংক্ষেপ করা হচ্ছে...';
        default: return 'প্রসেস করা হচ্ছে...';
    }
  }

  const handleFind = (term: string) => {
    if (!term || !textareaRef.current) {
      setFindMatches([]);
      setCurrentMatchIndex(-1);
      return;
    }
    const text = textareaRef.current.value;
    const regex = new RegExp(term, 'gi');
    const indices: number[] = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      indices.push(match.index);
    }
    setFindMatches(indices);
    setCurrentMatchIndex(indices.length > 0 ? 0 : -1);
  };
  
  const handleNavigateFind = (direction: 'next' | 'prev') => {
      if (findMatches.length === 0) return;
      let nextIndex = currentMatchIndex;
      if (direction === 'next') {
          nextIndex = (currentMatchIndex + 1) % findMatches.length;
      } else {
          nextIndex = (currentMatchIndex - 1 + findMatches.length) % findMatches.length;
      }
      setCurrentMatchIndex(nextIndex);
  };

  const handleReplace = (term: string, replaceWith: string) => {
    if (currentMatchIndex === -1 || !term || !textareaRef.current) return;
    const startIndex = findMatches[currentMatchIndex];
    const newText = outputText.substring(0, startIndex) + replaceWith + outputText.substring(startIndex + term.length);
    setOutputText(newText);
  };

  const handleReplaceAll = (term: string, replaceWith: string) => {
    if (!term || !textareaRef.current) return;
    const regex = new RegExp(term, 'gi');
    const newText = outputText.replace(regex, replaceWith);
    setOutputText(newText);
  };

  const renderContent = () => {
    if (isLoading && loadingAction !== 'correct') {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <Spinner message={getLoadingMessage()} />
        </div>
      );
    }
    if (error) {
      return (
        <div className="absolute inset-0 flex items-center justify-center text-error-600 p-6">
          <div className="text-center bg-error-50 p-6 rounded-2xl border border-error-200">
            <p className="font-semibold">{error}</p>
          </div>
        </div>
      );
    }
    if (!outputText && !diffResult) {
      return (
        <div className="absolute inset-0 flex items-center justify-center text-nirvul-gray-400 p-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-nirvul-gray-100 to-nirvul-gray-200 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-nirvul-gray-400" />
            </div>
            <p className="text-lg font-medium">আপনার ফলাফল এখানে দেখানো হবে।</p>
            <p className="text-sm text-nirvul-gray-300 mt-1">প্রক্রিয়া সম্পন্ন হলে এখানে দেখা যাবে</p>
          </div>
        </div>
      );
    }

    if (diffResult && !isEditMode) {
      return (
        <div 
          ref={diffViewRef} 
          className="w-full h-full p-6 text-base leading-relaxed overflow-auto bg-transparent focus:outline-none scrollbar-thin scrollbar-thumb-nirvul-gray-300 scrollbar-track-transparent"
          style={{
            fontFamily: "SolaimanLipi, Kalpurush, Arial, sans-serif",
          }}
        >
          {diffResult.map((part, index) => {
            const isHighlighted = highlightedCorrection && index >= highlightedCorrection.start && index <= highlightedCorrection.end;
            return (
              <span 
                key={index} 
                id={`correction-start-${index}`}
                className={
                  `${isHighlighted ? 'highlight-glow' : ''} ${
                  part.added ? 'bg-success-100/80 text-success-900 px-1 py-0.5 rounded-md' : 
                  part.removed ? 'bg-error-100/80 text-error-900 line-through decoration-error-400 px-1 py-0.5 rounded-md' : ''}`
                }
              >
                {part.value}
              </span>
            );
          })}
        </div>
      );
    }
    
    return (
       <textarea
          ref={textareaRef}
          className="w-full h-full p-6 text-base leading-relaxed resize-none bg-transparent focus:outline-none absolute inset-0 text-slate-700 placeholder-slate-400 scrollbar-thin scrollbar-thumb-nirvul-gray-300 scrollbar-track-transparent"
          value={outputText}
          onChange={(e) => setOutputText(e.target.value)}
          readOnly={!isEditable}
          aria-label="Output text"
          style={{
            fontFamily: "SolaimanLipi, Kalpurush, Arial, sans-serif",
          }}
        />
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-nirvul-gray-200/20 border border-nirvul-gray-100 overflow-hidden h-full flex flex-col backdrop-blur-sm">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-nirvul-primary-50 via-white to-nirvul-primary-100 p-6 border-b border-nirvul-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl ${headerConfig.bgGradient} flex items-center justify-center shadow-lg`}>
              {headerConfig.icon}
            </div>
            <h2 className="text-xl font-bold text-nirvul-gray-800 bg-gradient-to-r from-nirvul-gray-800 to-nirvul-gray-700 bg-clip-text text-transparent">
              {outputTitle}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {isEditable && (
              <button 
                onClick={() => setShowFindReplace(!showFindReplace)} 
                className="p-2.5 bg-nirvul-gray-100 hover:bg-nirvul-gray-200 text-nirvul-gray-700 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm" 
                aria-label="Find and Replace"
              >
                <SearchIcon className="w-4 h-4" />
              </button>
            )}
            {diffResult && !isEditMode && (
              <button 
                onClick={() => setIsEditMode(true)} 
                className="flex items-center gap-2 text-sm bg-blue-light-100 hover:bg-blue-light-200 text-blue-light-800 font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm" 
                aria-label="Edit text"
              >
                <PencilIcon className="w-4 h-4" /> সম্পাদনা
              </button>
            )}
            {hasResult && (
              <>
                <button 
                  onClick={handleCopy} 
                  className="flex items-center gap-2 text-sm bg-nirvul-gray-100 hover:bg-nirvul-gray-200 text-nirvul-gray-700 font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm" 
                  aria-label="Copy text"
                >
                  <CopyIcon className="w-4 h-4" /> {copyButtonText}
                </button>
                <button 
                  onClick={handleDownload} 
                  className="flex items-center gap-2 text-sm bg-gradient-to-r from-nirvul-primary-500 to-nirvul-primary-600 hover:from-nirvul-primary-600 hover:to-nirvul-primary-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-nirvul-primary-500/25" 
                  aria-label="Download text"
                >
                  <DownloadIcon className="w-4 h-4" /> ডাউনলোড
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Find Replace Bar */}
        {isEditable && (
          <AnimatePresence>
            {showFindReplace && <FindReplaceBar 
              onFind={handleFind} 
              onReplace={handleReplace}
              onReplaceAll={handleReplaceAll}
              onNavigate={handleNavigateFind}
              findCount={{ current: currentMatchIndex + 1, total: findMatches.length}}
            />}
          </AnimatePresence>
        )}

        {/* Text Content Area */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-nirvul-gray-25 to-white rounded-b-3xl">
            {renderContent()}
          </div>
        </div>

        {/* Bottom Stats */}
        {hasResult && (
          <div className="p-6 bg-gradient-to-r from-nirvul-gray-25 to-nirvul-primary-50 border-t border-nirvul-gray-100">
            <div className="flex items-center justify-end gap-4">
              {/* Word/Character Counter */}
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-nirvul-primary-400"></div>
                  <span className="font-semibold text-nirvul-gray-700">
                    {wordCount}
                  </span>
                  <span className="text-nirvul-gray-500">শব্দ</span>
                </div>
                <div className="w-px h-4 bg-nirvul-gray-300"></div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-nirvul-gray-400"></div>
                  <span className="font-semibold text-nirvul-gray-700">
                    {charCount}
                  </span>
                  <span className="text-nirvul-gray-500">অক্ষর</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};