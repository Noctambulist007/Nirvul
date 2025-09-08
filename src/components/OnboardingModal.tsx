import React from 'react';
import { motion } from 'framer-motion';

interface OnboardingModalProps {
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-nirvul-gray-950/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        className="bg-white rounded-2xl border border-nirvul-gray-200 shadow-2xl max-w-lg w-full p-6 md:p-8 relative transform scale-100 transition-transform duration-300"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-nirvul-gray-400 hover:text-nirvul-gray-600 transition-colors"
          aria-label="Close tutorial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
            <h2 className="text-3xl font-bold text-nirvul-primary-800 mb-2 leading-tight">নির্ভুল-এ স্বাগতম!</h2>
            <p className="text-nirvul-gray-600 mb-8">আপনার বাংলা লেখার নতুন AI সহযোগী।</p>
        </div>
        
        <div className="space-y-6 text-left">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-nirvul-primary-50 text-nirvul-primary-700 rounded-full h-9 w-9 flex items-center justify-center font-bold text-lg shadow-sm">১</div>
                <p className="text-nirvul-gray-700 mt-0.5">বাম দিকের প্যানেল থেকে কোনো কাজ বেছে নিন (যেমন <span className="font-semibold">'শুদ্ধ করুন'</span>) এবং ইনপুট বাক্সে আপনার লেখাটি দিন।</p>
            </div>
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-nirvul-primary-50 text-nirvul-primary-700 rounded-full h-9 w-9 flex items-center justify-center font-bold text-lg shadow-sm">২</div>
                <p className="text-nirvul-gray-700 mt-0.5">আউটপুট প্যানেলে আপনার ফলাফল দেখুন। সংশোধনের ক্ষেত্রে, পরিবর্তনগুলো <span className="bg-success-100 text-success-800 px-1 rounded">সবুজ</span> এবং <span className="bg-error-100 text-error-800 px-1 rounded line-through">লাল</span> রঙে হাইলাইট করা হবে।</p>
            </div>
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-nirvul-primary-50 text-nirvul-primary-700 rounded-full h-9 w-9 flex items-center justify-center font-bold text-lg shadow-sm">৩</div>
                <p className="text-nirvul-gray-700 mt-0.5">ডানদিকের নতুন <span className="font-semibold">'সংশোধন'</span> প্যানেলে সমস্ত ভুলের তালিকা দেখুন এবং প্রয়োজনে আউটপুট সম্পাদনা করুন, কপি করুন বা ডাউনলোড করুন।</p>
            </div>
        </div>

        <button 
          onClick={onClose} 
          className="mt-10 w-full bg-gradient-to-br from-nirvul-primary-600 to-nirvul-primary-700 text-white font-bold py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg hover:from-nirvul-primary-700 hover:to-nirvul-primary-800 transition-all duration-300 transform hover:scale-105"
        >
          শুরু করুন
        </button>
      </motion.div>
    </div>
  );
};
