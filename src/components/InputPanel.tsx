import { Button, Select } from "antd";
import React, { useState } from "react";
import { CheckCircle, FileText, Languages } from "lucide-react";
import { LoadingAction, WritingStyle } from "@/app/(core)/page";
import { useMenu } from "@/contexts/MenuContext";

const { Option } = Select;

interface InputPanelProps {
  inputText: string;
  setInputText: (text: string) => void;
  isLoading: boolean;
  onCorrect: () => void;
  onTranslate: () => void;
  onSummarize: () => void;
  loadingAction: LoadingAction;
  writingStyle: WritingStyle;
  setWritingStyle: (style: WritingStyle) => void;
  hasInput: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  inputText,
  setInputText,
  isLoading,
  onCorrect,
  onTranslate,
  onSummarize,
  loadingAction,
  writingStyle,
  setWritingStyle,
  hasInput,
}) => {
  const { activeKey } = useMenu();

  const charCount = inputText.length;
  const wordCount =
    inputText.trim() === "" ? 0 : inputText.trim().split(/\s+/).length;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col border border-gray-200/50 h-full">
      {/* Header with dropdown */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-nirvul-gray-800">
          আপনার লেখাটি এখানে দিন
        </h2>
        <div className="flex items-center gap-2">
          <span>লিখনের ধরন</span>
          <Select
            value={writingStyle}
            onChange={(val) => setWritingStyle(val)}
            className="w-40"
          >
            <Option value="standard">
              স্ট্যান্ডার্ড → স্বাভাবিক / সাধারণ / প্রচলিত
            </Option>
            <Option value="formal">
              শুদ্ধ → পাণ্ডিত্যপূর্ণ / প্রাচীন / সাহিত্যিক
            </Option>
            <Option value="creative">
              সৃজনশীল → কল্পনাময় / কাব্যিক / রূপকধর্মী
            </Option>
          </Select>
        </div>
      </div>

      {/* Text area */}
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

        {/* Bottom controls */}
        <div className="flex items-center justify-between mt-3 px-2 text-sm text-nirvul-gray-600">
          {/* Action buttons */}
          <div className="flex gap-2">
            
            <Button
              type="primary"
              icon={<CheckCircle className="w-5 h-5 text-green-600" />}
              className="flex items-center gap-1 px-3 py-1 rounded-md"
              onClick={onCorrect}
              loading={isLoading && loadingAction === "correct"}
              disabled={isLoading || !hasInput || activeKey !== "correct"}
              hidden={activeKey !== "correct"}
            >
              শুদ্ধ করুন
            </Button>

            <Button
              type="primary"
              icon={<Languages className="w-5 h-5 text-blue-600" />}
              className="flex items-center gap-1 px-3 py-1 rounded-md"
              onClick={onTranslate}
              loading={isLoading && loadingAction === "translate"}
              disabled={isLoading || !hasInput || activeKey !== "translate"}
              hidden={activeKey !== "translate"}
            >
              অনুবাদ
            </Button>

            <Button
              type="primary"
              icon={<FileText className="w-5 h-5 text-purple-600" />}
              className="flex items-center gap-1 px-3 py-1 rounded-md"
              onClick={onSummarize}
              loading={isLoading && loadingAction === "summarize"}
              disabled={isLoading || !hasInput || activeKey !== "summarize"}
              hidden={activeKey !== "summarize"}
            >
              সারসংক্ষেপ
            </Button>
          </div>

          {/* Word / char counter */}
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <span>{wordCount} শব্দ</span>
            <span className="text-gray-400">/</span>
            <span>{charCount} অক্ষর</span>
          </div>
        </div>
      </div>
    </div>
  );
};
