"use client";
import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OnboardingModal } from "@/components/OnboardingModal";
import { InputPanel } from "@/components/InputPanel";
import { OutputPanel } from "@/components/OutputPanel";
import { CorrectionsPanel } from "@/components/CorrectionsPanel";
import {
  correctBengaliTextStream,
  summarizeBengaliText,
  translateBengaliToEnglish,
} from "@/services/gemini";
import { Correction } from "@/types";
import { diffWords } from "@/utils/diff";
import { Sparkles, BookOpen, Languages } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useHistory } from "@/hooks/useHistory";
import { useMenu } from "@/contexts/MenuContext";

export type WritingStyle = "standard" | "formal" | "creative";
export type LoadingAction = "correct" | "translate" | "summarize" | null;
export type HighlightedCorrection = { start: number; end: number } | null;

export default function Home() {
  const { data: user } = useUser();
  const { createHistory } = useHistory();
  const {
    inputText,
    setInputText,
    originalText,
    setOriginalText,
    outputText,
    setOutputText,
    diffResult,
    setDiffResult,
    outputTitle,
    setOutputTitle,
  } = useMenu();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingAction, setLoadingAction] = useState<LoadingAction>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [writingStyle, setWritingStyle] = useState<WritingStyle>("standard");
  const [highlightedCorrection, setHighlightedCorrection] =
    useState<HighlightedCorrection>(null);

  useEffect(() => {
    const isFirstVisit = !localStorage.getItem("nirvul-visited");
    if (isFirstVisit) {
      setShowModal(true);
      localStorage.setItem("nirvul-visited", "true");
    }
  }, []);

  const performBlockingAction = async (
    action: () => Promise<string>,
    actionType: LoadingAction,
    title: string
  ) => {
    if (!inputText.trim()) {
      setError("Please enter some text in the input panel first.");
      setOutputText("");
      setOutputTitle("ত্রুটি");
      setDiffResult(null);
      setOriginalText(null);
      return;
    }
    setIsLoading(true);
    setLoadingAction(actionType);
    setError(null);
    setOutputText("");
    setOutputTitle(title);
    setDiffResult(null);
    setOriginalText(null);

    try {
      const result = await action();
      setOutputText(result);
      // Create History Item
      createHistory(user?.id, {
        type: actionType,
        inputText: inputText,
        outputText: result,
      });
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please check the console and try again.");
    } finally {
      setIsLoading(false);
      setLoadingAction(null);
    }
  };

  const handleCorrection = useCallback(async () => {
    if (!inputText.trim()) {
      setError("Please enter some text in the input panel first.");
      setOutputText("");
      setOutputTitle("ত্রুটি");
      setDiffResult(null);
      return;
    }

    setIsLoading(true);
    setLoadingAction("correct");
    setError(null);
    setOutputText("");
    setDiffResult(null);
    setOriginalText(inputText);
    setOutputTitle("সংশোধিত লেখা");

    try {
      const stream = await correctBengaliTextStream(inputText, writingStyle);
      let finalResult = "";
      for await (const chunk of stream) {
        finalResult += chunk.text;
        setOutputText(finalResult);
      }
      // After stream is complete, calculate the diff
      setDiffResult(diffWords(inputText, finalResult));

      // Create History Item
      createHistory(user?.id, {
        type: "correct",
        inputText: inputText,
        outputText: finalResult,
        diffResult: diffWords(inputText, finalResult),
      });
    } catch (err) {
      console.error("Error during streaming correction:", err);
      setError("An error occurred during the correction. Please try again.");
      setOutputText(""); // Clear partial text on error
    } finally {
      setIsLoading(false);
      setLoadingAction(null);
    }
  }, [inputText, writingStyle]);

  const handleTranslate = useCallback(() => {
    performBlockingAction(
      () => translateBengaliToEnglish(inputText),
      "translate",
      "অনুবাদ"
    );
  }, [inputText]);

  const handleSummarize = useCallback(() => {
    performBlockingAction(
      () => summarizeBengaliText(inputText),
      "summarize",
      "সারসংক্ষেপ"
    );
  }, [inputText]);

  const handleNavigateToCorrection = (correction: Correction) => {
    setHighlightedCorrection({
      start: correction.diffStartIndex,
      end: correction.diffEndIndex,
    });
    // Reset after animation duration to allow re-triggering
    setTimeout(() => setHighlightedCorrection(null), 1500);
  };

  // Get current action info for visual feedback
  const getCurrentActionInfo = () => {
    switch (loadingAction) {
      case "correct":
        return {
          icon: <Sparkles className="w-5 h-5" />,
          text: "সংশোধন করা হচ্ছে...",
          color: "from-success-500 to-success-600",
        };
      case "translate":
        return {
          icon: <Languages className="w-5 h-5" />,
          text: "অনুবাদ করা হচ্ছে...",
          color: "from-blue-light-500 to-blue-light-600",
        };
      case "summarize":
        return {
          icon: <BookOpen className="w-5 h-5" />,
          text: "সারসংক্ষেপ তৈরি হচ্ছে...",
          color: "from-purple-500 to-purple-600",
        };
      default:
        return null;
    }
  };

  const actionInfo = getCurrentActionInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-nirvul-gray-25 via-white to-nirvul-primary-25 flex flex-col relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-nirvul-primary-100/30 to-nirvul-primary-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-light-100/30 to-violet-100/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-success-50/20 to-nirvul-primary-50/20 rounded-full blur-3xl"></div>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && actionInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-4 border border-nirvul-gray-100"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${actionInfo.color} flex items-center justify-center text-white shadow-lg`}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  {actionInfo.icon}
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-nirvul-gray-800 mb-1">
                  {actionInfo.text}
                </h3>
                <p className="text-sm text-nirvul-gray-500">
                  অনুগ্রহ করে অপেক্ষা করুন...
                </p>
              </div>
              <div className="w-48 h-1 bg-nirvul-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${actionInfo.color} rounded-full`}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && <OnboardingModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-grow w-full flex relative z-10">
        <div className="container mx-auto p-4 md:p-6 lg:p-8 flex gap-6 max-w-[1400px]">
          <main className="flex-1 flex flex-col gap-6 min-w-0">
            {/* Input Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex-1 min-h-[300px] max-h-[400px]"
            >
              <InputPanel
                inputText={inputText}
                setInputText={setInputText}
                isLoading={isLoading}
                onCorrect={handleCorrection}
                onTranslate={handleTranslate}
                onSummarize={handleSummarize}
                loadingAction={loadingAction}
                writingStyle={writingStyle}
                setWritingStyle={setWritingStyle}
                hasInput={!!inputText.trim()}
              />
            </motion.div>

            {/* Output Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex-1 min-h-[300px] max-h-[400px]"
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

          {/* Corrections Panel - Side Panel */}
          <AnimatePresence>
            {diffResult && (
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  mass: 0.5,
                }}
                className="w-[350px] hidden xl:flex"
              >
                <CorrectionsPanel
                  diffResult={diffResult}
                  onNavigate={handleNavigateToCorrection}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Corrections Panel - Bottom Sheet Style */}
      <AnimatePresence>
        {diffResult && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-nirvul-primary-200 rounded-t-3xl shadow-2xl max-h-[50vh] z-30"
          >
            <div className="p-6">
              <div className="w-12 h-1 bg-nirvul-gray-300 rounded-full mx-auto mb-4"></div>
              <CorrectionsPanel
                diffResult={diffResult}
                onNavigate={handleNavigateToCorrection}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Indicator */}
      <AnimatePresence>
        {isLoading && actionInfo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl p-4 border border-nirvul-gray-100 z-50"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-r ${actionInfo.color} flex items-center justify-center text-white`}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  {actionInfo.icon}
                </motion.div>
              </div>
              <div>
                <p className="text-sm font-semibold text-nirvul-gray-800">
                  {actionInfo.text}
                </p>
                <div className="w-24 h-1 bg-nirvul-gray-200 rounded-full overflow-hidden mt-1">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${actionInfo.color} rounded-full`}
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
