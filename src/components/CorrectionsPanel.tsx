
import React from 'react';
import type { DiffResult, Correction } from '@/types';
import { LightbulbIcon } from './icons';
import { getCorrectionList } from '@/utils/diff';

interface CorrectionsPanelProps {
  diffResult: DiffResult[];
  onNavigate: (correction: Correction) => void;
}

export const CorrectionsPanel: React.FC<CorrectionsPanelProps> = ({ diffResult, onNavigate }) => {
  const corrections = getCorrectionList(diffResult);
  const totalFixes = corrections.length;

  return (
    <div className="bg-white rounded-2xl shadow-lg flex flex-col border border-gray-200/50 h-full">
      <div className="p-4 border-b border-slate-200">
        <h3 className="font-semibold text-lg text-slate-800 flex items-center gap-2">
          <LightbulbIcon className="w-6 h-6 text-amber-500" />
          সংশোধন তালিকা
        </h3>
        {totalFixes > 0 ? (
          <p className="text-sm text-slate-500 mt-1">
            মোট <span className="font-bold text-rose-700">{totalFixes}</span> টি ভুল সংশোধন করা হয়েছে।
          </p>
        ) : (
          <p className="text-sm text-slate-500 mt-1">
            কোনো ভুল খুঁজে পাওয়া যায়নি।
          </p>
        )}
      </div>

      <div className="flex-grow overflow-y-auto p-2">
        {totalFixes > 0 ? (
          <ul className="space-y-2 p-2">
            {corrections.map((correction, index) => (
              <li 
                key={index} 
                className="text-sm bg-slate-50 p-3 rounded-lg transition-colors hover:bg-rose-50 cursor-pointer"
                onClick={() => onNavigate(correction)}
              >
                <span className="text-red-600 line-through">{correction.from}</span>
                <span className="font-bold text-slate-500 mx-2">→</span>
                <span className="text-green-700 font-medium">{correction.to}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-full text-center text-slate-400 p-4">
            <p>আপনার লেখাটি নির্ভুল মনে হচ্ছে।</p>
          </div>
        )}
      </div>
    </div>
  );
};