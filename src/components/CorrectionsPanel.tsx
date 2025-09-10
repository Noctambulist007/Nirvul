import React from 'react';
import type { DiffResult, Correction } from '@/types';
import { LightbulbIcon } from './icons';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { getCorrectionList } from '@/utils/diff';

interface CorrectionsPanelProps {
  diffResult: DiffResult[];
  onNavigate: (correction: Correction) => void;
}

export const CorrectionsPanel: React.FC<CorrectionsPanelProps> = ({ diffResult, onNavigate }) => {
  const corrections = getCorrectionList(diffResult);
  const totalFixes = corrections.length;

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-nirvul-gray-200/20 border border-nirvul-gray-100 overflow-hidden h-full flex flex-col backdrop-blur-sm">
      {/* Header Section */}
      <div className="bg-nirvul-primary-50 p-6 border-b border-nirvul-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-warning-500 to-warning-600 flex items-center justify-center shadow-lg">
            <LightbulbIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-nirvul-gray-800 bg-gradient-to-r from-nirvul-gray-800 to-nirvul-gray-700 bg-clip-text text-transparent">
              সংশোধন তালিকা
            </h3>
            {totalFixes > 0 ? (
              <p className="text-sm text-nirvul-gray-600 mt-1 font-medium">
                মোট <span className="font-bold text-error-600 bg-error-50 px-2 py-0.5 rounded-full">{totalFixes}</span> টি ভুল সংশোধন করা হয়েছে
              </p>
            ) : (
              <p className="text-sm text-success-600 mt-1 font-medium flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                কোনো ভুল খুঁজে পাওয়া যায়নি
              </p>
            )}
          </div>
        </div>
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
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-success-100 to-success-200 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-success-500" />
                </div>
                <h4 className="text-lg font-bold text-nirvul-gray-700 mb-2">
                  অভিনন্দন! 🎉
                </h4>
                <p className="text-nirvul-gray-500 font-medium">
                  আপনার লেখাটি সম্পূর্ণ নির্ভুল মনে হচ্ছে।
                </p>
                <p className="text-sm text-nirvul-gray-400 mt-1">
                  কোনো সংশোধনের প্রয়োজন নেই।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Stats */}
        {totalFixes > 0 && (
          <div className="p-6 bg-gradient-to-r from-nirvul-gray-25 to-nirvul-primary-50 border-t border-nirvul-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <AlertCircle className="w-4 h-4 text-warning-500" />
                  <span className="font-semibold text-nirvul-gray-700">
                    সংশোধন সম্পন্ন
                  </span>
                </div>
              </div>
              
              <div className="text-sm text-nirvul-gray-600">
                প্রতিটি সংশোধনে ক্লিক করে বিস্তারিত দেখুন
              </div>
            </div>
          </div>
        )}
      </div>
  );
};