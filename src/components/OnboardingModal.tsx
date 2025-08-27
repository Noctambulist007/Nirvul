
import React from 'react';
import { motion } from 'framer-motion';

interface OnboardingModalProps {
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 relative"
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
            <h2 className="text-2xl font-bold text-nirvul-primary-800 mb-2">নিরভুল-এ স্বাগতম!</h2>
            <p className="text-nirvul-gray-600 mb-6">আপনার বাংলা লেখার নতুন AI সহযোগী।</p>
        </div>
        
        <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-nirvul-primary-100 text-nirvul-primary-700 rounded-full h-8 w-8 flex items-center justify-center font-bold">১</div>
                <p className="text-nirvul-gray-700">বাম দিকের প্যানেল থেকে কোনো কাজ বেছে নিন (যেমন <span className="font-semibold">'শুদ্ধ করুন'</span>) এবং ইনপুট বাক্সে আপনার লেখাটি দিন।</p>
            </div>
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-nirvul-primary-100 text-nirvul-primary-700 rounded-full h-8 w-8 flex items-center justify-center font-bold">২</div>
                <p className="text-nirvul-gray-700">আউটপুট প্যানেলে আপনার ফলাফল দেখুন। সংশোধনের ক্ষেত্রে, পরিবর্তনগুলো <span className="bg-green-100 text-green-800 px-1 rounded">সবুজ</span> এবং <span className="bg-red-100 text-red-800 px-1 rounded line-through">লাল</span> রঙে হাইলাইট করা হবে।</p>
            </div>
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-nirvul-primary-100 text-nirvul-primary-700 rounded-full h-8 w-8 flex items-center justify-center font-bold">৩</div>
                <p className="text-nirvul-gray-700">ডানদিকের নতুন <span className="font-semibold">'সংশোধন'</span> প্যানেলে সমস্ত ভুলের তালিকা দেখুন এবং প্রয়োজনে আউটপুট সম্পাদনা করুন, কপি করুন বা ডাউনলোড করুন।</p>
            </div>
        </div>

        <button 
          onClick={onClose} 
          className="mt-8 w-full bg-nirvul-primary-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-nirvul-primary-800 transition-colors duration-300"
        >
          শুরু করুন
        </button>
      </motion.div>
    </div>
  );
};
