
import React from 'react';

interface InputPanelProps {
  inputText: string;
  setInputText: (text: string) => void;
  isLoading: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({ 
  inputText, setInputText, isLoading
}) => {
  const charCount = inputText.length;
  const wordCount = inputText.trim() === '' ? 0 : inputText.trim().split(/\s+/).length;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col border border-gray-200/50 h-full">
      <h2 className="text-xl font-semibold mb-4 text-nirvul-gray-800">আপনার লেখাটি এখানে দিন</h2>
      
      <div className="relative flex-grow flex flex-col min-h-0">
        <textarea
          className="w-full flex-grow p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-shadow duration-200 resize-none text-lg leading-relaxed bg-gray-50/50"
          placeholder="উদাহরণ: আমি বাংলায় গান গাই..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
          aria-label="Bengali text input"
          maxLength={10000}
        />
        <div className="text-right text-sm text-nirvul-gray-500 mt-2 pr-1">
          <span>{wordCount} শব্দ</span> / <span>{charCount} অক্ষর</span>
        </div>
      </div>
    </div>
  );
};
