
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WritingStyle, LoadingAction } from '../App';
import { MenuIcon, XIcon, CheckSquareIcon, GlobeIcon, FileTextIcon } from './icons';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  onCorrect: () => void;
  onTranslate: () => void;
  onSummarize: () => void;
  isLoading: boolean;
  loadingAction: LoadingAction;
  writingStyle: WritingStyle;
  setWritingStyle: (style: WritingStyle) => void;
  hasInput: boolean;
}

const ActionButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
  isSidebarOpen: boolean;
}> = ({ label, icon, onClick, isLoading, disabled, isSidebarOpen }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex items-center w-full text-left p-3 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 hover:bg-rose-50 hover:text-rose-800"
    aria-label={label}
  >
    {icon}
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto', transition: { delay: 0.1 } }}
          exit={{ opacity: 0, width: 0 }}
          className="ml-4 whitespace-nowrap"
        >
          {isLoading ? 'Processing...' : label}
        </motion.span>
      )}
    </AnimatePresence>
  </button>
);

const StyleButton: React.FC<{
  label: string;
  style: WritingStyle;
  currentStyle: WritingStyle;
  onClick: (style: WritingStyle) => void;
  disabled: boolean;
}> = ({ label, style, currentStyle, onClick, disabled }) => (
  <button
    onClick={() => onClick(style)}
    disabled={disabled}
    className={`px-3 py-1.5 text-sm font-semibold rounded-md flex-1 transition-colors duration-200 disabled:cursor-not-allowed ${
      currentStyle === style
        ? 'bg-rose-700 text-white shadow-sm'
        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
    }`}
  >
    {label}
  </button>
);


export const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen, setIsSidebarOpen, onCorrect, onTranslate, onSummarize, isLoading, loadingAction, writingStyle, setWritingStyle, hasInput
}) => {
  return (
    <motion.aside
      initial={false}
      animate={{ width: isSidebarOpen ? '280px' : '88px' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-white rounded-2xl shadow-lg flex flex-col border border-gray-200/50 overflow-hidden"
    >
      <div className={`p-4 ${isSidebarOpen ? 'border-b border-slate-200' : ''}`}>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md hover:bg-slate-100 transition-colors text-slate-600"
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isSidebarOpen ? <XIcon className="w-6 h-6"/> : <MenuIcon className="w-6 h-6"/>}
        </button>
      </div>

      <div className="flex-grow p-4 flex flex-col gap-2">
        <ActionButton
          label="শুদ্ধ করুন"
          icon={<CheckSquareIcon className="w-6 h-6" />}
          onClick={onCorrect}
          isLoading={isLoading && loadingAction === 'correct'}
          disabled={isLoading || !hasInput}
          isSidebarOpen={isSidebarOpen}
        />
        <ActionButton
          label="Translate"
          icon={<GlobeIcon className="w-6 h-6" />}
          onClick={onTranslate}
          isLoading={isLoading && loadingAction === 'translate'}
          disabled={isLoading || !hasInput}
          isSidebarOpen={isSidebarOpen}
        />
        <ActionButton
          label="Summarize"
          icon={<FileTextIcon className="w-6 h-6" />}
          onClick={onSummarize}
          isLoading={isLoading && loadingAction === 'summarize'}
          disabled={isLoading || !hasInput}
          isSidebarOpen={isSidebarOpen}
        />
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 border-t border-slate-200"
          >
            <h3 className="text-sm font-semibold text-slate-600 mb-3">Writing Style</h3>
            <div className="flex items-center gap-2">
                <StyleButton label="Standard" style="standard" currentStyle={writingStyle} onClick={setWritingStyle} disabled={isLoading} />
                <StyleButton label="Formal" style="formal" currentStyle={writingStyle} onClick={setWritingStyle} disabled={isLoading} />
                <StyleButton label="Creative" style="creative" currentStyle={writingStyle} onClick={setWritingStyle} disabled={isLoading} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};
