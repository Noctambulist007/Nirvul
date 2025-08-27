
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Spinner } from './Spinner';
import { CopyIcon, DownloadIcon, SearchIcon, ChevronDownIcon, ChevronUpIcon, PencilIcon } from './icons';
import { LoadingAction, HighlightedCorrection } from '../App';
import type { DiffResult } from '../types';

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
      className="bg-slate-100 p-2 rounded-t-lg border-b border-slate-200 flex flex-wrap items-center gap-2 text-sm"
    >
      <div className="relative flex-grow min-w-[150px]">
        <input
          type="text"
          placeholder="Find"
          value={findTerm}
          onChange={handleFindChange}
          className="w-full pl-2 pr-8 py-1 border border-slate-300 rounded-md focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
        />
        {findCount.total > 0 && (
           <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500">
             {findCount.current}/{findCount.total}
           </span>
        )}
      </div>
      <div className="flex items-center">
        <button onClick={() => onNavigate('prev')} className="p-1 hover:bg-slate-200 rounded-md" aria-label="Previous match"><ChevronUpIcon className="w-5 h-5" /></button>
        <button onClick={() => onNavigate('next')} className="p-1 hover:bg-slate-200 rounded-md" aria-label="Next match"><ChevronDownIcon className="w-5 h-5" /></button>
      </div>
      <div className="relative flex-grow min-w-[150px]">
        <input
          type="text"
          placeholder="Replace with"
          value={replaceTerm}
          onChange={(e) => setReplaceTerm(e.target.value)}
          className="w-full pl-2 py-1 border border-slate-300 rounded-md focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
        />
      </div>
      <button onClick={() => onReplace(findTerm, replaceTerm)} className="px-2 py-1 bg-slate-200 hover:bg-slate-300 rounded-md font-medium">Replace</button>
      <button onClick={() => onReplaceAll(findTerm, replaceTerm)} className="px-2 py-1 bg-slate-200 hover:bg-slate-300 rounded-md font-medium">All</button>
    </motion.div>
  );
};

export const OutputPanel: React.FC<OutputPanelProps> = ({ originalText, outputText, setOutputText, isLoading, error, outputTitle, loadingAction, diffResult, highlightedCorrection }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy');
  const [isEditMode, setIsEditMode] = useState(false);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findMatches, setFindMatches] = useState<number[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const diffViewRef = useRef<HTMLDivElement>(null);
  
  const isCorrection = loadingAction === 'correct' || (diffResult && originalText !== null);
  const hasResult = !isLoading && !error && outputText;
  const isEditable = (!isCorrection && hasResult) || isEditMode;

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
      setCopyButtonText('Copied!');
      setTimeout(() => setCopyButtonText('Copy'), 2000);
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
        <div className="absolute inset-0 flex items-center justify-center bg-white/50">
          <Spinner message={getLoadingMessage()} />
        </div>
      );
    }
    if (error) {
      return (
        <div className="absolute inset-0 flex items-center justify-center text-red-600 p-4">
          <p>{error}</p>
        </div>
      );
    }
    if (!outputText && !diffResult) {
      return (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 p-4">
          <p className="text-center">আপনার ফলাফল এখানে দেখানো হবে।</p>
        </div>
      );
    }

    if (diffResult && !isEditMode) {
      return (
        <div ref={diffViewRef} className="w-full h-full p-4 text-lg leading-relaxed overflow-auto bg-transparent focus:outline-none">
          {diffResult.map((part, index) => {
            const isHighlighted = highlightedCorrection && index >= highlightedCorrection.start && index <= highlightedCorrection.end;
            return (
              <span 
                key={index} 
                id={`correction-start-${index}`}
                className={
                  `${isHighlighted ? 'highlight-glow' : ''} ${
                  part.added ? 'bg-green-100/80 text-green-900' : 
                  part.removed ? 'bg-red-100/80 text-red-900 line-through decoration-red-400' : ''}`
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
          className="w-full h-full p-4 text-lg leading-relaxed resize-none bg-transparent focus:outline-none absolute inset-0"
          value={outputText}
          onChange={(e) => setOutputText(e.target.value)}
          readOnly={!isEditable}
          aria-label="Output text"
        />
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col h-full border border-gray-200/50">
      <div className="flex justify-between items-center mb-4 min-h-[40px]">
        <h2 className="text-xl font-semibold text-gray-800">{outputTitle}</h2>
        <div className="flex items-center gap-2">
            {isEditable && (
              <button onClick={() => setShowFindReplace(!showFindReplace)} className="p-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-full transition-colors" aria-label="Find and Replace">
                <SearchIcon />
              </button>
            )}
            {diffResult && !isEditMode && (
              <button onClick={() => setIsEditMode(true)} className="flex items-center gap-1.5 text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-1.5 px-3 rounded-md transition-colors" aria-label="Edit text">
                <PencilIcon className="w-4 h-4" /> Edit
              </button>
            )}
            {hasResult && (
              <>
                <button onClick={handleCopy} className="flex items-center gap-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1.5 px-3 rounded-md transition-colors" aria-label="Copy text">
                  <CopyIcon /> {copyButtonText}
                </button>
                <button onClick={handleDownload} className="flex items-center gap-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1.5 px-3 rounded-md transition-colors" aria-label="Download text">
                  <DownloadIcon /> Download
                </button>
              </>
            )}
        </div>
      </div>
      <div className="w-full flex-grow bg-gray-50/50 rounded-xl overflow-hidden border border-gray-200 flex flex-col">
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
        <div className="relative w-full h-full flex-grow">
            {renderContent()}
        </div>
      </div>
    </div>
  );
};
