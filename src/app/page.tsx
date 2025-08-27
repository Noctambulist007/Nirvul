'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingModal } from '@/components/OnboardingModal';
import { InputPanel } from '@/components/InputPanel';
import { OutputPanel } from '@/components/OutputPanel';
import { CorrectionsPanel } from '@/components/CorrectionsPanel';
import { correctBengaliTextStream, summarizeBengaliText, translateBengaliToEnglish } from '@/services/gemini';
import { Correction, DiffResult } from '@/types';
import { diffWords } from '@/utils/diff';
import { Sidebar } from '@/components/Sidebar';
export type WritingStyle = 'standard' | 'formal' | 'creative';
export type LoadingAction = 'correct' | 'translate' | 'summarize' | null;
export type HighlightedCorrection = { start: number; end: number } | null;

export default function Home() {
  const [inputText, setInputText] = useState<string>('');
  const [originalText, setOriginalText] = useState<string | null>(null);
  const [outputText, setOutputText] = useState<string>('');
  const [diffResult, setDiffResult] = useState<DiffResult[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingAction, setLoadingAction] = useState<LoadingAction>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [writingStyle, setWritingStyle] = useState<WritingStyle>('standard');
  const [outputTitle, setOutputTitle] = useState<string>('আপনার ফলাফল');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [highlightedCorrection, setHighlightedCorrection] = useState<HighlightedCorrection>(null);

  useEffect(() => {
    const isFirstVisit = !localStorage.getItem('nirvul-visited');
    if (isFirstVisit) {
      setShowModal(true);
      localStorage.setItem('nirvul-visited', 'true');
    }
    
    const handleResize = () => {
      if (window.innerWidth < 1280) { // Adjusted breakpoint for 3 columns
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const performBlockingAction = async (action: () => Promise<string>, actionType: LoadingAction, title: string) => {
    if (!inputText.trim()) {
      setError('Please enter some text in the input panel first.');
      setOutputText('');
      setOutputTitle('ত্রুটি');
      setDiffResult(null);
      setOriginalText(null);
      return;
    }
    setIsLoading(true);
    setLoadingAction(actionType);
    setError(null);
    setOutputText('');
    setOutputTitle(title);
    setDiffResult(null);
    setOriginalText(null);

    try {
      const result = await action();
      setOutputText(result);
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please check the console and try again.');
    } finally {
      setIsLoading(false);
      setLoadingAction(null);
    }
  };
  
  const handleCorrection = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter some text in the input panel first.');
      setOutputText('');
      setOutputTitle('ত্রুটি');
      setDiffResult(null);
      return;
    }

    setIsLoading(true);
    setLoadingAction('correct');
    setError(null);
    setOutputText('');
    setDiffResult(null);
    setOriginalText(inputText);
    setOutputTitle('সংশোধিত লেখা');

    try {
      const stream = await correctBengaliTextStream(inputText, writingStyle);
      let finalResult = '';
      for await (const chunk of stream) {
        finalResult += chunk.text;
        setOutputText(finalResult);
      }
      // After stream is complete, calculate the diff
      setDiffResult(diffWords(inputText, finalResult));
    } catch (err) {
      console.error("Error during streaming correction:", err);
      setError('An error occurred during the correction. Please try again.');
      setOutputText(''); // Clear partial text on error
    } finally {
      setIsLoading(false);
      setLoadingAction(null);
    }
  }, [inputText, writingStyle]);
  
  const handleTranslate = useCallback(() => {
    performBlockingAction(
      () => translateBengaliToEnglish(inputText),
      'translate',
      'English Translation'
    );
  }, [inputText]);
  
  const handleSummarize = useCallback(() => {
    performBlockingAction(
      () => summarizeBengaliText(inputText),
      'summarize',
      'সারসংক্ষেপ (Summary)'
    );
  }, [inputText]);

  const handleNavigateToCorrection = (correction: Correction) => {
    setHighlightedCorrection({ start: correction.diffStartIndex, end: correction.diffEndIndex });
    // Reset after animation duration to allow re-triggering
    setTimeout(() => setHighlightedCorrection(null), 1500);
  };

  return (
     <div className="min-h-screen bg-slate-50 flex flex-col">
      <AnimatePresence>
        {showModal && <OnboardingModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
      <div className="flex-grow w-full flex container mx-auto p-4 md:p-6 lg:p-8 gap-6">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          onCorrect={handleCorrection}
          onTranslate={handleTranslate}
          onSummarize={handleSummarize}
          isLoading={isLoading}
          loadingAction={loadingAction}
          writingStyle={writingStyle}
          setWritingStyle={setWritingStyle}
          hasInput={!!inputText.trim()}
        />
        <main className="flex-1 flex flex-col gap-6 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-[250px] flex flex-col"
          >
            <InputPanel
              inputText={inputText}
              setInputText={setInputText}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-[250px] flex flex-col"
          >
            <OutputPanel
              originalText={originalText}
              outputText={outputText}
              setOutputText={setOutputText}
              isLoading={isLoading}
              error={error}
              outputTitle={outputTitle}
              loadingAction={loadingAction}
              diffResult={diffResult}
              highlightedCorrection={highlightedCorrection}
            />
          </motion.div>
        </main>
        <AnimatePresence>
          {diffResult && (
             <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="w-[300px] h-[500px] hidden xl:flex"
             >
                <CorrectionsPanel diffResult={diffResult} onNavigate={handleNavigateToCorrection} />
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
